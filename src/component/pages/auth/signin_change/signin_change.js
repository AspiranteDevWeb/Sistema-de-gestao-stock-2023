import React,{useState} from 'react'
import  Input  from '../components/input/input'
import Button from '../components/button/index'
import useAuth from '../components/hooks/useAuth'

export default function Signun_change(){

    

    const {signin_change_pass}=useAuth

    const [valor,setValor]=useState()

    const MudarSenha=(e)=>{
        setValor(prevValue=>({
            ...prevValue,
            [e.target.name]:e.target.value
        })
            
        )

        
    }

    const handleChangePass=()=>{
       // const usertoken=Math.random().toString(36).substring(2)

        if(!valor.email | !valor.actual_password | !valor.nova_pass){
            console.log("")
            return;
        }else {
            signin_change_pass(valor)
        }
        
    }

    return (
        <div className='div_geral_signin'>
           
           <div className='div_secundaria_signin'>

            <div>
                <strong className='titulo_login'>Alterar Senha</strong>
            </div>
                <Input
                type="email"
                placeholder="Digite o seu email"
                name='email'
                onChange={MudarSenha}
                />
                <Input
                type='password'
                name='actual_password'
                placeholder='Digite a senha actual'
                onChange={MudarSenha}
                />
                <Input
                type='password'
                name='nova_pass'
                placeholder='Digite sua nova password'
                onChange={MudarSenha}
                />

                <Button
                    Text='Proximo'
                    onClick={handleChangePass}
                />
           </div> 
        </div>
    )
}