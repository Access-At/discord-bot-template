import type { Events } from "@/util/type";
import logger from "../../util/logger";

export const event: Events = {
  name: "ready",
  once: true,
  execute: (client, _) => {
    try {
      logger.info(`${client.user?.tag} is online!`);
    } catch (error) {
      logger.error(`Failed to log bot status: ${error}`);
    }
  },
};
