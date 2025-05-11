const fs = require('fs');
const https = require('https');
const path = require('path');

// Create the products directory if it doesn't exist
const productsDir = path.join(__dirname, '../public/assets/products');
if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Product images to download (using placeholder images for now)
const productImages = [
  { name: 'gaming-pc.jpg', url: 'https://source.unsplash.com/random/600x400?gaming-pc' },
  { name: 'keyboard.jpg', url: 'https://source.unsplash.com/random/600x400?mechanical-keyboard' },
  { name: 'monitor.jpg', url: 'https://source.unsplash.com/random/600x400?gaming-monitor' },
  { name: 'processor.jpg', url: 'https://source.unsplash.com/random/600x400?computer-processor' },
  { name: 'gpu.jpg', url: 'https://source.unsplash.com/random/600x400?graphics-card' },
  { name: 'ssd.jpg', url: 'https://source.unsplash.com/random/600x400?ssd' },
  { name: 'ram.jpg', url: 'https://source.unsplash.com/random/600x400?ram-memory' },
  { name: 'motherboard.jpg', url: 'https://source.unsplash.com/random/600x400?motherboard' },
  { name: 'case.jpg', url: 'https://source.unsplash.com/random/600x400?computer-case' },
];

// Function to download a file
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
}

// Download all images
async function downloadAllImages() {
  console.log('Starting image download...');
  
  for (const img of productImages) {
    const filepath = path.join(productsDir, img.name);
    try {
      console.log(`Downloading ${img.name}...`);
      await downloadImage(img.url, filepath);
      console.log(`✅ Downloaded ${img.name}`);
    } catch (error) {
      console.error(`❌ Error downloading ${img.name}:`, error.message);
    }
  }
  
  console.log('All downloads completed!');
}

// Run the download
downloadAllImages().catch(console.error);
