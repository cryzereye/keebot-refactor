import { Snowflake } from "discord.js";

/**
 * @description Checks if the channel is the new post channel according to the configs loaded from the database
 * @param guildId - The guild ID
 * @param channelId - The channel ID
 * @returns boolean
 */
export function isNewPostChannel(guildId: Snowflake | null, channelId: Snowflake): boolean {
    return globalThis.configs.filter(config => config.guildId === guildId)[0].channels.newListings === channelId;
}