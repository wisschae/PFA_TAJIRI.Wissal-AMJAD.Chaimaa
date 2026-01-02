package com.hybridaccess.auth_backend.client;

import com.hybridaccess.auth_backend.dto.face.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

/**
 * Client for communicating with the face-service microservice.
 */
@Slf4j
@Service
public class FaceServiceClient {
    
    private final RestTemplate restTemplate;
    private final String faceServiceUrl;
    
    public FaceServiceClient(
            RestTemplate restTemplate,
            @Value("${face-service.url:http://localhost:8001}") String faceServiceUrl) {
        this.restTemplate = restTemplate;
        this.faceServiceUrl = faceServiceUrl;
        log.info("FaceServiceClient initialized with URL: {}", faceServiceUrl);
    }
    
    /**
     * Enroll a user's face by sending their image to the face-service.
     *
     * @param userId User identifier
     * @param imageBase64 Base64-encoded face image
     * @return FaceEnrollResponse with success status
     * @throws RuntimeException if face-service is unavailable or returns error
     */
    public FaceEnrollResponse enrollFace(String userId, String imageBase64) {
        try {
            String url = faceServiceUrl + "/api/face/enroll";
            
            FaceEnrollRequest request = FaceEnrollRequest.builder()
                    .userId(userId)
                    .imageBase64(imageBase64)
                    .build();
            
            log.info("Enrolling face for user: {}", userId);
            
            ResponseEntity<FaceEnrollResponse> response = restTemplate.postForEntity(
                    url,
                    request,
                    FaceEnrollResponse.class
            );
            
            FaceEnrollResponse body = response.getBody();
            
            if (body != null && body.isSuccess()) {
                log.info("Face enrolled successfully for user: {}", userId);
                return body;
            } else {
                log.error("Face enrollment failed for user: {}", userId);
                throw new RuntimeException("Face enrollment failed");
            }
            
        } catch (RestClientException e) {
            log.error("Error communicating with face-service during enrollment: {}", e.getMessage());
            throw new RuntimeException("Face service unavailable, please try later", e);
        }
    }
    
    /**
     * Verify a face image against the enrolled face for a user.
     *
     * @param userId User identifier
     * @param imageBase64 Base64-encoded face image to verify
     * @return FaceVerifyResponse with match result and confidence
     * @throws RuntimeException if face-service is unavailable or returns error
     */
    public FaceVerifyResponse verifyFace(String userId, String imageBase64) {
        try {
            String url = faceServiceUrl + "/api/face/verify";
            
            FaceVerifyRequest request = FaceVerifyRequest.builder()
                    .userId(userId)
                    .imageBase64(imageBase64)
                    .build();
            
            log.info("Verifying face for user: {}", userId);
            
            ResponseEntity<FaceVerifyResponse> response = restTemplate.postForEntity(
                    url,
                    request,
                    FaceVerifyResponse.class
            );
            
            FaceVerifyResponse body = response.getBody();
            
            if (body != null) {
                log.info("Face verification result for user {}: match={}, confidence={}",
                        userId, body.isMatch(), body.getConfidence());
                return body;
            } else {
                log.error("Face verification returned null response for user: {}", userId);
                throw new RuntimeException("Invalid response from face service");
            }
            
        } catch (RestClientException e) {
            log.error("Error communicating with face-service during verification: {}", e.getMessage());
            throw new RuntimeException("Face service unavailable, please try later", e);
        }
    }
    
    /**
     * Check if face-service is healthy.
     *
     * @return true if service is reachable and healthy
     */
    public boolean isHealthy() {
        try {
            String url = faceServiceUrl + "/api/face/health";
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getStatusCode().is2xxSuccessful();
        } catch (Exception e) {
            log.warn("Face service health check failed: {}", e.getMessage());
            return false;
        }
    }
}
