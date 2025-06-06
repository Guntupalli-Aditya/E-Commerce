import { useState, useEffect } from "react";
import { useAuth } from "./context";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false)
  const [auth] = useAuth()

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("https://backend1-lbi4.onrender.com/AuthRoutes/admin-auth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path = '' />;
}