import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const auth = useAuth();

  useEffect(() => {
    auth.signOut();
  }, []); // Empty dependency array to ensure it's only called once

  return <Navigate to="/" replace={true} />;
}
