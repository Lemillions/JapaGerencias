import React, { useState } from "react"
import styles from './styles.module.scss'
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from '../_app'

export default function Login(){

    interface formLogin{
        user:string
        senha:string
    }   

    const [formLogin, setFormLogin] = useState({
        user:"",
        senha:""
})

const { value, setValue} = useContext(UserContext)

    const handleLogin = (e:any) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        });
    }

    const [error, setError] = useState("")

    const logar = (dadosLogin: formLogin) => {
        console.log(dadosLogin)
        if(dadosLogin.user == "" || dadosLogin.senha == ""){
            setError("É necessario preencher o Usuario e senha pra logar!")
        }else{
            setError("")
            axios.post('https://API-piton.mvsantos2003.repl.co', dadosLogin)
            .then(function (response: { data: any }){
                if(response.data == "Errado"){
                    setError("User ou senha incorretos")
                }else{
                    setValue(response.data)
                }
            })
            .catch(function (error: any) {
                console.log(error)
            });
        }
    }


    return(
        <div className={styles.loginContainer}>
            <h1>ENTRAR</h1>
            <input value={formLogin.user} onChange={(e)=>{handleLogin(e)}} type="text" name="user" placeholder="Usuario"/>
            <input value={formLogin.senha} onChange={(e)=>{handleLogin(e)}}  type="password" name="senha" placeholder="Senha"/><br/>
            <button onClick={()=>{logar(formLogin)}}>LOGIN</button>
            {error? <div className={styles.avisoError}>{error}</div> : ''}
        </div>
    )
}