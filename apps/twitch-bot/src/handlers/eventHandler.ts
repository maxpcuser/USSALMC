
// /apps/twitch-bot/src/handlers/eventHandler.ts - Event Handler  
import { Client } from 'tmi.js';

export function setupEvents(client: Client) {
  console.log('Setting up Twitch events...');
  
  client.on('connected', (address, port) => {
    console.log(`Twitch Bot connected to ${address}:${port}`);
  });
  
  client.on('message', (channel, userstate, message, self) => {
    if (self) return;
    
    console.log(`Message from ${userstate['display-name']}: ${message}`);
    
    // In implementation, this would handle specific message events
    // like search commands for the knowledge base
  });
}
