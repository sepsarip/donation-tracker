import puppeteer from 'puppeteer';
import process from 'process';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const CAMPAIGN_URL = process.env.CAMPAIGN_URL;
const INTERVAL_MS = 5 * 60 * 1000; // 5 menit

let lastDonation = '';

async function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    if (!result.ok) {
      console.error(`Telegram API error: ${result.description}`);
    } else {
      console.info('Telegram message sent successfully.');
    }
  } catch (error) {
    console.error(`Failed to send Telegram message:, ${error.message}`);
  }
}

async function checkDonation() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
    ],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  );

  console.info(
    `[${new Date().toLocaleTimeString()}] Fetching donation info...`
  );

  try {
    await page.goto(CAMPAIGN_URL, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    // Tunggu elemen muncul
    await page.waitForSelector('[data-testid="campaign-donation-received"]', {
      timeout: 10000,
    });

    // Ambil jumlah donasi saat ini
    const currentDonation = await page.$eval(
      '[data-testid="campaign-donation-received"]',
      (el) => el.textContent.trim()
    );

    if (currentDonation !== lastDonation) {
      const message = `💰 *Update Donasi*\nJumlah donasi telah berubah:\n\n*Dari:* ${
        lastDonation || 'N/A'
      }\n*Menjadi:* ${currentDonation}\n\n[Cek di Kitabisa](${CAMPAIGN_URL})`;
      await sendTelegramMessage(message);
      console.info(`✅ UPDATE: ${currentDonation}`);
      lastDonation = currentDonation;
    } else {
      console.info(`➡️ No change: ${currentDonation}`);
    }
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    await sendTelegramMessage(
      `❌ *Error saat memeriksa donasi. Cek server atau langsung ke [Kitabisa] (${CAMPAIGN_URL})*`
    );
  } finally {
    await browser.close();
  }
}

// Jalankan pertama kali
checkDonation();

// Lalu ulang setiap interval
setInterval(checkDonation, INTERVAL_MS);
