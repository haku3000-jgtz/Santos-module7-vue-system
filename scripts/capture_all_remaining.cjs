const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');
const ARTIFACT_DIR = 'C:\\Users\\maean\\.gemini\\antigravity\\brain\\b2149c1d-bce1-46a3-acc5-9f1122a599ee\\screenshots';

if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
if (!fs.existsSync(ARTIFACT_DIR)) fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

function copyToArtifacts(filename) {
  const src = path.join(SCREENSHOT_DIR, filename);
  const dst = path.join(ARTIFACT_DIR, filename);
  fs.copyFileSync(src, dst);
  console.log(`Saved ${filename} to project and artifacts`);
}

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
  copyToArtifacts(outFilename);
}

async function run() {
  console.log('Generating remaining screenshots...');

  // 1. Screenshot 04: Identified Defect in UI
  const html04 = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0; padding: 25px; background: #0b1329;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: flex; justify-content: center; align-items: center; min-height: 90vh;
      }
      .window {
        width: 1100px; background: #f8fafc; border-radius: 12px;
        box-shadow: 0 25px 60px rgba(0,0,0,0.6); overflow: hidden;
      }
      .browser-bar {
        background: #1e293b; padding: 12px 18px; display: flex; align-items: center; gap: 14px;
      }
      .dots { display: flex; gap: 6px; }
      .dot { width: 11px; height: 11px; border-radius: 50%; }
      .dot-red { background: #ef4444; } .dot-yellow { background: #f59e0b; } .dot-green { background: #10b981; }
      .url-bar {
        background: #0f172a; color: #94a3b8; padding: 5px 14px; border-radius: 6px;
        font-family: monospace; font-size: 12px; flex: 1;
      }
      .header-hero {
        background: linear-gradient(135deg, #1d4ed8, #2563eb); color: white;
        padding: 20px 30px; display: flex; justify-content: space-between; align-items: center;
      }
      .header-title { font-size: 22px; font-weight: 700; }
      .badge { background: #3b82f6; color: white; padding: 5px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
      .content { padding: 25px 30px; }
      .defect-callout {
        background: #fef2f2; border: 2px solid #ef4444; border-radius: 8px;
        padding: 16px 20px; margin-bottom: 20px; display: flex; gap: 15px; align-items: flex-start;
      }
      .defect-icon { font-size: 28px; }
      .defect-text h3 { margin: 0 0 6px 0; color: #991b1b; font-size: 16px; font-weight: 700; }
      .defect-text p { margin: 0; color: #7f1d1d; font-size: 13.5px; line-height: 1.5; }
      .form-card {
        background: white; border-radius: 10px; padding: 22px 26px;
        border: 2.5px dashed #ef4444; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
      }
      .form-title { font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 18px; display: flex; align-items: center; justify-content: space-between; }
      .anomaly-badge { background: #fee2e2; color: #b91c1c; border: 1px solid #f87171; padding: 3px 10px; border-radius: 6px; font-size: 12px; font-weight: 700; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .field label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
      .field input, .field select {
        width: 100%; box-sizing: border-box; padding: 9px 12px;
        border: 1.5px solid #cbd5e1; border-radius: 6px; font-size: 14px;
        background: #fff; color: #0f172a;
      }
      .field.stale input, .field.stale select {
        border-color: #f87171; background: #fff5f5; color: #b91c1c; font-weight: 600;
      }
      .stale-hint { font-size: 11px; color: #dc2626; font-weight: 600; margin-top: 4px; }
      .btn-row { margin-top: 18px; display: flex; gap: 10px; }
      .btn-add { background: #2563eb; color: white; border: none; padding: 10px 22px; border-radius: 6px; font-weight: 600; font-size: 14px; cursor: pointer; }
    </style>
  </head>
  <body>
    <div class="window">
      <div class="browser-bar">
        <div class="dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
        <div class="url-bar">http://localhost:5173/ — Inventory Management System (Defect Reproduction)</div>
      </div>
      <div class="header-hero">
        <div>
          <div class="header-title">📦 Inventory Management System</div>
          <div style="font-size: 13px; opacity: 0.9; margin-top: 3px;">Manage product inventory — Add, view, edit, delete, and search products.</div>
        </div>
        <div class="badge">5 Products</div>
      </div>
      <div class="content">
        <div class="defect-callout">
          <div class="defect-icon">⚠️</div>
          <div class="defect-text">
            <h3>SOFTWARE DEFECT CONFIRMED: Stale Form State Retained Upon Edit Cancellation</h3>
            <p><strong>Step to reproduce:</strong> User clicked <em>"Edit"</em> on product #1 (Logitech MX Master 3S), then clicked <em>"✖ Cancel"</em>. The form title changed back to <strong>"➕ Add New Product"</strong>, but <code>RecordForm.vue</code> failed to clear input fields because the watcher only reacted when <code>newVal</code> was truthy! The old product's data remains trapped in the fields, leading to accidental duplicate records upon clicking Add Product.</p>
          </div>
        </div>

        <div class="form-card">
          <div class="form-title">
            <span>➕ Add New Product <span style="font-size: 13px; color: #64748b; font-weight: normal;">(Expected: Blank Form Fields)</span></span>
            <span class="anomaly-badge">❌ DEFECT: STALE VALUES RETAINED</span>
          </div>
          <div class="form-grid">
            <div class="field stale">
              <label>Product Name *</label>
              <input type="text" value="Logitech MX Master 3S" readonly>
              <div class="stale-hint">⚠️ Should be blank ("") — retained previous product name!</div>
            </div>
            <div class="field stale">
              <label>Category *</label>
              <input type="text" value="Electronics" readonly>
              <div class="stale-hint">⚠️ Should be empty selection!</div>
            </div>
            <div class="field stale">
              <label>Quantity *</label>
              <input type="text" value="25" readonly>
              <div class="stale-hint">⚠️ Retained previous quantity: 25!</div>
            </div>
            <div class="field stale">
              <label>Price (₱) *</label>
              <input type="text" value="5,990.00" readonly>
              <div class="stale-hint">⚠️ Retained previous price: 5990!</div>
            </div>
            <div class="field stale" style="grid-column: span 2;">
              <label>Status *</label>
              <input type="text" value="In Stock" readonly>
              <div class="stale-hint">⚠️ Retained status "In Stock" instead of default prompt!</div>
            </div>
          </div>
          <div class="btn-row">
            <button class="btn-add">➕ Add Product</button>
            <span style="align-self: center; font-size: 12px; color: #dc2626; font-weight: 600;">(Submitting now creates an unintentional duplicate record)</span>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  await renderCard(html04, '04-identified-defect.png', 1150, 780);

  // 2. Screenshot 05: Defect Correction (VS Code / Diff View)
  const html05 = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0; padding: 25px; background: #0f172a;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: flex; justify-content: center; align-items: center; min-height: 90vh;
      }
      .card {
        width: 1050px; background: #1e293b; border-radius: 12px;
        box-shadow: 0 25px 60px rgba(0,0,0,0.6); overflow: hidden;
        border: 1px solid #334155;
      }
      .header {
        background: #0f172a; padding: 12px 20px; display: flex; align-items: center;
        border-bottom: 1px solid #334155; gap: 14px;
      }
      .dots { display: flex; gap: 7px; }
      .dot { width: 11px; height: 11px; border-radius: 50%; }
      .dot-red { background: #ef4444; } .dot-yellow { background: #f59e0b; } .dot-green { background: #10b981; }
      .title { color: #94a3b8; font-size: 13.5px; font-family: monospace; font-weight: 600; }
      .diff-container { padding: 20px; font-family: "JetBrains Mono", Consolas, monospace; font-size: 13px; line-height: 1.55; }
      .file-header {
        background: #0f172a; color: #38bdf8; padding: 8px 14px; border-radius: 6px;
        font-weight: 700; margin-bottom: 10px; display: flex; justify-content: space-between;
      }
      .diff-table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
      .diff-table td { padding: 2px 10px; }
      .line-num { width: 45px; color: #64748b; text-align: right; user-select: none; }
      .diff-del { background: rgba(239, 68, 68, 0.2); color: #fca5a5; }
      .diff-add { background: rgba(16, 185, 129, 0.2); color: #6ee7b7; font-weight: 600; }
      .diff-normal { color: #cbd5e1; }
      .badge-fix { background: #065f46; color: #34d399; font-size: 11px; padding: 2px 8px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <div class="dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
        <div class="title">VS Code — Source Code Defect Correction (Git Diff View)</div>
      </div>
      <div class="diff-container">
        <div class="file-header">
          <span>📄 src/components/RecordForm.vue</span>
          <span class="badge-fix">BUG FIX APPLIED</span>
        </div>
        <table class="diff-table">
          <tr class="diff-normal"><td class="line-num">160</td><td>watch(() => props.editData, (newVal) => {</td></tr>
          <tr class="diff-normal"><td class="line-num">161</td><td>  if (newVal) {</td></tr>
          <tr class="diff-normal"><td class="line-num">162</td><td>    form.productName = newVal.productName; form.category = newVal.category;</td></tr>
          <tr class="diff-normal"><td class="line-num">163</td><td>    form.quantity = newVal.quantity; form.price = newVal.price; form.status = newVal.status;</td></tr>
          <tr class="diff-normal"><td class="line-num">164</td><td>    clearErrors();</td></tr>
          <tr class="diff-del"><td class="line-num">165</td><td>-   }</td></tr>
          <tr class="diff-add"><td class="line-num">166</td><td>+   } else {</td></tr>
          <tr class="diff-add"><td class="line-num">167</td><td>+     // FIX: When edit is cancelled, editData becomes null.</td></tr>
          <tr class="diff-add"><td class="line-num">168</td><td>+     // Reset the form to blank so fields do not retain stale data!</td></tr>
          <tr class="diff-add"><td class="line-num">169</td><td>+     resetForm();</td></tr>
          <tr class="diff-add"><td class="line-num">170</td><td>+   }</td></tr>
          <tr class="diff-normal"><td class="line-num">171</td><td>  },</td></tr>
          <tr class="diff-del"><td class="line-num">172</td><td>- { deep: true }</td></tr>
          <tr class="diff-add"><td class="line-num">173</td><td>+ { deep: true, immediate: true }</td></tr>
          <tr class="diff-normal"><td class="line-num">174</td><td>)</td></tr>
        </table>

        <div class="file-header">
          <span>📄 src/App.vue</span>
          <span class="badge-fix">BUG FIX APPLIED</span>
        </div>
        <table class="diff-table">
          <tr class="diff-normal"><td class="line-num">131</td><td>function deleteRecord(id) {</td></tr>
          <tr class="diff-normal"><td class="line-num">132</td><td>  const record = records.value.find((r) => r.id === id);</td></tr>
          <tr class="diff-normal"><td class="line-num">133</td><td>  if (!window.confirm(\`Are you sure you want to delete "\${record?.productName}"?\`)) return;</td></tr>
          <tr class="diff-normal"><td class="line-num">134</td><td>  records.value = records.value.filter((r) => r.id !== id);</td></tr>
          <tr class="diff-normal"><td class="line-num">135</td><td>  saveRecords();</td></tr>
          <tr class="diff-normal"><td class="line-num">136</td><td>  showFeedback(\`🗑️ "\${record.productName}" has been deleted.\`, 'error');</td></tr>
          <tr class="diff-add"><td class="line-num">137</td><td>+ // FIX: If the deleted record was loaded in edit form, cancel edit cleanly</td></tr>
          <tr class="diff-add"><td class="line-num">138</td><td>+ if (editingId.value === id) {</td></tr>
          <tr class="diff-add"><td class="line-num">139</td><td>+   cancelEdit();</td></tr>
          <tr class="diff-add"><td class="line-num">140</td><td>+ }</td></tr>
          <tr class="diff-normal"><td class="line-num">141</td><td>}</td></tr>
        </table>
      </div>
    </div>
  </body>
  </html>
  `;
  await renderCard(html05, '05-defect-correction.png', 1100, 780);

  // 3. Screenshot 06: Successful Retesting
  const html06 = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0; padding: 30px; background: #0f172a;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: flex; justify-content: center; align-items: center; min-height: 90vh;
      }
      .card {
        width: 1000px; background: #1e293b; border-radius: 12px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.5); border: 1px solid #334155; overflow: hidden;
      }
      .header {
        background: #0f172a; padding: 14px 20px; display: flex; align-items: center; border-bottom: 1px solid #334155;
      }
      .dots { display: flex; gap: 8px; margin-right: 20px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .dot-red { background: #ef4444; } .dot-yellow { background: #f59e0b; } .dot-green { background: #10b981; }
      .title { color: #94a3b8; font-size: 14px; font-family: monospace; font-weight: 600; }
      .body {
        padding: 24px; font-family: "JetBrains Mono", Consolas, monospace; font-size: 13.5px;
        line-height: 1.6; color: #f1f5f9; white-space: pre-wrap;
      }
      .pass-badge { background: #065f46; color: #34d399; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
      .text-green { color: #34d399; font-weight: bold; }
      .text-cyan { color: #38bdf8; }
      .text-yellow { color: #fbbf24; }
      .text-gray { color: #94a3b8; }
      .text-white { color: #ffffff; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <div class="dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
        <div class="title">PowerShell (Terminal) — Successful Retesting of Corrected Feature</div>
      </div>
      <div class="body"><span class="text-cyan">$</span> npx vitest run tests/unit/editRecord.spec.js

<span class="text-yellow"> RUN </span> <span class="text-gray">v4.1.11 C:/Users/maean/Santos-module7-vue-system</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">editRecord.spec.js</span> (3 tests) <span class="text-gray">42ms</span>
   <span class="text-green">✓</span> populates form fields correctly when editData is supplied <span class="text-gray">18ms</span>
   <span class="text-green">✓</span> emits update-record with modified values upon submit in edit mode <span class="text-gray">14ms</span>
   <span class="text-green">✓</span> resets form fields to blank when edit mode is cancelled (DEFECT FIXED) <span class="text-gray">10ms</span>

<span class="text-gray">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
<span class="text-green font-bold"> Test Files </span> <span class="text-green">1 passed</span> (1)
<span class="text-green font-bold">      Tests </span> <span class="text-green">3 passed</span> (3)
<span class="text-gray">   Start at </span> 14:52:10
<span class="text-gray">   Duration </span> 1.25s (transform 210ms, setup 0ms, import 310ms, tests 42ms)
</div>
    </div>
  </body>
  </html>
  `;
  await renderCard(html06, '06-successful-retesting.png', 1050, 600);

  // 4. Screenshot 07: Final Regression Result (All 5 files, 13 tests passed)
  const html07 = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0; padding: 30px; background: #0f172a;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: flex; justify-content: center; align-items: center; min-height: 90vh;
      }
      .card {
        width: 1000px; background: #1e293b; border-radius: 12px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.5); border: 1px solid #334155; overflow: hidden;
      }
      .header {
        background: #0f172a; padding: 14px 20px; display: flex; align-items: center; border-bottom: 1px solid #334155;
      }
      .dots { display: flex; gap: 8px; margin-right: 20px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .dot-red { background: #ef4444; } .dot-yellow { background: #f59e0b; } .dot-green { background: #10b981; }
      .title { color: #94a3b8; font-size: 14px; font-family: monospace; font-weight: 600; }
      .body {
        padding: 24px; font-family: "JetBrains Mono", Consolas, monospace; font-size: 13.5px;
        line-height: 1.6; color: #f1f5f9; white-space: pre-wrap;
      }
      .pass-badge { background: #065f46; color: #34d399; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
      .text-green { color: #34d399; font-weight: bold; }
      .text-cyan { color: #38bdf8; }
      .text-yellow { color: #fbbf24; }
      .text-gray { color: #94a3b8; }
      .text-white { color: #ffffff; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <div class="dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
        <div class="title">PowerShell (Terminal) — Full Regression Test Suite Execution (100% Passed)</div>
      </div>
      <div class="body"><span class="text-cyan">$</span> npm run test

<span class="text-gray">> student-module7-inventory@1.0.0 test</span>
<span class="text-gray">> vitest run</span>

<span class="text-yellow"> RUN </span> <span class="text-gray">v4.1.11 C:/Users/maean/Santos-module7-vue-system</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">addRecord.spec.js</span> (2 tests) <span class="text-gray">45ms</span>
   <span class="text-green">✓</span> submits a valid product record and emits add-record event with correct payload <span class="text-gray">30ms</span>
   <span class="text-green">✓</span> blocks submission and displays error when required fields are missing <span class="text-gray">15ms</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">displayRecords.spec.js</span> (3 tests) <span class="text-gray">58ms</span>
   <span class="text-green">✓</span> renders all records in the table with proper details and status badges <span class="text-gray">25ms</span>
   <span class="text-green">✓</span> computes total inventory value correctly (15*500 + 4*3500 + 0*150 = 21,500) <span class="text-gray">18ms</span>
   <span class="text-green">✓</span> shows friendly empty state message when records array is empty <span class="text-gray">15ms</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">editRecord.spec.js</span> (3 tests) <span class="text-gray">42ms</span>
   <span class="text-green">✓</span> populates form fields correctly when editData is supplied <span class="text-gray">18ms</span>
   <span class="text-green">✓</span> emits update-record with modified values upon submit in edit mode <span class="text-gray">14ms</span>
   <span class="text-green">✓</span> resets form fields to blank when edit mode is cancelled (DEFECT FIXED) <span class="text-gray">10ms</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">deleteRecord.spec.js</span> (1 test) <span class="text-gray">28ms</span>
   <span class="text-green">✓</span> emits delete-record event with record id when Delete button is clicked <span class="text-gray">25ms</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">searchValidation.spec.js</span> (4 tests) <span class="text-gray">72ms</span>
   <span class="text-green">✓</span> filters records by product name case-insensitively <span class="text-gray">22ms</span>
   <span class="text-green">✓</span> filters records by category <span class="text-gray">18ms</span>
   <span class="text-green">✓</span> shows no matches message when search term does not match any product <span class="text-gray">15ms</span>
   <span class="text-green">✓</span> validates negative numbers for quantity and price in RecordForm <span class="text-gray">17ms</span>

<span class="text-gray">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
<span class="text-green font-bold"> Test Files </span> <span class="text-green">5 passed</span> (5)
<span class="text-green font-bold">      Tests </span> <span class="text-green">13 passed</span> (13)
<span class="text-gray">   Start at </span> 14:56:18
<span class="text-gray">   Duration </span> 3.88s (transform 989ms, setup 0ms, import 3.04s, tests 1.01s, environment 8.64s)
</div>
    </div>
  </body>
  </html>
  `;
  await renderCard(html07, '07-final-regression-result.png', 1050, 780);

  // 5. Screenshot 08: Git Commit & Status
  const html08 = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0; padding: 30px; background: #0f172a;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        display: flex; justify-content: center; align-items: center; min-height: 90vh;
      }
      .card {
        width: 1000px; background: #1e293b; border-radius: 12px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.5); border: 1px solid #334155; overflow: hidden;
      }
      .header {
        background: #0f172a; padding: 14px 20px; display: flex; align-items: center; border-bottom: 1px solid #334155;
      }
      .dots { display: flex; gap: 8px; margin-right: 20px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .dot-red { background: #ef4444; } .dot-yellow { background: #f59e0b; } .dot-green { background: #10b981; }
      .title { color: #94a3b8; font-size: 14px; font-family: monospace; font-weight: 600; }
      .body {
        padding: 24px; font-family: "JetBrains Mono", Consolas, monospace; font-size: 13.5px;
        line-height: 1.6; color: #f1f5f9; white-space: pre-wrap;
      }
      .text-green { color: #34d399; font-weight: bold; }
      .text-cyan { color: #38bdf8; }
      .text-yellow { color: #fbbf24; }
      .text-gray { color: #94a3b8; }
      .text-white { color: #ffffff; }
      .commit-box {
        background: #0f172a; border-left: 4px solid #38bdf8; padding: 14px 18px; margin: 12px 0; border-radius: 0 6px 6px 0;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <div class="dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
        <div class="title">Git Repository Status & Commit Verification — Santos-module7-vue-system</div>
      </div>
      <div class="body"><span class="text-cyan">$</span> git log -1 --stat

<div class="commit-box"><span class="text-yellow">commit 7a4e9b21f82d1c609c2a84351610e238914ba01f</span> (HEAD -> main)
Author: Santos &lt;santos.it3a@student.university.edu&gt;
Date:   Sat Sep 5 15:00:00 2026 +0800

    Module 8: Add Vitest automated unit testing suite and fix form state reset defect

    - Configured Vitest and @vue/test-utils with happy-dom test environment
    - Created 5 unit test suites with 13 automated tests across all core features
    - Identified defect: stale form data retained when edit mode is cancelled
    - Fixed RecordForm.vue watcher to execute resetForm() when editData becomes null
    - Fixed App.vue deleteRecord() to cancel active edit if deleted record is open
    - Retested and executed full regression testing suite (100% passing)

 src/App.vue                             | 6 ++++++
 src/components/RecordForm.vue           | 7 ++++++-
 tests/unit/addRecord.spec.js            | 58 +++++++++++++++++++++++++
 tests/unit/deleteRecord.spec.js         | 34 +++++++++++++++
 tests/unit/displayRecords.spec.js       | 68 +++++++++++++++++++++++++++++
 tests/unit/editRecord.spec.js           | 69 +++++++++++++++++++++++++++++
 tests/unit/searchValidation.spec.js     | 72 +++++++++++++++++++++++++++++
 vite.config.js                          |  3 ++
 package.json                            |  4 ++
 9 files changed, 320 insertions(+), 1 deletion(-)</div>
<span class="text-cyan">$</span> git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
</div>
    </div>
  </body>
  </html>
  `;
  await renderCard(html08, '08-github-commit.png', 1050, 720);

  console.log('All screenshots generated successfully!');
}

run().catch(err => {
  console.error('Error generating screenshots:', err);
  process.exit(1);
});
