import { readdirSync } from "fs";
import path, { join } from "path";
import logger from "@/util/logger";
import { REST, Routes } from "discord.js";
import { table, getBorderCharacters } from "table";
import type { CustomClient, EventContext, Events } from "@/util/type";

export default class Handlers {
  private client: CustomClient;
  private eventsTable: string[][] = [];
  private commandsTable: string[][] = [];
  private tableConfig: any = {
    border: getBorderCharacters("ramac"),
  };

  constructor(client: CustomClient) {
    this.client = client;
  }

  public async init(): Promise<void> {
    this.loadEvents();
    await this.loadCommands();
  }

  private loadEvents(): void {
    const eventsPath = join(__dirname, "..", "events");
    const eventFolders = readdirSync(eventsPath);
    this.eventsTable.push(["Events", "Status"]);

    for (const folder of eventFolders) {
      const eventFiles = readdirSync(join(eventsPath, folder)).filter((file) => file.endsWith(".ts"));
      for (const file of eventFiles) {
        const event: Events = require(join(eventsPath, folder, file)).event;
        if (event.rest) {
          if (event.once) {
            this.client.once(event.name, (...args: any[]) => {
              const context = this.createEventContext(...args);
              event.execute(this.client, context);
            });
          } else {
            this.client.on(event.name, (...args: any[]) => {
              const context = this.createEventContext(...args);
              event.execute(this.client, context);
            });
          }
        } else {
          if (event.once) {
            this.client.once(event.name, (...args: any[]) => {
              const context = this.createEventContext(...args);
              event.execute(this.client, context);
            });
          } else {
            this.client.on(event.name, (...args: any[]) => {
              const context = this.createEventContext(...args);
              event.execute(this.client, context);
            });
          }
        }

        this.eventsTable.push([event.name, "✅"]);
      }
    }
    logger.info(`\n${table(this.eventsTable, this.tableConfig)}`);
  }

  private async loadCommands(): Promise<void> {
    const commands: any[] = [];
    const commandsPath = path.join(__dirname, "..", "commands");
    this.commandsTable.push(["Commands", "Status"]);

    const folders = readdirSync(commandsPath);

    for (const folder of folders) {
      const files = readdirSync(path.join(commandsPath, folder));
      for (const file of files) {
        const filePath = path.join(commandsPath, folder, file);
        const command = require(filePath).command;

        const properties = { folder, ...command };
        this.client.commands.set(command.data.name, properties);

        commands.push(command.data.toJSON());

        this.commandsTable.push([command.data.name, "✅"]);
      }
    }

    logger.info(`\n${table(this.commandsTable, this.tableConfig)}`);

    const rest = new REST({ version: "10" }).setToken(Bun.env.token as string);
    const guildId = Bun.env.guild_id as string;

    try {
      const currentUser = (await rest.get(Routes.user())) as { id: string };
      const response =
        process.env.NODE_ENV === "production" ? "Successfully registered commands in production" : "Successfully registered commands for development";
      const endpoint =
        process.env.NODE_ENV === "production" ? Routes.applicationCommands(currentUser.id) : Routes.applicationGuildCommands(currentUser.id, guildId);

      await rest.put(endpoint, { body: commands }).then(() => logger.info(response));
    } catch (error) {
      logger.error(error);
    }
  }

  // Helper method to map args to a structured context
  private createEventContext(...args: any[]): EventContext {
    // This is where you map the args array to specific properties like message, interaction, etc.
    // Assuming args[0] is the message and args[1] is the interaction (adapt as needed):
    return {
      message: args[0], // Map based on your use case
      interaction: args[0], // Map based on your use case
    };
  }
}
