import { QRCodeSVG } from 'qrcode.react';

const ManualOTPSetup = () => {
    const secret = 'JBSWY3DPEHPK3PXP';
    const email = 'test@test.com';
    const appName = 'World%20Cup%202026';
    const qrUri = `otpauth://totp/${appName}:${email}?secret=${secret}&issuer=${appName}`;

    return (
        <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
            <h1>Manual OTP Setup</h1>

            <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h2>Step 1: Scan QR Code</h2>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <QRCodeSVG value={qrUri} size={256} level="H" />
                </div>
            </div>

            <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
                <h2>Step 2: Or Enter Manually</h2>
                <div style={{ background: 'white', padding: '15px', marginTop: '10px', borderRadius: '5px' }}>
                    <p><strong>Account:</strong> World Cup 2026 - test@test.com</p>
                    <p><strong>Secret Key:</strong> <code style={{ background: '#eee', padding: '5px 10px', fontSize: '16px' }}>{secret}</code></p>
                    <p><strong>Type:</strong> Time based</p>
                </div>
            </div>

            <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '10px' }}>
                <h2>Step 3: Enable in Database</h2>
                <p>Run this PowerShell command:</p>
                <pre style={{ background: '#263238', color: '#aed581', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
                    {`$env:PGPASSWORD='postgres'; & 'C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe' -U postgres -d hybrid_access_db -c "UPDATE users SET otp_secret='JBSWY3DPEHPK3PXP', otp_enabled=true WHERE email='test@test.com';"`}
                </pre>
            </div>

            <div style={{ marginTop: '20px', padding: '15px', background: '#c8e6c9', borderRadius: '10px' }}>
                <h3>✅ After Setup:</h3>
                <ol>
                    <li>Logout from website</li>
                    <li>Login: test@test.com / password123</li>
                    <li>Enter 6-digit code from Google Authenticator</li>
                    <li>Done!</li>
                </ol>
            </div>
        </div>
    );
};

export default ManualOTPSetup;
