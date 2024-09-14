import type { Events } from "@/util/type";
import { GuildMemberRoleManager } from "discord.js";

export const event: Events = {
  name: "interactionCreate",
  execute: async ({ interaction, client }) => {
    if (interaction.isAutocomplete()) {
      const command = client.commands.get(interaction.commandName);
      if (!command?.autocomplete) return;
      command?.autocomplete({ interaction, client });
    }

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      await interaction.reply({ content: "An error has occurred", ephemeral: true });
      return;
    }

    if ("execute" in command && typeof command.execute === "function") {
      await command.execute(interaction, client);
    } else {
      await interaction.reply({ content: "Command execution not implemented", ephemeral: true });
    }

    if (interaction.commandId === "verify") {
      const role = interaction.guild?.roles.cache.get(client.config.roles.verificationId);
      if (role && interaction.member && interaction.member.roles instanceof GuildMemberRoleManager) {
        await interaction.member.roles.add(role);
        await interaction.reply({ content: `${role.name} has been assigned to you.`, ephemeral: true });
        return;
      }
    } else if (interaction.isStringSelectMenu()) {
      // Handle string select menu interactions
    } else if (interaction.isButton()) {
      // Handle button interactions
    }
  },
};
