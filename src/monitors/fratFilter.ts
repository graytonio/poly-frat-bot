import { botCache } from '../../mod.ts';
import { deleteMessage } from '../../deps.ts';
import { getMonitorConfig, sendAlertResponse } from "../utils/helpers.ts";

botCache.monitors.set("frat", {
    name: "frat",
    botChannelPermissions: ["MANAGE_MESSAGES"],
    execute: async function (message) {
        let config = await getMonitorConfig(message.guildID, "frat");
        if(!config) return;

        const isInFratChannel = config.channelId === message.channelID;
        if(!isInFratChannel) return;

        const isFratMessage = (message.content === "φρατ");
        if(isFratMessage) return;

        deleteMessage(message);
        sendAlertResponse(message, "That wasn't very FRAT of you");
    }
})