import { Client, Collection, CommandInteraction, Message, SlashCommandBuilder } from "discord.js";

export interface Config {
  roles: {
    verificationId: string;
  };
  // Add other configuration properties as needed
}

export interface CustomClient extends Client {
  commands: Collection<string, CustomCommandInteraction>;
  config: Config;
}

export interface CustomCommandInteraction extends Omit<CommandInteraction, "client" | "command"> {
  client: CustomClient;
  folder: string;
  data: SlashCommandBuilder;
  execute: (interaction: CustomCommandInteraction, client: CustomClient) => void | Promise<void>;
}

export interface Commands {
  data: SlashCommandBuilder;
  execute: (interaction: CustomCommandInteraction, client: CustomClient) => void | Promise<void>;
  autocomplete?: (interaction: CustomCommandInteraction, client: CustomClient) => void | Promise<void>;
}

export interface EventContext {
  message?: Message;
  interaction?: CustomCommandInteraction;
  // Add more properties as needed
}

export interface Events {
  name: string;
  once?: boolean;
  rest?: boolean;
  execute: (client: CustomClient, c: EventContext) => void | Promise<void>;
}
