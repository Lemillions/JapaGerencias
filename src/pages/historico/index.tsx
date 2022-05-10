import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/index'
import styles from "./styles.module.scss"

type merda = Array<number>

export default function Historico(){
  const { state }= useContext(UserContext)
  const [listaHistoricoMostrar, setiLstaHistoricoMostrar] = useState<merda>([])
  var copia:merda = [...listaHistoricoMostrar]
  const mostrarProdutos = (index:number) => {
    if(listaHistoricoMostrar.includes(index)){
      copia.splice(copia.indexOf(index), 1)
      setiLstaHistoricoMostrar(copia)
    }else{
      setiLstaHistoricoMostrar([...listaHistoricoMostrar, index])
    }
  }

  return (  
    <div className={styles.historicoContainer}>
      {state.historico.map((venda, index)=>{
        return ( 
          <>
          <li className={styles.venda} key={index} onClick={()=>{mostrarProdutos(index)}}>
            <div className={styles.quantProdutos}>{venda.produtos.length} Produtos</div>
            <div className={styles.dataDaVenda}>{venda.data}</div>
            <div className={styles.valorDaVenda}>R$ {venda.preco}</div>
          </li>
          {!listaHistoricoMostrar.includes(index)?"":state.historico[index].produtos.map(produto =>{
            return (
              <div key={index+produto.nome} className={styles.produtosListadoHistorico}>
                <div className={styles.nomeListado}>{produto.nome}</div>
                <div className={styles.quantidadeListado}>{produto.quantidade}</div>
                <div className={styles.valorListado}>R$ {produto.valor}</div>
              </div>
               )
          })}
          </>
        )
      })}
    </div>
  )
}
