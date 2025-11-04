import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { isAuthed } from "../auth";

interface ProtectedRouteProps {
  children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  return children;
}
