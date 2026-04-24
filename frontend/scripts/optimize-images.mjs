/**
 * Compress raster assets in public/ for smaller dist uploads.
 * Run: npm run optimize:images
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const shotDir = path.join(root, 'public', 'assets', 'img', 'projects_screenshot')

if (fs.existsSync(shotDir)) {
  for (const f of fs.readdirSync(shotDir)) {
    if (!f.toLowerCase().endsWith('.png')) continue
    const inPath = path.join(shotDir, f)
    const outPath = inPath.replace(/\.png$/i, '.webp')
    await sharp(inPath)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(outPath)
    fs.unlinkSync(inPath)
    console.log('webp:', path.relative(root, outPath))
  }
}

const wedprofJpg = path.join(root, 'public', 'wedprof.jpg')
if (fs.existsSync(wedprofJpg)) {
  await sharp(wedprofJpg)
    .resize({ width: 960, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(path.join(root, 'public', 'wedprof.webp'))
  console.log('webp: public/wedprof.webp')
}
