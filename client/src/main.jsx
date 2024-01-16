import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";
import AuthProvider from "./auth/authProvider.jsx";
import "./index.css";
import "./inetercepters/axios.js";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AuthProvider>
        <App />
        <Toaster
          toastOptions={{
            className: "text-sm",
          }}
        />
      </AuthProvider>
    </React.StrictMode>
  </QueryClientProvider>
);
