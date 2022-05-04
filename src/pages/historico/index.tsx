import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/index'
import styles from "./styles.module.scss"

type merda = Array<number>

export default function Historico(){
  const { state }= useContext(UserContext)
  const [listaHistoricoMostrar, setiLstaHistoricoMostrar] = useState<merda>([])
  var copia = [];
  
  const mostrarProdutos = (index:any) => {
    if(listaHistoricoMostrar.includes(index)){
      copia = [...listaHistoricoMostrar]
      copia.splice(index, 1)
      setiLstaHistoricoMostrar(copia)
    }else{
      setiLstaHistoricoMostrar([...listaHistoricoMostrar, index])
    }
  }
  return (  
    <div className={styles.historicoContainer}>
      {state.historico.map((venda, index)=>{
        return ( 
          <li className={styles.venda} key={index} onClick={()=>{mostrarProdutos(index)}}>
            <div className={styles.quantProdutos}>{venda.produtos.length} Produtos</div>
            <div className={styles.dataDaVenda}>{venda.data}</div>
          </li>
        )
          {!listaHistoricoMostrar.includes(index)?"":
            {state.historico[index].produtos.map(produto)=>{
              <div>{produto.nome}</div>
          }}  
       }
        )
      })}
    </div>
  )
}
 
