
// /apps/discord-bot/src/handlers/eventHandler.ts - Event Handler
import { Client } from 'discord.js';

export function setupEvents(client: Client) {
  console.log('Setting up events...');
  
  client.on('ready', () => {
    console.log(`Logged in as ${client.user?.tag}!`);
  });

  client.on('messageCreate', (message) => {
    // Ignore bot messages
    if (message.author.bot) return;
    
    console.log(`Message from ${message.author.tag}: ${message.content}`);
    
    // In implementation, this would handle specific message events
    // like search commands for the knowledge base
  });
}
