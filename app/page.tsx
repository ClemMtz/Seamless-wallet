"use client";

import { useEffect, useState } from 'react';


import Login from '@/components/login';
import Dashboard from '@/components/dashboard';


const Home = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token') ?? '');
  }, [setToken]);
  return (
    <>
      {process.env.NEXT_PUBLIC_MAGIC_API_KEY && token.length > 0 ? (
        <div>
          <Dashboard token={token} setToken={setToken} />
        </div>
      ) : (
        <Login token={token} setToken={setToken} />
      )
      }
    </>
  )
}

export default Home
