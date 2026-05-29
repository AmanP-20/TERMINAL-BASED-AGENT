import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import Header from "./components/header";
import InputBar from "./components/inputbar";

function App() {
  return (
    <box flexDirection="column" width="100%" height="100%"
    alignItems="center"
    justifyContent="center"
    backgroundColor="black"
    gap={2}
    >
      <Header/>
      <InputBar onSubmit={()=>{}}/>
    </box>
  );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
