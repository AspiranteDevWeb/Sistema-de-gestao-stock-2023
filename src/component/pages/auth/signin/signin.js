import React, {useState, useEffect} from 'react';
import{ Link,useNavigate}from "react-router-dom"
import axios from 'axios';
import useAuth from '../components/hooks/useAuth';

import { AuthProvider } from '../components/contexts/auth';
import Button from '../components/button/index';
//import Input from '../components/input';
import Input from '../components/input/input';

import './signin.css'
function Signin(){
    const {signin} = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]=useState('');
  const [senha, setSenha]=useState('');
  const [error, setError]=useState();
  const [user, setUser]= useState();

  useEffect(()=>{
    axios.get("http://localhost:3050/recebe_signup").then((response)=>{
      
    setUser(response.data)
    
    })
    
  },[])

  const handlelogin =() => {
    if (!email | !senha){
      setError("Preencha todos os campos");
      return;
    }


    const res= signin(email,senha)

 
    const signin = (email,senha)=>{

      const hasUser = user?.filter((user) => user === senha)
      console.log(hasUser,"senha do usuario logado")
      if (hasUser?.length){
          if ( senha === hasUser[1] && hasUser[1].email === email) {
              setUser({email,senha});
              return;
          }else {
              return "Email ou senha incorrecta";
          }
      }else {
          return "Usuario nao cadastrado"
      }
  }

    

    if (res) {
      setError(res);
      return;
    }
    alert("usario confirmado com sucesso!!! ");
    navigate("/Home")
  }

  return (
    <AuthProvider>
    
     <div> Registro de Pedidos</div>
     <Input 
       type="email"
       placeholder="Digite seu Email..."
       value={email}
       onChange={
         (e)=>[
           setEmail(e.target.value), 
           setError("")
         ]
       }
       />


     <Input
       type="password"
       placeholder="Digite seu password..."
       value={senha}
       onChange={
         (e)=>[
           setSenha(e.target.value), 
           setError("")
         ]
       }
       />

       <input className='teste_input' placeholder='afsdfdgadfg'></input>


       
       <labelError>{error}</labelError>
       <Button
         Text="Entrar"
         onClick={handlelogin}
       />
       <labelSignup>
         Nao tem uma conta?
         <strong>
           <Link to="/signup"> Registre-se</Link>
         </strong>
       </labelSignup>
       
    </AuthProvider>
   );
}
export default  Signin