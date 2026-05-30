import type { Command } from "./type";

export const COMMAND: Command[] = [
    {
        name: "new",
        description: "Start a new conversation",
        value: "/new"
    },
    {
        name: "models",
        description: "Switch or view available models",
        value: "/models"
    },
    {
        name: "theme",
        description: "Change application theme",
        value: "/theme"
    },
    {
        name: "agents",
        description: "Manage available agents",
        value: "/agents"
    },
    {
        name: "session",
        description: "View current session information",
        value: "/session"
    },
    {
        name: "exit",
        description: "Quit the application",
        value: "/exit",
        action: (ctx) => {
            ctx.exit();
        }
    }
];