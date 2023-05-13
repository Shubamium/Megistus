import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({children}){
    const username = useState('Anonymous');
    return (
        <UserContext.Provider value={username}>
             {children}
        </UserContext.Provider>
    )
}

