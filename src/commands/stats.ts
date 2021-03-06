import { botCache } from "../../mod.ts";
import { Embed } from "./../utils/Embed.ts";
import { botID, cache, sendMessage } from "../../deps.ts";

botCache.commands.set(`stats`, {
  name: `stats`,
  guildOnly: true,
  execute: (message, _args, guild) => {
    const botMember = guild?.members.get(botID);
    if (!botMember) return;

    let totalMemberCount = 0;
    let cachedMemberCount = 0;

    for (const guild of cache.guilds.values()) {
      totalMemberCount += guild.memberCount;
      cachedMemberCount += guild.members.size;
    }

    const embed = new Embed()
      .setAuthor(
        `${botMember?.nick || botMember?.tag} Stats`,
        botMember.avatarURL,
      )
      .setColor("random")
      .addField("Guilds:", cache.guilds.size.toLocaleString(), true)
      .addField("Total Members:", totalMemberCount.toLocaleString(), true)
      .setTimestamp();

    return sendMessage(message.channelID, { embed });
  },
});
