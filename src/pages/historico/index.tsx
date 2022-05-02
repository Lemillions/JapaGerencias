import { useContext } from 'react';
import { UserContext } from '../../contexts/index'
import styles from "./styles.module.scss"

type produto = {
  
}
type produtos = produto[]
export default function Historico(){
  const { state }= useContext(UserContext)
  return (  
    <div className={styles.historicoContainer}>
      {state.historico.map([venda:any, index:any] =>{
        <li className={venda} key={index}>
          <div className={quantProdutos}>{venda.produtos.length} Produtos</div>
          <div className={dataDaVenda}>{venda.data}</div>
        </li>
  }
}
    </div>
  )
}

