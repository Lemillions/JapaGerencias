import React, { createContext, ReactNode, useState } from "react";

type UserInfo = {
    usuario:string;
    permissao:string;
    historico:Array<Object>;
}

type PropsUserInfo = {
    state:UserInfo;
    setState:React.Dispatch<React.SetStateAction<UserInfo>>;
}

type UsuarioProviderProps = {
    children: ReactNode;
}

const UsuarioInfos = {
    state: {
        usuario: "",
        permissao: "",
        historico: [{}]
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