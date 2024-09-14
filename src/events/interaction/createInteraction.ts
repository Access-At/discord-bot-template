import type { Events } from "@/util/type";
import { GuildMemberRoleManager } from "discord.js";

export const event: Events = {
  name: "interactionCreate",
  execute: async (client, c) => {
    if (!c.interaction || !c.interaction.isChatInputCommand()) return;

    const command = client.commands.get(c.interaction.commandName);

    if (c.interaction.isChatInputCommand()) {
      if (!command) {
        await c.interaction.reply({ content: "outdated command" });
        return;
      }

      await command.execute(c.interaction, client);
    }

    if (c.interaction.commandName === "verify") {
      const role = c.interaction.guild?.roles.cache.get(client.config.roles.verificationId);
      if (role && c.interaction.member && c.interaction.member.roles instanceof GuildMemberRoleManager) {
        await c.interaction.member.roles.add(role);
        await c.interaction.reply({ content: `${role.name} has been assigned to you.`, ephemeral: true });
      }
    }
  },
};
