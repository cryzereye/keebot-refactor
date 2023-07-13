import { BaseInteraction } from "discord.js";

export function handleInteraction(interaction: BaseInteraction): void {
    const { user } = interaction;

    if (user.bot) return; // Ignore messages from bots

    // Conditional for each interaction type class
    if (interaction.isChatInputCommand())
        return;
}