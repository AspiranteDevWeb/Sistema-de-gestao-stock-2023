import React, {useState, useEffect} from 'react';
import{ Link,useNavigate}from "react-router-dom"
import Axios from 'axios';
import useAuth from '../components/hooks/useAuth';

import {AuthProvider} from '../components/contexts/auth'
import Button from '../components/button/index';
import Input from '../components/input/input';
import Tabela_users from '../../../users/Tabela_users'

function Signup(){
  const [email, setEmail]=useState();
  const [senha1, setSenha1]=useState();
  const [senha2, setSenha2]=useState();
  const [nome,setNome]=useState();
  const [error, setError]=useState();
  const [tipo, setTipo]=useState()
  const [user, setUser]= useState();
  
  
  const navigate = useNavigate();

  console.log(email)
  console.log(senha1)
  console.log(senha2)
  
  const {signup}=useAuth()

 /**
  * 
  *   useEffect(()=>{
    Axios.get("http://localhost:3050/recebe_signup").then((response)=>{
      setEmail(response.data.email)
     
    })
    
  },[])
  useEffect(()=>{
    Axios.get("http://localhost:3050/recebe_signup").then((response)=>{
      
      setSenha1(response.data.senha1)
    
    })
    
  },[])
  
  useEffect(()=>{
    Axios.get("http://localhost:3050/recebe_signup").then((response)=>{
     
      setSenha2(response.data.senha2)
    })
    
  },[])
  */

  
  const funcao_Usuario=(e)=>{
    setTipo(e.target.value)
  }


  const [abrir,setAbrir]=useState(false)

  const handleSignup = ()=> {
    if(!nome | !email | !senha1 | !senha2) {
      setError ("preencha todos os campos");
      return;
    }else 
    if (senha1 !== senha2){
      setError("Os e-mails nao sao iguais");
      return;
    }


   const res = signup(nome, email, senha1, tipo)

   if(res){
    setError(res)
    return;
   }

   //esse axios nao devia estar aqui
   /**
    * Axios.post("http://localhost:3050/signup",{

      nome:nome,
      email: email,
      senha1: senha1,
      senha2: senha2
    
      }).then((response)=> {
        console.log(response);
      }); 
    */
 
    alert("usario cadastrado com sucesso!!! Parabens");
    //navigate("/home")
  };


 

    return (
     <>
     
      <div className='div_geral_signin'>
       
        <div className='div_secundaria_signin'>
          <button onClick={(e)=>setAbrir(!abrir)}>usuarios Registados</button>
        <h1><label>Registo de usuario</label></h1>

          <Input
            type="name"
            placeholder="DIgite o nome"
            value={nome}
            onChange={(e)=> [setNome(e.target.value), setError("")]}
          />

          <Input
            type="email"
            placeholder="DIgite o seu E-mail"
            value={email}
            onChange={(e)=> [setEmail(e.target.value), setError("")]}
          />

          <Input
            type="password"
            placeholder="DIgite  a sua SENHA"
            value={senha1}
            onChange={(e)=> [setSenha1(e.target.value), setError("")]}
          />

          <Input
            type="password"
            placeholder="Confirme o seu SENHA"
            value={senha2}
            onChange={(e)=> [setSenha2(e.target.value), setError("")]}
          />
          <br/>

          <label>Tipo de usuario</label>
          <select onChange={funcao_Usuario}>
            <option>Tipo usuario</option>
            <option name ="Assistente" value = "Assistente">Assistente</option>
            <option name ="Supervisor" value="Supervisor">Supervisor</option>
            <option name ="Administrador" value="Administrador">Administrador</option>
          </select>

          <labelError>{error}</labelError>

          <Button 
            Text="Increver-se"
            onClick={handleSignup}
          /><br/>

          <labelSignin>
            ja tem uma conta?
            <strong>
              <Link to="/Signin">Entre</Link>
            </strong>
          </labelSignin>

        </div>

        <div>
          {abrir && <Tabela_users setAbrir={setAbrir}/>}
        </div>
      </div>
      
     </>
    );
}
export default Signup