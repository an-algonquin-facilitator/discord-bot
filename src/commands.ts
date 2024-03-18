import {
  CacheType,
  CommandInteraction,
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";
import { listClassesCommand } from "./classes-list";
import { API } from "./api";
import { searchClassesCommand } from "./classes-search";
import { joinClassCommand } from "./classes-join";

interface Command {
  body: RESTPostAPIChatInputApplicationCommandsJSONBody;
  f: (api: API, interaction: CommandInteraction<CacheType>) => Promise<void>;
}

export const commands: Record<string, Command> = {};

const registerCommand = (command: Command) => {
  commands[command.body.name] = command;
};

registerCommand(listClassesCommand);
registerCommand(searchClassesCommand);
registerCommand(joinClassCommand);
