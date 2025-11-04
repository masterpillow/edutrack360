import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Vark from "./pages/Vark";
import Features from "./pages/Features";
import AdminPanel from "./pages/AdminPanel";



import "./styles/landing.css";

const router = createBrowserRouter([
  { path: "/", element: <Homepage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/features", element: <Features /> },
  { path: "/admin", element: <AdminPanel /> },



  {
    path: "/courses",
    element: (
      <ProtectedRoute>
        <Courses />
      </ProtectedRoute>
    ),
  },

  // ✅ New VARK page publicly accessible
  { path: "/vark", element: <Vark /> },

  // ✅ Update “Get Started” path to redirect to VARK
  {
    path: "/get-started",
    element: <Vark />
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
