// Turns the Vite build in dist/ into ONE self-contained HTML file that opens
// by double-click (file://) — scripts, styles, fonts and favicon all inlined.
// Usage: npm run build:standalone
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const outFile = join(root, 'Adrian-Lee-Portfolio.html')

const mime = { '.woff2': 'font/woff2', '.woff': 'font/woff', '.svg': 'image/svg+xml', '.png': 'image/png' }
const dataUri = (file) => `data:${mime[extname(file)] ?? 'application/octet-stream'};base64,${readFileSync(file).toString('base64')}`

let html = readFileSync(join(dist, 'index.html'), 'utf8')

// Stylesheets → <style>, with font/image URLs inlined as data URIs
html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/g, (_, href) => {
  const cssDir = dirname(join(dist, href))
  const css = readFileSync(join(dist, href), 'utf8').replace(/url\(([^)]+)\)/g, (m, u) => {
    const clean = u.replace(/["']/g, '')
    if (clean.startsWith('data:') || clean.startsWith('http') || clean.startsWith('#')) return m
    return `url(${dataUri(join(cssDir, clean))})`
  })
  return `<style>${css}</style>`
})

// Module script → inline module script
html = html.replace(/<script type="module"[^>]*src="\.\/(assets\/[^"]+\.js)"[^>]*><\/script>/g, (_, src) => {
  const js = readFileSync(join(dist, src), 'utf8').replace(/<\/script/gi, '<\\/script')
  return `<script type="module">${js}</script>`
})

// Favicon
html = html.replace(/href="\.\/favicon\.svg"/, `href="${dataUri(join(dist, 'favicon.svg'))}"`)

if (/(src|href)="\.\/assets\//.test(html)) throw new Error('Some assets were not inlined')

writeFileSync(outFile, html)
console.log(`✓ Standalone file written: ${outFile} (${(Buffer.byteLength(html) / 1024).toFixed(0)} kB)`)
