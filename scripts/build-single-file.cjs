const fs = require('node:fs')
const path = require('node:path')

const projectRoot = path.join(__dirname, '..')
const distDirectory = path.join(projectRoot, 'dist')
const indexPath = path.join(distDirectory, 'index.html')
const outputPath = path.join(distDirectory, 'dashboard-mvp-preview.html')
const indexHtml = fs.readFileSync(indexPath, 'utf8')

function readBuiltAsset(assetPath) {
  const fileName = path.basename(assetPath)
  return fs.readFileSync(path.join(distDirectory, 'assets', fileName), 'utf8')
}

const withInlineScript = indexHtml.replace(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/,
  (_, source) => `<script type="module">${readBuiltAsset(source)}</script>`,
)

const withInlineStyles = withInlineScript.replace(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/,
  (_, source) => `<style>${readBuiltAsset(source)}</style>`,
)

const favicon = fs.readFileSync(path.join(distDirectory, 'favicon.svg')).toString('base64')
const standaloneHtml = withInlineStyles.replace(
  /href="\/dashboard_mvp\/favicon\.svg"/,
  `href="data:image/svg+xml;base64,${favicon}"`,
)

fs.writeFileSync(outputPath, standaloneHtml)
console.log(`Generated ${outputPath}`)
