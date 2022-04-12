import axios from 'axios'
import { GetStaticProps } from 'next';
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts';
import styles from './styles.module.scss'

type ProdutoInfos = {
  nome: string;
  quantidade: number;
  valor: number;
}

type CompraProps = {
  produtos: ProdutoInfos[];
}

export default function Compra(props:CompraProps){
  const { state, setState } = useContext(UserContext)
  const produtos = props.produtos;
  const [carrinho, setCarrinho] = useState<ProdutoInfos[]>([])
  const [pesquisa, setPesquisa] = useState('')
  const [produtosPesquisados, setProdutosPesquisados] = useState<ProdutoInfos[]>([])

  const pesquisar = (query:string) => {
    setPesquisa(query)
    setProdutosPesquisados(produtos.filter(produto => {
      if(produto.nome.includes(query)){
        return produto  
      }
    })
    )
  }

  const adicionarAoCarrinho = (produto:ProdutoInfos) => {
    if(!carrinho.includes(produto)){
      setCarrinho([...carrinho, produto])
    }
  }

  const definirQuant = (nome:any, e:any) => {
    carrinho[(carrinho.findIndex(produto=> { if(produto.nome == nome) {return nome} }))].quantidade = e.target.value
  } 

  const finalizaerCompra = () => {
    axios.post('https://api-piton.mvsantos2003.repl.co/comprar', [carrinho, state.usuario])
    .then(()=>{

      setState({'usuario': state.usuario,
      'permissao': state.permissao,
      'historico':[...state.historico,carrinho]})
      alert('Compra realizada com sucesso')
      console.log(state.historico)
    })
    .catch(function (error: any) {
      console.log(error)
    });
    setCarrinho([])
  }
  return (  
    <>
      <div className={styles.carrinhoContainer}>
      <input value={pesquisa} onChange={(e)=>{pesquisar(e.target.value)}}/>
      {pesquisa=="" || pesquisa==" "?"":
      produtosPesquisados.map(produto=>{
        return(
          <div className={styles.resultadoPesquisa} onClick={(e)=>{adicionarAoCarrinho(produto)}}>{produto.nome}</div>
        )
      })
      }
      <div className={styles.carrinho}>
      {carrinho.map(produto =>{
        return(
          <li className={styles.listaProdutos} key={produto.nome}>
            <div className={styles.nomeDoProduto}>{produto.nome}</div>
            <input type='number' className={styles.quantDoProduto} onChange={(e)=>{definirQuant(produto.nome, e)}}/>
            <div className={styles.valorDoProduto}>R$ {Math.round(produto.valor)}</div> 
          </li>
          )
        })}
      </div>
      </div>

      <div className={styles.sideBarCompra}>
        <h1>Valor</h1>
        <button onClick={()=>{finalizaerCompra()}}>FINALIZAR COMPRA</button>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get('https://api-piton.mvsantos2003.repl.co/produtos')


  const produtos = data.map((produto: ProdutoInfos) =>{
    return {
      nome:produto.nome,
      quantidade:produto.quantidade,
      valor:produto.valor
    }  
  })

  return {
    props: {
      produtos
    },
    revalidate: 60
  }
}
