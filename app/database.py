"""
BizForge Database Module
MongoDB connection manager using Motor (async driver).
"""

from motor.motor_asyncio import AsyncIOMotorClient
from app.config import get_settings

settings = get_settings()

# Global database client
_client: AsyncIOMotorClient = None
_db = None


async def connect_to_mongo():
    """Initialize MongoDB connection."""
    global _client, _db
    
    if not settings.mongodb_uri:
        print("⚠️  MONGODB_URI not configured. Database features disabled.")
        return False
    
    try:
        _client = AsyncIOMotorClient(settings.mongodb_uri)
        _db = _client.bizforge  # Database name
        
        # Test connection
        await _client.admin.command('ping')
        print("✅ Connected to MongoDB successfully!")
        return True
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        _client = None
        _db = None
        return False


async def close_mongo_connection():
    """Close MongoDB connection."""
    global _client
    if _client:
        _client.close()
        print("MongoDB connection closed.")


def get_database():
    """Get the database instance."""
    return _db


def get_collection(name: str):
    """Get a specific collection."""
    if _db is None:
        return None
    return _db[name]


# Collection helpers
def users_collection():
    """Get users collection."""
    return get_collection("users")


def generations_collection():
    """Get generations history collection."""
    return get_collection("generations")


def brand_profiles_collection():
    """Get brand profiles collection."""
    return get_collection("brand_profiles")
