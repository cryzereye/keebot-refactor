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

/**
 * @description Sends a direct message to the userId
 * @param userId - The user ID
 * @param message - The message to send
 * @returns void
 */
export async function sendDMToUserId(userId: Snowflake, message: string): Promise<void> {
    // 5 tries to send the message
    for (let i = 0; i < 5; i++) {
        try {
            if (await globalThis.client.users.fetch(userId).then(user => user.send(message)))
                return;
        }
        catch (error) {
            console.error(error);
        }
    }

}

/**
 * @description Builds a URL to the message based on given guild, channel, and message ID
 * @param guildId - The guild ID
 * @param channelId - The channel ID
 * @param messageId - The message ID
 * @returns string
 */
export function buildMessageUrl(guildId: Snowflake, channelId: Snowflake, messageId: Snowflake): string {
    return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
}