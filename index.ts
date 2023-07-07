import { Client, Intents } from 'discord.js';
import { handleMessageCreate } from './src/events/messageCreate';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES] });

client.once('ready', () => {
  console.log('Bot is ready!');
});

client.on('messageCreate', handleMessageCreate);

client.login('YOUR_BOT_TOKEN');
