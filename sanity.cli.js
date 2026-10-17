const fs = require('fs')
const { defineCliConfig } = require('sanity/cli')

// Reads the project ID from .env.local so the CLI and the site use the same value.
let env = {}
try {
  fs.readFileSync('.env.local', 'utf8').split(/\r?\n/).forEach((l) => {
    const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/)
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  })
} catch {}

module.exports = defineCliConfig({
  api: {
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
})
