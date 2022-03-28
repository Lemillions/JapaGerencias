import { useContext } from 'react';
import { UserContext } from '../pages/_app'

export default function Home(){
  const { value, setValue} = useContext(UserContext)
  console.log(value)
  setValue("AAAAFSDS")
  return (  
    <div>
      <h1>{value}</h1> 
    </div>
  )
}

