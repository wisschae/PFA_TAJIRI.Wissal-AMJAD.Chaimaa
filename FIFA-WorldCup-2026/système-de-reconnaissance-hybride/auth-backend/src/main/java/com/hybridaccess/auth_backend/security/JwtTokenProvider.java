package com.hybridaccess.auth_backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * Provider pour générer et valider les tokens JWT.
 */
@Component
@Slf4j
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    /**
     * Génère un token JWT à partir de l'authentification.
     */
    public String generateToken(Authentication authentication, com.hybridaccess.auth_backend.repository.UserRepository userRepository) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        com.hybridaccess.auth_backend.entity.User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return generateTokenFromUsername(userDetails.getUsername(), user);
    }

    /**
     * Génère un token JWT à partir d'un username (email).
     * ✅ Enrichi avec des claims pour le niveau d'accès (Phase E).
     */
    public String generateTokenFromUsername(String username, com.hybridaccess.auth_backend.entity.User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject(username)
                .claim("priorityLevel", user.getAccessLevel().getPriorityLevel())  // ✅ Claim niveau
                .claim("levelName", user.getAccessLevel().getName())                // ✅ Claim nom
                .claim("userId", user.getId())                                       // ✅ Claim ID user
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Génère un token JWT avec des claims MFA (utilisé après MFA completion).
     * ✅ Inclut: mfaFactors, mfaCompleted, levelPriority, levelName
     * 
     * @param user L'utilisateur authentifié
     * @param verifiedFactors Les facteurs MFA vérifiés (e.g., ["FACE", "OTP"])
     * @return JWT token final avec claims MFA
     */
    public String generateTokenWithMfaClaims(com.hybridaccess.auth_backend.entity.User user, java.util.Set<String> verifiedFactors) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("userId", user.getId())
                .claim("priorityLevel", user.getAccessLevel().getPriorityLevel())
                .claim("levelName", user.getAccessLevel().getName())
                .claim("mfaFactors", verifiedFactors)                              // ✅ MFA factors verified
                .claim("mfaCompleted", true)                                       // ✅ MFA completion flag
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extrait le username (email) du token JWT.
     */
    public String getUsernameFromToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return claims.getSubject();
    }

    /**
     * Valide le token JWT.
     */
    public boolean validateToken(String token) {
        try {
            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            
            return true;
        } catch (Exception e) {
            log.error("JWT validation error: {}", e.getMessage());
            return false;
        }
    }
}
