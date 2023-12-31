"use client";

import { useEffect, useState } from 'react';


import Login from '@/components/login';
import Dashboard from '@/components/dashboard';
import MagicDashboardRedirect from '@/components/magic/magic-dashboard-redirect';
import DigitPinCode from '@/components/digit-pincode';

const Home = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('token') ?? '');
  }, [setToken]);
  return (
    <>
      {process.env.NEXT_PUBLIC_MAGIC_API_KEY && token.length > 0 ? (
        <div>
          <DigitPinCode />
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
