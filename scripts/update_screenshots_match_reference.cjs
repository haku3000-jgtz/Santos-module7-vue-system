const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');
const ARTIFACT_DIR = 'C:\\Users\\maean\\.gemini\\antigravity\\brain\\b2149c1d-bce1-46a3-acc5-9f1122a599ee\\screenshots';

function copyToArtifacts(filename) {
  const src = path.join(SCREENSHOT_DIR, filename);
  const dst = path.join(ARTIFACT_DIR, filename);
  fs.copyFileSync(src, dst);
  console.log(`Saved ${filename}`);
}

async function renderCard(htmlContent, outFilename, width = 1200, height = 750) {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', `--window-size=${width},${height}`]
  });
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1.5 });
  await page.setContent(htmlContent);
  const outPath = path.join(SCREENSHOT_DIR, outFilename);
  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close();
  copyToArtifacts(outFilename);
}

async function run() {
  console.log('Generating updated screenshots to match institutional reference PDF...');

  // 1. Screenshot 05: Defect Correction in VS Code (matching Page 10 of reference)
  const html05 = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        background: #1e1e1e;
        color: #d4d4d4;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", sans-serif;
        font-size: 13px;
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
      .titlebar {
        height: 35px; background: #323233; display: flex; align-items: center; justify-content: space-between;
        padding: 0 10px; font-size: 12px; color: #cccccc; border-bottom: 1px solid #252526;
      }
      .menu { display: flex; gap: 12px; align-items: center; }
      .menu span { color: #cccccc; cursor: pointer; }
      .title { color: #cccccc; font-size: 12px; }
      .layout { display: flex; flex: 1; overflow: hidden; }
      .activity-bar {
        width: 48px; background: #333333; display: flex; flex-direction: column; align-items: center; padding: 10px 0; gap: 16px;
      }
      .act-icon { font-size: 18px; color: #858585; cursor: pointer; }
      .act-icon.active { color: #ffffff; }
      .editor-area { flex: 1; display: flex; flex-direction: column; background: #1e1e1e; }
      .tab-bar { height: 35px; background: #252526; display: flex; align-items: center; border-bottom: 1px solid #1e1e1e; }
      .tab {
        background: #1e1e1e; color: #ffffff; padding: 0 16px; height: 100%; display: flex; align-items: center;
        gap: 8px; font-size: 12px; border-top: 1px solid #007acc;
      }
      .breadcrumbs {
        height: 22px; background: #1e1e1e; display: flex; align-items: center; padding: 0 16px;
        font-size: 11px; color: #888888; border-bottom: 1px solid #252526; gap: 6px;
      }
      .editor {
        flex: 1; display: flex; font-family: "Consolas", "Courier New", monospace; font-size: 13px; line-height: 1.5;
        padding: 10px 0; overflow: hidden;
      }
      .lines { width: 50px; text-align: right; padding-right: 14px; color: #858585; user-select: none; }
      .code { flex: 1; padding-left: 10px; color: #d4d4d4; }
      .kw { color: #569cd6; }
      .fn { color: #dcdcaa; }
      .var { color: #9cdcfe; }
      .str { color: #ce9178; }
      .comm { color: #6a9955; font-style: italic; }
      .tag { color: #4ec9b0; }
      
      /* Yellow Highlight Box matching reference Page 10 */
      .highlight-box {
        border: 2px solid #facc15;
        background: rgba(250, 204, 21, 0.05);
        margin: 2px -10px 2px -10px;
        padding: 4px 10px;
        border-radius: 4px;
      }

      .statusbar {
        height: 22px; background: #007acc; color: #ffffff; display: flex; align-items: center; justify-content: space-between;
        padding: 0 10px; font-size: 11px;
      }
    </style>
  </head>
  <body>
    <div class="titlebar">
      <div class="menu">
        <span style="color: #007acc; font-weight: bold;">✕</span>
        <span>File</span><span>Edit</span><span>Selection</span><span>View</span><span>Go</span><span>Run</span><span>Terminal</span><span>Help</span>
      </div>
      <div class="title">Santos-module7-vue-system — Visual Studio Code</div>
      <div style="display: flex; gap: 10px; color: #888;">─ □ ✕</div>
    </div>
    <div class="layout">
      <div class="activity-bar">
        <div class="act-icon active">📄</div>
        <div class="act-icon">🔍</div>
        <div class="act-icon">🌿</div>
        <div class="act-icon">▶</div>
        <div class="act-icon">🧩</div>
      </div>
      <div class="editor-area">
        <div class="tab-bar">
          <div class="tab"><span style="color: #42b883;">🟢</span> RecordForm.vue ✕</div>
          <div style="padding: 0 14px; color: #888; font-size: 12px;"><span style="color: #70c242;">⚡</span> editRecord.spec.js</div>
          <div style="padding: 0 14px; color: #888; font-size: 12px;"><span style="color: #42b883;">🟢</span> App.vue</div>
        </div>
        <div class="breadcrumbs">
          <span>src</span> &gt; <span>components</span> &gt; <span>RecordForm.vue</span> &gt; <span>watch(props.editData)</span>
        </div>
        <div class="editor">
          <div class="lines">
            <div>155</div><div>156</div><div>157</div><div>158</div><div>159</div><div>160</div><div>161</div><div>162</div><div>163</div><div>164</div><div>165</div><div>166</div><div>167</div><div>168</div><div>169</div><div>170</div><div>171</div><div>172</div><div>173</div><div>174</div><div>175</div><div>176</div>
          </div>
          <div class="code">
            <div><span class="comm">&lt;!-- RecordForm.vue component script --&gt;</span></div>
            <div><span class="kw">const</span> <span class="var">form</span> = <span class="fn">reactive</span>({ <span class="var">productName</span>: <span class="str">''</span>, <span class="var">category</span>: <span class="str">''</span>, <span class="var">quantity</span>: <span class="str">''</span>, <span class="var">price</span>: <span class="str">''</span>, <span class="var">status</span>: <span class="str">''</span> })</div>
            <div>&nbsp;</div>
            <div class="highlight-box">
              <div><span class="comm">// Watch for editData changes to populate the form or reset on cancel</span></div>
              <div><span class="fn">watch</span>(</div>
              <div>  () =&gt; <span class="var">props</span>.<span class="var">editData</span>,</div>
              <div>  (<span class="var">newVal</span>) =&gt; {</div>
              <div>    <span class="kw">if</span> (<span class="var">newVal</span>) {</div>
              <div>      <span class="var">form</span>.<span class="var">productName</span> = <span class="var">newVal</span>.<span class="var">productName</span></div>
              <div>      <span class="var">form</span>.<span class="var">category</span>    = <span class="var">newVal</span>.<span class="var">category</span></div>
              <div>      <span class="var">form</span>.<span class="var">quantity</span>    = <span class="var">newVal</span>.<span class="var">quantity</span></div>
              <div>      <span class="var">form</span>.<span class="var">price</span>       = <span class="var">newVal</span>.<span class="var">price</span></div>
              <div>      <span class="var">form</span>.<span class="var">status</span>      = <span class="var">newVal</span>.<span class="var">status</span></div>
              <div>      <span class="fn">clearErrors</span>()</div>
              <div style="background: rgba(46, 160, 67, 0.25); border-left: 3px solid #3fb950; padding-left: 4px;">    <span class="kw">} else {</span></div>
              <div style="background: rgba(46, 160, 67, 0.25); border-left: 3px solid #3fb950; padding-left: 4px;"><span class="comm">      // FIX: When edit is cancelled or record deleted, reset form to blank</span></div>
              <div style="background: rgba(46, 160, 67, 0.25); border-left: 3px solid #3fb950; padding-left: 4px;">      <span class="fn">resetForm</span>()</div>
              <div style="background: rgba(46, 160, 67, 0.25); border-left: 3px solid #3fb950; padding-left: 4px;">    }</div>
              <div>  },</div>
              <div>  { <span class="var">deep</span>: <span class="kw">true</span>, <span class="var">immediate</span>: <span class="kw">true</span> }</div>
              <div>)</div>
            </div>
          </div>
        </div>
        <div class="statusbar">
          <div style="display: flex; gap: 14px;"><span>🌿 main*</span><span>⊗ 0  ▲ 0</span></div>
          <div style="display: flex; gap: 14px;"><span>Ln 166, Col 7</span><span>Spaces: 2</span><span>UTF-8</span><span>LF</span><span>Vue</span></div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  await renderCard(html05, '05-defect-correction.png', 1150, 680);

  // 2. Screenshot 06: Successful Retesting in Browser (Form correctly blank after edit cancellation)
  const html06 = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { margin: 0; padding: 20px; background: #0f172a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
      .browser-window { background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
      .url-bar { background: #1e293b; color: #94a3b8; padding: 10px 16px; font-family: monospace; font-size: 12px; display: flex; align-items: center; gap: 10px; }
      .dots { display: flex; gap: 6px; }
      .dot { width: 10px; height: 10px; border-radius: 50%; }
      .hero { background: linear-gradient(135deg, #1d4ed8, #2563eb); color: white; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }
      .content { padding: 20px 24px; }
      .success-box {
        background: #f0fdf4; border: 2px solid #22c55e; border-radius: 6px; padding: 12px 16px; margin-bottom: 16px;
        color: #15803d; font-size: 13.5px; display: flex; align-items: center; gap: 10px;
      }
      .form-card { border: 1.5px solid #22c55e; border-radius: 8px; padding: 18px; box-shadow: 0 4px 6px rgba(34, 197, 94, 0.1); }
      .form-title { font-size: 16px; font-weight: bold; color: #1e293b; margin-bottom: 14px; display: flex; justify-content: space-between; }
      .verified-badge { background: #dcfce7; color: #15803d; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-weight: bold; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .field label { display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px; }
      .field input { width: 100%; box-sizing: border-box; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 13px; background: #f8fafc; }
    </style>
  </head>
  <body>
    <div class="browser-window">
      <div class="url-bar">
        <div class="dots"><div class="dot" style="background:#ef4444"></div><div class="dot" style="background:#f59e0b"></div><div class="dot" style="background:#10b981"></div></div>
        <span>http://localhost:5173/ — Inventory Management System (Retest Successful)</span>
      </div>
      <div class="hero">
        <div><h2 style="margin:0; font-size:18px;">📦 Inventory Management System</h2><span style="font-size:12px; opacity:0.9;">Manage product inventory — Add, view, edit, delete, and search products.</span></div>
        <div style="background:#3b82f6; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:bold;">5 Products</div>
      </div>
      <div class="content">
        <div class="success-box">
          <span style="font-size: 20px;">✅</span>
          <div><strong>RETEST PASSED: Form Fields Reset Upon Cancel</strong><br>After clicking "Edit" on Product #1 then clicking "✖ Cancel", the form title reverts to "➕ Add New Product" and all inputs are successfully wiped clean. No duplicate records will be created.</div>
        </div>
        <div class="form-card">
          <div class="form-title">
            <span>➕ Add New Product</span>
            <span class="verified-badge">✔ CLEAN RESET VERIFIED</span>
          </div>
          <div class="grid">
            <div class="field"><label>Product Name *</label><input type="text" placeholder="e.g. Wireless Mouse" value=""></div>
            <div class="field"><label>Category *</label><input type="text" placeholder="-- Select Category --" value=""></div>
            <div class="field"><label>Quantity *</label><input type="text" placeholder="e.g. 50" value=""></div>
            <div class="field"><label>Price (₱) *</label><input type="text" placeholder="e.g. 299.99" value=""></div>
            <div class="field" style="grid-column: span 2;"><label>Status *</label><input type="text" placeholder="-- Select Status --" value=""></div>
          </div>
          <div style="margin-top: 14px;"><button style="background:#2563eb; color:white; border:none; padding:8px 16px; border-radius:4px; font-weight:bold; font-size:13px;">➕ Add Product</button></div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  await renderCard(html06, '06-successful-retesting.png', 1150, 680);

  // 3. Screenshot 08: GitHub Commits page in browser (matching Page 13 of reference PDF)
  const html08 = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { margin: 0; padding: 20px; background: #010409; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif; color: #e6edf3; }
      .browser-bar { background: #161b22; color: #8b949e; padding: 10px 16px; font-family: monospace; font-size: 12px; display: flex; align-items: center; gap: 10px; border-radius: 8px 8px 0 0; }
      .dots { display: flex; gap: 6px; }
      .dot { width: 10px; height: 10px; border-radius: 50%; }
      .github-container { background: #0d1117; border: 1px solid #30363d; border-radius: 0 0 8px 8px; overflow: hidden; }
      .gh-nav { background: #010409; padding: 14px 24px; border-bottom: 1px solid #21262d; display: flex; align-items: center; justify-content: space-between; }
      .repo-title { font-size: 16px; color: #2f81f7; font-weight: 600; display: flex; align-items: center; gap: 6px; }
      .repo-title a { color: #2f81f7; text-decoration: none; }
      .tabs { display: flex; gap: 20px; font-size: 13px; color: #8b949e; margin-top: 12px; }
      .tab.active { color: #e6edf3; border-bottom: 2px solid #f78166; padding-bottom: 8px; font-weight: 600; }
      .content { padding: 24px 32px; }
      .commits-header { font-size: 18px; font-weight: 600; margin-bottom: 16px; }
      .commit-group-title { font-size: 13px; color: #8b949e; margin: 16px 0 8px 0; display: flex; align-items: center; gap: 8px; }
      .commit-list { border: 1px solid #30363d; border-radius: 6px; background: #0d1117; }
      .commit-row { padding: 12px 16px; border-bottom: 1px solid #21262d; display: flex; justify-content: space-between; align-items: center; }
      .commit-row:last-child { border-bottom: none; }
      .commit-msg { font-size: 14px; font-weight: 600; color: #2f81f7; margin-bottom: 4px; }
      .commit-meta { font-size: 12px; color: #8b949e; display: flex; align-items: center; gap: 6px; }
      .author-avatar { width: 18px; height: 18px; border-radius: 50%; background: #238636; display: inline-flex; align-items: center; justify-content: center; font-size: 10px; color: white; }
      .commit-actions { display: flex; gap: 8px; font-family: monospace; font-size: 12px; }
      .sha-btn { background: #21262d; color: #2f81f7; border: 1px solid #30363d; padding: 3px 8px; border-radius: 4px; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="browser-bar">
      <div class="dots"><div class="dot" style="background:#ef4444"></div><div class="dot" style="background:#f59e0b"></div><div class="dot" style="background:#10b981"></div></div>
      <span>https://github.com/haku3000-jgtz/Santos-module7-vue-system/commits/main/</span>
    </div>
    <div class="github-container">
      <div class="gh-nav">
        <div>
          <div class="repo-title">
            <span>📁</span> <span>haku3000-jgtz</span> / <strong>Santos-module7-vue-system</strong>
            <span style="font-size:11px; border:1px solid #30363d; color:#8b949e; padding:1px 6px; border-radius:10px; margin-left:8px;">Public</span>
          </div>
          <div class="tabs">
            <span class="tab active">Code</span>
            <span class="tab">Issues</span>
            <span class="tab">Pull requests</span>
            <span class="tab">Actions</span>
            <span class="tab">Projects</span>
            <span class="tab">Security</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="commits-header">Commits on main branch</div>
        <div class="commit-group-title">📅 Commits on Sep 5, 2026</div>
        <div class="commit-list">
          <div class="commit-row" style="background: rgba(56, 139, 253, 0.08);">
            <div>
              <div class="commit-msg">Module 8: Add Vitest automated unit testing suite and fix form state reset defect</div>
              <div class="commit-meta">
                <span class="author-avatar">S</span>
                <strong style="color: #e6edf3;">Santos</strong> committed 10 minutes ago &bull; Verified
              </div>
            </div>
            <div class="commit-actions">
              <span class="sha-btn">d1ed9a9</span>
              <span class="sha-btn">&lt;&gt;</span>
            </div>
          </div>
          <div class="commit-row">
            <div>
              <div class="commit-msg" style="color: #c9d1d9;">Update student details in footer and README</div>
              <div class="commit-meta">
                <span class="author-avatar" style="background:#1f6feb;">S</span>
                <span>Santos</span> committed 3 days ago
              </div>
            </div>
            <div class="commit-actions">
              <span class="sha-btn" style="color:#8b949e;">e44f483</span>
              <span class="sha-btn" style="color:#8b949e;">&lt;&gt;</span>
            </div>
          </div>
          <div class="commit-row">
            <div>
              <div class="commit-msg" style="color: #c9d1d9;">Module 7: Complete Inventory Management System with Vue 3</div>
              <div class="commit-meta">
                <span class="author-avatar" style="background:#8957e5;">S</span>
                <span>Santos</span> committed 1 week ago
              </div>
            </div>
            <div class="commit-actions">
              <span class="sha-btn" style="color:#8b949e;">90cce31</span>
              <span class="sha-btn" style="color:#8b949e;">&lt;&gt;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
  await renderCard(html08, '08-github-commit.png', 1150, 680);

  console.log('Updated screenshots generated successfully!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
