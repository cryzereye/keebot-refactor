import { EmbedBuilder, Message } from 'discord.js';
import { Subscription } from '../models/subscription';

const subscriptions: Map<string, Subscription[]> = new Map();

export function checkMessageForSubscriptions(message: Message): void {
    const mentionedUsers = message.mentions.users;

    mentionedUsers.forEach((user) => {
        const userId = user.id;
        const userSubscriptions = subscriptions.get(userId) || [];

        userSubscriptions.forEach((subscription) => {
            const { strings, id } = subscription;

            const containsAllStrings = strings.every((str: string) => message.content.includes(str));

            if (containsAllStrings) {
                const embed = new EmbedBuilder()
                    .setTitle('Subscription Match')
                    .setDescription(`All subscribed strings found in [this message](${message.url})`);

                user.send({ embeds: [embed] });
            }
        });
    });
}
