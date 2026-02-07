"""
BizForge Users API Router
Handles user sync, profile retrieval, and generation history.
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from app.database import users_collection, generations_collection, brand_profiles_collection

router = APIRouter(prefix="/users", tags=["Users"])


# ============ Schemas ============

class UserSync(BaseModel):
    """User data from Google Sign-In."""
    google_id: str
    email: EmailStr
    name: str
    picture: Optional[str] = None


class BrandVoice(BaseModel):
    """Brand personality settings."""
    personality: Optional[str] = None  # e.g., "Professional, Eco-friendly, Witty"
    industry: Optional[str] = None
    target_audience: Optional[str] = None
    tone: Optional[str] = None  # e.g., "Formal", "Casual", "Playful"


class UserProfile(BaseModel):
    """Complete user profile."""
    google_id: str
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime
    brand_voice: Optional[BrandVoice] = None


class GenerationRecord(BaseModel):
    """Record of a generation."""
    type: str  # "brand_name", "logo", "content", "design", "sentiment"
    input_data: dict
    output_data: dict
    created_at: datetime


# ============ Endpoints ============

@router.post("/sync", response_model=dict)
async def sync_user(user_data: UserSync):
    """
    Sync user on login. Creates new user or updates existing.
    Called after successful Google Sign-In.
    """
    users = users_collection()
    
    if users is None:
        # Database not configured, return success anyway
        return {"status": "ok", "message": "Database not configured, using local storage only"}
    
    # Check if user exists
    existing = await users.find_one({"google_id": user_data.google_id})
    
    now = datetime.utcnow()
    
    if existing:
        # Update existing user
        await users.update_one(
            {"google_id": user_data.google_id},
            {"$set": {
                "email": user_data.email,
                "name": user_data.name,
                "picture": user_data.picture,
                "last_login": now
            }}
        )
        return {"status": "ok", "message": "User updated", "is_new": False}
    else:
        # Create new user
        new_user = {
            "google_id": user_data.google_id,
            "email": user_data.email,
            "name": user_data.name,
            "picture": user_data.picture,
            "created_at": now,
            "last_login": now,
            "brand_voice": None
        }
        await users.insert_one(new_user)
        return {"status": "ok", "message": "User created", "is_new": True}


@router.get("/me")
async def get_current_user(google_id: str):
    """Get current user's profile by Google ID."""
    users = users_collection()
    
    if users is None:
        raise HTTPException(status_code=503, detail="Database not configured")
    
    user = await users.find_one({"google_id": google_id})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Remove MongoDB _id for JSON serialization
    user.pop("_id", None)
    return user


@router.put("/me/brand-voice")
async def update_brand_voice(google_id: str, brand_voice: BrandVoice):
    """Update user's brand voice settings."""
    users = users_collection()
    
    if users is None:
        raise HTTPException(status_code=503, detail="Database not configured")
    
    result = await users.update_one(
        {"google_id": google_id},
        {"$set": {"brand_voice": brand_voice.model_dump()}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {"status": "ok", "message": "Brand voice updated"}


@router.get("/me/brand-voice")
async def get_brand_voice(google_id: str):
    """Get user's brand voice settings."""
    users = users_collection()
    
    if users is None:
        return {"brand_voice": None}
    
    user = await users.find_one({"google_id": google_id}, {"brand_voice": 1})
    
    if not user:
        return {"brand_voice": None}
    
    return {"brand_voice": user.get("brand_voice")}


@router.post("/me/generations")
async def save_generation(google_id: str, record: GenerationRecord):
    """Save a generation to user's history."""
    generations = generations_collection()
    
    if generations is None:
        return {"status": "ok", "message": "Database not configured, not saving"}
    
    doc = {
        "google_id": google_id,
        "type": record.type,
        "input_data": record.input_data,
        "output_data": record.output_data,
        "created_at": record.created_at
    }
    
    await generations.insert_one(doc)
    return {"status": "ok", "message": "Generation saved"}


@router.get("/me/generations")
async def get_generations(google_id: str, limit: int = 20):
    """Get user's generation history."""
    generations = generations_collection()
    
    if generations is None:
        return {"generations": []}
    
    cursor = generations.find(
        {"google_id": google_id}
    ).sort("created_at", -1).limit(limit)
    
    results = []
    async for doc in cursor:
        doc.pop("_id", None)
        results.append(doc)
    
    return {"generations": results}
