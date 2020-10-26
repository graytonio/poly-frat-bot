import { botCache } from '../../mod.ts';
import { cache, sendMessage } from '../../deps.ts';
import { Embed } from "../utils/Embed.ts";
import { sendEmbed } from "../utils/helpers.ts";

botCache.commands.set(`numbers`, {
    nsfw: true,
    name: `numbers`,
    description: "commands/numbers:DESCRIPTION",
    botChannelPermissions: ["SEND_MESSAGES"],
    execute: function (message) {
        try{
            const number = Math.floor(100000 + Math.random() * 900000);
            
            const embed = new Embed()
                .setColor("FF0500")
                .setTitle("May the numbers treat you well")
                .addField("Link:", `https://nhentai.net/g/${number}`)
                .setTimestamp();

            return sendEmbed(message.channelID, embed);
        } catch (error) {
            return sendMessage(
                message.channelID,
                "Attempt to be horny has failed!"
            )
        }
    }
})