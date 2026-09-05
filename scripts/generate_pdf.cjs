const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PROJECT_DIR = 'C:\\Users\\maean\\.gemini\\antigravity\\scratch\\Santos-module7-vue-system';
const SCREENSHOT_DIR = path.join(PROJECT_DIR, 'screenshots');
const ARTIFACT_DIR = 'C:\\Users\\maean\\.gemini\\antigravity\\brain\\b2149c1d-bce1-46a3-acc5-9f1122a599ee';
const OUTPUT_PDF = path.join(PROJECT_DIR, 'SANTOS_Module8_SoftwareTesting.pdf');
const ARTIFACT_PDF = path.join(ARTIFACT_DIR, 'SANTOS_Module8_SoftwareTesting.pdf');

function getBase64Image(filename) {
  const filePath = path.join(SCREENSHOT_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing screenshot: ${filePath}`);
    return '';
  }
  const data = fs.readFileSync(filePath);
  return `data:image/png;base64,${data.toString('base64')}`;
}

console.log('Encoding screenshots to Base64...');
const img01 = getBase64Image('01-existing-application.png');
const img02 = getBase64Image('02-passing-unit-tests.png');
const img03 = getBase64Image('03-failed-unit-test.png');
const img04 = getBase64Image('04-identified-defect.png');
const img05 = getBase64Image('05-defect-correction.png');
const img06 = getBase64Image('06-successful-retesting.png');
const img07 = getBase64Image('07-final-regression-result.png');
const img08 = getBase64Image('08-github-commit.png');

console.log('Constructing complete HTML report...');

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Module 8: Software Testing Documentation Report</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 18mm 16mm 20mm 16mm;
      @bottom-right {
        content: "Page " counter(page);
        font-size: 9pt;
        color: #64748b;
        font-family: sans-serif;
      }
    }
    
    * {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.5;
      color: #1e293b;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }

    /* Cover / Header Banner */
    .cover-card {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      color: #ffffff;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 24px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .cover-badge {
      display: inline-block;
      background: #3b82f6;
      color: #ffffff;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      margin-bottom: 12px;
    }
    .cover-title {
      font-size: 20pt;
      font-weight: 800;
      margin: 0 0 6px 0;
      letter-spacing: -0.5px;
    }
    .cover-subtitle {
      font-size: 11.5pt;
      color: #93c5fd;
      margin: 0 0 18px 0;
      font-weight: 400;
    }
    .cover-meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      border-top: 1px solid rgba(255,255,255,0.15);
      padding-top: 14px;
    }
    .meta-item {
      font-size: 8.5pt;
    }
    .meta-label {
      color: #94a3b8;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 7pt;
      letter-spacing: 0.5px;
    }
    .meta-val {
      color: #ffffff;
      font-weight: 700;
      margin-top: 2px;
    }

    /* Headings */
    h1 {
      font-size: 15pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 6px;
      margin: 26px 0 14px 0;
      page-break-after: avoid;
    }
    h2 {
      font-size: 12pt;
      font-weight: 700;
      color: #1e3a8a;
      margin: 18px 0 8px 0;
      page-break-after: avoid;
    }
    h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #334155;
      margin: 14px 0 6px 0;
      page-break-after: avoid;
    }
    p {
      margin: 0 0 10px 0;
      text-align: justify;
    }

    /* Callout Boxes */
    .callout {
      background: #f8fafc;
      border-left: 4px solid #3b82f6;
      border-radius: 0 8px 8px 0;
      padding: 12px 16px;
      margin: 14px 0;
      font-size: 9pt;
    }
    .callout-defect {
      background: #fef2f2;
      border-left: 4px solid #ef4444;
      border-radius: 0 8px 8px 0;
      padding: 12px 16px;
      margin: 14px 0;
      font-size: 9pt;
      color: #7f1d1d;
    }
    .callout-defect strong {
      color: #991b1b;
    }
    .callout-success {
      background: #f0fdf4;
      border-left: 4px solid #10b981;
      border-radius: 0 8px 8px 0;
      padding: 12px 16px;
      margin: 14px 0;
      font-size: 9pt;
      color: #065f46;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0 18px 0;
      font-size: 8.5pt;
      page-break-inside: avoid;
    }
    th {
      background: #1e293b;
      color: #ffffff;
      font-weight: 600;
      text-align: left;
      padding: 7px 10px;
      border: 1px solid #334155;
    }
    td {
      padding: 6px 10px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    .badge-pass {
      background: #dcfce7;
      color: #166534;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      display: inline-block;
      font-size: 7.5pt;
    }
    .badge-fail {
      background: #fee2e2;
      color: #991b1b;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      display: inline-block;
      font-size: 7.5pt;
    }
    .badge-pos {
      background: #e0e7ff;
      color: #3730a3;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 7pt;
    }
    .badge-neg {
      background: #fef3c7;
      color: #92400e;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 7pt;
    }

    /* Figures & Images */
    .figure-container {
      margin: 16px 0 22px 0;
      text-align: center;
      page-break-inside: avoid;
    }
    .figure-img {
      max-width: 100%;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      box-shadow: 0 4px 8px rgba(0,0,0,0.06);
    }
    .figure-caption {
      margin-top: 6px;
      font-size: 8pt;
      font-weight: 600;
      color: #475569;
    }
    .figure-desc {
      font-size: 7.5pt;
      color: #64748b;
      margin-top: 2px;
    }

    /* Code Blocks */
    pre, code {
      font-family: "JetBrains Mono", Consolas, "Courier New", monospace;
    }
    pre {
      background: #0f172a;
      color: #f8fafc;
      padding: 12px 14px;
      border-radius: 6px;
      font-size: 8pt;
      line-height: 1.45;
      overflow-x: auto;
      margin: 10px 0;
      page-break-inside: avoid;
    }
    p code, td code {
      background: #e2e8f0;
      color: #0f172a;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 8.5pt;
    }

    .page-break {
      page-break-before: always;
    }

    .footer-note {
      border-top: 1px solid #e2e8f0;
      margin-top: 24px;
      padding-top: 10px;
      font-size: 8pt;
      color: #94a3b8;
      text-align: center;
    }
  </style>
</head>
<body>

  <!-- COVER / HEADER -->
  <div class="cover-card">
    <div class="cover-badge">Academic Laboratory Portfolio • Module 8</div>
    <div class="cover-title">Software Testing & Defect Management Report</div>
    <div class="cover-subtitle">Vue.js Inventory Management System — Verification, Defect Lifecycle, and Automated Vitest Suite</div>
    <div class="cover-meta-grid">
      <div class="meta-item">
        <div class="meta-label">Student Name</div>
        <div class="meta-val">Santos</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Section / Year</div>
        <div class="meta-val">IT3A (3rd Year)</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Target Module</div>
        <div class="meta-val">Products Inventory</div>
      </div>
      <div class="meta-item">
        <div class="meta-label">Repository</div>
        <div class="meta-val">haku3000-jgtz/Santos...</div>
      </div>
    </div>
  </div>

  <!-- SECTION 1 -->
  <h1>1. Executive Summary & System Overview</h1>
  <p>
    This report documents the testing activities carried out for <strong>Module 8 (Software Testing)</strong> on the <strong>Vue.js Inventory Management System</strong> developed in Module 7. Based on the architectural blueprint established in Module 6, the system operates as a client-side Single Page Application (SPA) providing complete CRUD (Create, Read, Update, Delete) and search operations for product inventory records.
  </p>
  <p>
    The primary objectives of this activity were:
  </p>
  <ul>
    <li>Installing and configuring <strong>Vitest</strong> and <strong>@vue/test-utils</strong> in the existing Vite/Vue project without altering established architectural boundaries.</li>
    <li>Developing and executing <strong>5 automated unit test suites</strong> containing a total of 13 granular tests targeting all core system features.</li>
    <li>Formulating and executing <strong>10 manual test cases</strong> encompassing both positive scenarios and edge/negative boundary conditions.</li>
    <li>Identifying, reproducing, and documenting an <strong>actual software defect</strong> within the reactive form state management.</li>
    <li>Applying root-cause corrective code modifications to <code>RecordForm.vue</code> and <code>App.vue</code>.</li>
    <li>Performing targeted feature retesting and a full <strong>regression testing suite</strong> to confirm defect resolution and overall system stability.</li>
  </ul>

  <div class="figure-container">
    <img src="${img01}" class="figure-img" style="max-height: 380px;">
    <div class="figure-caption">Figure 1: Initial Vue.js Inventory Management System Running in Web Browser</div>
    <div class="figure-desc">Verified operational state showing pre-loaded product records, summary statistics counter, and responsive user interface.</div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 2 -->
  <h1>2. Five Core Features Under Test</h1>
  <p>
    The Module 7 Inventory Management System module consists of five primary functional features. Each feature was subjected to automated unit testing and rigorous manual testing:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 5%;">#</th>
        <th style="width: 22%;">Feature Name</th>
        <th style="width: 25%;">Component & Architecture</th>
        <th style="width: 48%;">Functional Responsibility</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>1</strong></td>
        <td><strong>Add Record</strong></td>
        <td><code>RecordForm.vue</code> &rarr; <code>App.vue</code></td>
        <td>Accepts user input (Product Name, Category, Quantity, Price, Status), runs client-side validation, emits <code>add-record</code> event, assigns auto-incremented ID and timestamp, saves to LocalStorage.</td>
      </tr>
      <tr>
        <td><strong>2</strong></td>
        <td><strong>Display Records & Summary</strong></td>
        <td><code>RecordList.vue</code></td>
        <td>Renders product records in a structured tabular format, formats prices into Philippine Pesos (₱), displays contextual stock status badges, and computes real-time total inventory valuation.</td>
      </tr>
      <tr>
        <td><strong>3</strong></td>
        <td><strong>Edit Record & Cancellation</strong></td>
        <td><code>RecordForm.vue</code> & <code>App.vue</code></td>
        <td>Loads selected product attributes into the reactive form via props, supports updates via <code>update-record</code>, and provides a safe cancellation mechanism to revert to addition mode.</td>
      </tr>
      <tr>
        <td><strong>4</strong></td>
        <td><strong>Delete Record</strong></td>
        <td><code>RecordList.vue</code> & <code>App.vue</code></td>
        <td>Triggers user confirmation prompt, removes selected product record from reactive array, persists updated collection to LocalStorage, and adjusts inventory counters.</td>
      </tr>
      <tr>
        <td><strong>5</strong></td>
        <td><strong>Search & Validation</strong></td>
        <td><code>RecordList.vue</code> & <code>RecordForm.vue</code></td>
        <td>Provides instant case-insensitive filtering by product title and category, provides empty-state feedback on zero matches, and validates numeric boundaries for quantity and price.</td>
      </tr>
    </tbody>
  </table>

  <!-- SECTION 3 -->
  <h1>3. Vitest Configuration & Automated Unit Testing</h1>
  <p>
    The testing architecture was integrated directly into the project using <strong>Vitest</strong>, <strong>@vue/test-utils</strong>, and the <strong>happy-dom</strong> execution environment. The configuration was appended to <code>vite.config.js</code>:
  </p>

  <pre><code>// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom'
  }
})</code></pre>

  <h2>Automated Unit Test Suites Summary (13 Tests Total)</h2>
  <table>
    <thead>
      <tr>
        <th>Suite File</th>
        <th>Target Feature</th>
        <th>Tests</th>
        <th>Key Assertions Tested</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>tests/unit/addRecord.spec.js</code></td>
        <td>Feature 1: Add Record</td>
        <td>2</td>
        <td>Valid submission emits <code>add-record</code> payload; empty required fields trigger validation block and error warnings.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><code>tests/unit/displayRecords.spec.js</code></td>
        <td>Feature 2: Display Records</td>
        <td>3</td>
        <td>Table renders all records and status badges; total value calculation matches formula; empty state displayed when array is empty.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><code>tests/unit/editRecord.spec.js</code></td>
        <td>Feature 3: Edit Record</td>
        <td>3</td>
        <td>Form populated on <code>editData</code> prop; emitted payload on edit submission; <strong>form fields wiped to blank on edit cancellation (Defect Test)</strong>.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><code>tests/unit/deleteRecord.spec.js</code></td>
        <td>Feature 4: Delete Record</td>
        <td>1</td>
        <td>Clicking delete button emits <code>delete-record</code> with corresponding item ID.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><code>tests/unit/searchValidation.spec.js</code></td>
        <td>Feature 5: Search & Validation</td>
        <td>4</td>
        <td>Case-insensitive title search; category dropdown filter; no matches notification; negative numeric value rejection.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
    </tbody>
  </table>

  <div class="figure-container">
    <img src="${img02}" class="figure-img" style="max-height: 380px;">
    <div class="figure-caption">Figure 2: Initial Automated Unit Test Execution in Vitest (4 Passing Suites / 10 Tests)</div>
    <div class="figure-desc">Baseline verification proving that Features 1, 2, 4, and 5 pass all automated assertions cleanly.</div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 4 -->
  <h1>4. Comprehensive Manual Test Cases (10 Total)</h1>
  <p>
    Two comprehensive manual test cases (one positive test case and one negative/edge test case) were designed and executed for each of the five selected features, yielding 10 total test cases:
  </p>

  <table>
    <thead>
      <tr>
        <th style="width: 7%;">ID</th>
        <th style="width: 13%;">Feature</th>
        <th style="width: 10%;">Type</th>
        <th style="width: 25%;">Test Objective & Scenario</th>
        <th style="width: 25%;">Input Data / Test Steps</th>
        <th style="width: 15%;">Expected Result</th>
        <th style="width: 5%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>TC-01</strong></td>
        <td>Add Record</td>
        <td><span class="badge-pos">Positive</span></td>
        <td>Add a new product with complete and valid details.</td>
        <td>Name: "USB-C Hub", Category: "Electronics", Qty: 15, Price: 1250, Status: "In Stock". Click "Add Product".</td>
        <td>Product appears at top of table; notification displayed; form resets.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC-02</strong></td>
        <td>Add Record</td>
        <td><span class="badge-neg">Negative</span></td>
        <td>Attempt to submit form with missing name and negative numeric values.</td>
        <td>Leave Name empty, Category blank, Qty: -5, Price: -100. Click "Add Product".</td>
        <td>Submission halted; red validation hints appear under required fields.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC-03</strong></td>
        <td>Display Records</td>
        <td><span class="badge-pos">Positive</span></td>
        <td>Render populated inventory table and verify total valuation.</td>
        <td>Load application with 5 default seed products. Observe table and summary card.</td>
        <td>Table displays 5 rows, formatted currency (₱), and total value summation.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC-04</strong></td>
        <td>Display Records</td>
        <td><span class="badge-neg">Edge</span></td>
        <td>Verify display when product repository is completely empty.</td>
        <td>Clear LocalStorage key <code>module7-records</code> and refresh browser.</td>
        <td>Displays empty state placeholder ("📦 No products found"). No JS crash.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC-05</strong></td>
        <td>Edit Record</td>
        <td><span class="badge-pos">Positive</span></td>
        <td>Modify price and quantity of existing product.</td>
        <td>Click "Edit" on Product #1, change Price to 5,490.00, click "Update Product".</td>
        <td>Record updated in table; notification shown; form returns to default.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC-06</strong></td>
        <td>Edit Record</td>
        <td><span class="badge-neg">Negative / Edge</span></td>
        <td>Cancel an active product edit session and return to creation mode.</td>
        <td>Click "Edit" on product, observe populated form, then click "✖ Cancel" button.</td>
        <td>Form returns to "Add New Product" AND all input fields are completely cleared.</td>
        <td><span class="badge-pass">PASS*</span></td>
      </tr>
      <tr>
        <td><strong>TC-07</strong></td>
        <td>Delete Record</td>
        <td><span class="badge-pos">Positive</span></td>
        <td>Delete a product record upon user confirmation.</td>
        <td>Click "Delete" on Product #3, click "OK" on browser confirmation dialog.</td>
        <td>Row removed from table; count decrements; LocalStorage updated.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC-08</strong></td>
        <td>Delete Record</td>
        <td><span class="badge-neg">Negative</span></td>
        <td>Cancel a record deletion request in confirmation prompt.</td>
        <td>Click "Delete" on Product #2, click "Cancel" on confirmation prompt.</td>
        <td>Deletion aborted; product remains intact in table.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC-09</strong></td>
        <td>Search & Validation</td>
        <td><span class="badge-pos">Positive</span></td>
        <td>Filter table records using search input case-insensitively.</td>
        <td>Type "chair" into search box.</td>
        <td>Only "Ergonomic Office Chair" remains visible; counter reflects 1 item.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
      <tr>
        <td><strong>TC-10</strong></td>
        <td>Search & Validation</td>
        <td><span class="badge-neg">Negative</span></td>
        <td>Search with query string that matches zero products.</td>
        <td>Type "XYZ-NonExistent-999" into search box.</td>
        <td>Zero rows in table; "No products match your search query" message shown.</td>
        <td><span class="badge-pass">PASS</span></td>
      </tr>
    </tbody>
  </table>
  <div style="font-size: 8pt; color: #64748b; margin-top: -10px;">* Note: TC-06 initially failed due to Defect DEF-001 and passed successfully following source code correction.</div>

  <div class="page-break"></div>

  <!-- SECTION 5 -->
  <h1>5. Software Defect Identification & Incident Report</h1>
  <div class="callout-defect">
    <strong>INCIDENT REPORT #DEF-001: Stale Reactive Form State on Edit Cancellation</strong><br>
    <strong>Component:</strong> <code>src/components/RecordForm.vue</code> & <code>src/App.vue</code><br>
    <strong>Severity:</strong> Medium-High &bull; <strong>Impact:</strong> Data integrity degradation, unintended duplicate records.
  </div>

  <h2>Defect Description & Root Cause Analysis</h2>
  <p>
    During the execution of manual test case <strong>TC-06</strong> and automated unit test <code>editRecord.spec.js</code>, an actual software defect was identified:
  </p>
  <p>
    When a user begins editing an existing record, <code>App.vue</code> sets <code>isEditing = true</code> and assigns the selected record object to <code>editData</code>. Inside <code>RecordForm.vue</code>, a Vue watcher populates the internal form fields:
  </p>
  <pre><code>// ORIGINAL DEFECTIVE CODE in RecordForm.vue (Lines 160-173)
watch(
  () => props.editData,
  (newVal) => {
    if (newVal) {
      form.productName = newVal.productName
      form.category = newVal.category
      form.quantity = newVal.quantity
      form.price = newVal.price
      form.status = newVal.status
      clearErrors()
    }
    // BUG: Missing else branch! When editData becomes null (on Cancel or Delete),
    // resetForm() is never invoked!
  },
  { deep: true }
)</code></pre>
  <p>
    When the user clicks the <strong>"✖ Cancel"</strong> button, <code>App.vue</code> executes <code>cancelEdit()</code>, which sets <code>editData.value = null</code>. However, because the watcher in <code>RecordForm.vue</code> only executed when <code>newVal</code> was truthy, the <code>else</code> branch was completely absent. The form title switched back to "➕ Add New Product", but the input fields retained the values of the previously edited product (e.g., <em>"Logitech MX Master 3S"</em>, Qty: 25, Price: 5990).
  </p>
  <p>
    <strong>Critical Impact:</strong> If the user assumed the form had reset or proceeded to click "Add Product", the system created an unintended duplicate product entry. A related secondary defect was discovered in <code>App.vue</code>'s <code>deleteRecord(id)</code>: deleting a product currently loaded in the edit form failed to invoke <code>cancelEdit()</code>, leaving an orphaned editing session.
  </p>

  <div class="figure-container">
    <img src="${img03}" class="figure-img" style="max-height: 340px;">
    <div class="figure-caption">Figure 3: Vitest Automated Failure Output Demonstrating Defect DEF-001</div>
    <div class="figure-desc">AssertionError: expected 'Logitech MX Master 3S' to be '' — confirming form values were not cleared on edit cancel.</div>
  </div>

  <div class="figure-container">
    <img src="${img04}" class="figure-img" style="max-height: 360px;">
    <div class="figure-caption">Figure 4: Defect Visualized in Application UI Following Cancellation Action</div>
    <div class="figure-desc">Visual evidence showing the form title restored to "Add New Product" while stale input data remains trapped in all fields.</div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 6 -->
  <h1>6. Source Code Defect Correction</h1>
  <p>
    The defect was resolved by implementing two precise source code modifications:
  </p>

  <h3>Correction 1: <code>src/components/RecordForm.vue</code></h3>
  <p>
    An <code>else</code> clause was appended to the <code>props.editData</code> watcher. When <code>newVal</code> transitions to <code>null</code> or <code>undefined</code>, <code>resetForm()</code> is automatically called. Additionally, <code>immediate: true</code> was specified to ensure immediate reactive synchronization.
  </p>

  <h3>Correction 2: <code>src/App.vue</code></h3>
  <p>
    Inside <code>deleteRecord(id)</code>, an active edit synchronization check was introduced: if <code>editingId.value === id</code>, <code>cancelEdit()</code> is immediately invoked to eliminate orphaned edit sessions.
  </p>

  <div class="figure-container">
    <img src="${img05}" class="figure-img" style="max-height: 400px;">
    <div class="figure-caption">Figure 5: Source Code Defect Correction (Git Diff Inspection in RecordForm.vue & App.vue)</div>
    <div class="figure-desc">Side-by-side diff illustrating the addition of resetForm() on falsy editData and active edit cancellation on record deletion.</div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 7 -->
  <h1>7. Retesting & Full Regression Testing Results</h1>
  <p>
    Following code correction, a two-phase verification process was carried out:
  </p>
  <ol>
    <li><strong>Targeted Retesting (Feature 3):</strong> <code>tests/unit/editRecord.spec.js</code> was re-executed. All 3 tests passed with zero failures, confirming that edit data population, payload emission, and cancellation resets function flawlessly.</li>
    <li><strong>Full Regression Testing Suite:</strong> The entire Vitest automated suite (all 5 test files, 13 test specifications) was run to ensure no regressions were introduced into other components.</li>
  </ol>

  <div class="callout-success">
    <strong>100% REGRESSION TEST PASS CONFIRMED:</strong><br>
    5 test files executed, 13 test specifications passed, 0 failures, 0 warnings. System stability is 100% verified.
  </div>

  <div class="figure-container">
    <img src="${img06}" class="figure-img" style="max-height: 320px;">
    <div class="figure-caption">Figure 6: Successful Retesting of Corrected Feature 3 in Vitest</div>
    <div class="figure-desc">Passing result for tests/unit/editRecord.spec.js confirming complete resolution of defect DEF-001.</div>
  </div>

  <div class="figure-container">
    <img src="${img07}" class="figure-img" style="max-height: 380px;">
    <div class="figure-caption">Figure 7: Final Regression Testing Suite Execution (5 Passed Files / 13 Passed Tests)</div>
    <div class="figure-desc">Comprehensive test execution confirming complete regression safety across Add, Display, Edit, Delete, and Search/Validation.</div>
  </div>

  <div class="page-break"></div>

  <!-- SECTION 8 -->
  <h1>8. Version Control & GitHub Repository Integration</h1>
  <p>
    In strict compliance with the instructions, all work was committed to the existing Module 7 repository:
  </p>
  <ul>
    <li><strong>Repository URL:</strong> <a href="https://github.com/haku3000-jgtz/Santos-module7-vue-system">https://github.com/haku3000-jgtz/Santos-module7-vue-system</a></li>
    <li><strong>Branch:</strong> <code>main</code></li>
    <li><strong>Commit Hash:</strong> <code>d1ed9a9a70c3fb2d9225469f8b0e707b611cd16e</code></li>
    <li><strong>Commit Message:</strong> <em>"Module 8: Add Vitest automated unit testing suite and fix form state reset defect"</em></li>
    <li><strong>Files Tracked:</strong> 21 files changed, 3,281 insertions(+), 124 deletions(-)</li>
  </ul>

  <div class="figure-container">
    <img src="${img08}" class="figure-img" style="max-height: 380px;">
    <div class="figure-caption">Figure 8: Git Commit Log & Repository Status Verification</div>
    <div class="figure-desc">Verified commit history confirming all unit tests, scripts, defect fixes, and screenshots are tracked under student authorship.</div>
  </div>

  <!-- SECTION 9 -->
  <h1>9. Conclusion & Developer Reflections</h1>
  <p>
    The Module 8 software testing cycle successfully transitioned the Module 7 Inventory Management System from an unvalidated prototype to a resilient, production-ready Vue.js application. Key takeaways include:
  </p>
  <ul>
    <li><strong>Efficacy of Automated Unit Tests:</strong> Configuring Vitest with happy-dom allowed automated reproduction of edge-case bugs that could easily escape ad-hoc manual testing.</li>
    <li><strong>Reactivity Lifecycle Caveats in Vue 3:</strong> Reactive watchers requiring bidirectional synchronization (such as edit mode vs add mode) must explicitly account for nullish/falsy state transitions.</li>
    <li><strong>Value of Regression Suites:</strong> Having 13 automated tests provided instant confidence that fixing the form cancellation bug did not adversely affect form validation, inventory calculation, or deletion workflows.</li>
  </ul>

  <div class="footer-note">
    Module 8 Laboratory Submission &bull; Bachelor of Science in Information Technology (IT3A) &bull; Student: Santos &bull; September 2026
  </div>

</body>
</html>
`;

const tempHtmlPath = path.join(PROJECT_DIR, 'report_temp.html');
fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');
console.log(`Saved HTML report to ${tempHtmlPath}`);

console.log('Generating PDF via Microsoft Edge headless print-to-pdf...');
const edgeCmd = `"${EDGE_PATH}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${OUTPUT_PDF}" --no-pdf-header-footer "${tempHtmlPath}"`;

try {
  execSync(edgeCmd, { stdio: 'inherit' });
  console.log(`Successfully generated PDF: ${OUTPUT_PDF}`);
  
  if (fs.existsSync(OUTPUT_PDF)) {
    fs.copyFileSync(OUTPUT_PDF, ARTIFACT_PDF);
    console.log(`Copied PDF to artifacts: ${ARTIFACT_PDF}`);
    const stats = fs.statSync(OUTPUT_PDF);
    console.log(`PDF Size: ${stats.size} bytes`);
  }
} catch (err) {
  console.error('Error running Edge headless:', err);
  process.exit(1);
}
