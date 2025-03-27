"use client"
import { useAuth } from "@/hooks/auth";


const Logout = () => {
    const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;