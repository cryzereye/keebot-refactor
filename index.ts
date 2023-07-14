import { ActivitiesOptions, ActivityType, Client, GatewayIntentBits } from 'discord.js';
import { config } from "dotenv";
import { handleInteraction } from './src/events/interactionCreate';
import { handleMessageCreate } from './src/events/messageCreate';
import { registerCommands } from './src/startup/commandsRegister';
import { loadDb } from './src/startup/dbLoader';

config();
index();

export function index() {
	const client = new Client({
		intents: [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.DirectMessages
		]
	});

	client.once('ready', () => {
		loadDb();
		registerCommands(
			process.env.CLIENT_ID,
			process.env.DISCORD_BOT_TOKEN
		);
		updatePresence(client);
		instantiateGlobals(client);
		console.log('Bot is ready!');
	});

	client.on('messageCreate', handleMessageCreate);
	client.on('interactionCreate', handleInteraction);
	client.login(process.env.DISCORD_BOT_TOKEN);
}

function updatePresence(client: Client) {
	if (!(client.user)) return;

	const activities: ActivitiesOptions[] = [{
		type: ActivityType.Playing,
		url: "https://github.com/cryzereye/keebot-refactor",
		name: "ping @gego for bugs"
	}];

	client.user.setPresence({
		activities: activities,
		status: "online"
	});
}

function instantiateGlobals(client: Client): void {
	globalThis.client = client;
}