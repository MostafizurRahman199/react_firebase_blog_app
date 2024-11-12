import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FirebaseProvider from "./context/Firebase.jsx";

import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router}/>
    </FirebaseProvider>
  </StrictMode>
);
