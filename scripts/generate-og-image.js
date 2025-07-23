import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple OG image generation using HTML Canvas API simulation
// This creates a simple OG image template that can be used for social sharing

const generateOGImageHTML = () => {
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .container {
            text-align: center;
            color: white;
            padding: 60px;
            max-width: 800px;
        }
        .logo {
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
            font-size: 32px;
            font-weight: bold;
            backdrop-filter: blur(10px);
        }
        .title {
            font-size: 56px;
            font-weight: 700;
            margin-bottom: 20px;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .subtitle {
            font-size: 28px;
            font-weight: 400;
            opacity: 0.9;
            line-height: 1.4;
        }
        .background-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.1;
            background-image: 
                radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, white 2px, transparent 2px);
            background-size: 60px 60px;
        }
    </style>
</head>
<body>
    <div class="background-pattern"></div>
    <div class="container">
        <div class="logo">IW</div>
        <div class="title">InfloWave</div>
        <div class="subtitle">Modern Time-Series Database Management Tool</div>
    </div>
</body>
</html>
  `;
};

// Create the public directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write the OG image HTML template
const ogImagePath = path.join(publicDir, 'og-image-template.html');
fs.writeFileSync(ogImagePath, generateOGImageHTML());

console.log('OG image template generated at:', ogImagePath);
console.log('To convert to image, you can use tools like puppeteer or take a screenshot at 1200x630 resolution');