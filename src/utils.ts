import { API } from "./api";

interface RoleClass {
  id: string;
  name: string;
}

export const getClasses = (api: API, guildId: string): Promise<RoleClass[]> =>
  api
    .getRoles(guildId)
    .then((roles) =>
      roles
        .map((r) => ({ id: r.id, name: r.name }))
        .filter((r) => r.name.match(/[A-Za-z]{3}\d{4}/))
    );
