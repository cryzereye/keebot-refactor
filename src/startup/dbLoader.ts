import { MongoClient } from "mongodb";

export async function loadDb(): Promise<void> {

    globalThis.dbClient = new MongoClient(process.env.DB_URL, {});
    try {
        await globalThis.dbClient.connect();
        (await globalThis.dbClient.db("keebot").collection("configs").find().toArray()).forEach(config => {
            globalThis.configs.push({
                guildId: config.guildId,
                channels: config.channels,
                subsConfig: config.subsConfig,
                roles: config.roles,
                reportTypes: config.reportTypes
            });
        });

    } catch (error) {
        console.error(error);
    }
}