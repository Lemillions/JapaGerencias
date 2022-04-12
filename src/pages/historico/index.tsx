import { useContext } from 'react';
import { UserContext } from '../../contexts/index'

export default function Historico(){
  const { state } = useContext(UserContext) 
  console.log(state.historico[1])
  return (  
    <div>
      {state.historico[1].nome}
    </div>
  )
}
