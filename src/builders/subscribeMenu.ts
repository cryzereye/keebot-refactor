import { EmbedBuilder } from "discord.js";

export function showSubscribeMenu(): EmbedBuilder {
    return new EmbedBuilder({
        title: 'Subscribe Menu',
        description: '',
        fields: [
            {
                name: 'Add',
                value: 'Add a new sub',
                inline: false,
            },
            {
                name: 'Edit',
                value: 'Edit an existing sub',
                inline: false,
            },
            {
                name: 'Delete',
                value: 'Delete a sub',
                inline: false,
            },
        ],
    });
}