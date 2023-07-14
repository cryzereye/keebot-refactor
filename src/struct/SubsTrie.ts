import { Snowflake } from "discord.js";
import { Sub } from "../models/subscription";
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

    searchPost(post: string): Sub[] {
        return this.search(this.root, post, []);
    }

    search(node: TrieNode, post: string, keywords: string[]): Sub[] {
        Object.keys(node.children).forEach((key) => {
            if (post.search(key)) {
                keywords.push(key)
                return this.search(node.children[key], post, keywords);
            }
        });
        let subs: Sub[] = [];
        node.users.forEach(id => {
            subs.push({ id, keywords });
        });
        return subs;
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