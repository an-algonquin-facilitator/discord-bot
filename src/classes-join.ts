import {
  CacheType,
  CommandInteraction,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { API } from "./api";
import { getClasses } from "./utils";

const joinClass = async (
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

  await api.rest.put(
    Routes.guildMemberRole(interaction.guildId, interaction.user.id, rc.id)
  );

  interaction.reply({
    content: `You joined ${classs}!`,
    ephemeral: true,
  });
};

export const joinClassCommand = {
  body: new SlashCommandBuilder()
    .setName("ac-classes-join")
    .setDescription("Join a specific class")
    .addStringOption((option) =>
      option
        .setName("class-code")
        .setDescription("Code of the class")
        .setRequired(true)
    )
    .toJSON(),
  f: joinClass,
};
