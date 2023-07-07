import { Message } from 'discord.js';
import { handleDeleteSubscriptionCommand, handleEditSubscriptionCommand, handleSubscriptionCommand } from '../commands/subscription';
import { checkMessageForSubscriptions } from '../utils/subscription';

export function handleMessageCreate(message: Message): void {
    if (message.author.bot) return; // Ignore messages from bots

    if (message.content.startsWith('/subscribe')) {
        const args = message.content.slice('/subscribe'.length).trim().split(' ');
        const command = args.shift()?.toLowerCase();

        if (command === 'add') {
            const strings = args;
            handleSubscriptionCommand(message, message.author, strings);
        } else if (command === 'edit') {
            const subscriptionId = args.shift() as string; // Type assertion
            const newStrings = args;
            handleEditSubscriptionCommand(message, message.author, subscriptionId, newStrings);
        } else if (command === 'delete') {
            const subscriptionId = args.shift() as string; // Type assertion
            handleDeleteSubscriptionCommand(message, message.author, subscriptionId);
        } else {
            // Invalid command
            message.reply('Invalid subscription command. Usage: `/subscribe add <string1> <string2> ...`, `/subscribe edit <subscriptionId> <newString1> <newString2> ...`, `/subscribe delete <subscriptionId>`');
        }
    } else {
        // Check message for subscriptions
        checkMessageForSubscriptions(message);
    }
}
