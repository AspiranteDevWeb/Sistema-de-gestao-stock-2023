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
  const [userOnline,setUserOnline]=useState()
console.log(email,"email do usuario para login")
console.log(senha,"senha do usuario para login")
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

 /**
  * 
    const signin = (email,senha)=>{

      const hasUser = user?.filter((user) => user.senha1 === senha)
      console.log(hasUser,"senha do usuario logado")
      if (hasUser?.length){
          if ( senha === hasUser[1].senha1 && hasUser[1].email === email) {
            setUserOnline({email,senha});
              return;
          }else {
              return "Email ou senha incorrecta";
          }
      }else {
          return "Usuario nao cadastrado"
      }
  }
  */

    

    if (res) {
      setError(res);
      return;
    }
    alert("usario confirmado com sucesso!!! ");
    navigate("/")
  }

  return (
    <AuthProvider>
     <div className='div_geral_signin'>
      
        <div className='div_secundaria_signin'>
              <div> <strong className='titulo_login'>Login</strong></div>
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

                


                <br/>
                <labelError>{error}</labelError>
                <Button
                className="butao_login_entrar"
                  Text="Entrar"
                  onClick={handlelogin}
                />
                <br/>
                <labelSignup>
                  Nao tem uma conta?
                  <strong>
                    <Link to="/signup"> Registre-se</Link>
                  </strong>
                </labelSignup>
        </div>
     </div>
       
    </AuthProvider>
   );
}
export default  Signin


//era para teste
//<input className='teste_input' placeholder='afsdfdgadfg'></input>