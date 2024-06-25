import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Contact from "./routes/Contact.tsx";
import About from "./routes/About.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import NotFound from "./routes/NotFound.tsx";
import Home from "./routes/Home.tsx";

Amplify.configure(outputs);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
