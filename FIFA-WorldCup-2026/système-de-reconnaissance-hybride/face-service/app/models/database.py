"""
Database models for face embeddings storage.
"""
from sqlalchemy import Column, String, Text, DateTime, Integer
from sqlalchemy.sql import func
from app.database import Base
import uuid


class FaceEmbedding(Base):
    """
    Model to store face embeddings for users.
    Each user has one face embedding (unique constraint on user_id).
    """
    __tablename__ = "face_embeddings"
    
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(255), unique=True, nullable=False, index=True)
    embedding = Column(Text, nullable=False)  # JSON string of float list
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
    
    def __repr__(self):
        return f"<FaceEmbedding(user_id='{self.user_id}', id='{self.id}')>"
