## 🔑 How to Get Your Telegram Bot Token and Chat ID

To receive donation updates via Telegram, you need two pieces of information:

- **Telegram Bot Token** (from @BotFather)
- **Your Personal Chat ID** (from a Telegram API call)

Follow these steps:

### 1. Create a Telegram Bot with @BotFather

1. Open Telegram App or web App.
2. Search for `@BotFather` and start a chat.
3. Send the command:

```bash
/newbot
```

4. Follow the prompts:

- Enter a **name** for your bot (e.g., `Donation Monitor`).
- Enter a **username** ending with `bot` (e.g., `kitabisa_alert_bot`).

5. After successful creation, @BotFather will send you a message like:

```bash
Use this token to access the HTTP API: <your-token>
```

→ This is your **`TELEGRAM_BOT_TOKEN`**. Save it.

> ⚠️ **Never share this token publicly!** Anyone with it can control your bot.

---

### 2. Get Your Personal Chat ID

1. In Telegram, search for your new bot (e.g., `@kitabisa_alert_bot`) and **send it any message** (e.g., `hello`).
2. Open your browser and visit this URL (replace `YOUR_BOT_TOKEN` with the token from Step 1):

```bash
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

3. Look for the `message` → `chat` → `id` field in the JSON response:

```json
{
  "ok": true,
  "result": [{
    "message": {
      "chat": {
        "id": 987654321,
        "first_name": "YourName",
        ...
      }
    }
  }]
}
```

The number `987654321` is your `TELEGRAM_CHAT_ID`.

✅ This ID is private to you. Only messages sent to this ID will reach your Telegram account.
