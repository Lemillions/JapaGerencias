import Link from 'next/link';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { UserContext } from '../../contexts'

export function Header(){
    const { state } = useContext(UserContext)
    const style = {
        display: state.permissao === "" ? 'none':'',
      }
    return(
        <>
        {state.permissao === ""? "":
        <div className={styles.header} style={style}> 
            <h1>{state.usuario}</h1>
            <div className={styles.links}>
                <Link href='/'><a>Inicio</a></Link>
                <Link href='/compra'><a>Realizar Comprar</a></Link>
                <Link href='/atualizar'><a>Atualizar Estoque</a></Link>
                <Link href='/historico'><a>Historico</a></Link>
            </div>
        </div>}
        </>
    )
}   