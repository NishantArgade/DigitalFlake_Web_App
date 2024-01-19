import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App.jsx";
import "./index.css";
import "./inetercepters/axios.js";

// Create a client
export const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <App />
      <Toaster
        toastOptions={{
          className: "text-sm bg-[#5C218B] text-white text-center",
          style: {
            width: "auto",
          },
        }}
      />
    </React.StrictMode>
  </QueryClientProvider>
);
