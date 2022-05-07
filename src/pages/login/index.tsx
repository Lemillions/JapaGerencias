import React, { useState } from "react"
import styles from './styles.module.scss'
import axios from 'axios'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../../contexts/index'

export default function Login(){
    const router = useRouter();
    interface formLogin{
        user:string
        senha:string
    }   
 
    const [formLogin, setFormLogin] = useState({
        user:"",
        senha:""
})

    const { state, setState} = useContext(UserContext)

    if(state.permissao != ""){
        router.push('/')
    }
    const handleLogin = (e:any) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value
        });
    }

    const [error, setError] = useState("")

    const logar = (dadosLogin: formLogin) => {
        if(dadosLogin.user == "" || dadosLogin.senha == ""){
            setError("É necessario preencher o Usuario e senha pra logar!")
        }else{
            setError("")
            axios.post('https://API-piton.mvsantos2003.repl.co', dadosLogin)
            .then(function (response: { data: any }){
                const { data } = response;
                if(data == "Errado"){
                    setError("User ou senha incorretos")
                }else{
                    setState({usuario:data.usuario,
                              permissao:data.permisao,
                              historico:data.historico})
                    router.push('/')
                }
            })
            .catch(function (error: any) {
                alert(error)
            });
        }
    }


    return(
        <div className={styles.merda}>
        <div className={styles.loginContainer}>
            <h1>LOGIN</h1>
            <input value={formLogin.user} onChange={(e)=>{handleLogin(e)}} type="text" name="user" placeholder="Usuario"/>
            <input value={formLogin.senha} onChange={(e)=>{handleLogin(e)}}  type="password" name="senha" placeholder="Senha"/><br/>
            <button onClick={()=>{logar(formLogin)}}>LOGIN</button>
            {error? <div className={styles.avisoError}>{error}</div> : ''}
        </div>
        </div>
    )
}