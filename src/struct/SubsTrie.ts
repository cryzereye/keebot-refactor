import { Snowflake } from "discord.js";
import { TrieNode } from "./TrieNode";

export class SubsTrie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    newSub(userId: Snowflake, keywords: string[]) {
        this.insert(this.root, userId, keywords)
    }

    insert(node: TrieNode, userId: Snowflake, keywords: string[]): void {
        if (keywords.length === 0) {
            node.addUser(userId);
            return;
        }
        const word = keywords.shift()?.toLowerCase();
        if (word) {
            if (!node.children[word]) {
                node.children[word] = new TrieNode();
            }
            this.insert(node.children[word], userId, keywords);
        }
    }

    searchPost(post: string): Snowflake[] {
        return this.search(this.root, post);
    }

    search(node: TrieNode, post: string): Snowflake[] {
        Object.keys(node.children).forEach((key) => {
            if (post.search(key)) {
                return this.search(node.children[key], post);
            }
        });

        return node.users;
    }

    removeSub(userId: Snowflake, keywords: string[]): void {
        this.remove(this.root, userId, keywords);
    }

    remove(node: TrieNode, userId: Snowflake, keywords: string[]): void {
        const word = keywords.shift()?.toLowerCase();
        if (!word) return;

        Object.keys(node.children).forEach((key) => {
            if (key !== word) return;

            this.remove(node.children[key], userId, keywords);

            if (node.children[key].users.length > 0) return;

            delete node.children[key];
        });

    }
}