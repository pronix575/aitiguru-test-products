import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { applyTheme, getStoredTheme } from "./services/theme";

applyTheme(getStoredTheme());

createRoot(document.getElementById("root")!).render(<App />);
