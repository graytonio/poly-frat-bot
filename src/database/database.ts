import { MongoClient, config } from '../../deps.ts';
const env = config();

const client = new MongoClient();
client.connectWithUri(Deno.env.get("MONGO_URI") || env.MONGO_URI);

export interface GuildConfig {
    _id?: { $oid: string };
    guildId: string;
    bannedWords: string[];
    monitorAttachments: {
        channelId: string;
        monitorId: string;
    }[];
}

export const db = client.database("poly-frat");
const configsCollection = db.collection<GuildConfig>("configs");

export let addMonitor = async (guildId: string, monitorId: string, channelId: string) => {
    let currentConfig = await getGuildConfig(guildId);
    currentConfig?.monitorAttachments.push({ monitorId, channelId });
    await configsCollection.updateOne({ guildId: guildId }, { $set: { monitorAttachments: currentConfig?.monitorAttachments }});
}

export let initGuild = async (config: GuildConfig) => {
    await configsCollection.insertOne(config);
}

export let getGuildConfig = async (guildId: string) => {
    return await configsCollection.findOne({ guildId: guildId });
}