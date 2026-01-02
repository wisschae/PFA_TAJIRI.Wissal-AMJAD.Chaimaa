-- Quick script to manually insert users if data.sql didn't load
-- Database: hybridaccessdb

-- Delete old data first
DELETE FROM access_events WHERE id IN (1,2,3,4,5);
DELETE FROM resources WHERE id IN (1,2,3,4,5,6,7,8);
DELETE FROM users WHERE id IN (1,2,3,4);
DELETE FROM access_levels WHERE id IN (1,2,3,4);

-- Insert access levels with correct MFA requirements
INSERT INTO access_levels (id, name, description, priority_level, password_required, otp_required, biometric_required) VALUES
(1, 'PUBLIC', 'World Cup Fan Access - Password only', 1, true, false, false),
(2, 'CONFIDENTIEL', 'VIP & Staff Access - Password + Face ID', 2, true, false, true),
 (3, 'SECRET', 'Operations Access - Password + OTP', 3, true, true, false),
(4, 'TOP_SECRET', 'Security Control - Password + OTP + Face ID', 4, true, true, true);

-- Insert Chaimaa demo users with BCrypt hash for "Wc2026@Demo!"
INSERT INTO users (id, email, password, full_name, active, access_level_id, failed_login_attempts, created_at, updated_at) VALUES
(1, 'chaimaa.admin@wc2026.com', '$2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO', 'Chaimaa Amjad - Admin', true, 4, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'chaimaa.ops@wc2026.com', '$2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO', 'Chaimaa Amjad - Operations', true, 3, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'chaimaa.staff@wc2026.com', '$2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO', 'Chaimaa Amjad - Staff', true, 2, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'chaimaa.fan@wc2026.com', '$2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO', 'Chaimaa Amjad - Fan', true, 1, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert World Cup 2026 resources
INSERT INTO resources (id, name, description, resource_path, is_sensitive, min_access_level_id) VALUES
(1, 'WC2026 FanZone Live', 'Live match updates and fan zone access', '/wc2026/fanzone/live', false, 1),
(2, 'WC2026 Predictions', 'Match predictions and fantasy league', '/wc2026/predictions', false, 1),
(3, 'WC2026 Ticket Reservations', 'VIP ticket booking and reservations', '/wc2026/tickets/reservations', true, 2),
(4, 'WC2026 VIP Hospitality', 'VIP hospitality and lounge access', '/wc2026/vip/hospitality', true, 2),
(5, 'WC2026 Team Travel', 'Team travel coordination and logistics', '/wc2026/ops/team-travel', true, 3),
(6, 'WC2026 Stadium Operations', 'Stadium operations and security coordination', '/wc2026/ops/stadium', true, 3),
(7, 'WC2026 Security Control Room', 'Master security control and monitoring', '/wc2026/security/control-room', true, 4),
(8, 'WC2026 Crypto Vault', 'Cryptographic keys and secure communications', '/wc2026/security/crypto-vault', true, 4);

-- Reset sequences
SELECT setval('access_levels_id_seq', 4);
SELECT setval('users_id_seq', 4);
SELECT setval('resources_id_seq', 8);
