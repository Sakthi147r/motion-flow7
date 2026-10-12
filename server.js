import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve dist/ production directory if it exists, otherwise fall back to project root
const distDir = path.resolve(__dirname, 'dist');
const staticDir = fs.existsSync(distDir) ? distDir : __dirname;

app.use(express.static(staticDir));

// Fallback to index.html for client-side routing
app.use((req, res, next) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    res.sendFile(path.join(staticDir, 'index.html'));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`Serving directory: ${staticDir}`);
});
