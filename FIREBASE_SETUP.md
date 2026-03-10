# Firebase Storage Setup

## 1. Storage Rules

Go to Firebase Console > Storage > Rules and set:

```rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

**IMPORTANT**: For production, replace with secure rules:
```rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /experiences/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 2. CORS Configuration

Run this in your terminal (requires gsutil):

```bash
gsutil cors set cors.json gs://petals-5913d.firebasestorage.app
```

Create `cors.json`:
```json
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600
  }
]
```

## 3. Upload Existing Photos

### Option A: Run the Node Script

```bash
cd scripts
npm init -y
npm install firebase
node upload-to-firebase.js
```

### Option B: Manual Upload via Firebase Console

1. Go to https://console.firebase.google.com
2. Navigate to Storage
3. Click "Upload folder"
4. Select your `public/Photo Slides` folder
5. Ensure the folder structure is:
   ```
   experiences/
   ├── Backyard BBQ/
   ├── Christmas/
   ├── Easter/
   ├── Game Night/
   ├── Outdoor Soiree/
   ├── Thanksgiving/
   ├── Weddings/
   └── Wine & Cheese/
   ```

## 4. Enable Authentication (Optional but Recommended)

If you want to secure uploads:

1. Go to Firebase Console > Authentication
2. Enable "Email/Password" provider
3. Create a user account for yourself
4. Update storage rules to require auth

## Troubleshooting

### "Permission Denied" Error
- Check storage rules are set correctly
- Ensure rules are published (not just saved as draft)

### CORS Errors
- Run the CORS configuration command above
- Wait 5-10 minutes for propagation

### Upload Stuck on Loading
- Check browser console for errors
- Verify Firebase config is correct
- Ensure storage bucket name matches exactly
