import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const AuthContext = createContext({})

export const AuthProvider = ({children})=>{
    const [user,setUser]= useState();
    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
    const [senha,setSenha]=useState();
    const [online_usuario,setOnline_usuario]=useState();
    
    const data=new Date()
    const dia= String(data.getDate()).padStart(2,'0') //o dia conta com dois digito com esse comando,comecando de 01.
    const mes = String(data.getMonth() +1).padStart(2,'0')
    const ano = String(data.getFullYear())


    const hora = String(data.getHours()).padStart(2,'0')
    const minutos= String (data.getMinutes()).padStart(2,'0')
    const segundos=String (data.getSeconds()).padStart(2,'0')

    const data_actual= `${dia}/ ${mes}/${ano}`
    const hora_inicio=`${hora} : ${minutos} : ${segundos}`


    console.log(hora,":", minutos,":",segundos)
    console.log(hora_inicio)

    console.log(data_actual)
    console.log(dia ,"/",mes ,"/",ano)


    console.log(user,'a carregar a senha1')
    useEffect(()=>{
        axios.get("http://localhost:3050/recebe_signup").then((response)=>{
            setUser(response.data)
        })
    },[])

    const handleUsuarioOnline=() =>{
        axios.post ("http://localhost:3050/dados_usuario_online",{
            nome:online_usuario.nome,
            email:online_usuario.email,
            data_inicio:online_usuario.data_inicio,
            hora_inicio:online_usuario.hora_inicio,
        }). then((response)=>{
            console.log(response, 'dados do usuario que esta logado no sistema')
        })
    }
    

    const [usersStorage,setUsersStorage]=useState()

    const signup = (email,senha1)=>{

        setUsersStorage(user)
        //const usersStorage = JSON.parse(localStorage.getItem("users_db"))

        const hasUser = usersStorage?.filter((user)=> user.senha1 === senha1)

        if (hasUser?.length){
            return "Ja tem uma conta com essa senha"
        }
        return;
    }


    const signin = (email, senha, data_actual, hora_inicio)=>{

        const hasUser = user?.filter((user) => user.senha1 === senha)
        console.log(hasUser,"senha do usuario logado")
        if (hasUser?.length){
            if ( hasUser[0].senha1 === senha  && hasUser[0].email === email) {
                setOnline_usuario({email,senha, data_actual, hora_inicio});
                handleUsuarioOnline()
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