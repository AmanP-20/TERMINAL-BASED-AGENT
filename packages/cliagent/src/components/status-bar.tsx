import { TextAttributes } from "@opentui/core"

const StatusBar = () => {
  return (
    <box flexDirection="row" gap={1}>
        <text fg="cyan">Build</text>
        <text attributes={TextAttributes.DIM} fg="gray">
          ❯
        </text>
        <text>gemini-flash-2.5</text>
    </box>
  )
}

export default StatusBar