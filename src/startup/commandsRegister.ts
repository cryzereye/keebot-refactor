const { REST, Routes } = require('discord.js');

function defineCommands(): any {
	return [
		{
			name: 'subscribe',
			description: 'Show subcribe menu',
			type: 1
		}
	]
}

export async function registerCommands(clientId: string, token: string): Promise<void> {
	const rest = new REST({ version: '10' }).setToken(token);

	globalThis.configs.forEach(async (config) => {
		try {
			console.log('Started refreshing application (/) commands.');
			await rest.put(Routes.applicationGuildCommands(clientId, config.guildId), { body: defineCommands() });
			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	});

}