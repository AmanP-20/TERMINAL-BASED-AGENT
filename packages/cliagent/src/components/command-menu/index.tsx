import { type RefObject } from "react";
import { TextAttributes, type ScrollBoxRenderable } from "@opentui/core";
import { getFilteredCommand } from "./filter-command";
import { COMMAND } from "./commands";


const MAX_VISIBLE = 8;
const WIDTH = Math.max(...COMMAND.map((cmd) => cmd.name.length)) + 4;

type CommandMenuProps = {
    query : string,
    selectedIndex : number,
    scrollRef : RefObject<ScrollBoxRenderable | null>,
    onSelect : (index : number) => void;
    onExecute : (index : number) => void;
}

export function CommandMenu({
    query,
    selectedIndex,
    scrollRef,
    onSelect,
    onExecute
} : CommandMenuProps){
    const filtered = getFilteredCommand(query);
    const len = Math.min(MAX_VISIBLE,filtered.length);
    if(filtered.length === 0){
        return(
            <box paddingX={1}>
                <text attributes = {TextAttributes.DIM}>
                    No matching commands
                </text>
            </box>
        )
    }
    return (
        <scrollbox ref={scrollRef} height = {len}>
            {filtered.map((cmd,i)=>{
                const isSelected = (i === selectedIndex);
                return(
                    <box
                        key={cmd.value}
                        flexDirection="row"
                        paddingX={1}
                        height={1}
                        overflow="hidden"
                        backgroundColor={isSelected ? "cyan" : undefined}
                        onMouseMove={()=>onSelect(i)}
                        onMouseDown={()=>onExecute(i)}>
                            <box width={WIDTH} flexShrink={0}>
                                <text selectable={false} fg={isSelected ? "black" : "white"}>
                                    /{cmd.name}
                                </text>
                            </box>
                            <box flexGrow={1}>
                                <text selectable={false} fg={isSelected ? "black" : "gray"}>
                                    {cmd.description}
                                </text>
                            </box>
                        </box>
                )
            })}
        </scrollbox>
    )
} 