import type { KeyBinding } from "@opentui/core";
import StatusBar from "./status-bar";

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
  return (
    <box flexDirection="column" width="100%">
        {/* Sleek, borderless input area with a CLI prompt indicator */}
        <box flexDirection="row" gap={1} paddingLeft={1} paddingRight={1}>
            <text fg="cyan">❯</text>
            <textarea
                focused={!disabled}
                keyBindings={TEXTAREA_KEY_BINDING}
                placeholder={`Ask anything... "Fix a bug in index.html"`}
            />
        </box>
        <box marginTop={1} paddingLeft={1} paddingRight={1}>
            <StatusBar/>
        </box>
    </box>
  )
}

export default InputBar