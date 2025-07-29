from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid

# Models para WhatsApp
class WhatsAppMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    phone_number: str
    message: str
    message_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    from_customer: bool = True
    processed: bool = False

class WhatsAppMessageCreate(BaseModel):
    phone_number: str
    message: str
    message_id: str
    timestamp: int

class WhatsAppMessageResponse(BaseModel):
    reply: Optional[str] = None
    success: bool = True

class WhatsAppOutgoingMessage(BaseModel):
    phone_number: str
    message: str

# Models para Tickets de Atendimento
class CustomerTicket(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_phone: str
    customer_name: Optional[str] = None
    subject: str
    description: str
    status: str = "aberto"  # aberto, em_andamento, resolvido, fechado
    priority: str = "media"  # baixa, media, alta, urgente
    assigned_agent: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    messages: List[WhatsAppMessage] = []

class CustomerTicketCreate(BaseModel):
    customer_phone: str
    customer_name: Optional[str] = None
    subject: str
    description: str
    priority: str = "media"

# Models para Clientes
class Customer(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    phone_number: str
    name: Optional[str] = None
    email: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    total_tickets: int = 0
    last_contact: Optional[datetime] = None

class CustomerCreate(BaseModel):
    phone_number: str
    name: Optional[str] = None
    email: Optional[str] = None

# Models para Status WhatsApp
class WhatsAppStatus(BaseModel):
    connected: bool
    user: Optional[dict] = None
    qr_code: Optional[str] = None