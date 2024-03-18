import { CacheType, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { API } from "./api";
import { getClasses } from "./utils";

const listClasses = async (
  api: API,
  interaction: CommandInteraction<CacheType>
): Promise<void> => {
  const classes = await getClasses(api, interaction.guildId);

  interaction.reply({
    content: classes.map((c) => `* ${c.name}`).join("\n"),
    ephemeral: true,
  });
};

export const listClassesCommand = {
  body: new SlashCommandBuilder()
    .setName("ac-classes-list")
    .setDescription("List all classes recognized by the server")
    .toJSON(),
  f: listClasses,
};
