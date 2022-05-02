import axios from 'axios'
import { GetStaticProps } from 'next';
import { useContext, useState, useEffect } from 'react'
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
  const [valorTotal, setValorTotal] = useState<number>(0)
  var total = 0

  const pesquisar = (query:string) => {
    setPesquisa(query)
    setProdutosPesquisados(produtos.filter(produto => {
      if((produto.nome.toUpperCase()).includes(query.toUpperCase())){
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

  const definirQuant = (nome:any, index:number, e:any) => {
    console.log(produtos)
    console.log(carrinho)
    carrinho[index].quantidade = e.target.value
    carrinho.map(produto =>{
      total += produto.valor * produto.quantidade
    })  
    setValorTotal(total)
  } 

  const excluirDoCarrinho = (produtoExcluir: ProdutoInfos) =>{
    const index =  carrinho.findIndex(produto=> { if(produto.nome == produtoExcluir.nome) {return produtoExcluir.nome} })
    var copiaCarrinho = [...carrinho]
    copiaCarrinho.splice(index, 1)
    setCarrinho(copiaCarrinho) 
  }
  /*const finalizaerCompra = () => {
    const data = New Date()
    const hoje = data.toLocaleDateString()
    const prodHistorico:fds = []
    carrinho.map(produto=>{
      prodHistorico.push(produto.nome)
    })
    const novoHistorico = {data: hoje, preco:valorTotal, produtos:prodHistorico}
    axios.post('https://api-piton.mvsantos2003.repl.co/comprar', [novoHistorico, state.usuario])
    .then(()=>{
      setState({'usuario': state.usuario,
      'permissao': state.permissao,
      'historico':[...state.historico, novoHistorico]})
      alert('Compra realizada com sucesso')
      console.log(state.historico)
    })
    .catch(function (error: any) {
      console.log(error)
    });
    setCarrinho([])
  } */
  return (  
    <>
      <div className={styles.carrinhoContainer}>
      <input className={styles.barraDePesquisa} value={pesquisa} onChange={(e)=>{pesquisar(e.target.value)}}/>
      {pesquisa=="" || pesquisa==" "?"":
      produtosPesquisados.map(produto =>{
        return(
          <div key={produto.nome} className={styles.resultadoPesquisa} onClick={(e)=>{adicionarAoCarrinho(produto)}}>{produto.nome}</div>
        )
      })
      }
      <div className={styles.carrinho}>
      {carrinho.map((produto, index) =>{
        return(
          <li className={styles.listaProdutos} key={produto.nome}>
            <div className={styles.nomeDoProduto}>{produto.nome}</div>
            <input type="number" min="1" className={styles.quantDoProduto} onChange={(e)=>{definirQuant(produto.nome, index, e)}}/>
            <div className={styles.valorDoProduto}>R$ {Math.round(produto.valor)}</div> 
            <div className={styles.excluirDoCarrinho}><button onClick={()=>{excluirDoCarrinho(produto)}}><img src='https://www.svgrepo.com/show/415784/delete-recycle-bin-trash-bin.svg'/></button></div>
          </li>
          )
        })}
      </div>
      </div>

      <div className={styles.sideBarCompra}>
        <h1>Valor</h1>
        <div  className={styles.infoCompra}>TOTAL: R${valorTotal}</div>
        <button onClick={()=>{/*finalizaerCompra()*/}}>FINALIZAR COMPRA</button>
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
