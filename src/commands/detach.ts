import { botCache } from '../../mod.ts';
import { ChannelTypes } from '../../deps.ts';
import { addMonitor, getGuildConfig, initGuild, removeMonitor } from "../database/database.ts";

botCache.commands.set(`detach`, {
    name: `detach`,
    guildOnly: true,
    userServerPermissions: ["MANAGE_CHANNELS"],
    botServerPermissions: ["MANAGE_CHANNELS"],
    arguments: [
        {
            name: "monitor",
            type: "string"
        },
        {
            name: "channel",
            type: "textchannel"
        }
    ],
    execute: async (message, args: DetachArgs) => {
        let config = getGuildConfig(message.guildID);

        if(!config) await initGuild({ guildId: message.guildID, bannedWords: [], monitorAttachments: []});

        removeMonitor(message.guildID, args.monitor, args.channel.id);
    }
});

interface DetachArgs {
    monitor: string,
    channel: ChannelTypes.GUILD_TEXT
}