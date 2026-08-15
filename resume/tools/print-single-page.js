const puppeteer = require('puppeteer');
const fs = require('fs');

// Usage: node print-single-page.js <url-or-filepath> [output.pdf] [scale]
// Example: node print-single-page.js file:///Users/sakuraluo/.../personal.html resume-single.pdf 0.92

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error('Usage: node print-single-page.js <url-or-filepath> [output.pdf] [scale]');
    process.exit(2);
  }

  const target = args[0];
  const out = args[1] || 'resume-single.pdf';
  const scale = parseFloat(args[2]) || 0.92;

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(target, { waitUntil: 'networkidle0' });

  // print to PDF with given scale; try to force single page by shrinking
  await page.pdf({ path: out, format: 'A4', printBackground: true, scale });

  await browser.close();
  console.log('Saved', out);
}

main().catch(err => { console.error(err); process.exit(1); });
