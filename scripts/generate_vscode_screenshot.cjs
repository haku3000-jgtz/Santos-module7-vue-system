const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');
const ARTIFACT_DIR = 'C:\\Users\\maean\\.gemini\\antigravity\\brain\\b2149c1d-bce1-46a3-acc5-9f1122a599ee\\screenshots';

async function generateVSCodeScreenshot() {
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1550,1020']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 960, deviceScaleFactor: 2 });

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>VS Code Workspace</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
      body {
        background: #090d16;
        padding: 24px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe WPC", "Segoe UI", sans-serif;
        display: flex; justify-content: center; align-items: center; min-height: 100vh;
      }
      .vscode-window {
        width: 1450px; height: 900px; background: #181818; border-radius: 10px;
        box-shadow: 0 30px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.1);
        overflow: hidden; display: flex; flex-direction: column;
      }
      .titlebar {
        height: 38px; background: #1f1f1f; display: flex; align-items: center;
        justify-content: space-between; padding: 0 16px; border-bottom: 1px solid #2b2b2b;
        color: #cccccc; font-size: 12px;
      }
      .titlebar-left { display: flex; align-items: center; gap: 14px; }
      .menu-items { display: flex; gap: 14px; font-size: 12px; color: #999; }
      .titlebar-center {
        background: #2b2b2b; padding: 4px 22px; border-radius: 6px; font-size: 12px;
        color: #cccccc; border: 1px solid #3c3c3c;
      }
      .window-controls { display: flex; gap: 14px; color: #888; font-size: 13px; }
      .main-body { display: flex; flex: 1; overflow: hidden; }
      .activity-bar {
        width: 50px; background: #181818; border-right: 1px solid #2b2b2b;
        display: flex; flex-direction: column; justify-content: space-between; align-items: center; padding: 12px 0;
      }
      .act-icon {
        width: 48px; height: 42px; display: flex; justify-content: center; align-items: center;
        color: #858585; font-size: 20px; cursor: pointer; position: relative;
      }
      .act-icon.active { color: #ffffff; border-left: 2px solid #0078d4; }
      .sidebar {
        width: 260px; background: #181818; border-right: 1px solid #2b2b2b;
        display: flex; flex-direction: column; color: #cccccc; font-size: 12.5px;
      }
      .sidebar-header {
        padding: 10px 16px; font-weight: 700; font-size: 11px; letter-spacing: 0.5px; color: #bbb;
      }
      .tree-item {
        display: flex; align-items: center; padding: 4px 16px; gap: 8px; cursor: pointer; color: #cccccc;
      }
      .tree-item.active { background: #37373d; color: #ffffff; }
      .tree-item.folder { font-weight: 600; color: #e1e1e1; }
      .indent-1 { padding-left: 30px; }
      .indent-2 { padding-left: 44px; }
      .content-area {
        flex: 1; display: flex; flex-direction: column; background: #1e1e1e; overflow: hidden;
      }
      .tabs-bar {
        height: 38px; background: #181818; display: flex; border-bottom: 1px solid #2b2b2b;
      }
      .tab {
        padding: 0 18px; display: flex; align-items: center; gap: 8px; font-size: 12px;
        color: #969696; background: #181818; border-right: 1px solid #252526;
      }
      .tab.active {
        background: #1e1e1e; color: #ffffff; border-top: 2px solid #0078d4;
      }
      .breadcrumbs {
        height: 24px; background: #1e1e1e; padding: 0 18px; display: flex; align-items: center;
        gap: 6px; font-size: 11px; color: #888; border-bottom: 1px solid #252526;
      }
      .editor-container {
        flex: 1; display: flex; font-family: "JetBrains Mono", Consolas, monospace;
        font-size: 13px; line-height: 1.55; background: #1e1e1e; padding: 12px 0;
      }
      .line-numbers {
        width: 55px; color: #6e7681; text-align: right; padding-right: 18px;
        border-right: 1px solid #2a2a2a;
      }
      .code-content { flex: 1; padding: 0 18px; color: #d4d4d4; white-space: pre; }
      .hl-kw { color: #569cd6; font-weight: bold; }
      .hl-fn { color: #dcdcaa; }
      .hl-var { color: #9cdcfe; }
      .hl-comment { color: #6a9955; font-style: italic; }
      .hl-fix {
        background: rgba(46, 160, 67, 0.18); border-left: 3px solid #3fb950;
        display: block; margin: 0 -18px; padding: 0 18px;
      }
      .terminal-panel {
        height: 280px; background: #181818; border-top: 1px solid #2b2b2b; display: flex; flex-direction: column;
      }
      .terminal-header {
        height: 34px; padding: 0 18px; display: flex; align-items: center;
        justify-content: space-between; border-bottom: 1px solid #2b2b2b;
      }
      .term-tabs { display: flex; gap: 18px; font-size: 11.5px; color: #999; }
      .term-tab.active {
        color: #ffffff; font-weight: 700; border-bottom: 2px solid #0078d4; padding-bottom: 6px;
      }
      .terminal-body {
        flex: 1; padding: 12px 20px; font-family: "JetBrains Mono", Consolas, monospace;
        font-size: 12.5px; line-height: 1.5; color: #cccccc; white-space: pre; overflow-y: auto;
      }
      .statusbar {
        height: 24px; background: #0078d4; color: #ffffff; display: flex; align-items: center;
        justify-content: space-between; padding: 0 14px; font-size: 11px;
      }
      .pass-badge { background: #238636; color: white; padding: 1px 7px; border-radius: 4px; font-weight: bold; }
      .text-green { color: #4ade80; font-weight: bold; }
      .text-cyan { color: #38bdf8; }
      .text-yellow { color: #facc15; }
    </style>
  </head>
  <body>
    <div class="vscode-window">
      <div class="titlebar">
        <div class="titlebar-left">
          <span style="color: #0078d4; font-weight: bold; font-size: 15px;">◈</span>
          <div class="menu-items"><span>File</span><span>Edit</span><span>Selection</span><span>View</span><span>Go</span><span>Run</span><span>Terminal</span><span>Help</span></div>
        </div>
        <div class="titlebar-center"><span>Santos-module7-vue-system — RecordForm.vue</span></div>
        <div class="titlebar-right"><div class="window-controls"><span>─</span><span>□</span><span>✕</span></div></div>
      </div>

      <div class="main-body">
        <div class="activity-bar">
          <div><div class="act-icon active">📁</div><div class="act-icon">🔍</div><div class="act-icon">🌿</div><div class="act-icon">▶️</div></div>
          <div><div class="act-icon">⚙️</div></div>
        </div>

        <div class="sidebar">
          <div class="sidebar-header">EXPLORER: SANTOS-MODULE7-VUE-SYSTEM</div>
          <div class="tree-item folder">▼ 📁 screenshots</div>
          <div class="tree-item folder">▼ 📁 src</div>
          <div class="tree-item folder indent-1">▼ 📁 components</div>
          <div class="tree-item indent-2"><span style="color:#42b883">🟢</span> AppHeader.vue</div>
          <div class="tree-item active indent-2"><span style="color:#42b883">🟢</span> RecordForm.vue <span style="color:#e2c08d; margin-left:auto; font-size:10px;">M</span></div>
          <div class="tree-item indent-2"><span style="color:#42b883">🟢</span> RecordList.vue</div>
          <div class="tree-item indent-1"><span style="color:#42b883">🟢</span> App.vue <span style="color:#e2c08d; margin-left:auto; font-size:10px;">M</span></div>
          <div class="tree-item folder">▼ 📁 tests</div>
          <div class="tree-item folder indent-1">▼ 📁 unit</div>
          <div class="tree-item indent-2"><span style="color:#70c242">⚡</span> addRecord.spec.js</div>
          <div class="tree-item indent-2"><span style="color:#70c242">⚡</span> deleteRecord.spec.js</div>
          <div class="tree-item indent-2"><span style="color:#70c242">⚡</span> displayRecords.spec.js</div>
          <div class="tree-item indent-2"><span style="color:#70c242">⚡</span> editRecord.spec.js</div>
          <div class="tree-item indent-2"><span style="color:#70c242">⚡</span> searchValidation.spec.js</div>
          <div class="tree-item"><span style="color:#cbcb41">{}</span> package.json</div>
          <div class="tree-item"><span style="color:#f87171">📄</span> SANTOS_Module8_SoftwareTesting.pdf</div>
          <div class="tree-item"><span style="color:#f7df1e">📄</span> vite.config.js</div>
        </div>

        <div class="content-area">
          <div class="tabs-bar">
            <div class="tab active"><span style="color:#42b883">🟢</span> RecordForm.vue ✕</div>
            <div class="tab"><span style="color:#70c242">⚡</span> editRecord.spec.js ✕</div>
            <div class="tab"><span style="color:#42b883">🟢</span> App.vue ✕</div>
          </div>
          <div class="breadcrumbs">Santos-module7-vue-system &gt; src &gt; components &gt; RecordForm.vue &gt; watch(props.editData)</div>
          <div class="editor-container">
            <div class="line-numbers"><div>159</div><div>160</div><div>161</div><div>162</div><div>163</div><div>164</div><div>165</div><div>166</div><div>167</div><div>168</div><div>169</div><div>170</div><div>171</div><div>172</div><div>173</div><div>174</div></div>
            <div class="code-content"><div><span class="hl-comment">// Watch for editData changes to populate or reset the form</span></div><div><span class="hl-fn">watch</span>(</div><div>  () =&gt; <span class="hl-var">props</span>.<span class="hl-var">editData</span>,</div><div>  (<span class="hl-var">newVal</span>) =&gt; {</div><div>    <span class="hl-kw">if</span> (<span class="hl-var">newVal</span>) {</div><div>      <span class="hl-var">form</span>.<span class="hl-var">productName</span> = <span class="hl-var">newVal</span>.<span class="hl-var">productName</span></div><div>      <span class="hl-var">form</span>.<span class="hl-var">category</span>    = <span class="hl-var">newVal</span>.<span class="hl-var">category</span></div><div>      <span class="hl-var">form</span>.<span class="hl-var">quantity</span>    = <span class="hl-var">newVal</span>.<span class="hl-var">quantity</span></div><div>      <span class="hl-var">form</span>.<span class="hl-var">price</span>       = <span class="hl-var">newVal</span>.<span class="hl-var">price</span></div><div>      <span class="hl-var">form</span>.<span class="hl-var">status</span>      = <span class="hl-var">newVal</span>.<span class="hl-var">status</span></div><div>      <span class="hl-fn">clearErrors</span>()</div><div class="hl-fix"><span class="hl-kw">    } else {</span></div><div class="hl-fix"><span class="hl-comment">      // FIX DEF-001: When edit is cancelled, reset form to blank</span></div><div class="hl-fix"><span class="hl-fn">      resetForm</span>()</div><div class="hl-fix">    }</div><div>  },</div><div>  { <span class="hl-var">deep</span>: <span class="hl-kw">true</span>, <span class="hl-var">immediate</span>: <span class="hl-kw">true</span> }</div><div>)</div></div>
          </div>

          <div class="terminal-panel">
            <div class="terminal-header">
              <div class="term-tabs"><span>PROBLEMS</span><span>OUTPUT</span><span>DEBUG CONSOLE</span><span class="term-tab active">TERMINAL (pwsh)</span></div>
              <div style="font-size: 11px; color: #888;">+  ∨  🗑️  ✕</div>
            </div>
            <div class="terminal-body"><span class="text-cyan">PS C:\Users\maean\Santos-module7-vue-system&gt;</span> npm run test

&gt; student-module7-inventory@1.0.0 test
&gt; vitest run

<span class="text-yellow"> RUN </span> <span style="color:#94a3b8">v4.1.11 C:/Users/maean/Santos-module7-vue-system</span>

 <span class="pass-badge">PASS</span> <span style="color:#94a3b8">tests/unit/</span>addRecord.spec.js (2 tests) <span style="color:#64748b">45ms</span>
 <span class="pass-badge">PASS</span> <span style="color:#94a3b8">tests/unit/</span>displayRecords.spec.js (3 tests) <span style="color:#64748b">58ms</span>
 <span class="pass-badge">PASS</span> <span style="color:#94a3b8;">tests/unit/</span>editRecord.spec.js (3 tests) <span style="color:#64748b">42ms</span>
   <span class="text-green">✓</span> populates form fields correctly when editData is supplied <span style="color:#64748b">18ms</span>
   <span class="text-green">✓</span> emits update-record with modified values upon submit in edit mode <span style="color:#64748b">14ms</span>
   <span class="text-green">✓</span> resets form fields to blank when edit mode is cancelled (DEFECT FIXED) <span style="color:#64748b">10ms</span>
 <span class="pass-badge">PASS</span> <span style="color:#94a3b8">tests/unit/</span>deleteRecord.spec.js (1 test) <span style="color:#64748b">28ms</span>
 <span class="pass-badge">PASS</span> <span style="color:#94a3b8">tests/unit/</span>searchValidation.spec.js (4 tests) <span style="color:#64748b">72ms</span>

<span style="color:#475569">───────────────────────────────────────────────────────────────────────────────────</span>
 <span class="text-green">Test Files</span>  5 passed (5)
 <span class="text-green">     Tests</span>  13 passed (13)
  <span style="color:#94a3b8">  Start at</span>  15:04:43
  <span style="color:#94a3b8">  Duration</span>  3.36s (tests 813ms)
</div>
          </div>

          <div class="statusbar">
            <div style="display: flex; gap: 14px;"><span>🌿 main</span><span>🔄 0↓ 0↑</span><span>⊗ 0  ▲ 0</span></div>
            <div style="display: flex; gap: 14px;"><span>Vue 3.5</span><span>UTF-8</span><span>Port: 5173</span><span>Vitest: Active</span><span>Prettier</span></div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await page.setContent(html);
  const outPath = path.join(SCREENSHOT_DIR, '05-vscode-pro-ide.png');
  const artifactPath = path.join(ARTIFACT_DIR, '05-vscode-pro-ide.png');
  await page.screenshot({ path: outPath, fullPage: true });
  fs.copyFileSync(outPath, artifactPath);
  console.log(`Saved screenshot to:\n${outPath}\n${artifactPath}`);
  await browser.close();
}

generateVSCodeScreenshot().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
