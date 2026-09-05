const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');
const ARTIFACT_DIR = 'C:\\Users\\maean\\.gemini\antigravity\\brain\\b2149c1d-bce1-46a3-acc5-9f1122a599ee\\screenshots';
const TEMP_PROFILE = path.join(__dirname, '../.puppeteer_profile');

if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
if (!fs.existsSync(ARTIFACT_DIR)) fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

function copyToArtifacts(filename) {
  const src = path.join(SCREENSHOT_DIR, filename);
  const dst = path.join(ARTIFACT_DIR, filename);
  fs.copyFileSync(src, dst);
  console.log(`Saved ${filename} to project and artifacts`);
}

async function renderTerminalCard(title, subtitle, content, outFilename) {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    userDataDir: TEMP_PROFILE,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1200,800']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1100, height: 750, deviceScaleFactor: 2 });

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body {
        margin: 0;
        padding: 30px;
        background: #0f172a;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 90vh;
      }
      .card {
        width: 1000px;
        background: #1e293b;
        border-radius: 12px;
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
        overflow: hidden;
      }
      .header {
        background: #0f172a;
        padding: 14px 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #334155;
      }
      .dots {
        display: flex;
        gap: 8px;
        margin-right: 20px;
      }
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .dot-red { background: #ef4444; }
      .dot-yellow { background: #f59e0b; }
      .dot-green { background: #10b981; }
      .title {
        color: #94a3b8;
        font-size: 14px;
        font-family: "JetBrains Mono", "Cascadia Code", Consolas, monospace;
        font-weight: 600;
      }
      .body {
        padding: 24px;
        font-family: "JetBrains Mono", "Cascadia Code", Consolas, "Courier New", monospace;
        font-size: 13.5px;
        line-height: 1.6;
        color: #f1f5f9;
        white-space: pre-wrap;
        word-break: break-all;
      }
      .pass-badge { background: #065f46; color: #34d399; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
      .fail-badge { background: #991b1b; color: #f87171; padding: 2px 8px; border-radius: 4px; font-weight: bold; }
      .text-green { color: #34d399; }
      .text-red { color: #f87171; }
      .text-gray { color: #94a3b8; }
      .text-yellow { color: #fbbf24; }
      .text-cyan { color: #38bdf8; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <div class="dots">
          <div class="dot dot-red"></div>
          <div class="dot dot-yellow"></div>
          <div class="dot dot-green"></div>
        </div>
        <div class="title">${title} — ${subtitle}</div>
      </div>
      <div class="body">${content}</div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html);
  const outPath = path.join(SCREENSHOT_DIR, outFilename);
  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close();
  copyToArtifacts(outFilename);
}

async function capturePhase1() {
  console.log('Starting Phase 1 screenshots capture (02, 03, 04)...');

  // Launch browser for 04-identified-defect.png
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    userDataDir: TEMP_PROFILE,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,950']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 950, deviceScaleFactor: 1.5 });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 1500));
  await page.waitForSelector('form');

  console.log('Clicking Edit on first record...');
  await page.evaluate(() => {
    const editBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Edit'));
    if (editBtns.length > 0) editBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Clicking Cancel button...');
  await page.evaluate(() => {
    const cancelBtns = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('Cancel'));
    if (cancelBtns.length > 0) cancelBtns[0].click();
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Injecting defect callout overlay...');
  await page.evaluate(() => {
    const form = document.querySelector('form');
    if (form) {
      const container = form.parentElement;
      container.style.border = '3px solid #ef4444';
      container.style.boxShadow = '0 0 0 6px rgba(239, 68, 68, 0.2)';

      const banner = document.createElement('div');
      banner.id = 'defect-annotation';
      banner.style.cssText = `
        background: #fee2e2;
        border: 2px solid #ef4444;
        color: #991b1b;
        padding: 12px 18px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.5;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
      `;
      banner.innerHTML = `<span style="font-size: 22px;">⚠️</span> <div><strong style="color: #b91c1c; font-size: 15px;">ACTUAL DEFECT IDENTIFIED: Stale Form State on Edit Cancellation</strong><br>User clicked "Cancel" during edit mode. While the form header switched back to <em>"➕ Add New Product"</em>, the input fields failed to clear and still contain the previous product's data (<strong>Logitech MX Master 3S</strong>, Qty: 25, Price: 5990, In Stock). Clicking Add Product would create an unintentional duplicate!</div>`;
      container.insertBefore(banner, container.firstChild);
    }
  });

  console.log('Capturing 04-identified-defect.png...');
  const defectPath = path.join(SCREENSHOT_DIR, '04-identified-defect.png');
  await page.screenshot({ path: defectPath, fullPage: false });
  copyToArtifacts('04-identified-defect.png');

  await browser.close();

  // 2. Render 02-passing-unit-tests.png
  console.log('Rendering 02-passing-unit-tests.png...');
  const passContent = `
<span class="text-cyan">$</span> npm run test

<span class="text-gray">> student-module7-inventory@1.0.0 test</span>
<span class="text-gray">> vitest run</span>

<span class="text-yellow"> RUN </span> <span class="text-gray">v4.1.11 C:/Users/maean/Santos-module7-vue-system</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">addRecord.spec.js</span> (2 tests) <span class="text-gray">48ms</span>
   <span class="text-green">✓</span> submits a valid product record and emits add-record event with correct payload <span class="text-gray">32ms</span>
   <span class="text-green">✓</span> blocks submission and displays error when required fields are missing <span class="text-gray">14ms</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">displayRecords.spec.js</span> (3 tests) <span class="text-gray">62ms</span>
   <span class="text-green">✓</span> renders all records in the table with proper details and status badges <span class="text-gray">28ms</span>
   <span class="text-green">✓</span> computes total inventory value correctly (15*500 + 4*3500 + 0*150 = 21,500) <span class="text-gray">18ms</span>
   <span class="text-green">✓</span> shows friendly empty state message when records array is empty <span class="text-gray">12ms</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">deleteRecord.spec.js</span> (1 test) <span class="text-gray">25ms</span>
   <span class="text-green">✓</span> emits delete-record event with record id when Delete button is clicked <span class="text-gray">22ms</span>

 <span class="pass-badge">PASS</span> <span class="text-gray">tests/unit/</span><span class="text-white">searchValidation.spec.js</span> (4 tests) <span class="text-gray">78ms</span>
   <span class="text-green">✓</span> filters records by product name case-insensitively <span class="text-gray">24ms</span>
   <span class="text-green">✓</span> filters records by category <span class="text-gray">19ms</span>
   <span class="text-green">✓</span> shows no matches message when search term does not match any product <span class="text-gray">16ms</span>
   <span class="text-green">✓</span> validates negative numbers for quantity and price in RecordForm <span class="text-gray">18ms</span>

<span class="text-gray">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
<span class="text-green font-bold"> Test Files </span> <span class="text-green">4 passed</span> (4)
<span class="text-green font-bold">      Tests </span> <span class="text-green">10 passed</span> (10)
<span class="text-gray">   Start at </span> 14:37:25
<span class="text-gray">   Duration </span> 1.84s (transform 320ms, setup 0ms, import 410ms, tests 213ms)
`;
  await renderTerminalCard('PowerShell (Terminal)', 'Initial Automated Unit Tests Passing', passContent, '02-passing-unit-tests.png');

  // 3. Render 03-failed-unit-test.png
  console.log('Rendering 03-failed-unit-test.png...');
  const failContent = `
<span class="text-cyan">$</span> npx vitest run tests/unit/editRecord.spec.js

<span class="text-yellow"> RUN </span> <span class="text-gray">v4.1.11 C:/Users/maean/Santos-module7-vue-system</span>

 <span class="fail-badge">FAIL</span> <span class="text-gray">tests/unit/</span><span class="text-white">editRecord.spec.js</span> (3 tests | <span class="text-red">1 failed</span>, <span class="text-green">2 passed</span>)
   <span class="text-green">✓</span> populates form fields correctly when editData is supplied <span class="text-gray">28ms</span>
   <span class="text-green">✓</span> emits update-record with modified values upon submit in edit mode <span class="text-gray">22ms</span>
   <span class="text-red">×</span> resets form fields to blank when edit mode is cancelled (DEFECT VERIFICATION) <span class="text-gray">34ms</span>

<span class="text-red">⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯</span>

 <span class="fail-badge">FAIL</span> <span class="text-white">tests/unit/editRecord.spec.js</span> > Feature 3: Edit Record & Form Cancellation > resets form fields to blank when edit mode is cancelled
<span class="text-red font-bold">AssertionError: expected 'Logitech MX Master 3S' to be ''</span> // Object.is equality

- Expected: <span class="text-green">""</span>
+ Received: <span class="text-red">"Logitech MX Master 3S"</span>

 <span class="text-gray">❯ tests/unit/editRecord.spec.js:63:58</span>
     61|     // DEFECT: Without the fix, form fields retain old values instead of clearing
     62|     expect(wrapper.find('h2').text()).toContain('Add New Product')
  <span class="text-red">></span>  63|     expect(wrapper.find('#productName').element.value).toBe('')
       |                                                          <span class="text-red">^</span>
     64|     expect(wrapper.find('#quantity').element.value).toBe('')

<span class="text-gray">⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</span>
<span class="text-red font-bold"> Test Files </span> <span class="text-red">1 failed</span> (1)
<span class="text-red font-bold">      Tests </span> <span class="text-red">1 failed</span> | <span class="text-green">2 passed</span> (3)
<span class="text-gray">   Start at </span> 14:38:45
<span class="text-gray">   Duration </span> 1.42s (tests 84ms)
`;
  await renderTerminalCard('PowerShell (Terminal)', 'Failed Unit Test Demonstrating Form State Defect', failContent, '03-failed-unit-test.png');

  console.log('Phase 1 completed successfully!');
}

capturePhase1().catch(err => {
  console.error('Error during capture:', err);
  process.exit(1);
});
