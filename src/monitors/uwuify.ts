import { botCache } from '../../mod.ts';
import { deleteMessage } from '../../deps.ts';
import { getMonitorConfig, sendAlertResponse } from "../utils/helpers.ts";

botCache.monitors.set("uwuify", {
    name: "uwuify",
    botChannelPermissions: ["MANAGE_MESSAGES"],
    execute: async function (message) {
        let config = await getMonitorConfig(message.guildID, "uwuify");
        if(!config) return;

        const isInUWUChannel = config.channelId === message.channelID;
        if(!isInUWUChannel) return;

        const uwuMessage = uwuify(message.content);
        const isSpokenInUWU = message.content === uwuMessage;
        if(isSpokenInUWU) return;
        
        // deleteMessage(message);
        return sendAlertResponse(message, `The proper UWU is ${uwuMessage}`);
    }
});

function uwuify(input: string): string {
    let output: string;
    output = input.replace(/(?:r|l)/g, "w");
    output = output.replace(/(?:R|L)/g, "W");
    output = output.replace(/n([aeiou])/g, "ny$1");
    output = output.replace(/N([aeiou])/g, "Ny$1");
    output = output.replace(/N([AEIOU])/g, "NY$1");
    output = output.replace(/ove/g, "uv");

    return output;
}