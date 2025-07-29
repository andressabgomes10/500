from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import WhatsApp routes
from whatsapp_routes import router as whatsapp_router


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection - usando railway internal ou fallback local
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'crm_production')

print(f"🗄️ Conectando ao MongoDB: {mongo_url[:50]}...")
print(f"📊 Database: {db_name}")

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Create the main app without a prefix
app = FastAPI(title="CRM WhatsApp API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)
app.include_router(whatsapp_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "http://localhost:3000",
        "https://*.railway.app",
        "https://*.emergentagent.com",
        "https://*.vercel.app",
        "https://500-git-main-andressabgomes10-9056s-projects.vercel.app",  # Sua URL específica
        "*"  # Para desenvolvimento
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Add startup event for debugging
@app.on_event("startup")
async def startup_event():
    logger.info("🚀 CRM Backend starting...")
    logger.info(f"🗄️ MongoDB URL: {mongo_url[:50]}...")
    logger.info(f"📊 Database: {db_name}")
    logger.info(f"🔗 WhatsApp Service URL: {os.environ.get('WHATSAPP_SERVICE_URL', 'Not configured')}")
    
    # Test MongoDB connection
    try:
        await db.command("ping")
        logger.info("✅ MongoDB connected successfully!")
    except Exception as e:
        logger.error(f"❌ MongoDB connection failed: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    logger.info("🛑 Shutting down...")
    client.close()
