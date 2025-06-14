import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'No url' });
  }

  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
      // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 20000 });
    const screenshot = await page.screenshot({ encoding: 'base64', fullPage: false });
    await browser.close();
    return res.status(200).json({ screenshot: `data:image/png;base64,${screenshot}` });
  } catch (e: any) {
    if (browser) await browser.close();
    console.error('Screenshot error:', e.message);
    return res.status(500).json({ error: 'Failed to capture screenshot', detail: e.message });
  }
} 