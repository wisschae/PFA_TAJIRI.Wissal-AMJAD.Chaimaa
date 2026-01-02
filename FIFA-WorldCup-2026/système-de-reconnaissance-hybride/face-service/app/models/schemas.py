"""
Pydantic schemas for API request/response validation.
"""
from pydantic import BaseModel, Field
from typing import Optional


class FaceEnrollRequest(BaseModel):
    """Request schema for face enrollment."""
    userId: str = Field(..., description="User ID (email or identifier)")
    imageBase64: str = Field(..., description="Base64-encoded image string")


class FaceEnrollResponse(BaseModel):
    """Response schema for face enrollment."""
    success: bool = Field(..., description="Whether enrollment was successful")
    message: str = Field(..., description="Human-readable message")
    embeddingId: Optional[str] = Field(None, description="ID of the stored embedding")


class FaceVerifyRequest(BaseModel):
    """Request schema for face verification."""
    userId: str = Field(..., description="User ID to verify against")
    imageBase64: str = Field(..., description="Base64-encoded image to verify")


class FaceVerifyResponse(BaseModel):
    """Response schema for face verification."""
    match: bool = Field(..., description="Whether the face matches")
    confidence: float = Field(..., description="Confidence score (0-1)")
    autoEnrolled: bool = Field(False, description="Whether user was auto-enrolled during this verification")
    message: str = Field(..., description="Human-readable result message")
