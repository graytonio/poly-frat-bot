import { botCache } from '../../mod.ts';
import { ChannelTypes } from '../../deps.ts';
import { addMonitor, getGuildConfig, initGuild } from "../database/database.ts";

botCache.commands.set(`attach`, {
    name: `attach`,
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
    execute: async (message, args: AttachArgs) => {
        let config = getGuildConfig(message.guildID);

        if(!config) await initGuild({ guildId: message.guildID, bannedWords: [], monitorAttachments: []});

        console.log(args.channel);

        addMonitor(message.guildID, args.monitor, args.channel.id);
    }
});

interface AttachArgs {
    monitor: string,
    channel: ChannelTypes.GUILD_TEXT
}