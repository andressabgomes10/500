#!/usr/bin/env python3
"""
Script para testar conexão MongoDB no Railway
"""

import os
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def test_mongodb():
    """Testa conexão com MongoDB"""
    try:
        mongo_url = os.environ.get('MONGO_URL', 'mongodb://mongo:SUpWKcptmEFlxyaZYFaueiQBpwripaFQ@mongodb.railway.internal:27017')
        db_name = os.environ.get('DB_NAME', 'crm_production')
        
        print(f"🔗 Conectando ao MongoDB...")
        print(f"📍 URL: {mongo_url[:50]}...")
        print(f"🗄️  Database: {db_name}")
        
        client = AsyncIOMotorClient(mongo_url)
        db = client[db_name]
        
        # Teste de conexão
        result = await db.command("ping")
        print("✅ MongoDB conectado com sucesso!")
        
        # Teste de escrita
        test_collection = db.test_connection
        doc = {"message": "Railway deploy test", "timestamp": "now"}
        await test_collection.insert_one(doc)
        print("✅ Escrita no MongoDB funcionando!")
        
        # Teste de leitura
        found_doc = await test_collection.find_one({"message": "Railway deploy test"})
        if found_doc:
            print("✅ Leitura do MongoDB funcionando!")
        
        # Limpar teste
        await test_collection.delete_one({"message": "Railway deploy test"})
        client.close()
        
        print("🎉 MongoDB 100% funcional!")
        return True
        
    except Exception as e:
        print(f"❌ Erro ao conectar MongoDB: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_mongodb())