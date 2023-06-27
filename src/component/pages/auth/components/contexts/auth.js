import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const AuthContext = createContext({})

export const AuthProvider = ({children})=>{
    const [user,setUser]= useState();
    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
    const [senha,setSenha]=useState();

   
    console.log(user,'a carregar a senha1')
    useEffect(()=>{
        axios.get("http://localhost:3020/recebe_signup").then((response)=>{
            setUser(response.data)
        })
    },[])


    const signup = (email,senha1)=>{
        const usersStorage = JSON.parse(localStorage.getItem("users_db"))

        const hasUser = usersStorage?.filter((user)=> user.senha1 === senha1)

        if (hasUser?.length){
            return "Ja tem uma conta com essa senha"
        }
        return;
    }


    const signin = (email,senha)=>{

        const hasUser = user?.filter((user) => user.senha1 === senha)
        console.log(hasUser,"senha do usuario logado")
        if (hasUser?.length){
            if ( senha === hasUser[1].senha1 && hasUser[1].email === email) {
                setUser({email,senha});
                return;
            }else {
                return "Email ou senha incorrecta";
            }
        }else {
            return "Usuario nao cadastrado"
        }
    }


    const signout = ()=>{
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{user: !!user, signed: !!user, signin,signup,signout}}
        >
            {children}
        </AuthContext.Provider>
    )
}