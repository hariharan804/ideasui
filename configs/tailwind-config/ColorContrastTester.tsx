<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Color Contrast Tester</title>
  <style>
    :root {
      --color-primary-50: #faf7fd;
      --color-primary-100: #f1e9fa;
      --color-primary-200: #d1b3f3;
      --color-primary-300: #b77ff3;
      --color-primary-400: #9c4af6;
      --color-primary-500: #861afd;
      --color-primary-600: #610fbb;
      --color-primary-700: #480890;
      --color-primary-800: #300362;
      --color-primary-900: #1d003d;
      --color-primary-950: #0f001f;
      
      --color-secondary-50: #fafcf8;
      --color-secondary-100: #f3f9eb;
      --color-secondary-200: #dff3c9;
      --color-secondary-300: #c8f09d;
      --color-secondary-400: #b0ef6b;
      --color-secondary-500: #9df33e;
      --color-secondary-600: #77d311;
      --color-secondary-700: #5da909;
      --color-secondary-800: #427b03;
      --color-secondary-900: #284c00;
      --color-secondary-950: #152800;
      
      --color-success-50: #f7fcf9;
      --color-success-100: #d7f3e0;
      --color-success-200: #a3eaba;
      --color-success-300: #71e999;
      --color-success-400: #3dea76;
      --color-success-500: #0fef59;
      --color-success-600: #0da540;
      --color-success-700: #06792c;
      --color-success-800: #025a1f;
      --color-success-900: #003d14;
      --color-success-950: #001f0a;
      
      --color-warning-50: #fdfaf7;
      --color-warning-100: #faf4ea;
      --color-warning-200: #f6e2c6;
      --color-warning-300: #f5ce96;
      --color-warning-400: #f7b962;
      --color-warning-500: #fda933;
      --color-warning-600: #d28211;
      --color-warning-700: #a86609;
      --color-warning-800: #7a4903;
      --color-warning-900: #4b2c00;
      --color-warning-950: #271700;
      
      --color-error-50: #fcf7f7;
      --color-error-100: #f9eaea;
      --color-error-200: #f1b5b5;
      --color-error-300: #f08383;
      --color-error-400: #f14f4f;
      --color-error-500: #f72020;
      --color-error-600: #bb0f0f;
      --color-error-700: #900808;
      --color-error-800: #620303;
      --color-error-900: #3d0000;
      --color-error-950: #1f0000;
      
      --color-info-50: #f8f9fc;
      --color-info-100: #eaeff9;
      --color-info-200: #b7caef;
      --color-info-300: #87a9ec;
      --color-info-400: #5487ec;
      --color-info-500: #266af1;
      --color-info-600: #0f49bb;
      --color-info-700: #083590;
      --color-info-800: #032262;
      --color-info-900: #00153d;
      --color-info-950: #000a1f;
      
      --color-neutral-50: #fafafa;
      --color-neutral-100: #f5f4f5;
      --color-neutral-200: #e5e4e7;
      --color-neutral-300: #d4d1d6;
      --color-neutral-400: #a39cab;
      --color-neutral-500: #72667e;
      --color-neutral-600: #51485b;
      --color-neutral-700: #3f3749;
      --color-neutral-800: #26202c;
      --color-neutral-900: #17131b;
      --color-neutral-950: #0a080c;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--color-neutral-50);
      padding: 2rem;
    }
    
    h1 {
      color: var(--color-neutral-950);
      margin-bottom: 2rem;
      font-size: 2rem;
    }
    
    h2 {
      color: var(--color-neutral-900);
      margin-top: 2rem;
      margin-bottom: 1rem;
      font-size: 1.5rem;
      border-bottom: 2px solid var(--color-neutral-200);
      padding-bottom: 0.5rem;
    }
    
    .test-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    
    .test-card {
      border-radius: 8px;
      padding: 1.5rem;
      border: 1px solid var(--color-neutral-200);
    }
    
    .test-label {
      font-weight: 600;
      font-size: 0.85rem;
      margin-bottom: 0.5rem;
      opacity: 0.8;
    }
    
    /* Primary Tests */
    .primary-50-on-neutral { background: var(--color-primary-50); color: var(--color-neutral-900); }
    .primary-500-on-neutral { background: var(--color-primary-500); color: var(--color-neutral-50); }
    .primary-600-on-neutral { background: var(--color-primary-600); color: var(--color-neutral-50); }
    
    /* Secondary Tests */
    .secondary-500-on-neutral { background: var(--color-secondary-500); color: var(--color-secondary-950); }
    .secondary-600-on-neutral { background: var(--color-secondary-600); color: var(--color-neutral-50); }
    
    /* Success Tests */
    .success-50-on-neutral { background: var(--color-success-50); color: var(--color-success-950); }
    .success-500-on-neutral { background: var(--color-success-500); color: var(--color-neutral-950); }
    .success-600-on-neutral { background: var(--color-success-600); color: var(--color-neutral-50); }
    
    /* Warning Tests */
    .warning-50-on-neutral { background: var(--color-warning-50); color: var(--color-warning-950); }
    .warning-500-on-neutral { background: var(--color-warning-500); color: var(--color-warning-950); }
    .warning-600-on-neutral { background: var(--color-warning-600); color: var(--color-neutral-50); }
    
    /* Error Tests */
    .error-50-on-neutral { background: var(--color-error-50); color: var(--color-error-950); }
    .error-500-on-neutral { background: var(--color-error-500); color: var(--color-neutral-50); }
    .error-600-on-neutral { background: var(--color-error-600); color: var(--color-neutral-50); }
    
    /* Info Tests */
    .info-50-on-neutral { background: var(--color-info-50); color: var(--color-info-950); }
    .info-500-on-neutral { background: var(--color-info-500); color: var(--color-neutral-50); }
    .info-600-on-neutral { background: var(--color-info-600); color: var(--color-neutral-50); }
    
    .copy-btn {
      background: var(--color-primary-500);
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
      margin-top: 0.5rem;
    }
    
    .copy-btn:hover {
      background: var(--color-primary-600);
    }
    
    .hex-code {
      font-family: monospace;
      font-size: 0.85rem;
      opacity: 0.8;
      word-break: break-all;
    }
    
    .instruction {
      background: var(--color-info-50);
      border-left: 4px solid var(--color-info-500);
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 2rem;
      color: var(--color-info-900);
    }
  </style>
</head>
<body>
  <h1>🎨 Color Contrast Testing</h1>
  
  <div class="instruction">
    <strong>How to use:</strong> Copy the hex codes below and test them in 
    <a href="https://webaim.org/resources/contrastchecker/" target="_blank" style="color: var(--color-info-600); font-weight: 600;">
      WebAIM Contrast Checker
    </a>
    or use your browser's accessibility inspector.
  </div>

  <h2>Primary (Purple)</h2>
  <div class="test-grid">
    <div class="test-card primary-50-on-neutral">
      <div class="test-label">Primary 50 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#faf7fd on #72667e</div>
    </div>
    <div class="test-card primary-500-on-neutral">
      <div class="test-label">Primary 500 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#861afd on #fafafa</div>
    </div>
    <div class="test-card primary-600-on-neutral">
      <div class="test-label">Primary 600 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#610fbb on #fafafa</div>
    </div>
  </div>

  <h2>Secondary (Green)</h2>
  <div class="test-grid">
    <div class="test-card secondary-500-on-neutral">
      <div class="test-label">Secondary 500 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#9df33e on #fafafa</div>
    </div>
    <div class="test-card secondary-600-on-neutral">
      <div class="test-label">Secondary 600 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#77d311 on #fafafa</div>
    </div>
  </div>

  <h2>Success (Green)</h2>
  <div class="test-grid">
    <div class="test-card success-50-on-neutral">
      <div class="test-label">Success 50 on Success 950</div>
      <div>Normal Text</div>
      <div class="hex-code">#f7fcf9 on #001f0a</div>
    </div>
    <div class="test-card success-500-on-neutral">
      <div class="test-label">Success 500 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#0fef59 on #fafafa</div>
    </div>
    <div class="test-card success-600-on-neutral">
      <div class="test-label">Success 600 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#0da540 on #fafafa</div>
    </div>
  </div>

  <h2>Warning (Orange)</h2>
  <div class="test-grid">
    <div class="test-card warning-50-on-neutral">
      <div class="test-label">Warning 50 on Warning 950</div>
      <div>Normal Text</div>
      <div class="hex-code">#fdfaf7 on #271700</div>
    </div>
    <div class="test-card warning-500-on-neutral">
      <div class="test-label">Warning 500 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#fda933 on #fafafa</div>
    </div>
    <div class="test-card warning-600-on-neutral">
      <div class="test-label">Warning 600 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#d28211 on #fafafa</div>
    </div>
  </div>

  <h2>Error (Red)</h2>
  <div class="test-grid">
    <div class="test-card error-50-on-neutral">
      <div class="test-label">Error 50 on Error 950</div>
      <div>Normal Text</div>
      <div class="hex-code">#fcf7f7 on #1f0000</div>
    </div>
    <div class="test-card error-500-on-neutral">
      <div class="test-label">Error 500 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#f72020 on #fafafa</div>
    </div>
    <div class="test-card error-600-on-neutral">
      <div class="test-label">Error 600 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#bb0f0f on #fafafa</div>
    </div>
  </div>

  <h2>Info (Blue)</h2>
  <div class="test-grid">
    <div class="test-card info-50-on-neutral">
      <div class="test-label">Info 50 on Info 950</div>
      <div>Normal Text</div>
      <div class="hex-code">#f8f9fc on #000a1f</div>
    </div>
    <div class="test-card info-500-on-neutral">
      <div class="test-label">Info 500 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#266af1 on #fafafa</div>
    </div>
    <div class="test-card info-600-on-neutral">
      <div class="test-label">Info 600 on Neutral</div>
      <div>Normal Text Size</div>
      <div class="hex-code">#0f49bb on #fafafa</div>
    </div>
  </div>
</body>
</html>