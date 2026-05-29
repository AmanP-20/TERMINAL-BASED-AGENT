import type { Command } from "./type";

export const COMMAND : Command[] = [
    {
        name : "new",
        description:"Start a new conversation",
        value:"/new"
    },
    {
        name : "exit",
        description:"Quit the application",
        value:"/exit",
        action : (ctx) => {
            ctx.exit();
        }
    }
];