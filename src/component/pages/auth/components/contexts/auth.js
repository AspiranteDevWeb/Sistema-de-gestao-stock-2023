import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const AuthContext = createContext({})

export const AuthProvider = ({children})=>{
    const [user,setUser]= useState('');
    //const [email,setEmail]= useState();
    //const [password,setPassword]= useState([]);
    //const [senha,setSenha]=useState();
    const [online_usuarios,setOnline_usuarios]=useState('');
    
    const data=new Date()
    const dia= String(data.getDate()).padStart(2,'0') //o dia conta com dois digito com esse comando,comecando de 01.
    const mes = String(data.getMonth() +1).padStart(2,'0')
    const ano = String(data.getFullYear())


    const hora = String(data.getHours()).padStart(2,'0')
    const minutos= String (data.getMinutes()).padStart(2,'0')
    const segundos=String (data.getSeconds()).padStart(2,'0')

    const [data_actual,setData_actual]=useState()
    const [hora_inicio,setHora_inicio]=useState()
 
        const [estado, setEstado]=useState(0)

   const x = `${dia}/ ${mes}/${ano}`

   
  
   
   const y = `${hora} : ${minutos} : ${segundos}`
    console.log(hora,":", minutos,":",segundos)
    console.log(hora_inicio)

    console.log(data_actual)
    console.log(dia ,"/",mes ,"/",ano)
    console.log(online_usuarios,'o usario online')

    console.log(user,'a carregar a senha1')

    const [userOnline,setUserOnline]=useState()
    const[valortoken,setValortoken]=useState(0)


    useEffect(()=>{
        axios.get("http://localhost:3050/recebe_signup").then((response)=>{
            setUser(response.data)
        })
    },[])

    // falta requisiacao para levantar dados dos usuarios logados
//esta abaixo deve listar usuarios online
    useEffect(()=>{
        axios.get("http://localhost:3050/buscar_usuario_id").then((response)=>{
            setUserOnline(response.data)
        })
    },[])

    const data_time =()=>{
        setData_actual (dia ,"/",mes ,"/",ano);
        setHora_inicio(hora,":", minutos,":",segundos)
        //setData_actual (`${dia} : ${mes} : ${ano}`);
         //setHora_inicio(`${hora} : ${minutos} : ${segundos}`)
       }

       useEffect(()=>{
        data_time()
       },[])//ultima alteracao 03.10.23
       console.log(data_time,'KKKKKKKas')


    
    
    //novo metodo ---- ainda nao actualizado
    const novoCadastro = (nome,email,senha1,tipo) =>{
        axios.post ("http://localhost:3050/signup",{
            nome:nome?nome:'nao funciona',  //problema
            email:email,
            senha1:senha1,
            senha2:senha1,
            tipo:tipo,
        }).then((response)=>{
            console.log(response,'registo de novo usuario')
        })
    }


    const [usersStorage,setUsersStorage]=useState()

    const signup = (nome,email,senha1,tipo)=>{

        setUsersStorage(user)
        //const usersStorage = JSON.parse(localStorage.getItem("users_db"))

        const hasUser = usersStorage?.filter((user)=> user.senha1 === senha1 && user.email===email)
        console.log(hasUser,"este E o valor do objecto que retorna ao chamar signup. Error... Ja existe usuario com essa conta")//new
        if (hasUser?.length){
            return "Ja tem uma conta com essa senha"
        }else{
            novoCadastro(nome,email,senha1,tipo)
        }
        return;
    }


    function signin (email, senha){
console.log(email,"lllll")
console.log(senha,"22222")
        const hasUser = user?.filter((user) => user.senha1 === senha)
        console.log(hasUser,"senha do usuario logado")
        if(hasUser?.length){
            for (let n=0 ; n<hasUser?.length; n++){
                
                if ( hasUser[n].senha1 === senha  && hasUser[n].email === email) {
                    const token= Math.random().toString(36).substring(2);
                     //setToken(Math.random().toString(36).substring(2))
                   // setOnline_usuario({email:email, data_actual:data_actual, hora_inicio:hora_inicio, token:token});
                    handleUsuarioOnline(email, token,hasUser)
                    setEstado(1)
                    console.log(hasUser[0])
                    return;
                }else {
                    return "Email ou senha incorrecta";
                }
            }
            
        }else {
            return "Usuario nao cadastrado"
        }
    }

   // const [novoRegisto,setNovoRegistos]=useState()
     async function handleUsuarioOnline(email, token,hasUser) {
        
       // const novoRegisto = user?.filter((user)=>  user.email===email)
       const novoRegisto =hasUser?.filter((user)=>  user.email===email)
       console.log(hasUser,'a receber por parametro o valor do filtro hasUser')
        try{
            //const UsersStorages=user
            //const novoRegisto = UsersStorages?.filter((user)=>  user.email===email)
            //==urgent==const novoRegisto =hasUser?.filter((user)=>  user.email===email)
           // setNovoRegistos (hasUser?.filter((user)=>  user.email===email))
           console.log(hasUser,'o valor do filtro hasUser')
            if(novoRegisto?.length ){
               // let nome=await novoRegisto.nome
                setOnline_usuarios({nome:email, namePessoa:novoRegisto.nome,data_actual:data_actual, email:email, hora_inicio:hora_inicio, token:token});
                enviarDadosBancoDados(email)
                setValortoken(token)
                //console.log(novoRegisto.nome,'tente aqui')
            }else{console.log('error.....euro..')}
        }catch(err){
            console.log(err,'00ooooo0000000oooo000')
        }
    }
    

    async function enviarDadosBancoDados(email,hasUser){
        
        try{

            //const nome = novoRegisto.nome
            
            axios.post ("http://localhost:3050/dados_usuario_online",{
                data_inicio:await online_usuarios.data_actual,    
                namePessoa:online_usuarios.namePessoa?online_usuarios.namePessoa :'nada com nada',
                email:await online_usuarios.email?online_usuarios.email:email,
                
                hora_inicio:await online_usuarios.hora_inicio,
                token:await online_usuarios.token,
            }). then((response)=>{
                console.log(response, 'dados do usuario que esta logado no sistema')
            })
            //console.log(nome,"o nome urgente kakaka.>...>..")
        } catch (err){
            console.log(err,"nao foi desta vez...nao enviou dados usuario logado")
        }
    }


    
    const signout = ()=>{
        //setUser(null)
        //setOnline_usuario(null)
        setEstado(null)
    }

    

    /////
    

    const SendUpdate=(pass,Id_user)=>{

       try{
        axios.put ('http://localhost:3050/updating_usuario',{
            id:Id_user.idusuario,
            actual_password:pass.nova_pass,
        }).then((response)=>{
                console.log(response,'envio de actualizacao de senha com sucesso')
            })
       } catch (err){
        console.log("nova pass")
       }
    }

    const signin_change_pass = (valor)=>{
        

        const filtrar_usuario=user.filter((user)=>user.email===valor.email && user.password===valor.actual_password)
        const pickuser=userOnline.filter((usuario)=> filtrar_usuario.email===usuario.email && valortoken===usuario.token)
        if(!pickuser || !filtrar_usuario){
            console.log('usuario nao tem permissao para alterar senha')
        }else{
            const pass=valor.nova_pass
            const Id_user=filtrar_usuario.id_usuario

            SendUpdate(pass,Id_user)
        }
    }
    



    ////
    

    return (
        <AuthContext.Provider
            value={{user: !!user, signed: !!online_usuarios, signin,signup,signout,signin_change_pass, online_usuarios:online_usuarios.nome}}
        >
            {children}
        </AuthContext.Provider>
    )
}