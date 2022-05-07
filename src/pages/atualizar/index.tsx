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
  const [toogleDeletar, setToogleDeletar] = useState({'nome':"","estado":false})
  const [modalAdicionar, setModalAdicionar] = useState<ProdutoInfos>({"nome":"","quantidade":0,"valor":0})

  const toogleModalDeletar = (produtoNome: string) => {
    setToogleDeletar({'nome':produtoNome,"estado":!toogleDeletar.estado})
  }

  const deletarProduto = (produtoNome:string) =>{
    axios.post('https://api-piton.mvsantos2003.repl.co/deletar', {"nome":produtoNome})
    .then(()=>{
      alert(produtoNome +' Apagado com sucesso')
    })
  }

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

    {!toogleAdicionar?"":
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

    {!modal.estado?"":
      <div className={styles.outModal} onClick={()=>{}}>
        <div className={styles.modal}>
          <h1>{modal.produtoModal.nome}</h1>
          <input value={modalForm.nome} onChange={(e)=>{changeModalForm(e)}} name="nome" placeholder={modal.produtoModal.nome} />
          <input type='number' value={modalForm.quantidade} onChange={(e)=>{changeModalForm(e)}} name="quantidade" placeholder={modal.produtoModal.quantidade.toString()} />
          <input type='number' value={modalForm.valor} onChange={(e)=>{changeModalForm(e)}} name="valor" placeholder={modal.produtoModal.valor.toString()} /><br/>
          <button onClick={()=>{atualizarModal(modal.produtoModal.nome)}}>ATUALIZAR</button>
          <button onClick={()=>{
            setModal({produtoModal:modal.produtoModal ,estado:!modal.estado});setModalForm({"nome":"","quantidade":0,"valor":0})}}>
              CANCELAR
          </button>
        </div>
      </div>
    }

    {!toogleDeletar.estado?"":
    <div className={styles.outModal}>
      <div className={styles.modalDeletar}>
        <h1>Deletar {toogleDeletar.nome} ?</h1>
        <p>Tem certeza que quer deletar o produto: {toogleDeletar.nome} ?</p>
        <button onClick={()=>{deletarProduto(toogleDeletar.nome)}}>DELETAR</button>
        <button onClick={()=>{setToogleDeletar({"nome":"", estado:false})}}>CANCELAR</button>
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
              <div className={styles.divButao}><img className={styles.botaoAtualizarProduto} onClick={()=>{toogleModal(produto)}} src='https://www.svgrepo.com/show/387440/edit-two.svg' alt="edit"/></div>
              <div className={styles.divButao}><img className={styles.botaoDeletarProduto} onClick={()=>{toogleModalDeletar(produto.nome)}} src='https://www.svgrepo.com/show/387348/delete.svg' alt="delete"/></div>
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
