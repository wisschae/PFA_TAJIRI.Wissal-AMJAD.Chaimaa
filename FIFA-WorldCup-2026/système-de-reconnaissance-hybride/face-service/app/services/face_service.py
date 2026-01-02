"""
Core face recognition service with simplified embedding algorithm.
Uses: Resize → Grayscale → Normalize → Flatten → Euclidean Distance
"""
import base64
import re
import json
import numpy as np
import cv2
from typing import List, Tuple
from sqlalchemy.orm import Session
from app.models.database import FaceEmbedding
from app.config import settings
import logging

logger = logging.getLogger(__name__)


def decode_base64_image(base64_str: str) -> np.ndarray:
    """
    Decode a base64-encoded image string to a numpy array.
    
    Args:
        base64_str: Base64-encoded image (may include data URI prefix)
        
    Returns:
        numpy array representing the image in BGR format (OpenCV default)
        
    Raises:
        ValueError: If the base64 string is invalid or cannot be decoded
    """
    try:
        # Remove data URI prefix if present (e.g., "data:image/png;base64,")
        if ',' in base64_str:
            base64_str = base64_str.split(',', 1)[1]
        
        # Decode base64 to bytes
        image_bytes = base64.b64decode(base64_str)
        
        # Convert bytes to numpy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        
        # Decode image
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise ValueError("Failed to decode image from base64")
            
        return image
    
    except Exception as e:
        logger.error(f"Error decoding base64 image: {str(e)}")
        raise ValueError(f"Invalid base64 image: {str(e)}")


def generate_embedding(image: np.ndarray) -> List[float]:
    """
    Generate a face embedding from an image using simplified algorithm.
    
    Pipeline:
    1. Convert to grayscale
    2. Resize to IMAGE_SIZE x IMAGE_SIZE
    3. Normalize pixel values to [0, 1]
    4. Flatten to 1D vector
    
    Args:
        image: Input image as numpy array (BGR format)
        
    Returns:
        List of floats representing the embedding vector
    """
    try:
        # Convert to grayscale
        if len(image.shape) == 3:
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        else:
            gray = image
        
        # Resize to standard size
        size = settings.IMAGE_SIZE
        resized = cv2.resize(gray, (size, size), interpolation=cv2.INTER_AREA)
        
        # Normalize to [0, 1]
        normalized = resized.astype(np.float32) / 255.0
        
        # Flatten to 1D vector
        flattened = normalized.flatten()
        
        # Convert to Python list for JSON serialization
        embedding = flattened.tolist()
        
        logger.info(f"Generated embedding of size {len(embedding)}")
        return embedding
    
    except Exception as e:
        logger.error(f"Error generating embedding: {str(e)}")
        raise ValueError(f"Failed to generate embedding: {str(e)}")


def compute_distance(emb1: List[float], emb2: List[float]) -> float:
    """
    Compute Euclidean distance between two embeddings.
    
    Args:
        emb1: First embedding vector
        emb2: Second embedding vector
        
    Returns:
        Euclidean distance between the two vectors
    """
    try:
        arr1 = np.array(emb1)
        arr2 = np.array(emb2)
        
        # Ensure same dimensions
        if arr1.shape != arr2.shape:
            raise ValueError(f"Embedding dimensions don't match: {arr1.shape} vs {arr2.shape}")
        
        # Compute Euclidean distance
        distance = np.linalg.norm(arr1 - arr2)
        
        return float(distance)
    
    except Exception as e:
        logger.error(f"Error computing distance: {str(e)}")
        raise ValueError(f"Failed to compute distance: {str(e)}")


def compute_confidence(distance: float, threshold: float) -> float:
    """
    Convert distance to confidence score in [0, 1] range.
    
    Lower distance → higher confidence
    Distance of 0 → confidence of 1.0
    Distance >= threshold → confidence near 0
    
    Args:
        distance: Euclidean distance between embeddings
        threshold: Maximum allowed distance for a match
        
    Returns:
        Confidence score between 0 and 1
    """
    # Simple linear mapping
    # confidence = max(0, 1 - (distance / threshold))
    # 
    # Better: exponential decay for smoother curve
    confidence = np.exp(-distance / (threshold / 2))
    
    return min(1.0, max(0.0, float(confidence)))


def enroll_face(user_id: str, image_base64: str, db: Session) -> str:
    """
    Enroll a user's face by storing their embedding.
    
    If an embedding already exists for this user, it will be updated.
    
    Args:
        user_id: Unique user identifier (email or ID)
        image_base64: Base64-encoded image of the user's face
        db: Database session
        
    Returns:
        ID of the stored embedding
        
    Raises:
        ValueError: If image is invalid or embedding generation fails
    """
    try:
        # Decode and generate embedding
        image = decode_base64_image(image_base64)
        embedding = generate_embedding(image)
        
        # Serialize embedding to JSON
        embedding_json = json.dumps(embedding)
        
        # Check if user already has an embedding
        existing = db.query(FaceEmbedding).filter(FaceEmbedding.user_id == user_id).first()
        
        if existing:
            # Update existing embedding
            existing.embedding = embedding_json
            db.commit()
            db.refresh(existing)
            logger.info(f"Updated face embedding for user {user_id}")
            return existing.id
        else:
            # Create new embedding
            face_emb = FaceEmbedding(
                user_id=user_id,
                embedding=embedding_json
            )
            db.add(face_emb)
            db.commit()
            db.refresh(face_emb)
            logger.info(f"Created new face embedding for user {user_id}")
            return face_emb.id
    
    except Exception as e:
        db.rollback()
        logger.error(f"Error enrolling face for user {user_id}: {str(e)}")
        raise


def verify_face(user_id: str, image_base64: str, db: Session) -> Tuple[bool, float, bool, str]:
    """
    Verify if a face image matches the enrolled face for a user.
    
    AUTO-ENROLLMENT: If no face is enrolled for this user, the first verification
    will automatically enroll the provided face and return a successful match.
    
    Args:
        user_id: User identifier to verify against
        image_base64: Base64-encoded image to verify
        db: Database session
        
    Returns:
        Tuple of (match: bool, confidence: float, autoEnrolled: bool, message: str)
        
    Raises:
        ValueError: If image is invalid or embedding generation fails
    """
    try:
        # Check if user has an enrolled face
        stored_emb = db.query(FaceEmbedding).filter(FaceEmbedding.user_id == user_id).first()
        
        # === AUTO-ENROLLMENT LOGIC ===
        if not stored_emb:
            logger.info(f"No face enrolled for user {user_id}. Auto-enrolling...")
            
            # Decode and generate embedding for the new face
            image = decode_base64_image(image_base64)
            embedding = generate_embedding(image)
            
            # Serialize embedding to JSON
            embedding_json = json.dumps(embedding)
            
            # Create new embedding entry
            face_emb = FaceEmbedding(
                user_id=user_id,
                embedding=embedding_json
            )
            db.add(face_emb)
            db.commit()
            db.refresh(face_emb)
            
            logger.info(f"✅ First face enrolled automatically for user {user_id}")
            
            # Return success with autoEnrolled flag
            return (
                True,  # match
                1.0,   # confidence (perfect match since it's the same image)
                True,  # autoEnrolled
                "First face enrolled and verified for this user."
            )
        
        # === NORMAL VERIFICATION LOGIC ===
        # Generate embedding from current image
        image = decode_base64_image(image_base64)
        current_embedding = generate_embedding(image)
        
        # Load stored embedding
        stored_embedding = json.loads(stored_emb.embedding)
        
        # Compute distance
        distance = compute_distance(current_embedding, stored_embedding)
        
        # Compute confidence
        threshold = settings.EMBEDDING_THRESHOLD
        confidence = compute_confidence(distance, threshold)
        
        # Determine match
        match = distance < threshold
        
        if match:
            message = f"Face verified successfully (distance: {distance:.4f}, confidence: {confidence:.2f})"
        else:
            message = f"Face does not match stored embedding (distance: {distance:.4f}, confidence: {confidence:.2f})"
        
        logger.info(f"Face verification for user {user_id}: match={match}, distance={distance:.4f}")
        
        return (
            match,
            confidence,
            False,  # autoEnrolled (normal verification, not auto-enrollment)
            message
        )
    
    except Exception as e:
        logger.error(f"Error verifying face for user {user_id}: {str(e)}")
        raise
