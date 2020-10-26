import { botCache } from '../../mod.ts';
import { deleteMessage } from '../../deps.ts';
import { sendAlertResponse } from "../utils/helpers.ts";

botCache.monitors.set("fratmonitor", {
    name: "fratmonitor",
    botChannelPermissions: ["MANAGE_MESSAGES"],
    execute: async function (message) {
        const isInFratChannel = (message.channelID === "770341120999030845");
        const isFratMessage = (message.content === "φρατ");

        if(!isInFratChannel) return;
        if(isFratMessage) return;

        try {
            deleteMessage(message);
            sendAlertResponse(message, "That wasn't very FRAT of you");
        } catch (error) {
            
        }
    }
})