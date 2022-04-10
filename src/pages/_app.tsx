import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react';
import { Header } from '../components/Header'
import '../styles/global.scss';
import { UsuarioProvider } from '../contexts/index'
import { UserContext } from '../contexts/index'

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { state, setState} = useContext(UserContext)

  useEffect(() => {
    if(state.permissao == ""){
      router.push('/login');
    }
  }, [])

  return(
      <UsuarioProvider>
        <noscript>É necessario javascript ativado pra esse site funcionar</noscript>
        <Header />
        <Component {...pageProps} />
      </UsuarioProvider>
  ) 
}


