import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import "./inetercepters/axios.js";
import { persistor, store } from "./redux/store.js";
// Create a client
export const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
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
