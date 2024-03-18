import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";
import { commands } from "./commands";
import * as _ from "./classes-list";
import { newAPI } from "./api";

const client = new Client({
  intents: [],
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const token = process.env.TOKEN;

// Log in to Discord with your client's token
client.login(token);

const api = newAPI(new REST().setToken(token));

client.on(Events.InteractionCreate, (interaction) => {
  if (interaction.isCommand()) {
    try {
      commands[interaction.commandName].f(api, interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

api.putCommands(
  "1218328415275323503",
  Object.values(commands).map((c) => c.body)
);
