"use client";

import { useEffect, useState } from 'react';


import Login from '@/components/magic/login';
import Dashboard from '@/components/magic/dashboard';
import MagicDashboardRedirect from '@/components/magic/magic-dashboard-redirect';

const Home = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token') ?? '');
  }, [setToken]);
  return (
    <>
      {process.env.NEXT_PUBLIC_MAGIC_API_KEY ? (
        token.length > 0 ? (
          <Dashboard token={token} setToken={setToken} />
        ) : (
          <Login token={token} setToken={setToken} />
        )
      ) : (
        <MagicDashboardRedirect />
      )}
    </>
  )
}

export default Home
