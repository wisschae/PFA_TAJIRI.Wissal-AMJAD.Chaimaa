-- =====================================================
-- World Cup 2026 - MFA System - Demo Data
-- =====================================================

-- =====================================================
-- 1. NIVEAUX D'ACCÈS (Access Levels)
-- CRITICAL: Access level MFA requirements per spec:
-- L1 PUBLIC: Password only
-- L2 CONFIDENTIEL: Password + FACE ID
-- L3 SECRET: Password + OTP
-- L4 TOP_SECRET: Password + OTP + FACE ID
-- =====================================================
INSERT INTO access_levels (id, name, description, priority_level, password_required, otp_required, biometric_required) VALUES
(1, 'PUBLIC', 'World Cup Fan Access - Password only', 1, true, false, false),
(2, 'CONFIDENTIEL', 'VIP & Staff Access - Password + Face ID', 2, true, false, true),
(3, 'SECRET', 'Operations Access - Password + OTP', 3, true, true, false),
(4, 'TOP_SECRET', 'Security Control - Password + OTP + Face ID', 4, true, true, true);

-- =====================================================
-- 2. CHAIMAA DEMO USERS
-- Password for all: "Wc2026@Demo!"
-- BCrypt hash: $2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO
-- =====================================================
INSERT INTO users (id, email, password, full_name, active, access_level_id, failed_login_attempts, created_at, updated_at) VALUES
(1, 'chaimaa.admin@wc2026.com', '$2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO', 'Chaimaa Amjad - Admin', true, 4, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'chaimaa.ops@wc2026.com', '$2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO', 'Chaimaa Amjad - Operations', true, 3, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'chaimaa.staff@wc2026.com', '$2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO', 'Chaimaa Amjad - Staff', true, 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'chaimaa.fan@wc2026.com', '$2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO', 'Chaimaa Amjad - Fan', true, 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- =====================================================
-- 3. WORLD CUP 2026 RESOURCES
-- =====================================================
INSERT INTO resources (id, name, description, resource_path, is_sensitive, min_access_level_id) VALUES
-- Level 1 PUBLIC resources
(1, 'WC2026 FanZone Live', 'Live match updates and fan zone access', '/wc2026/fanzone/live', false, 1),
(2, 'WC2026 Predictions', 'Match predictions and fantasy league', '/wc2026/predictions', false, 1),

-- Level 2 CONFIDENTIEL resources  
(3, 'WC2026 Ticket Reservations', 'VIP ticket booking and reservations', '/wc2026/tickets/reservations', true, 2),
(4, 'WC2026 VIP Hospitality', 'VIP hospitality and lounge access', '/wc2026/vip/hospitality', true, 2),

-- Level 3 SECRET resources
(5, 'WC2026 Team Travel', 'Team travel coordination and logistics', '/wc2026/ops/team-travel', true, 3),
(6, 'WC2026 Stadium Operations', 'Stadium operations and security coordination', '/wc2026/ops/stadium', true, 3),

-- Level 4 TOP_SECRET resources
(7, 'WC2026 Security Control Room', 'Master security control and monitoring', '/wc2026/security/control-room', true, 4),
(8, 'WC2026 Crypto Vault', 'Cryptographic keys and secure communications', '/wc2026/security/crypto-vault', true, 4);

-- =====================================================
-- 4. SAMPLE ACCESS EVENTS (Optional for demo)
-- =====================================================
INSERT INTO access_events (id, user_id, resource_id, access_time, status, method_used, ip_address, user_agent, risk_score, failure_reason) VALUES
-- Successful access
(1, 4, 1, CURRENT_TIMESTAMP - INTERVAL '1 hour', 'GRANTED', 'PASSWORD', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 5, NULL),
(2, 3, 3, CURRENT_TIMESTAMP - INTERVAL '2 hours', 'GRANTED', 'PASSWORD+FACE', '192.168.1.105', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 15, NULL),
(3, 2, 5, CURRENT_TIMESTAMP - INTERVAL '3 hours', 'GRANTED', 'PASSWORD+OTP', '192.168.1.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 20, NULL),
(4, 1, 7, CURRENT_TIMESTAMP - INTERVAL '4 hours', 'GRANTED', 'PASSWORD+OTP+FACE', '192.168.1.115', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 10, NULL),

-- Denied access
(5, 4, 7, CURRENT_TIMESTAMP - INTERVAL '30 minutes', 'DENIED', 'PASSWORD', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 85, 'Insufficient access level');

-- =====================================================
-- Réinitialiser les séquences pour éviter les conflits
-- =====================================================
SELECT setval('access_levels_id_seq', (SELECT MAX(id) FROM access_levels));
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('resources_id_seq', (SELECT MAX(id) FROM resources));
SELECT setval('access_events_id_seq', (SELECT MAX(id) FROM access_events));
