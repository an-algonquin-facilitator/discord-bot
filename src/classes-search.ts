import {
  CacheType,
  CommandInteraction,
  InteractionReplyOptions,
  SlashCommandBuilder,
} from "discord.js";
import { API } from "./api";
import { getClasses } from "./utils";

const searchClasses = async (
  api: API,
  interaction: CommandInteraction<CacheType>
): Promise<void> => {
  const classes = await getClasses(api, interaction.guildId);
  const q = (interaction.options.get("q")?.value + "").toLowerCase();
  const filtered = classes.filter((c) => c.name.includes(q));
  interaction.reply({
    content: filtered.map((c) => `* ${c.name}`).join("\n"),
    ephemeral: true,
  });
};

export const searchClassesCommand = {
  body: new SlashCommandBuilder()
    .setName("ac-classes-search")
    .setDescription("Search for a class in the server")
    .addStringOption((option) =>
      option.setName("q").setDescription("query").setRequired(true)
    )
    .toJSON(),
  f: searchClasses,
};
