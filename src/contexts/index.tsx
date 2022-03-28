import { createContext, useState } from "react";

export const UserContext = createContext("")

export default function UsuarioProvider() {
    return(
        <UserContext.Provider value="aaa"></UserContext.Provider>
    )
}