"""
API router for face recognition endpoints.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db, engine
from app.models.schemas import (
    FaceEnrollRequest,
    FaceEnrollResponse,
    FaceVerifyRequest,
    FaceVerifyResponse
)
from app.services import face_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/health")
async def health_check(db: Session = Depends(get_db)):
    """
    Health check endpoint.
    Verifies that the service is running and database is connected.
    """
    try:
        # Simple DB connectivity check
        db.execute("SELECT 1")
        db_connected = True
    except Exception as e:
        logger.error(f"Database connection check failed: {str(e)}")
        db_connected = False
    
    return {
        "status": "ok" if db_connected else "degraded",
        "db_connected": db_connected
    }


@router.post("/enroll", response_model=FaceEnrollResponse)
async def enroll_face(
    request: FaceEnrollRequest,
    db: Session = Depends(get_db)
):
    """
    Enroll a user's face by storing their facial embedding.
    
    If the user already has an enrolled face, it will be updated.
    """
    try:
        logger.info(f"Enrolling face for user: {request.userId}")
        
        embedding_id = face_service.enroll_face(
            user_id=request.userId,
            image_base64=request.imageBase64,
            db=db
        )
        
        return FaceEnrollResponse(
            success=True,
            message="Face enrolled successfully",
            embeddingId=embedding_id
        )
    
    except ValueError as e:
        logger.error(f"Validation error during enrollment: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    
    except Exception as e:
        logger.error(f"Unexpected error during enrollment: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error during face enrollment")


@router.post("/verify", response_model=FaceVerifyResponse)
async def verify_face(
    request: FaceVerifyRequest,
    db: Session = Depends(get_db)
):
    """
    Verify if a face image matches the enrolled face for a user.
    
    AUTO-ENROLLMENT: If this is the first verification for a user with no enrolled face,
    the face will be automatically enrolled and verification will succeed.
    
    Returns match status, confidence score, auto-enrollment flag, and descriptive message.
    """
    try:
        logger.info(f"Verifying face for user: {request.userId}")
        
        # Service now returns 4-tuple: (match, confidence, autoEnrolled, message)
        match, confidence, auto_enrolled, message = face_service.verify_face(
            user_id=request.userId,
            image_base64=request.imageBase64,
            db=db
        )
        
        return FaceVerifyResponse(
            match=match,
            confidence=confidence,
            autoEnrolled=auto_enrolled,
            message=message
        )
    
    except ValueError as e:
        logger.error(f"Validation error during verification: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    
    except Exception as e:
        logger.error(f"Unexpected error during verification: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error during face verification")
