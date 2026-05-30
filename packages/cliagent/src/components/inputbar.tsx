import { TextareaRenderable, type KeyBinding } from "@opentui/core";
import StatusBar from "./status-bar";
import { useCallback, useEffect, useRef } from "react";
import { useRenderer } from "@opentui/react";
import { useCommandMenu } from "./command-menu/use-command-meny";
import type { Command } from "./command-menu/type";
import { CommandMenu } from "./command-menu";
import { useToast } from "../providers/toast";
import { useKeyboardLayer } from "../providers/keyboard-layer";

type Props = {
    onSubmit: (text: string) => void;
    disabled?: boolean;
}

export const TEXTAREA_KEY_BINDING:KeyBinding[] = [
    {name : "return", action :"submit"},
    {name : "enter", action :"submit"},
    {name : "return", meta:true, action :"newline"},
    {name : "enter",meta:true, action :"newline"},
]

const InputBar = ({ onSubmit, disabled = false }: Props) => {
    const textareaRef = useRef<TextareaRenderable>(null);
    const onSUbmitRef = useRef<() => void>(()=>{});
    const renderer = useRenderer();
    const toast = useToast();
    const { setResponder } = useKeyboardLayer();
    const {
        showCommandMenu,
        commandQuery,
        selectedIndex,
        scrollRef,
        handleContentChange,
        resolveCommand,setSelectedIndex
    } = useCommandMenu();

    const handleCOmmandExecute = useCallback((index:number)=>{
        const command = resolveCommand(index);
        handleCommand(command);
    },[]);
    const handleTextAreaaContentChange = useCallback(()=>{
        const textarea = textareaRef.current;
        if(!textarea) return;
        handleContentChange(textarea.plainText);
    },[]);
    const handleSubmit = useCallback(()=>{
        if(disabled) return;
        const textarea = textareaRef.current;
        if(!textarea) return;
        const text = textarea.plainText.trim();
        if(text.length === 0) return;
        onSubmit(text);
        textarea.setText("");
    },[disabled,onSubmit]);


    const handleCommand = useCallback((command : Command |undefined)=>{
        const textarea = textareaRef.current;
        if(!textarea || !command) return;
        textarea.setText("");
        if(command.action){
            command.action({
                exit:()=>renderer.destroy(),
                toast
            })
        }else{
            textarea.insertText(command.value + " ");
        }
    },[]);
    useEffect(()=>{
        const textarea = textareaRef.current;
        if(!textarea) return;
        textarea.onSubmit = ()=>{
            onSUbmitRef.current();
        };
    },[]);
    // Register the base layer responder for ctrl+c handling
    useEffect(() => {
        setResponder("base", () => {
            if (disabled) return false;

            const textarea = textareaRef.current;
            if (textarea && textarea.plainText.length > 0) {
                textarea.setText("");
                return true;
            }

            return false;
        });

        return () => setResponder("base", null);
    }, [disabled, setResponder]);
    onSUbmitRef.current = ()=>{
        if(disabled) return;
        if(showCommandMenu){
            const command = resolveCommand(selectedIndex);
            handleCommand(command);
            return; 
        }
        handleSubmit();
    }
    return (
    <box flexDirection="column" width="100%">
        {showCommandMenu && (
            <box paddingLeft={1} paddingRight={1} marginBottom={0}>
                <box
                    flexDirection="column"
                    paddingX={1}
                >
                    <box marginBottom={1}>
                        <text fg="cyan">Commands</text>
                        {commandQuery.length > 0 && (
                            <text fg="gray"> /{commandQuery}</text>
                        )}
                    </box>
                    <CommandMenu
                        query={commandQuery}
                        selectedIndex={selectedIndex}
                        scrollRef={scrollRef}
                        onSelect={setSelectedIndex}
                        onExecute={handleCOmmandExecute}
                    />
                </box>
            </box>
        )}
        {/* Sleek, borderless input area with a CLI prompt indicator */}
        <box flexDirection="row" gap={1} paddingLeft={1} paddingRight={1}>
            <text fg="cyan">❯</text>


             
            <textarea
                ref={textareaRef}
                focused={!disabled}
                keyBindings={TEXTAREA_KEY_BINDING}
                placeholder={`Ask anything... "Fix a bug in index.html"`}
                onContentChange={handleTextAreaaContentChange}
            />
        </box>
        <box marginTop={1} paddingLeft={1} paddingRight={1}>
            <StatusBar/>
        </box>
    </box>
  )
}

export default InputBar