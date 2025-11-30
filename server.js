const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set proper MIME types for AR.js marker files
express.static.mime.define({
  'application/octet-stream': ['fset', 'fset3', 'iset']
});

// Serve static files with CORS headers for AR.js
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files from current directory
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    // Set proper content type for GLB files
    if (filePath.endsWith('.glb')) {
      res.setHeader('Content-Type', 'model/gltf-binary');
    }
    // Set proper content type for GLTF files
    if (filePath.endsWith('.gltf')) {
      res.setHeader('Content-Type', 'model/gltf+json');
    }
  }
}));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`EXODUS 2157 AR Experience running on port ${PORT}`);
  console.log(`Open https://your-render-url.onrender.com on your mobile device`);
});
