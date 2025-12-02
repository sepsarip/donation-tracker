# Kitabisa Donation Monitor

> 📢 **Real-time donation tracker** for [Kitabisa](https://kitabisa.com) campaigns with **Telegram alert notifications**.

This tool automatically monitors a Kitabisa fundraising page, detects changes in the total donation amount, and sends instant updates to your Telegram bot — perfect for personal tracking, community awareness, or transparency monitoring.

Built with **Node.js**, **Puppeteer**, and **Telegram Bot API**.

---

## 🌟 Features

- ✅ Automatic scraping of donation amount from Kitabisa campaign page
- ✅ Real-time Telegram notifications on donation updates
- ✅ Compares current vs. previous value → only notify on change

---

## 🛠️ Tech Stack

- **Node.js** (v18+ recommended)
- **Puppeteer** – for headless browser automation
- **Telegram Bot API** – for secure, free notifications
- **dotenv** – for environment variable management

---

## 🚀 Quick Start

### 1. Clone (or create) the project

```bash
git clone https://github.com/sepsarip/donation-tracker.git
cd donation-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

create file .env (copy .env_example)

```bash
TELEGRAM_BOT_TOKEN=''
TELEGRAM_CHAT_ID=''
CAMPAIGN_URL=''
```

ℹ️ How to get Token and Chat ID please read this [Get-Telegram-Token](Get-Telegram-Token.md).

### 3. Running Monitoring

```bash
node watch-donation.mjs
```
