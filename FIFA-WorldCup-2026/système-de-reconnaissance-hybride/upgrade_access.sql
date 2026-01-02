-- Script pour élever le niveau d'accès de test@test.com
-- De PUBLIC → TOP_SECRET

-- Vérification du niveau actuel
SELECT u.email, u.full_name, al.name as access_level, al.priority_level
FROM users u
JOIN access_levels al ON u.access_level_id = al.id
WHERE u.email = 'test@test.com';

-- Mise à jour vers TOP_SECRET (level 4)
UPDATE users
SET access_level_id = (SELECT id FROM access_levels WHERE priority_level = 4)
WHERE email = 'test@test.com';

-- Vérification après mise à jour
SELECT u.email, u.full_name, al.name as access_level, al.priority_level
FROM users u
JOIN access_levels al ON u.access_level_id = al.id
WHERE u.email = 'test@test.com';
