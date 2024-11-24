import React, { createContext, useContext, useState , useEffect} from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {  // This is the context provider
    
    const [authUser, setAuthUser] = useState({ id : "" , username : "" , role : "" , token : ""} );
  
    useEffect(()=>{
        const data=localStorage.getItem("Users");
        if (data){
            const parseData=JSON.parse(data);
            setAuthUser({
                ...User,
                username:parseData.username,
                token:parseData.token,
                id :parseData.id,
                role : parseData.role
            });
        }
        
    },[authUser])
   

    const login = (userData) => {
        setAuthUser(userData);
        localStorage.setItem("Users", JSON.stringify(userData));
    };
   
    const logout = () => {
        setAuthUser("");
        localStorage.removeItem("Users");
    };
    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);