import { Inter } from 'next/font/google'
import './globals.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MagicProvider from '@/provider/magic-provider';

import { Provider } from "react-redux";
import store from '@/reduxComponents/store';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MagicProvider>
      <Provider store={store}>
        <html lang='en'>
          <head>
            <title>Seamless Wallet</title>
            <meta name="description" content="The wallet that even your grandma can use" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body className={inter.className}>
            <ToastContainer />
            {children}
            <ToastContainer />
          </body>
        </html>
      </Provider>
    </MagicProvider>
  )
}
