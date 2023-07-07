import { Message, User } from 'discord.js';
import { Subscription } from '../models/subscription';
import { config } from '../utils/config';

const subscriptions: Map<string, Subscription[]> = new Map();

export function handleSubscriptionCommand(message: Message, user: User, strings: string[]): void {
    if (strings.length === 0) {
        message.reply('Please provide at least one string to subscribe to.');
        return;
    }

    if (strings.length > 5) {
        message.reply('You can only subscribe to a maximum of 5 strings.');
        return;
    }

    const userId = user.id;
    const userSubscriptions = subscriptions.get(userId) || [];

    if (userSubscriptions.length >= config.maxSubscriptions && !user.roles.cache.has(config.donatorRole)) {
        message.reply(`You can only have a maximum of ${config.maxSubscriptions} subscriptions.`);
        return;
    }

    const subscription: Subscription = {
        id: message.id,
        strings,
    };

    userSubscriptions.push(subscription);
    subscriptions.set(userId, userSubscriptions);

    message.reply(`Successfully subscribed to the following strings: ${strings.join(', ')}`);
}

export function handleEditSubscriptionCommand(message: Message, user: User, subscriptionId: string, newStrings: string[]): void {
    const userId = user.id;
    const userSubscriptions = subscriptions.get(userId) || [];

    const subscription = userSubscriptions.find((sub) => sub.id === subscriptionId);

    if (!subscription) {
        message.reply('Subscription not found.');
        return;
    }

    if (newStrings.length === 0) {
        message.reply('Please provide at least one string to update the subscription.');
        return;
    }

    if (newStrings.length > 5) {
        message.reply('You can only subscribe to a maximum of 5 strings.');
        return;
    }

    subscription.strings = newStrings;

    message.reply(`Successfully updated the subscription with new strings: ${newStrings.join(', ')}`);
}


export function handleDeleteSubscriptionCommand(message: Message, user: User, subscriptionId: string): void {
    const userId = user.id;
    const userSubscriptions = subscriptions.get(userId) || [];

    const subscriptionIndex = userSubscriptions.findIndex((sub) => sub.id === subscriptionId);

    if (subscriptionIndex === -1) {
        message.reply('Subscription not found.');
        return;
    }

    userSubscriptions.splice(subscriptionIndex, 1);

    if (userSubscriptions.length === 0) {
        subscriptions.delete(userId);
    } else {
        subscriptions.set(userId, userSubscriptions);
    }

    message.reply('Successfully deleted the subscription.');
}
