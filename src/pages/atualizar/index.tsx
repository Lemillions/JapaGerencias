import { useState } from 'react';
import { GetStaticProps } from 'next';
import axios from 'axios'
import styles from './styles.module.scss';

type ProdutoInfos = {
  nome: string;
  quantidade: number;
  valor: number;
}

type AtualizarProps = {
  produtos: ProdutoInfos[];
}

type Modal = {
  produtoModal: ProdutoInfos;
  estado: boolean
}

export default function Atualizar(props: AtualizarProps){
  const { data } = axios.get('https://api-piton.mvsantos2003.repl.co/produtos')
  const produtos = props.produtos;
  console.log(produtos)

  const [modal, setModal] = useState<Modal>({"produtoModal":{"nome":"","quantidade":0,"valor":0},estado:false})
  const [modalForm, setModalForm] = useState<ProdutoInfos>({"nome":"","quantidade":0,"valor":0})

  const abrirModal = (produto: ProdutoInfos) => {
    setModal({"produtoModal":produto, estado:!modal.estado})
  }

  const atualizarModal = (nome:any) => {
      axios.post('https://API-piton.mvsantos2003.repl.co/produtos', {nome:modalForm.nome, quantidade:modalForm.quantidade, valor:modalForm.quantidade, original:nome})
      .then((response)=>{
        console.log(response.data)
      })
      .catch((erro)=>{
        alert(erro)
      })
  }

  const changeModalForm = (e:any) => {
    setModalForm({
      ...modalForm,
      [e.target.name]:e.target.value
    })
  }
  
  return (  
    <>

    {modal.estado==false?"":
        <div className={styles.modal}>
          <input value={modalForm.nome} onChange={(e)=>{changeModalForm(e)}} name="nome" placeholder={modal.produtoModal.nome} />
          <input value={modalForm.quantidade} onChange={(e)=>{changeModalForm(e)}} name="quantidade" placeholder={modal.produtoModal.quantidade.toString()} />
          <input value={modalForm.valor} onChange={(e)=>{changeModalForm(e)}} name="valor" placeholder={modal.produtoModal.valor.toString()} />
          <button onClick={({})=>{atualizarModal(modal.produtoModal.nome)}}>ATUALIZAR</button>
          <button onClick={()=>{
            setModal({produtoModal:modal.produtoModal ,estado:!modal.estado})}}>
              CANCELAR
          </button>
        </div>
    }

    <div className={styles.produtosContainer}>
      <li className={styles.listaProdutos} >
        <div className={styles.nomeDoProduto}>Nome</div>
        <div className={styles.quantDoProduto}>Quantidade</div>
        <div className={styles.valorDoProduto}>Preço</div>
      </li>
      {  
        produtos.map(produto => {
          return(
            <li className={styles.listaProdutos} key={produto.nome}>
              <div className={styles.nomeDoProduto}>{produto.nome}</div>
              <div className={styles.quantDoProduto}>{produto.quantidade}</div>
              <div className={styles.valorDoProduto}>R$ {produto.valor}</div>
              <div className={styles.divButao}><button className={styles.botaoAtualizarProduto} onClick={()=>{abrirModal(produto)}}><img src='https://www.svgrepo.com/show/14567/pencil.svg' alt="edit"/></button></div>
            </li>
          )
        })
      }
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
