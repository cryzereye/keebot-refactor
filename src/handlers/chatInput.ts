import { ChatInputCommandInteraction } from "discord.js";
import { showSubscribeMenu } from "../builders/subscribeMenu";

/** 
 * @description Handles any chat input command that is done in any channel and passes it to the correct handler
 * @param interaction - The chat input command that was done in any channel
 * @returns void
*/

export async function handleChatInput(interaction: ChatInputCommandInteraction): Promise<void> {
    const { user, commandName } = interaction;
    switch (commandName) {
        case 'subscribe':
            await interaction.reply({
                embeds: [showSubscribeMenu()],
            });
    }
}