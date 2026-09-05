
// /apps/twitch-bot/src/index.ts - Main Twitch Bot Entry Point
import { Client, type ChatUserstate } from 'tmi.js';
import { setupCommands } from './handlers/commandHandler';
import { setupEvents } from './handlers/eventHandler';

// Initialize Twitch client with basic configuration
const client = new Client({
  connection: {
    reconnect: true,
    secure: true
  },
  channels: ['ussa_knowledge']
});

// Set up commands and events
setupCommands(client);
setupEvents(client);

// Connect to Twitch
client.connect().catch(console.error);

console.log('Twitch Bot is starting...');
