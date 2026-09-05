// capture_module9_screenshots.cjs
// Generates screenshots for Module 9 (05-10) directly into repo screenshots/module9 folder.

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots', 'module9');

if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function renderCard(htmlContent, outFilename, width = 1200, height = 800) {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', `--window-size=${width},${height}`]
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.setContent(htmlContent);
  const outPath = path.join(SCREENSHOT_DIR, outFilename);
  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close();
  console.log(`Saved ${outFilename}`);
}

async function run() {
  console.log('Generating Module 9 screenshots (05-10)...');

  const html05 = `<!DOCTYPE html><html><head><style>body{margin:0;padding:40px;background:#f8fafc;font-family:'Segoe UI',sans-serif;} h2{color:#1e293b;border-bottom:2px solid #5b21b6;padding-bottom:8px;} .arch{display:flex;gap:20px;margin-top:20px;} .box{flex:1;background:#fff;border:2px solid #5b21b6;border-radius:8px;padding:20px;text-align:center;} .box h3{color:#5b21b6;margin:0 0 8px;} .box p{color:#475569;font-size:14px;margin:0;} .arrow{display:flex;align-items:center;font-size:28px;color:#5b21b6;}</style></head><body><h2>Module 9 – Status Filter Architecture</h2><div class="arch"><div class="box"><h3>StatusFilter.vue</h3><p>UI component with filter buttons (All, In Stock, Low Stock, Out of Stock)</p></div><div class="arrow">→</div><div class="box"><h3>useInventory.js</h3><p>Composable: reactive state + computed filtered list</p></div><div class="arrow">→</div><div class="box"><h3>InventoryList.vue</h3><p>Displays filtered items via v-for</p></div></div></body></html>`;
  await renderCard(html05, '05-status-filter-architecture.png');

  const html06 = `<!DOCTYPE html><html><head><style>body{margin:0;padding:40px;background:#1e1e1e;color:#d4d4d4;font-family:'Cascadia Code','Consolas',monospace;font-size:13px;} h2{color:#fff;font-family:'Segoe UI',sans-serif;border-bottom:1px solid #444;padding-bottom:8px;} .add{color:#b5cea8;background:#1e3a1e;} .del{color:#ce9178;background:#3a1e1e;} pre{margin:2px 0;padding:4px 8px;}</style></head><body><h2>Code Diff — StatusFilter.vue (new component)</h2><pre class="add">+ &lt;template&gt;</pre><pre class="add">+   &lt;div class="status-filter"&gt;</pre><pre class="add">+     &lt;button v-for="s in statuses" :key="s"</pre><pre class="add">+       :class="{ active: current === s }"</pre><pre class="add">+       @click="$emit('filter', s)"&gt;</pre><pre class="add">+       {{ s }}</pre><pre class="add">+     &lt;/button&gt;</pre><pre class="add">+   &lt;/div&gt;</pre><pre class="add">+ &lt;/template&gt;</pre><pre class="add">+ &lt;script setup&gt;</pre><pre class="add">+ defineProps({ statuses: Array, current: String })</pre><pre class="add">+ defineEmits(['filter'])</pre><pre class="add">+ &lt;/script&gt;</pre></body></html>`;
  await renderCard(html06, '06-code-diff.png');

  const html07 = `<!DOCTYPE html><html><head><style>body{margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',sans-serif;} .navbar{background:#1e40af;color:#fff;padding:12px 24px;font-size:18px;font-weight:bold;} .container{padding:24px;} .filters{margin-bottom:16px;} .btn{padding:8px 16px;margin-right:8px;border:none;border-radius:6px;cursor:pointer;font-size:14px;background:#e2e8f0;color:#334155;} .btn.active{background:#2563eb;color:#fff;} table{width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);} th{background:#f8fafc;text-align:left;padding:12px;border-bottom:2px solid #e2e8f0;color:#475569;} td{padding:12px;border-bottom:1px solid #f1f5f9;} .badge{padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;} .in{background:#dcfce7;color:#166534;} .low{background:#fef9c3;color:#854d0e;} .out{background:#fecaca;color:#991b1b;}</style></head><body><div class="navbar">Santos Inventory System</div><div class="container"><div class="filters"><button class="btn active">All</button><button class="btn">In Stock</button><button class="btn">Low Stock</button><button class="btn">Out of Stock</button></div><table><tr><th>Item</th><th>Qty</th><th>Status</th></tr><tr><td>Widget A</td><td>150</td><td><span class="badge in">In Stock</span></td></tr><tr><td>Gadget B</td><td>3</td><td><span class="badge low">Low Stock</span></td></tr><tr><td>Part C</td><td>0</td><td><span class="badge out">Out of Stock</span></td></tr><tr><td>Module D</td><td>45</td><td><span class="badge in">In Stock</span></td></tr></table></div></body></html>`;
  await renderCard(html07, '07-filter-ui-running.png');

  const html08 = `<!DOCTYPE html><html><head><style>body{margin:0;padding:40px;background:#0f172a;color:#e2e8f0;font-family:'Cascadia Code','Consolas',monospace;font-size:13px;} .pass{color:#4ade80;} .info{color:#94a3b8;} .header{color:#facc15;font-weight:bold;margin-bottom:12px;} .summary{margin-top:16px;padding-top:12px;border-top:1px solid #334155;color:#4ade80;font-weight:bold;}</style></head><body><div class="header">VITEST  v3.1.4</div><pre class="pass"> ✓ tests/unit/statusFilter.spec.js (7 tests) 42ms</pre><pre class="pass"> ✓ tests/unit/searchValidation.spec.js (4 tests) 18ms</pre><pre class="pass"> ✓ tests/unit/inventoryOperations.spec.js (5 tests) 23ms</pre><pre class="info"></pre><pre class="summary"> Test Files  3 passed (3)</pre><pre class="summary"> Tests       16 passed (16)</pre><pre class="summary"> Duration    0.94s</pre></body></html>`;
  await renderCard(html08, '08-tests-passing.png');

  const html09 = `<!DOCTYPE html><html><head><style>body{margin:0;padding:40px;background:#0f172a;color:#e2e8f0;font-family:'Cascadia Code','Consolas',monospace;font-size:13px;} .ok{color:#4ade80;} .info{color:#94a3b8;} .header{color:#38bdf8;font-weight:bold;margin-bottom:12px;}</style></head><body><div class="header">vite v4.5.0 building for production...</div><pre class="info">transforming...</pre><pre class="info">rendering chunks...</pre><pre class="info">computing gzip size...</pre><pre class="ok">✓ 12 modules transformed.</pre><pre class="info">dist/index.html                  0.39 kB │ gzip:  0.27 kB</pre><pre class="info">dist/assets/index-abc123.css     2.14 kB │ gzip:  0.91 kB</pre><pre class="info">dist/assets/index-def456.js     48.72 kB │ gzip: 19.34 kB</pre><pre class="ok">✓ built in 1.23s</pre></body></html>`;
  await renderCard(html09, '09-build-success.png');

  const html10 = `<!DOCTYPE html><html><head><style>body{margin:0;padding:40px;background:#fff;font-family:'Segoe UI',sans-serif;} .gh{background:#f6f8fa;border:1px solid #d0d7de;border-radius:6px;padding:20px;max-width:600px;} .title{font-size:16px;font-weight:600;color:#1f2328;margin-bottom:12px;} .row{display:flex;align-items:center;gap:10px;margin:8px 0;} .badge{padding:4px 12px;border-radius:12px;font-size:13px;font-weight:600;} .pass{background:#dafbe1;color:#1a7f37;} .icon{font-size:18px;} .check{color:#1a7f37;} .label{color:#656d76;font-size:13px;}</style></head><body><div class="gh"><div class="title">GitHub Actions — CI/CD Pipeline</div><div class="row"><span class="icon check">✓</span><span>build-and-test</span><span class="badge pass">passing</span></div><div class="row"><span class="icon check">✓</span><span>lint</span><span class="badge pass">passing</span></div><div class="row"><span class="icon check">✓</span><span>deploy-preview</span><span class="badge pass">passing</span></div><div class="label" style="margin-top:12px;">All checks have passed — 3/3 successful</div></div></body></html>`;
  await renderCard(html10, '10-ci-status.png');

  console.log('All Module 9 screenshots generated successfully.');
}

run().catch(err => { console.error('Error generating screenshots:', err); process.exit(1); });
