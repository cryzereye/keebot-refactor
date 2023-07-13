import { BaseInteraction } from "discord.js";

/**
 * @description Handles any interaction that is done in any channel and passes it to the correct handler
 * @param interaction - The interaction that was done in any channel
 * @returns void
 */
export function handleInteraction(interaction: BaseInteraction): void {
    const { user } = interaction;

    // Ignore messages from bots
    if (user.bot) return;

    // Conditional for each interaction type class
    if (interaction.isChatInputCommand())
        return;
}