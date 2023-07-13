import { Message } from 'discord.js';
import { checkMessageForSubscriptions } from '../utils/subscription';
import { isNewPostChannel } from '../utils/utils';

/**
 * @description Handles any message that is sent in any channel and passes it to the correct handler
 * @param message - The message that was sent in any channel
 * @returns void
 */
export function handleMessageCreate(message: Message): void {
    const { author, guildId, channelId } = message;
    if (author.bot) return; // Ignore messages from bots
    if (isNewPostChannel(guildId, channelId))
        checkMessageForSubscriptions(message);
}
