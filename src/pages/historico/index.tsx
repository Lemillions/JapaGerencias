import { useContext } from 'react';
import { UserContext } from '../../contexts/index'
import styles from "./styles.module.scss"


export default function Historico(){
  const { state }= useContext(UserContext)
  console.log(state)
  return (  
    <div className={styles.historicoContainer}>
      {state.historico.map((venda, index)=>{
        return ( 
          <li className={styles.venda} key={index}>
            <div className={styles.quantProdutos}>{venda.produtos.length} Produtos</div>
            <div className={styles.dataDaVenda}>{venda.data}</div>
          </li>
        )
      })}
    </div>
  )
}