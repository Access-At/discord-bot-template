import type { AutocompleteInteraction, Client, Collection, CommandInteraction, Message, SlashCommandBuilder } from "discord.js";

export interface Config {
  client_id: string;
  client_secret: string;
  guild_id: string;
  token: string;
  roles: {
    verificationId: string;
  };
  SEARCH_DEFAULT: string[];
}

export interface Commands {
  data: SlashCommandBuilder;
  execute: ({ interaction, client }: PropsCommands) => Promise<void>;
  autocomplete?: ({ interaction, client }: PropsAutocomplete) => void | Promise<void>;
}

export interface Events {
  name: string;
  rest?: boolean;
  once?: boolean;
  execute: ({ message, interaction, client }: PropsEvents) => void | Promise<void>;
}

export interface CustomClient extends Client {
  commands: Collection<string, CustomCommandInteraction>;
  config: Config;
}

export interface CustomCommandInteraction extends Omit<CommandInteraction, "client"> {
  client: CustomClient;
  autocomplete?: ({ interaction, client }: PropsAutocomplete) => void | Promise<void>;
}

export interface PropsCommands {
  interaction: CustomCommandInteraction;
  client: CustomClient;
}

export interface PropsAutocomplete {
  interaction: AutocompleteInteraction;
  client: CustomClient;
}

export interface PropsEvents {
  message: Message;
  interaction: CustomCommandInteraction | AutocompleteInteraction;
  client: CustomClient;
}
