import bcrypt

# Test password hash
password = b'Wc2026@Demo!'
stored_hash = b'$2b$10$ZkTlHtaGRH74RFgJGRwZTukDZl62Wws4O2jNl7NvuaQcRaTa4pVrO'

# Verify
if bcrypt.checkpw(password, stored_hash):
    print("✓ Password verification SUCCESSFUL")
    print(f"  Password: {password.decode()}")
    print(f"  Hash: {stored_hash.decode()}")
else:
    print("✗ Password verification FAILED")
    
# Generate new one to compare
new_hash = bcrypt.hashpw(password, bcrypt.gensalt(rounds=10))
print(f"\nNew hash generated: {new_hash.decode()}")
print(f"Matches stored: {bcrypt.checkpw(password, new_hash)}")
