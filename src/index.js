// index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Import from "react-dom/client"
import { RecoilRoot } from "recoil";
import App from "./App";
import { AuthProvider } from "./firebase/authContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </AuthProvider>
  </React.StrictMode>
);
