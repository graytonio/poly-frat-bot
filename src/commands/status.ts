import { botCache } from "../../mod.ts";
import { editBotsStatus, StatusTypes, sendMessage, ActivityType } from "../../deps.ts";

botCache.commands.set(`status`, {
    name: `status`,
    description: "commands/status:DESCRIPTION",
    arguments: [
        {
            name: "status",
            type: "...string",
            required: false
        }
    ],
    execute: function (message, args: StatusArgs) {

        console.log(args.status);

        if(!args.status) {
            return sendMessage(
                message.channelID,
                `No status provided`
            )
        }

        editBotsStatus(
            StatusTypes.Online,
            args.status,
            ActivityType.Game
        )
    }
});

interface StatusArgs {
    status?: string;
}