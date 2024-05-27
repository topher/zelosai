import puppeteer from 'puppeteer';

async function generatePDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent('<h1>Hello, PDF!</h1>');
    await page.pdf({ path: 'output.pdf', format: 'A4' });
    await browser.close();
}

generatePDF();
