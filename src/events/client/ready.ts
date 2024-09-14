import type { Events } from "@/util/type";
import logger from "../../util/logger";
import discordLog from "log-discord";

export const event: Events = {
  name: "ready",
  once: true,
  execute: ({ client }) => {
    try {
      logger.info(`${client.user?.tag} is online!`);
    } catch (error) {
      logger.error(`Failed to log bot status: ${error}`);
    }
  },
};
