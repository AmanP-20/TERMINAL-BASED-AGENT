import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import Header from "./components/header";
import InputBar from "./components/inputbar";
import { ToastProvider } from "./providers/toast";
import { KeyboardLayerProvider } from "./providers/keyboard-layer";
function App() {
  return (
    <KeyboardLayerProvider>
    <ToastProvider>
    <box flexDirection="column" width="100%" height="100%"
    alignItems="center"
    justifyContent="center"
    backgroundColor="black"
    gap={2}
    >
      <Header/>
      <InputBar onSubmit={()=>{}}/>
    </box>
    </ToastProvider>
    </KeyboardLayerProvider>
  );
}

const renderer = await createCliRenderer({
  targetFps:60,
  exitOnCtrlC:false
});
createRoot(renderer).render(<App />);
