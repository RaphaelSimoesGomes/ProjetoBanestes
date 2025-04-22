import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/index";      // Certifique-se que o caminho está correto!
import AdminPage from "./pages/admin";
import ClientPage from "./pages/client";
import ProtectedRoute from "./routes/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/client"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <ClientPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
