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

const img01 = getBase64Image('01-existing-application.png');
const img02 = getBase64Image('02-passing-unit-tests.png');
const img03 = getBase64Image('03-failed-unit-test.png');
const img04 = getBase64Image('04-identified-defect.png');
const img05 = getBase64Image('05-defect-correction.png');
const img06 = getBase64Image('06-successful-retesting.png');
const img07 = getBase64Image('07-final-regression-result.png');
const img08 = getBase64Image('08-github-commit.png');

console.log('Generating institutional format HTML report...');

const institutionalHeader = `
<div class="school-header">
  <div class="school-logo-area">
    <div class="circle-badge">CHCC</div>
    <div class="scs-badge">SCS</div>
  </div>
  <div class="school-text">
    <div class="school-name">CONCEPCION HOLY CROSS COLLEGE, INC.</div>
    <div class="school-sub">SCHOOL OF COMPUTER STUDIES</div>
    <div class="school-addr">Juan Luna St., Minane, Concepcion, Tarlac</div>
    <div class="school-contact">Tel No. 045-923-0747 | E-Mail Address: concepcionholycrosscollege@yahoo.com</div>
    <div class="school-motto">Competence | Holistic education | Compassion | Commitment</div>
  </div>
</div>
<div class="activity-banner">STUDENT ACTIVITY</div>
`;

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MODULE 8 : SOFTWARE TESTING OF THE VUE.JS SYSTEM</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 14mm 16mm 16mm 16mm;
    }
    * { box-sizing: border-box; }
    body {
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #000000;
      margin: 0;
      padding: 0;
      background: #ffffff;
    }

    .school-header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding-bottom: 6px;
      border-bottom: 2px solid #002b49;
      margin-bottom: 0;
    }
    .school-logo-area {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .circle-badge {
      width: 44px; height: 44px; border-radius: 50%; background: #002b49; color: white;
      display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold;
      border: 2px solid #eab308;
    }
    .scs-badge {
      width: 44px; height: 44px; border-radius: 4px; background: #0284c7; color: white;
      display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: bold;
      letter-spacing: 0.5px;
    }
    .school-text { text-align: center; }
    .school-name { font-size: 14pt; font-weight: bold; color: #002b49; letter-spacing: 0.5px; }
    .school-sub { font-size: 11pt; font-weight: bold; color: #002b49; }
    .school-addr { font-size: 7.5pt; color: #444444; }
    .school-contact { font-size: 7.5pt; color: #444444; }
    .school-motto { font-size: 7.5pt; font-style: italic; color: #002b49; margin-top: 1px; }

    .activity-banner {
      background: #002b49;
      color: #ffffff;
      text-align: center;
      font-weight: bold;
      font-size: 11.5pt;
      padding: 5px 0;
      letter-spacing: 1px;
      margin: 4px 0 16px 0;
    }

    .module-title {
      font-size: 13.5pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 14px;
      letter-spacing: 0.5px;
    }
    .student-meta {
      margin-bottom: 18px;
      line-height: 1.6;
      font-size: 10pt;
    }
    .student-meta .row {
      display: flex;
    }
    .student-meta .label {
      width: 220px;
      font-style: italic;
    }
    .student-meta .val {
      font-weight: bold;
    }

    h2.section-heading {
      font-size: 11pt;
      font-weight: bold;
      color: #000000;
      margin: 16px 0 8px 0;
      display: flex;
      gap: 10px;
    }
    p {
      text-align: justify;
      margin: 0 0 10px 0;
      font-size: 10pt;
      line-height: 1.45;
    }

    /* Orange / Institutional Table Style matching page 1 & 2 */
    table.table-orange {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 16px 0;
      font-size: 9pt;
    }
    table.table-orange th {
      background: #e67e22;
      color: #ffffff;
      padding: 7px 10px;
      text-align: left;
      border: 1px solid #d35400;
      font-weight: bold;
    }
    table.table-orange td {
      padding: 6px 10px;
      border: 1px solid #f39c12;
      vertical-align: top;
      background: #fdf2e9;
      color: #000;
    }
    table.table-orange tr:nth-child(even) td {
      background: #fae5d3;
    }

    /* Blue Table Style matching page 2 & 3 */
    table.table-blue {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0 16px 0;
      font-size: 8.5pt;
    }
    table.table-blue th {
      background: #5dade2;
      color: #ffffff;
      padding: 6px 8px;
      text-align: left;
      border: 1px solid #3498db;
      font-weight: bold;
    }
    table.table-blue td {
      padding: 5px 8px;
      border: 1px solid #aed6f1;
      background: #ebf5fb;
    }
    table.table-blue tr:nth-child(even) td {
      background: #d6eaf8;
    }

    /* Defect Table matching page 3 */
    table.table-defect {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0;
      font-size: 9pt;
    }
    table.table-defect th {
      background: #5dade2;
      color: white;
      padding: 6px 10px;
      border: 1px solid #3498db;
      font-weight: bold;
      text-align: left;
    }
    table.table-defect td {
      padding: 5px 10px;
      border: 1px solid #aed6f1;
      background: #ebf5fb;
    }
    table.table-defect tr:nth-child(even) td {
      background: #d6eaf8;
    }

    /* Code Box matching page 4 */
    .code-box {
      border: 1px solid #bdc3c7;
      background: #fafafa;
      padding: 6px 12px;
      font-family: Consolas, monospace;
      font-size: 8pt;
      line-height: 1.35;
      margin: 6px 0 10px 0;
      white-space: pre-wrap;
    }

    /* Screenshot Evidence Layout matching pages 6 to 13 */
    .screenshot-page {
      page-break-before: always;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .screenshot-title {
      font-size: 11pt;
      font-weight: bold;
      margin: 12px 0 4px 0;
    }
    .screenshot-subtitle {
      font-size: 9.5pt;
      color: #333333;
      margin-bottom: 12px;
      text-align: center;
    }
    .screenshot-img-container {
      text-align: center;
      margin: 10px 0 16px 0;
    }
    .screenshot-img-container img {
      max-width: 96%;
      max-height: 480px;
      border: 1px solid #000000;
      border-radius: 4px;
    }
    .screenshot-caption {
      font-size: 9.5pt;
      line-height: 1.45;
      text-align: justify;
      padding: 0 15px;
    }

    .page-break { page-break-before: always; }
  </style>
</head>
<body>

  <!-- PAGE 1: System Info & Overview -->
  ${institutionalHeader}
  
  <div class="module-title">MODULE 8 : SOFTWARE TESTING OF THE VUE.JS SYSTEM</div>

  <div class="student-meta">
    <div class="row"><div class="label">Name of Student:</div><div class="val">Santos</div></div>
    <div class="row"><div class="label">Contact of Student:</div><div class="val">santos.it3a@student.university.edu</div></div>
    <div class="row"><div class="label">Program, Section, Subject:</div><div class="val">BSIT3A – CSP109</div></div>
    <div class="row"><div class="label">Sem & School Year:</div><div class="val">1st Sem SY 2026-2027</div></div>
  </div>

  <h2 class="section-heading"><span>I.</span> <span>System Information</span></h2>
  <p><strong>System Title:</strong> Inventory Management System (Products Module)</p>
  <p><strong>GitHub Repository Link:</strong> <a href="https://github.com/haku3000-jgtz/Santos-module7-vue-system.git" style="color: #0284c7;">https://github.com/haku3000-jgtz/Santos-module7-vue-system.git</a></p>

  <h2 class="section-heading"><span>II.</span> <span>System Overview</span></h2>
  <p>
    This report documents the software testing activity performed on the Inventory Management System, originally designed in Module 6 and implemented in Module 7. The system is a Vue.js-based web application that allows users to manage product inventories through CRUD operations, real-time search/filter functionality, stock status tracking, summary statistics, and localStorage persistence.
  </p>
  <p>
    The testing process follows the software testing lifecycle: planning, analysis, design, implementation, execution, evaluation, and closure. Both manual functional testing and automated unit testing using Vitest were performed. One actual software defect was identified, documented, corrected, and retested.
  </p>

  <p><strong>Five major features of the system were selected for testing:</strong></p>

  <table class="table-orange">
    <thead>
      <tr>
        <th style="width: 6%;">#</th>
        <th style="width: 26%;">Feature</th>
        <th style="width: 68%;">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Add Record</td>
        <td>Opens the product entry form and creates a new product record after validating the required fields: Product Name, Category, Quantity, Price, and Status.</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Display Records</td>
        <td>Renders all saved product records as rows in the structured table, formatting prices to Philippine Pesos (₱) and calculating inventory count and total valuation.</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Edit Record</td>
        <td>Loads the selected product data into the reactive form fields for updating, or safely cancels the editing session to return to product addition mode.</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Delete Record</td>
        <td>Removes a product record from the collection after the user confirms the action via browser confirmation prompt, updating count and total value.</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Search & Validation</td>
        <td>Filters the visible product list using real-time search keywords for Product Name or Category, and validates boundary values for quantity and price.</td>
      </tr>
    </tbody>
  </table>

  <!-- PAGE 2: Automated Unit Tests & Manual Test Cases -->
  <div class="page-break"></div>
  ${institutionalHeader}

  <h2 class="section-heading"><span>III.</span> <span>Automated Unit Tests</span></h2>
  <p>Vitest, Vue Test Utils, and happy-dom are configured for the existing Vue/Vite project. Five meaningful automated tests are shown below:</p>

  <table class="table-blue">
    <thead>
      <tr>
        <th style="width: 6%;">#</th>
        <th style="width: 28%;">Test</th>
        <th style="width: 52%;">Expected Result</th>
        <th style="width: 14%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Add valid product record</td>
        <td>Product record is added and emitted successfully.</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Display multiple records & total value</td>
        <td>All records render in table and total inventory value computes accurately.</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Edit product & reset on cancel</td>
        <td>Updated values replace old values; form fields reset to blank on cancel.</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>4</td>
        <td>Delete product record</td>
        <td>Selected product is removed successfully from the record array.</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>5</td>
        <td>Search & numeric validation</td>
        <td>Matching products returned case-insensitively; negative values rejected.</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
    </tbody>
  </table>

  <h2 class="section-heading"><span>IV.</span> <span>Manual Test Cases (10)</span></h2>
  <p>Two manual test cases were prepared per feature — one positive and one negative/edge case — executed directly in the running application.</p>

  <table class="table-blue">
    <thead>
      <tr>
        <th style="width: 9%;">ID</th>
        <th style="width: 18%;">Feature</th>
        <th style="width: 13%;">Type</th>
        <th style="width: 25%;">Expected Result</th>
        <th style="width: 25%;">Actual Result</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>TC-01</td>
        <td>Add Record</td>
        <td>Positive</td>
        <td>Product is added to table</td>
        <td>Product was added</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>TC-02</td>
        <td>Validation</td>
        <td>Negative</td>
        <td>Invalid inputs rejected</td>
        <td>Validation errors displayed</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>TC-03</td>
        <td>Validation</td>
        <td>Edge</td>
        <td>Negative qty/price blocked</td>
        <td>Negative input blocked</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>TC-04</td>
        <td>Display</td>
        <td>Positive</td>
        <td>Multiple records displayed</td>
        <td>Records displayed with total</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>TC-05</td>
        <td>Edit</td>
        <td>Positive</td>
        <td>Product record updated</td>
        <td>Record updated in table</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>TC-06</td>
        <td>Edit / Cancel</td>
        <td>Negative/Edge</td>
        <td>Cancel clears form fields</td>
        <td>Form reset to blank</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>TC-07</td>
        <td>Delete</td>
        <td>Positive</td>
        <td>Product removed on confirm</td>
        <td>Product removed</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>TC-08</td>
        <td>Delete</td>
        <td>Negative</td>
        <td>Cancel prompt keeps record</td>
        <td>Record remained in list</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>TC-09</td>
        <td>Search</td>
        <td>Positive</td>
        <td>Matching products appear</td>
        <td>Matching products appeared</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>TC-10</td>
        <td>Persistence</td>
        <td>Positive</td>
        <td>Records survive refresh</td>
        <td>Records remained</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
    </tbody>
  </table>

  <!-- PAGE 3: Defect Report -->
  <div class="page-break"></div>
  ${institutionalHeader}

  <h2 class="section-heading"><span>V.</span> <span>Defect Report</span></h2>
  <p>
    The defect report documents the software issue identified during the testing of the Edit and Cancellation feature. The defect occurred when a user initiated an edit on an existing record and subsequently clicked the "Cancel" button: while the form title reverted to "Add New Product", the input fields failed to clear and still contained the previous product's data.
  </p>

  <table class="table-defect">
    <thead>
      <tr>
        <th style="width: 25%;">Field</th>
        <th style="width: 75%;">Entry</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Defect ID</strong></td>
        <td>BUG-01</td>
      </tr>
      <tr>
        <td><strong>Summary</strong></td>
        <td>Form fields retain stale product data upon edit cancellation instead of resetting to blank</td>
      </tr>
      <tr>
        <td><strong>Feature</strong></td>
        <td>Edit Record / Form Reset</td>
      </tr>
      <tr>
        <td><strong>Environment</strong></td>
        <td>Windows / Microsoft Edge / Chrome / Vue.js 3</td>
      </tr>
      <tr>
        <td><strong>Precondition</strong></td>
        <td>At least one product record exists in the table</td>
      </tr>
      <tr>
        <td><strong>Steps to Reproduce</strong></td>
        <td>
          1. Open the Inventory Management System.<br>
          2. Click "Edit" on Product #1 (e.g. Logitech MX Master 3S).<br>
          3. Observe that form is populated with the product's details.<br>
          4. Click the "✖ Cancel" button.<br>
          5. Observe the form title and field values.
        </td>
      </tr>
      <tr>
        <td><strong>Expected Result</strong></td>
        <td>The form should switch back to "➕ Add New Product" and all input fields should reset to blank.</td>
      </tr>
      <tr>
        <td><strong>Actual Result</strong></td>
        <td>The title reverted to "Add New Product", but all inputs retained the old product values. Clicking Add would create an accidental duplicate.</td>
      </tr>
      <tr>
        <td><strong>Severity</strong></td>
        <td>Medium</td>
      </tr>
      <tr>
        <td><strong>Priority</strong></td>
        <td>Medium</td>
      </tr>
      <tr>
        <td><strong>Status</strong></td>
        <td>New &rarr; Fixed &rarr; Retest &rarr; Closed</td>
      </tr>
      <tr>
        <td><strong>Evidence</strong></td>
        <td>Screenshot Filename: 04-identified-defect.png</td>
      </tr>
    </tbody>
  </table>

  <p><strong>Root Cause Analysis:</strong></p>
  <p>
    In <code>src/components/RecordForm.vue</code>, the reactive watcher on <code>props.editData</code> only handled the truthy case: <code>if (newVal) { ... }</code>. When the user clicked "Cancel", <code>App.vue</code> set <code>editData.value = null</code>. Because there was no <code>else</code> branch, <code>resetForm()</code> was never called when <code>editData</code> transitioned to <code>null</code>, leaving stale data in the form fields.
  </p>

  <!-- PAGE 4: Explanation of the Correction -->
  <div class="page-break"></div>
  ${institutionalHeader}

  <h2 class="section-heading"><span>VI.</span> <span>Explanation of the Correction</span></h2>
  <p><strong>File Modified:</strong> <code>src/components/RecordForm.vue</code></p>

  <p><strong>Original Code (Defective):</strong></p>
  <div class="code-box">watch(
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
  },
  { deep: true }
)</div>

  <p><strong>Corrected Code:</strong></p>
  <div class="code-box">watch(
  () => props.editData,
  (newVal) => {
    if (newVal) {
      form.productName = newVal.productName
      form.category = newVal.category
      form.quantity = newVal.quantity
      form.price = newVal.price
      form.status = newVal.status
      clearErrors()
    } else {
      // FIX: When edit is cancelled or record is deleted, reset form to blank
      resetForm()
    }
  },
  { deep: true, immediate: true }
)</div>

  <p>
    The fix adds an <code>else</code> clause to the watcher that executes <code>resetForm()</code> whenever <code>props.editData</code> becomes null or undefined. This ensures that when the user clicks "Cancel" or deletes an item currently in edit mode, all input fields are immediately wiped clean and restored to their initial blank state.
  </p>

  <p><strong>Impact:</strong></p>
  <ul>
    <li><strong>Positive:</strong> Eliminates data leakage between edit mode and add mode; prevents unintentional duplicate records.</li>
    <li><strong>Risk:</strong> Minimal &mdash; <code>resetForm()</code> was already implemented and tested within the component.</li>
    <li><strong>Regression:</strong> No other features affected; verified through automated regression test suite.</li>
  </ul>

  <!-- PAGE 5: Retesting & Regression -->
  <div class="page-break"></div>
  ${institutionalHeader}

  <h2 class="section-heading"><span>VII.</span> <span>Retesting and Regression Testing Results</span></h2>

  <p><strong>Retesting the Fixed Feature</strong></p>
  <p>After applying the <code>resetForm()</code> fix, the following retests were performed:</p>

  <table class="table-blue">
    <thead>
      <tr>
        <th style="width: 25%;">Test</th>
        <th style="width: 20%;">Input</th>
        <th style="width: 28%;">Expected Result</th>
        <th style="width: 17%;">Actual Result</th>
        <th style="width: 10%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cancel from Edit Mode</td>
        <td>Click Edit &rarr; Cancel</td>
        <td>Form fields reset to blank</td>
        <td>All fields wiped clean</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>Submit After Cancel</td>
        <td>Cancel &rarr; Type new name</td>
        <td>Creates clean new record</td>
        <td>Created new record</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>Delete While Editing</td>
        <td>Edit item &rarr; Delete</td>
        <td>Cancels active edit session</td>
        <td>Edit session cancelled</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
    </tbody>
  </table>

  <p><strong>Regression Testing</strong></p>
  <p>After the fix, all existing features were retested via the Vitest automated regression suite:</p>

  <table class="table-blue">
    <thead>
      <tr>
        <th style="width: 35%;">Feature</th>
        <th style="width: 50%;">Test Suite</th>
        <th style="width: 15%;">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Add Record Functionality</td>
        <td><code>tests/unit/addRecord.spec.js</code> (2 tests)</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>Display Records & Summation</td>
        <td><code>tests/unit/displayRecords.spec.js</code> (3 tests)</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>Edit Record & Cancel Reset</td>
        <td><code>tests/unit/editRecord.spec.js</code> (3 tests)</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>Delete Record Feature</td>
        <td><code>tests/unit/deleteRecord.spec.js</code> (1 test)</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>Search & Validation Suite</td>
        <td><code>tests/unit/searchValidation.spec.js</code> (4 tests)</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
      <tr>
        <td>LocalStorage Persistence</td>
        <td>Browser reload and state retention check</td>
        <td style="color:#16a34a; font-weight:bold;">PASS</td>
      </tr>
    </tbody>
  </table>

  <!-- SECTION VIII: SCREENSHOTS 1 TO 8 -->
  <!-- Screenshot 01 -->
  <div class="screenshot-page">
    ${institutionalHeader}
    <h2 class="section-heading"><span>VIII.</span> <span>Screenshots Evidence</span></h2>
    <div class="screenshot-title">1) 01-existing-application.png</div>
    <div class="screenshot-subtitle">Existing module 7 system running in the browser before testing began.</div>
    <div class="screenshot-img-container">
      <img src="${img01}">
    </div>
    <div class="screenshot-caption">
      The Inventory Management System running in the browser at http://localhost:5173/, showing the product form, pre-loaded inventory table, formatted currency values (₱), stock badges, and action buttons. This screenshot proves the Module 7 system is operational before testing begins.
    </div>
  </div>

  <!-- Screenshot 02 -->
  <div class="screenshot-page">
    ${institutionalHeader}
    <div class="screenshot-title">2) 02-passing-unit-tests.png</div>
    <div class="screenshot-subtitle">Initial Vitest run showing the automated tests executing successfully.</div>
    <div class="screenshot-img-container">
      <img src="${img02}">
    </div>
    <div class="screenshot-caption">
      The screenshot shows the terminal output after executing npm run test using Vitest. All automated unit tests covering the Add Record, Display Records, Delete Record, and Search & Validation functionalities passed successfully before defect investigation.
    </div>
  </div>

  <!-- Screenshot 03 -->
  <div class="screenshot-page">
    ${institutionalHeader}
    <div class="screenshot-title">3) 03-failed-unit-test.png</div>
    <div class="screenshot-subtitle">Failed test showing expected and actual results.</div>
    <div class="screenshot-img-container">
      <img src="${img03}">
    </div>
    <div class="screenshot-caption">
      The screenshot shows the terminal output of a failed automated unit test during the testing and debugging process. The failed test demonstrates that when edit mode is cancelled, the product name was expected to be empty ("") but was received as "Logitech MX Master 3S". This assertion failure verified the defect.
    </div>
  </div>

  <!-- Screenshot 04 -->
  <div class="screenshot-page">
    ${institutionalHeader}
    <div class="screenshot-title">4) 04-identified-defect.png</div>
    <div class="screenshot-subtitle">Actual application defect</div>
    <div class="screenshot-img-container">
      <img src="${img04}">
    </div>
    <div class="screenshot-caption">
      Browser screenshot showing the actual application defect. The user clicked "Edit" on product #1 and then clicked "Cancel". The form title reverted to "Add New Product", but the input fields still contain the previous product's data. This is the evidence for BUG-01.
    </div>
  </div>

  <!-- Screenshot 05 -->
  <div class="screenshot-page">
    ${institutionalHeader}
    <div class="screenshot-title">5) 05-defect-correction.png</div>
    <div class="screenshot-subtitle">Source code showing the correction made to the identified defect in VS Code</div>
    <div class="screenshot-img-container">
      <img src="${img05}">
    </div>
    <div class="screenshot-caption">
      The screenshot shows the source code in Visual Studio Code where the identified defect was corrected in RecordForm.vue. The watcher was updated to include an else branch calling resetForm() when editData becomes null upon cancellation, highlighted inside the yellow box.
    </div>
  </div>

  <!-- Screenshot 06 -->
  <div class="screenshot-page">
    ${institutionalHeader}
    <div class="screenshot-title">6) 06-successful-retesting.png</div>
    <div class="screenshot-subtitle">Corrected feature successfully tested again</div>
    <div class="screenshot-img-container">
      <img src="${img06}">
    </div>
    <div class="screenshot-caption">
      The screenshot shows the application after the defect was corrected. Clicking "Cancel" during an active edit session now properly wipes all input fields clean, reverting the form cleanly to "Add New Product" mode. This confirms the correction passed retesting.
    </div>
  </div>

  <!-- Screenshot 07 -->
  <div class="screenshot-page">
    ${institutionalHeader}
    <div class="screenshot-title">7) 07-final-regression-result.png</div>
    <div class="screenshot-subtitle">Final passing unit tests and regression-testing result</div>
    <div class="screenshot-img-container">
      <img src="${img07}">
    </div>
    <div class="screenshot-caption">
      The screenshot shows the final testing results after the defect correction was implemented. All 5 test suites (13 unit tests) completed successfully with 100% pass rate, confirming that the correction did not break any existing functionality across the system.
    </div>
  </div>

  <!-- Screenshot 08 -->
  <div class="screenshot-page">
    ${institutionalHeader}
    <div class="screenshot-title">8) 08-github-commit</div>
    <div class="screenshot-subtitle">GitHub repository showing the testing and defect-correction commit</div>
    <div class="screenshot-img-container">
      <img src="${img08}">
    </div>
    <div class="screenshot-caption">
      The screenshot shows the GitHub repository commits page containing the latest Module 8 testing and defect-correction commit. It confirms that the corrected Vue.js project and testing-related files were committed to the same public repository used for Module 7.
    </div>
  </div>

</body>
</html>
`;

const tempHtml = path.join(PROJECT_DIR, 'report_institutional.html');
fs.writeFileSync(tempHtml, html, 'utf8');
console.log(`Saved institutional HTML to ${tempHtml}`);

console.log('Rendering PDF via Edge headless...');
const cmd = `"${EDGE_PATH}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${OUTPUT_PDF}" --no-pdf-header-footer "${tempHtml}"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Successfully generated institutional PDF: ${OUTPUT_PDF}`);
  if (fs.existsSync(OUTPUT_PDF)) {
    fs.copyFileSync(OUTPUT_PDF, ARTIFACT_PDF);
    console.log(`Copied to artifacts: ${ARTIFACT_PDF}`);
    const size = fs.statSync(OUTPUT_PDF).size;
    console.log(`PDF size: ${size} bytes`);
  }
} catch (e) {
  console.error(e);
  process.exit(1);
}
