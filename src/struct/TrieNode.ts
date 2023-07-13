import { Snowflake } from "discord.js";

export class TrieNode {
    children: { [key: string]: TrieNode };
    users: Snowflake[];

    constructor() {
        this.children = {};
        this.users = [];
    }

    addUser(userId: Snowflake): void {
        this.users.push(userId);
    }

    removeUser(userId: Snowflake): void {
        this.users = this.users.filter((id) => id !== userId);
    }
}