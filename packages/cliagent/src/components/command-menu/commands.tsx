import type { Command } from "./type";

export const COMMAND: Command[] = [
    {
        name: "new",
        description: "Start a new conversation",
        value: "/new",
        action: (ctx) => {
            ctx.toast.show({ message: "Starting a new conversation..." });
        }
    },
    {
        name: "models",
        description: "Switch or view available models",
        value: "/models",
        action: (ctx) => {
            ctx.toast.show({ message: "Opening model switcher..." });
        }
    },
    {
        name: "theme",
        description: "Change application theme",
        value: "/theme",
        action: (ctx) => {
            ctx.toast.show({ message: "Theme options coming up..." });
        }
    },
    {
        name: "agents",
        description: "Manage available agents",
        value: "/agents",
        action: (ctx) => {
            ctx.toast.show({ message: "Switching agent..." });
        }
    },
    {
        name: "session",
        description: "View current session information",
        value: "/session",
        action: (ctx) => {
            ctx.toast.show({ message: "Fetching session info..." });
        }
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