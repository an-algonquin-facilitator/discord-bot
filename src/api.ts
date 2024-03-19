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
  addRole(guildId: string, userId: string, roleId: string): Promise<unknown>;
  removeRole(guildId: string, userId: string, roleId: string): Promise<unknown>;
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
    async addRole(guildId: string, userId: string, roleId: string) {
      return rest.put(Routes.guildMemberRole(guildId, userId, roleId));
    },
    async removeRole(guildId: string, userId: string, roleId: string) {
      return rest.delete(Routes.guildMemberRole(guildId, userId, roleId));
    },
  };
};
