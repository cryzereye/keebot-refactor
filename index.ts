import { Client, GatewayIntentBits } from 'discord.js';
import { config } from "dotenv";
import { registerCommands } from './src/config/commandsRegister';
import { handleInteraction } from './src/events/interactionCreate';
import { handleMessageCreate } from './src/events/messageCreate';
import { loadDb } from './src/startup/dbLoader';

config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.DirectMessages
	]
});

client.once('ready', () => {
	registerCommands(
		process.env.CLIENT_ID,
		process.env.DISCORD_BOT_TOKEN
	);
	loadDb();
	console.log('Bot is ready!');
});

client.on('messageCreate', handleMessageCreate);
client.on('interactionCreate', handleInteraction);
client.login(process.env.DISCORD_BOT_TOKEN);