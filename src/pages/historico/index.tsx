import { useContext } from 'react';
import { UserContext } from '../../contexts/index'


export default function Historico(){
  const { state }= useContext(UserContext)
  console.log(state) 
  return (  
    <div className={styles.historicoContainer}>
      {state.historico.map([venda, index] =>{
        <li className={venda} key={index}>
          <div className={quantProdutos}>{venda.produtos.length} Produtos</div>
          <div className={dataDaVenda}>{venda.data}</div>
        </li>
}
}
    </div>
  )
}
