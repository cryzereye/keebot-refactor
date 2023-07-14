import { Message } from "discord.js";
import { Sub } from "../models/subscription";
import { buildMessageUrl, sendDMToUserId } from "../utils/utils";


/**
 * @description Checks the message arg for any subscriptions then sends a DM to the users subscribed to the keywords in the message
 * @param message - new message
 */
export function checkMessageForSubscriptions(message: Message): void {
    const { content, guildId, channelId, id } = message;
    const subscriptions: Sub[] = globalThis.subscriptions.searchPost(content);
    if (!guildId || subscriptions.length == 0) return;

    const messageUrl = buildMessageUrl(guildId, channelId, id);
    subscriptions.forEach(sub => {
        sendDMToUserId(sub.id, `${sub.keywords.join('\n')
            }\n\n in ${messageUrl}`);
    });
}