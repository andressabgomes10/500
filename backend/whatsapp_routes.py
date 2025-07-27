from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
import httpx
import re
import uuid
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient
import os

from models import (
    WhatsAppMessageCreate, WhatsAppMessageResponse, WhatsAppOutgoingMessage,
    CustomerTicket, CustomerTicketCreate, Customer, CustomerCreate,
    WhatsAppStatus, WhatsAppMessage
)

router = APIRouter(prefix="/api/whatsapp", tags=["whatsapp"])

# URL do serviço WhatsApp (Node.js)
WHATSAPP_SERVICE_URL = "http://localhost:3001"

# Função para obter conexão do banco
def get_db_connection():
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'test_database')
    client = AsyncIOMotorClient(mongo_url)
    return client[db_name]

@router.post("/message", response_model=WhatsAppMessageResponse)
async def handle_whatsapp_message(message_data: WhatsAppMessageCreate):
    """Processa mensagens recebidas do WhatsApp e gera respostas"""
    try:
        db = get_db_connection()
        phone_number = message_data.phone_number
        message_text = message_data.message.strip()
        
        # Salvar mensagem no banco
        message_obj = WhatsAppMessage(
            phone_number=phone_number,
            message=message_text,
            message_id=message_data.message_id,
            timestamp=datetime.fromtimestamp(message_data.timestamp),
            from_customer=True
        )
        
        await db.whatsapp_messages.insert_one(message_obj.dict())
        
        # Obter ou criar cliente
        customer = await get_or_create_customer(phone_number)
        
        # Processar comando
        response = await process_customer_command(customer, message_text.lower())
        
        # Salvar resposta no banco se houver
        if response:
            response_obj = WhatsAppMessage(
                phone_number=phone_number,
                message=response,
                message_id=f"bot_{message_data.message_id}",
                from_customer=False
            )
            await db.whatsapp_messages.insert_one(response_obj.dict())
        
        return WhatsAppMessageResponse(reply=response)
        
    except Exception as e:
        print(f"Erro ao processar mensagem WhatsApp: {e}")
        return WhatsAppMessageResponse(
            reply="Desculpe, ocorreu um erro. Tente novamente mais tarde.",
            success=False
        )

async def get_or_create_customer(phone_number: str) -> dict:
    """Obtém cliente existente ou cria novo"""
    db = get_db_connection()
    customers_collection = db.customers
    
    customer = await customers_collection.find_one({"phone_number": phone_number})
    if not customer:
        customer_data = {
            "id": str(uuid.uuid4()),
            "phone_number": phone_number,
            "created_at": datetime.utcnow(),
            "total_tickets": 0,
            "last_contact": datetime.utcnow()
        }
        result = await customers_collection.insert_one(customer_data)
        customer_data["_id"] = result.inserted_id
        return customer_data
    
    # Atualizar último contato
    await customers_collection.update_one(
        {"_id": customer["_id"]},
        {"$set": {"last_contact": datetime.utcnow()}}
    )
    
    return customer

async def process_customer_command(customer: dict, message_text: str) -> Optional[str]:
    """Processa comandos do cliente via WhatsApp"""
    db = get_db_connection()
    
    # Comando para criar ticket: "suporte: problema com sistema"
    if message_text.startswith("suporte:"):
        description = message_text.replace("suporte:", "").strip()
        if not description:
            return """❌ Por favor, descreva seu problema após 'suporte:'.

Exemplo: *suporte: sistema não está funcionando*"""
        
        # Criar ticket
        ticket_data = {
            "id": CustomerTicket().id,
            "customer_phone": customer["phone_number"],
            "subject": f"Suporte via WhatsApp - {datetime.now().strftime('%d/%m/%Y %H:%M')}",
            "description": description,
            "status": "aberto",
            "priority": "media",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "messages": []
        }
        
        result = await db.tickets.insert_one(ticket_data)
        
        # Atualizar contador de tickets do cliente
        await db.customers.update_one(
            {"_id": customer["_id"]},
            {"$inc": {"total_tickets": 1}}
        )
        
        return f"""✅ *Ticket de suporte criado!*

🎫 *ID do Ticket:* #{ticket_data['id'][:8]}
📋 *Descrição:* {description}
📅 *Data:* {datetime.now().strftime('%d/%m/%Y às %H:%M')}

Nossa equipe analisará seu caso e retornará em breve. Para acompanhar, use: *status {ticket_data['id'][:8]}*"""

    # Comando para verificar status: "status 12345678"
    elif message_text.startswith("status"):
        try:
            ticket_id_part = message_text.replace("status", "").strip()
            if not ticket_id_part:
                raise ValueError("ID não fornecido")
            
            # Buscar ticket que comece com o ID parcial
            tickets_collection = db.tickets
            ticket = await tickets_collection.find_one({
                "customer_phone": customer["phone_number"],
                "id": {"$regex": f"^{ticket_id_part}"}
            })
            
            if not ticket:
                return f"❌ Ticket #{ticket_id_part} não encontrado. Verifique o ID e tente novamente."
            
            status_emoji = {
                "aberto": "🆕",
                "em_andamento": "⏳", 
                "resolvido": "✅",
                "fechado": "🔒"
            }
            
            priority_emoji = {
                "baixa": "🔵",
                "media": "🟡",
                "alta": "🟠", 
                "urgente": "🔴"
            }
            
            return f"""📋 *Status do Ticket #{ticket['id'][:8]}*

{status_emoji.get(ticket['status'], '📋')} *Status:* {ticket['status'].title()}
{priority_emoji.get(ticket['priority'], '🔵')} *Prioridade:* {ticket['priority'].title()}
📝 *Assunto:* {ticket['subject']}
📅 *Criado:* {ticket['created_at'].strftime('%d/%m/%Y às %H:%M')}
👤 *Agente:* {ticket.get('assigned_agent', 'Não atribuído')}

*Descrição:* {ticket['description']}"""
            
        except (ValueError, AttributeError):
            return "❌ Formato inválido. Use: *status 12345678*"

    # Comando para listar tickets: "meus tickets"
    elif message_text in ["meus tickets", "tickets", "meus chamados"]:
        tickets_collection = db.tickets
        tickets = await tickets_collection.find({
            "customer_phone": customer["phone_number"]
        }).sort("created_at", -1).limit(10).to_list(length=10)
        
        if not tickets:
            return "📝 Você não possui tickets de suporte no momento."
        
        response = "🎫 *Seus tickets de suporte:*\n\n"
        
        for ticket in tickets:
            status_emoji = {
                "aberto": "🆕",
                "em_andamento": "⏳",
                "resolvido": "✅", 
                "fechado": "🔒"
            }
            
            response += f"{status_emoji.get(ticket['status'], '📋')} *#{ticket['id'][:8]}* - {ticket['status'].title()}\n"
            response += f"   📋 {ticket['subject']}\n"
            response += f"   📅 {ticket['created_at'].strftime('%d/%m/%Y')}\n\n"
        
        response += "Para ver detalhes de um ticket, use: *status 12345678*"
        return response

    # Comando de ajuda: "ajuda", "help", "comandos"
    elif message_text in ["ajuda", "help", "comandos", "?"]:
        return """🤖 *Central de Atendimento WhatsApp*

📋 *Comandos disponíveis:*

🆘 *suporte: [sua descrição]*
   Criar novo ticket de suporte
   
📊 *status [ID do ticket]*
   Verificar status de um ticket
   
🎫 *meus tickets*
   Ver todos os seus tickets
   
❓ *ajuda*
   Mostrar esta mensagem

---

*Exemplos:*
• suporte: não consigo acessar o sistema
• status 12345678
• meus tickets

Nossa equipe responde em até 2 horas! 🚀"""

    # Saudações
    elif any(word in message_text for word in ["oi", "olá", "bom dia", "boa tarde", "boa noite", "hello"]):
        return f"""👋 *Olá! Bem-vindo ao nosso atendimento WhatsApp!*

Sou o assistente virtual do *{os.getenv('DB_NAME', 'CRM Turbo')}* e estou aqui para ajudá-lo.

Para criar um ticket de suporte, digite:
*suporte: descreva seu problema*

Para ver todos os comandos, digite: *ajuda*

Como posso ajudá-lo hoje? 😊"""

    # Agradecimentos
    elif any(word in message_text for word in ["obrigado", "obrigada", "valeu", "thanks"]):
        return "😊 Por nada! Estamos sempre aqui para ajudar. Se precisar de mais alguma coisa, é só chamar!"

    # Comando não reconhecido
    else:
        return f"""🤔 Não entendi esse comando.

Digite *ajuda* para ver os comandos disponíveis.

*Exemplos rápidos:*
• *suporte: descrição do problema*
• *meus tickets*
• *ajuda*"""

@router.post("/send")
async def send_whatsapp_message(message: WhatsAppOutgoingMessage):
    """Envia mensagem via serviço WhatsApp"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{WHATSAPP_SERVICE_URL}/send",
                json={
                    "phone_number": message.phone_number,
                    "message": message.message
                }
            )
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao enviar mensagem: {str(e)}")

@router.get("/qr")
async def get_qr_code():
    """Obtém QR code atual para autenticação"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{WHATSAPP_SERVICE_URL}/qr")
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao obter QR code: {str(e)}")

@router.get("/status")
async def get_whatsapp_status():
    """Obtém status da conexão WhatsApp"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{WHATSAPP_SERVICE_URL}/status")
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao verificar status: {str(e)}")

# Endpoints para gerenciar tickets
@router.get("/tickets", response_model=List[CustomerTicket])
async def get_all_tickets():
    """Lista todos os tickets de suporte"""
    db = get_db_connection()
    tickets = await db.tickets.find().sort("created_at", -1).limit(100).to_list(length=100)
    return [CustomerTicket(**ticket) for ticket in tickets]

@router.get("/customers", response_model=List[Customer])
async def get_all_customers():
    """Lista todos os clientes"""
    db = get_db_connection()
    customers = await db.customers.find().sort("created_at", -1).limit(100).to_list(length=100)
    return [Customer(**customer) for customer in customers]

@router.put("/tickets/{ticket_id}/status")
async def update_ticket_status(ticket_id: str, status: str, assigned_agent: Optional[str] = None):
    """Atualiza status de um ticket"""
    db = get_db_connection()
    update_data = {
        "status": status,
        "updated_at": datetime.utcnow()
    }
    
    if assigned_agent:
        update_data["assigned_agent"] = assigned_agent
    
    result = await db.tickets.update_one(
        {"id": ticket_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Ticket não encontrado")
    
    return {"message": "Status atualizado com sucesso"}