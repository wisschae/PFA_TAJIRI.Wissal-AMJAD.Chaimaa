"""
Configuration settings for the face recognition service.
"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Database
    DATABASE_URL: str = "sqlite:///./face_embeddings.db"
    
    # Face Recognition Parameters
    EMBEDDING_THRESHOLD: float = 25.0  # Very relaxed for maximum usability
    IMAGE_SIZE: int = 64
    
    # Server Configuration
    HOST: str = "0.0.0.0"
    PORT: int = 8001
    DEBUG: bool = True
    
    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000,http://localhost:8080"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Singleton settings instance
settings = Settings()
