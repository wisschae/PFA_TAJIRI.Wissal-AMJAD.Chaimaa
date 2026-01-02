import psycopg2

try:
    conn = psycopg2.connect(
        dbname="hybrid_access_db",
        user="postgres",
        password="postgres",
        host="localhost",
        port="5432"
    )
    cursor = conn.cursor()
    
    print("Connected to database")
    print()
    
    # Check all users
    cursor.execute("SELECT id, email, full_name, access_level_id, active FROM users ORDER BY id")
    users = cursor.fetchall()
    
    print("Users in database:")
    for user in users:
        print(f"  ID: {user[0]}, Email: {user[1]}, Name: {user[2]}, Level: {user[3]}, Active: {user[4]}")
    
    print()
    print("Total users:", len(users))
    
    cursor.close()
    conn.close()
    
except Exception as e:
    print(f"Error: {e}")
