import { useContext } from 'react';
import { UserContext } from '../../contexts/index'


export default function Historico(){
  const { state }= useContext(UserContext)
  console.log(state) 
  return (  
    <div>
      {state.historico[0].produtos.map(produto=>{
        return(
          <h1>{produto.nome}</h1>
        )
      })
    }
    </div>
  )
}
