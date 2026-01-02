import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeneratePasswordHash {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "password123";
        String hash = encoder.encode(password);
        
        System.out.println("Password: " + password);
        System.out.println("BCrypt Hash: " + hash);
        System.out.println();
        System.out.println("SQL UPDATE:");
        System.out.println("UPDATE users SET password = '" + hash + "' WHERE email = 'admin@hybridaccess.com';");
    }
}
