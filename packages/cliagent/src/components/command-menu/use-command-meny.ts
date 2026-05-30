import { useRef, useState, useMemo, type RefObject } from "react";
import { ScrollBoxRenderable } from "@opentui/core";
import { useKeyboard } from "@opentui/react";
import { getFilteredCommand } from "./filter-command";
import type { Command } from "./type";

type UseCommandMenuReturn = {
    showCommandMenu: boolean;
    commandQuery: string;
    selectedIndex: number;
    scrollRef: RefObject<ScrollBoxRenderable | null>;
    handleContentChange: (text: string) => void;
    resolveCommand: (index: number) => Command | undefined;
    setSelectedIndex: (index: number) => void;
};


export function useCommandMenu(): UseCommandMenuReturn {
    const [textValue, setTextValue] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showCommandMenu, setShowCommandMenu] = useState(false);
    const scrollRef = useRef<ScrollBoxRenderable>(null);
    const commandQuery = showCommandMenu && textValue.startsWith("/") ? textValue.slice(1) : "";
    const filterCommand = useMemo(() => getFilteredCommand(commandQuery), [commandQuery]);
    const handleContentChange = (text: string) => {
        setTextValue(text);
        const scrollbox = scrollRef.current;
        if (scrollbox) scrollbox.scrollTo(0);
        const prefix = text.startsWith("/") ? text.slice(1) : null;
        if (prefix !== null && !prefix.includes(" ")) {
            setShowCommandMenu(true);
        }
        else setShowCommandMenu(false);
    }
    const resolveCommand = (index: number): Command | undefined => {
        const command = filterCommand[index]
        if (command) {
            setShowCommandMenu(false)
        }
        return command;
    }
    useKeyboard((key) => {
        if (!showCommandMenu) return;
        if (key.name === "escape") {
            key.preventDefault();
            setShowCommandMenu(false);
        } else if (key.name === "up") {
            key.preventDefault();
            setSelectedIndex((i: number) => {
                const newIndex = Math.max(0, i - 1);
                // Keep the highlighted item visible when arrowing pa
                const sb = scrollRef.current;
                if (sb && newIndex < sb.scrollTop) {
                    sb.scrollTo(newIndex);
                }
                return newIndex;
            });
        } else if(key.name === "down"){
            key.preventDefault();
            setSelectedIndex((i : number)=>{
                const newIndex = Math.min(filterCommand.length-1,i + 1);
                const sb = scrollRef.current;
                if(sb){
                    const viewportheight = sb.viewport.height;
                    const visibleend = sb.scrollTop + viewportheight - 1;
                    if(newIndex > visibleend){
                        sb.scrollTo(newIndex - viewportheight + 1);
                    }
                }
                return newIndex
            })
        }
    })
    return{
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,
        setSelectedIndex
    };
};