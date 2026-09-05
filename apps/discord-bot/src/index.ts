
// /apps/discord-bot/src/index.ts - Main Discord Bot Entry Point
import { Client, GatewayIntentBits } from 'discord.js';
import { setupCommands } from './handlers/commandHandler';
import { setupEvents } from './handlers/eventHandler';

// Initialize client with required intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Set up commands and events
setupCommands(client);
setupEvents(client);

// Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN);

console.log('Discord Bot is starting...');
