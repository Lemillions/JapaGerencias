import { useState } from 'react';
import { GetServerSideProps } from 'next';
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

  const [produtos, setProdutos] = useState(props.produtos)
  const [modal, setModal] = useState<Modal>({"produtoModal":{"nome":"","quantidade":0,"valor":0},estado:false})
  const [modalForm, setModalForm] = useState<ProdutoInfos>({"nome":"","quantidade":0,"valor":0})
  const [toogleAdicionar, setToogleAdicionar] = useState<boolean>(false)
  const [modalAdicionar, setModalAdicionar] = useState<ProdutoInfos>({"nome":"","quantidade":0,"valor":0})

  const toogleModal = (produto: ProdutoInfos) => {
    setModal({"produtoModal":produto, estado:!modal.estado})
  }

  const adicionarProduto = () => {
    if(modalAdicionar.nome == "" || modalAdicionar.quantidade <= 0 || modalAdicionar.valor <= 0){
      alert("Falta preencher um dos elementos")
    }else{
      axios.post('https://API-piton.mvsantos2003.repl.co/adicionarProduto', modalAdicionar)
      .then((response)=>{
        setProdutos(response.data)
        setToogleAdicionar(!toogleAdicionar)
      })
    }
  }

  const atualizarModal = (nome:any) => {
      axios.post('https://API-piton.mvsantos2003.repl.co/produtos', {nome:modalForm.nome, quantidade:modalForm.quantidade, valor:modalForm.valor, original:nome})
      .then((response)=>{
        setProdutos(response.data)
      })
      .catch((erro)=>{
        alert(erro)
      })
      setModal({"produtoModal":modal.produtoModal, estado:!modal.estado})
  }

  const changeModalForm = (e:any) => {
    setModalForm({
      ...modalForm,
      [e.target.name]:e.target.value
    })
  }
  
  const changeModalFormA = (e:any) => {
    setModalAdicionar({
      ...modalAdicionar,
      [e.target.name]:e.target.value
    })

  }

  return (  
    <>

    {toogleAdicionar == false?"":
    <div className={styles.outModal} onClick={()=>{}}>
      <div className={styles.modal}>
        <input value={modalAdicionar.nome} onChange={(e)=>{changeModalFormA(e)}} name="nome" />
        <input type='number' value={modalAdicionar.quantidade} onChange={(e)=>{changeModalFormA(e)}} name="quantidade" />
        <input type='number' value={modalAdicionar.valor} onChange={(e)=>{changeModalFormA(e)}} name="valor" /><br/>
        <button onClick={({})=>{adicionarProduto()}}>ADICIONAR</button>
        <button onClick={()=>{setToogleAdicionar(!toogleAdicionar)}}>CANCELAR</button>
      </div>
    </div>
    }

    {modal.estado == false?"":
      <div className={styles.outModal} onClick={()=>{}}>
        <div className={styles.modal}>
          <h1>{modal.produtoModal.nome}</h1>
          <input value={modalForm.nome} onChange={(e)=>{changeModalForm(e)}} name="nome" placeholder={modal.produtoModal.nome} />
          <input type='number' value={modalForm.quantidade} onChange={(e)=>{changeModalForm(e)}} name="quantidade" placeholder={modal.produtoModal.quantidade.toString()} />
          <input type='number' value={modalForm.valor} onChange={(e)=>{changeModalForm(e)}} name="valor" placeholder={modal.produtoModal.valor.toString()} /><br/>
          <button onClick={({})=>{atualizarModal(modal.produtoModal.nome)}}>ATUALIZAR</button>
          <button onClick={()=>{
            setModal({produtoModal:modal.produtoModal ,estado:!modal.estado})}}>
              CANCELAR
          </button>
        </div>
      </div>
    }

    <button className={styles.botaoAdicionar} onClick={()=>{setToogleAdicionar(!toogleAdicionar)}}>ADICIONAR</button>

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
              <div className={styles.divButao}><button className={styles.botaoAtualizarProduto} onClick={()=>{toogleModal(produto)}}><img src='https://www.svgrepo.com/show/14567/pencil.svg' alt="edit"/></button></div>
            </li>
          )
        })
      }
    </div>

    </>
  )
}

export const getServerSideProps:GetServerSideProps = async () => {
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
    }
  }
}
