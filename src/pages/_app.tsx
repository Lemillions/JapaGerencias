import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import '../styles/global.scss';
import { createContext, useState } from "react";

export const UserContext = createContext({} as any)

export default function MyApp({ Component, pageProps }: AppProps) {
  const [value, setValue] = useState("AAAAA")
  return(
    <>
      <UserContext.Provider value={{value, setValue}}>
        <Header />
        <Component {...pageProps} />
      </UserContext.Provider>
    </>
  ) 
}


