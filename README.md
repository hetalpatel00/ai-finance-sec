# AI Finance — SEC Web Application Project

## Project overview
A responsive educational finance dashboard that calculates portfolio profit/loss, total return, estimated annualized return, comparison against a user-entered benchmark, sample-series volatility, and rule-based explanations.

## Technology
- HTML5: page structure
- CSS3: responsive styling
- JavaScript: calculations and interaction
- Chart.js (loaded from CDN): charts
- GitHub: source-code hosting (optional deployment can be added)

## Important limitations
- The app does not connect to live market prices.
- The price series used for volatility is fictional sample data.
- The insight panel is rule-based and does not call an external AI model. Describe it as rule-based educational insights unless you add a genuine AI API integration.
- This is not financial advice.

## Run locally
1. Install Visual Studio Code and Google Chrome.
2. Extract this folder.
3. Open VS Code → File → Open Folder → choose `AI_Finance_SEC_Project`.
4. Open `index.html`.
5. Easiest option: double-click `index.html` in File Explorer to open it in Chrome.
6. Click **Load sample data** or change inputs, then click **Analyze my portfolio**.
7. Internet is required to load Chart.js from its CDN.

## GitHub upload (beginner method)
1. Create/sign into an account at https://github.com/.
2. Click **+** → **New repository**.
3. Name it `ai-finance-sec-project`; choose Public or Private according to your college requirements.
4. Click **Create repository**.
5. On the repository page choose **Add file → Upload files**.
6. Upload `index.html`, `style.css`, `script.js`, and `README.md`; commit changes.
7. To publish the site, open repository **Settings → Pages**, select deploy from the `main` branch and `/ (root)`, then Save. Wait for GitHub Pages to provide the live URL.

## Five outputs to demonstrate
1. Current portfolio value
2. Profit/loss and total return
3. Estimated annualized return
4. Benchmark comparison
5. Sample annualized volatility plus explanatory insights

## Suggested screenshot checklist
Capture the full dashboard, changed input values, the portfolio comparison chart, the sample price chart, and the insights/risk section. Put your own screenshots into the `screenshots` folder and insert them in the report/PPT.
