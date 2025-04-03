import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HashRouter basename="/foodie_frontend">
            <AuthProvider>
                <App />
            </AuthProvider>
        </HashRouter>
    </StrictMode>,
);
