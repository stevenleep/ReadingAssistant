import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json';

export default defineManifest({
  name: packageData.displayName,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    '16': 'img/logo-16.png',
    '32': 'img/logo-34.png',
    '48': 'img/logo-48.png',
    '128': 'img/logo-128.png',
  },
  options_page: 'options.html',
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/content/index.ts'],
      css: ['content.css'],
      run_at: 'document_end',
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    }
  ],
  permissions: [
    "tabs",
    "bookmarks"
  ],
  chrome_url_overrides: {
    newtab: 'newtab.html',
  }
})
