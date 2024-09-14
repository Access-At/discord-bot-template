# LiebeBotNew

LiebeBotNew is a Discord bot built with TypeScript and Discord.js, handling various interactions and commands.

## Development

This project uses Bun as the JavaScript runtime. Make sure to have Bun installed before running the project.

For more information about Bun, visit https://bun.sh.

## Features

- Slash command handling
- Autocomplete support
- Verification role assignment

## Setup

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Copy the `.env.example` file to `.env` and fill in the required values.

```bash
cp .env.example .env
```

```.env
client_id="yout client id"
guild_id="your guild id"
token="your token"
```

4. or Copy the `config.example.json` file to `config.json` and fill in the required values.

```bash
cp config.example.json config.json
```

```json
{
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "guild_id": "YOUR_GUILD_ID",
  "token": "YOUR_BOT_TOKEN",
  "roles": {
    "verificationId": "VERIFICATION_ROLE_ID"
  },
  "SEARCH_DEFAULT": ["YOUR", "DEFAULT", "SEARCH", "TERMS"]
}
```

5. Run the bot:

```bash
bun run dev
```
