import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "react-hot-toast";
import Header from './components/Header';
import Footer from './components/Footer';


const josefin = Josefin_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'CraftCove',
  description: 'Shop handmade items',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={josefin.className}>
      <Toaster position="bottom-center " />
        <Header/>
        {children}
       <Footer/>
      </body>
    </html>
    </ClerkProvider>
  )
}
