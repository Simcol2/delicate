// Run this with: node scripts/create-admin.js admin@delicateflowers.com YourPassword123

const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Read the service account key
let serviceAccount;
try {
  serviceAccount = require('./scripts/serviceAccountKey.json');
} catch (e) {
  try {
    serviceAccount = require('./serviceAccountKey.json');
  } catch (e2) {
    console.error('❌ Could not find serviceAccountKey.json');
    console.error('Make sure you saved it in scripts/ folder as serviceAccountKey.json');
    process.exit(1);
  }
}

// Initialize with explicit project ID
initializeApp({
  credential: cert(serviceAccount),
  projectId: 'petals-5913d'  // Your Firebase project ID
});

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('❌ Usage: node scripts/create-admin.js <email> <password>');
  console.error('Example: node scripts/create-admin.js admin@delicateflowers.com MyPass123!');
  process.exit(1);
}

async function createAdmin() {
  try {
    const user = await getAuth().createUser({
      email: email,
      password: password,
      displayName: 'Admin'
    });
    console.log('✅ Admin user created successfully!');
    console.log('Email:', email);
    console.log('UID:', user.uid);
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('ℹ️  User already exists. You can sign in now.');
    } else if (error.code === 'auth/invalid-password') {
      console.error('❌ Password must be at least 6 characters');
    } else {
      console.error('❌ Error:', error.message);
      console.error('Code:', error.code);
    }
  }
  process.exit(0);
}

createAdmin();
