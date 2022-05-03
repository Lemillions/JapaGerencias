import { useContext } from 'react';
import { UserContext } from '../../contexts/index'
import styles from "./styles.module.scss"

type produto = {
  
}
type produtos = produto[]
export default function Historico(){
  const { state }= useContext(UserContext)
<<<<<<< HEAD
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
=======
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

>>>>>>> fbda7087d13b5e94ece4b265eeb61ca972e0d50f
