import { Inter } from 'next/font/google'
import './globals.css'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MagicProvider from '@/provider/magic-provider';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <title>Seamless Wallet</title>
        <meta name="description" content="The wallet that even your grandma can use" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <MagicProvider>
        <ToastContainer />
        <body className={inter.className}>
          {children}
        </body>
        <ToastContainer />
      </MagicProvider>
    </html>
  )
}
