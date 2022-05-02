import React, { createContext, ReactNode, useState } from "react";

type UserInfo = {
    usuario:string;
    permissao:string;
    historico:Array<Historico>;
}

type Historico = {
    data: string;
    preco: number;
    produtos: Array<ProdutoInfos>;
}

type ProdutoInfos = {
    nome: string;
    quantidade: number;
    valor: number;
}

type PropsUserInfo = {
    state:UserInfo;
    setState:React.Dispatch<React.SetStateAction<UserInfo>>;
}

type UsuarioProviderProps = {
    children: ReactNode;
}

const hist:Historico = {
    data: "",
    preco: 0,
    produtos:[{
        nome:"",
        quantidade:0,
        valor: 0
    }]
}


const UsuarioInfos = {
    state: {
        usuario: "",
        permissao: "",
        historico: [hist]
    },
    setState: () => {}
}

export const UserContext = createContext<PropsUserInfo>(UsuarioInfos)

export function UsuarioProvider({children}: UsuarioProviderProps) {
    const [state, setState] = useState(UsuarioInfos.state)
    return(
        <UserContext.Provider value={{state, setState}}>
            {children}
        </UserContext.Provider>
    )
}