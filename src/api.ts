import {
  REST,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
  Routes,
} from "discord.js";

interface Role {
  id: string;
  name: string;
  description: string | null;
  permissions: string;
  position: number;
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
  icon: unknown;
  unicode_emoji: unknown;
  tags: { bot_id: string };
  flags: number;
}

export interface API {
  rest: REST;
  getRoles(guildId: string): Promise<Role[]>;
  putCommands(
    appId: string,
    commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]
  ): Promise<unknown>;
}

export const newAPI = (rest: REST) => {
  return {
    rest: rest,
    async getRoles(guildId: string) {
      return rest.get(Routes.guildRoles(guildId)) as Promise<Role[]>;
    },
    async putCommands(
      appId: string,
      commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]
    ) {
      return rest.put(Routes.applicationCommands(appId), {
        body: commands,
      });
    },
  };
};
