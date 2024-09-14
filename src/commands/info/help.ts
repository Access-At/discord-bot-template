import type { Commands, CustomCommandInteraction, CustomClient } from "@/util/type";
import { SlashCommandBuilder } from "@discordjs/builders";

export const command: Commands = {
  data: new SlashCommandBuilder().setName("help").setDescription("Displays information about available commands"),

  async execute({ interaction, client }) {
    if (!client.application?.commands) {
      await interaction.reply("Unable to fetch commands at this time.");
      return;
    }

    const commands = await client.application.commands.fetch();
    const commandList = commands.map((cmd) => `**/${cmd.name}**: ${cmd.description}`).join("\n");

    const helpEmbed = {
      color: 0x0099ff,
      title: "Available Commands",
      description: "Here are all the available commands:",
      fields: [
        {
          name: "Commands",
          value: commandList || "No commands available.",
        },
      ],
      footer: {
        text: "Use /command for more information on a specific command.",
      },
    };

    await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
  },
};
