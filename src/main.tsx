import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Cookie from "./Cookie.tsx";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Authenticator>
        <App />
      </Authenticator>
    ),
  },
  {
    path: "/cookie",
    element: <Cookie />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
