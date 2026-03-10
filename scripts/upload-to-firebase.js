const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const fs = require('fs');
const path = require('path');

const firebaseConfig = {
  apiKey: "AIzaSyD4MQ7rLPoX5qk0EV4MWQ3VFuAVkMKZQsY",
  authDomain: "petals-5913d.firebaseapp.com",
  projectId: "petals-5913d",
  storageBucket: "petals-5913d.firebasestorage.app",
  messagingSenderId: "703000103151",
  appId: "1:703000103151:web:76788ac8f4f67ef908f31a",
  measurementId: "G-8X0CFX2HYZ"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const baseDir = path.join(__dirname, '../public/Photo Slides');

async function uploadFile(localPath, firebasePath) {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const storageRef = ref(storage, firebasePath);
    
    // Determine content type
    const ext = path.extname(localPath).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.gif') contentType = 'image/gif';
    if (ext === '.webp') contentType = 'image/webp';
    
    await uploadBytes(storageRef, fileBuffer, { contentType });
    const url = await getDownloadURL(storageRef);
    console.log(`✓ Uploaded: ${firebasePath}`);
    return url;
  } catch (error) {
    console.error(`✗ Failed: ${firebasePath}`, error.message);
    throw error;
  }
}

async function uploadFolder(folderName) {
  const folderPath = path.join(baseDir, folderName);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`Skipping ${folderName} - folder not found`);
    return;
  }
  
  const files = fs.readdirSync(folderPath).filter(f => {
    const ext = path.extname(f).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.heic'].includes(ext);
  });
  
  console.log(`\n📁 Uploading ${folderName} (${files.length} files)...`);
  
  for (const file of files) {
    const localPath = path.join(folderPath, file);
    const firebasePath = `experiences/${folderName}/${file}`;
    
    try {
      await uploadFile(localPath, firebasePath);
    } catch (error) {
      console.error(`  Failed to upload ${file}`);
    }
  }
}

async function main() {
  const folders = [
    'Backyard BBQ',
    'Christmas',
    'Easter',
    'Game Night',
    'Outdoor Soiree',
    'Thanksgiving',
    'Weddings',
    'Wine & Cheese'
  ];
  
  console.log('🚀 Starting upload to Firebase...\n');
  
  for (const folder of folders) {
    await uploadFolder(folder);
  }
  
  console.log('\n✅ Upload complete!');
}

main().catch(console.error);
