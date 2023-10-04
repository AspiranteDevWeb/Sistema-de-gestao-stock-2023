import React,{useState} from 'react'
import { Input } from '../components/input/stylesInput'
import Button from '../components/button'

const Signun_change=()=>{

    const [valor,setValor]=useState()

    const MudarSenha=(e)=>{
        setValor(prevValue=>({
            ...prevValue,
            [e.target.name]:e.target.value
        })
            
        )
    }

    const handleChangePass=(user)=>{
        const filtrar_usuario=(user)=>{user.filter(user.email===valor.email && user.password===valor.actual_password)}
        if(!filtrar_usuario){
            for (let u=0; u<user.lenght;u++){
                if(user[u].email===valor.email)
            }
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