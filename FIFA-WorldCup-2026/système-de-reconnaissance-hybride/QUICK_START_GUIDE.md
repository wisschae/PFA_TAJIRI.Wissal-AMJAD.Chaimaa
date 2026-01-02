# 🚀 Quick Start Guide - OTP Setup & Resource Access

## ✅ Servers Running
- **Backend**: http://localhost:8080 ✅
- **Frontend**: http://localhost:3000 ✅

## 📝 Step-by-Step Instructions

### Step 1: Login
1. Open browser: **http://localhost:3000/login**
2. Enter credentials:
   - Email: `test@test.com`
   - Password: `password123`
3. Click **SIGN IN**
4. ✅ Should go DIRECTLY to Dashboard (no MFA page)

### Step 2: Configure User (IMPORTANT!)
Once logged in, press **F12** to open browser console, then paste:

```javascript
const token = localStorage.getItem('token');

// Disable MFA
fetch('http://localhost:8080/api/v1/dev/mfa/disable?email=test@test.com', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer ' + token }
}).then(r => r.json()).then(d => console.log('✅ MFA disabled:', d));

// Set TOP_SECRET access
fetch('http://localhost:8080/api/v1/dev/mfa/upgrade-access?email=test@test.com&priorityLevel=4', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer ' + token }
}).then(r => r.json()).then(d => console.log('✅ Access level:', d));
```

Wait for 2 console messages showing success.

### Step 3: Fresh Login
1. Click **Sign Out** (top right)
2. Login again: `test@test.com` / `password123`
3. ✅ Goes to Dashboard without MFA

### Step 4: Setup Google Authenticator (OTP)
1. Navigate to: **http://localhost:3000/settings/otp**
2. Click **"START SETUP"** button
3. **QR Code should appear!**
4. Open Google Authenticator app on your phone
5. Scan the QR code
6. Enter the 6-digit code shown in the app
7. Click **"Verify & Enable"**
8. ✅ OTP is now configured!

### Step 5: Test Complete Flow
1. **Sign Out**
2. **Login** again
3. NOW you'll see the **MFA page**
4. Enter the 6-digit code from Google Authenticator
5. ✅ Access Dashboard!

### Step 6: Test All Resources
Click on each resource to verify access (you have TOP_SECRET level):

- ✅ Fan Zone (PUBLIC)
- ✅ Ticketing (PUBLIC)
- ✅ Operations (CONFIDENTIEL)
- ✅ Monitoring (CONFIDENTIEL)
- ✅ Clients DB (SECRET)
- ✅ Encryption Keys (SECRET)
- ✅ Source Code (TOP_SECRET)
- ✅ Confidential Docs (TOP_SECRET)

**ALL resources should be accessible!**

---

## 🆘 Troubleshooting

**If login shows "Connection failed":**
- Check backend is running: http://localhost:8080/actuator/health
- Should return: `{"status":"UP"}`

**If OTP page shows errors:**
- Make sure you ran Step 2 (configure user) in console
- Try logout/login again

**If resources show "Access Denied":**
- Run Step 2 again to set TOP_SECRET access
- Logout and login fresh

---

## 🎯 For Your Demo
You can demonstrate:
1. ✅ Login with password
2. ✅ OTP configuration (show QR code)
3. ✅ MFA verification (enter code from phone)
4. ✅ Access to all 8 resources (TOP_SECRET level)
5. ✅ Dashboard with stats

**Everything is ready!** 🎉
