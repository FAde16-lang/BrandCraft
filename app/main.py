"""
BizForge - GenAI-Powered Branding & Business Analytics Platform
Main FastAPI Application Entry Point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import get_settings
from app.routers import brand, content, chat, sentiment, design, logo, users
from app.database import connect_to_mongo, close_mongo_connection

# Get settings
settings = get_settings()


# Lifecycle events
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle manager."""
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()


# Initialize FastAPI application
app = FastAPI(
    title="BizForge API",
    description="GenAI-powered branding and business analytics platform for startups, creators, and small businesses.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from fastapi.staticfiles import StaticFiles

# Include API routers
app.include_router(brand.router, prefix=settings.api_prefix, tags=["Brand"])
app.include_router(content.router, prefix=settings.api_prefix, tags=["Content"])
app.include_router(chat.router, prefix=settings.api_prefix, tags=["Chat"])
app.include_router(sentiment.router, prefix=settings.api_prefix, tags=["Sentiment"])
app.include_router(design.router, prefix=settings.api_prefix, tags=["Design"])
app.include_router(logo.router, prefix=settings.api_prefix, tags=["Logo"])
app.include_router(users.router, prefix=settings.api_prefix, tags=["Users"])

# Export router (PDF generation)
from app.routers import export
app.include_router(export.router, prefix=settings.api_prefix, tags=["Export"])



@app.get("/api/config", tags=["Config"])
async def get_public_config():
    """Returns public configuration for frontend."""
    return {
        "google_client_id": settings.google_client_id
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint for monitoring."""
    return {
        "status": "healthy",
        "service": "BizForge API",
        "model": settings.model_name
    }

# Mount frontend static files
# This must be after API routes to avoid shadowing them
app.mount("/", StaticFiles(directory="d:/AIGEN/Project/frontend", html=True), name="frontend")



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
