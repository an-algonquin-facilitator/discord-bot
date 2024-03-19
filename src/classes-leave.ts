import { CacheType, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { API } from "./api";
import { getClasses } from "./utils";

const leaveClass = async (
  api: API,
  interaction: CommandInteraction<CacheType>
): Promise<void> => {
  const classes = await getClasses(api, interaction.guildId);
  const classs = (
    interaction.options.get("class-code")?.value + ""
  ).toLowerCase();

  const rc = classes.find((c) => c.name === classs);
  if (!rc) {
    interaction.reply({
      content: `Class "${classs}" not found`,
      ephemeral: true,
    });
    return;
  }

  api.removeRole(interaction.guildId, interaction.user.id, rc.id);

  interaction.reply({
    content: `You left ${classs}!`,
    ephemeral: true,
  });
};

export const leaveClassCommand = {
  body: new SlashCommandBuilder()
    .setName("ac-classes-leave")
    .setDescription("Leave a class")
    .addStringOption((option) =>
      option
        .setName("class-code")
        .setDescription("Code of the class")
        .setRequired(true)
    )
    .toJSON(),
  f: leaveClass,
};
