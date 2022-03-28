import Link from 'next/link';
import styles from './styles.module.scss';
import { useRouter } from 'next/router'

export function Header(){
    const router = useRouter()
    const style = {
        marginRight: 10,
        display: router.pathname === "/login" ? 'none':'',
      }
    return(
        <>
        <div className={styles.header} style={style}> 
            <Link href='https://japagerencia.vercel.app/historico'><a>Historico</a></Link>
            <Link href='https://japagerencia.vercel.app/atualizar'><a>Atualizar Estoque</a></Link>
            <Link href='https://japagerencia.vercel.app/compra'><a>Realizar Comprar</a></Link>
        </div>
        <div className={styles.teste}></div>
        </>
    )
}   