"use client";

import { useEffect, useState } from "react";

import Dashboard from "@/components/dashboard";
import Login from "@/components/login";
import useStore from "@/store";

const Home = () => {
  const { token, setToken } = useStore();

  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
  }, [setToken]);
  return (
    <>
      {process.env.NEXT_PUBLIC_MAGIC_API_KEY && token.length > 0 ? (
        <div>
          <Dashboard />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
