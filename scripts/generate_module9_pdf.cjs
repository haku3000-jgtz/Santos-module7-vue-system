// generate_module9_pdf.cjs
// Generates Module 9 PDF with all screenshots (01-10)

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');
const MODULE9_DIR = path.join(SCREENSHOT_DIR, 'module9');
const OUTPUT_PDF = path.join(__dirname, '..', 'SANTOS_Module9_SoftwareEvolution.pdf');

function getBase64Image(filename, dir) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: Missing screenshot: ${filePath}`);
    return '';
  }
  const data = fs.readFileSync(filePath);
  return `data:image/png;base64,${data.toString('base64')}`;
}

// Module 8 screenshots (01-08) from screenshots/
const img01 = getBase64Image('01-existing-application.png', SCREENSHOT_DIR);
const img02 = getBase64Image('02-passing-unit-tests.png', SCREENSHOT_DIR);
const img03 = getBase64Image('03-failed-unit-test.png', SCREENSHOT_DIR);
const img04 = getBase64Image('04-identified-defect.png', SCREENSHOT_DIR);

// Module 9 screenshots (05-10) from screenshots/module9/
const img05 = getBase64Image('05-status-filter-architecture.png', MODULE9_DIR);
const img06 = getBase64Image('06-code-diff.png', MODULE9_DIR);
const img07 = getBase64Image('07-filter-ui-running.png', MODULE9_DIR);
const img08 = getBase64Image('08-tests-passing.png', MODULE9_DIR);
const img09 = getBase64Image('09-build-success.png', MODULE9_DIR);
const img10 = getBase64Image('10-ci-status.png', MODULE9_DIR);

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Module 9 – Software Evolution</title>
  <style>
    @page { size: A4 portrait; margin: 14mm 16mm 16mm 16mm; }
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; margin: 0; padding: 0; color: #1e293b; }
    .cover { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, #1e40af 0%, #7c3aed 100%); color: #fff; }
    .cover h1 { font-size: 32pt; margin: 0 0 12px; }
    .cover h2 { font-size: 18pt; font-weight: 400; margin: 0 0 24px; opacity: 0.9; }
    .cover .meta { font-size: 12pt; opacity: 0.8; }
    .screenshot-page { page-break-before: always; padding: 20px 0; }
    .screenshot-title { font-size: 14pt; font-weight: 700; color: #1e40af; margin-bottom: 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px; }
    .screenshot-page img { max-width: 100%; max-height: 520px; border: 1px solid #cbd5e1; border-radius: 4px; display: block; margin: 0 auto; }
    .caption { font-size: 10pt; color: #64748b; margin-top: 8px; text-align: center; font-style: italic; }
  </style>
</head>
<body>
  <div class="cover">
    <h1>SOFTWARE ENGINEERING</h1>
    <h2>Module 9 – Software Evolution</h2>
    <div class="meta">Santos Inventory Management System<br>Vue.js + Vite</div>
  </div>

  <div class="screenshot-page"><div class="screenshot-title">01 – Existing Application</div><img src="${img01}"/><div class="caption">Baseline Vue.js inventory system from Module 7</div></div>
  <div class="screenshot-page"><div class="screenshot-title">02 – Passing Unit Tests</div><img src="${img02}"/><div class="caption">All existing tests pass before any changes</div></div>
  <div class="screenshot-page"><div class="screenshot-title">03 – Failed Unit Test</div><img src="${img03}"/><div class="caption">Intentional test failure to verify test coverage</div></div>
  <div class="screenshot-page"><div class="screenshot-title">04 – Identified Defect</div><img src="${img04}"/><div class="caption">Defect identified via test-driven analysis</div></div>
  <div class="screenshot-page"><div class="screenshot-title">05 – Status Filter Architecture</div><img src="${img05}"/><div class="caption">Architecture diagram for the new StatusFilter feature</div></div>
  <div class="screenshot-page"><div class="screenshot-title">06 – Code Diff</div><img src="${img06}"/><div class="caption">Code changes introducing StatusFilter.vue component</div></div>
  <div class="screenshot-page"><div class="screenshot-title">07 – Filter UI Running</div><img src="${img07}"/><div class="caption">Status filter feature running in the application</div></div>
  <div class="screenshot-page"><div class="screenshot-title">08 – Tests Passing</div><img src="${img08}"/><div class="caption">All tests passing after evolution (16/16)</div></div>
  <div class="screenshot-page"><div class="screenshot-title">09 – Build Success</div><img src="${img09}"/><div class="caption">Production build completes successfully</div></div>
  <div class="screenshot-page"><div class="screenshot-title">10 – CI Status</div><img src="${img10}"/><div class="caption">GitHub Actions CI/CD pipeline – all checks passing</div></div>
</body>
</html>`;

(async () => {
  console.log('Generating Module 9 PDF...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.pdf({ path: OUTPUT_PDF, format: 'A4', printBackground: true });
  await browser.close();
  console.log(`PDF generated: ${OUTPUT_PDF}`);
})().catch(err => { console.error('Error:', err); process.exit(1); });
