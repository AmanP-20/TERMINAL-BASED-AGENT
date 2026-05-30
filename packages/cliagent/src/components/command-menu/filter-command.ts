import { type Command } from "./type";
import { COMMAND } from "./commands";

export function getFilteredCommand(query : string):Command[] {
    if(query.length === 0) return COMMAND;
    return COMMAND.filter((cmd) => cmd.name.toLowerCase().startsWith(query.toLowerCase()));
}