Print single-page PDF helper

Install:

```bash
# from project resume folder
npm init -y
npm install puppeteer
```

Usage:

```bash
node tools/print-single-page.js <url-or-filepath> [output.pdf] [scale]

# examples
node tools/print-single-page.js file:///Users/sakuraluo/Documents/1.Projects/Website/resume/content/zh/personal.html resume-single.pdf 0.92
node tools/print-single-page.js http://localhost:1313/zh/personal resume-single.pdf 0.90
```

Tune `scale` between 0.85 and 0.95 to fit content on one page. If the page is still multi-page, lower `scale` until single-page output is produced.
