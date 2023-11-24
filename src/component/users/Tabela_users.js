import React, { useEffect,useState } from 'react'
import Axios from 'axios'
function Tabela_users({setAbrir}) {


    const [usuarios,setUsuarios]=useState();
    const [buscarNome,setBuscarNome]=useState()
//recebe_signup<= correspond a =>usuarios

   // console.log(usuarios, 'carregando lista de usuarios')

    const dadadada = ()=>{
        
        try{

        
                Axios.get(`http://localhost:3050/recebe_signup/${buscarNome}`)
            
            .then(
                (response)=>{
                    setUsuarios(response.data)}
            
            )
        } catch (error){
            console.log(error)
        }
 
    }

    useEffect (()=>{
        dadadada()
    },[buscarNome])

  return (
    <>
        <div className='principal'>
            <div className='tema'>
                <div><strong><h1>Usuarios</h1></strong></div>
                <div> <input placeholder='pesquisar nome...' onChange={(e)=>setBuscarNome(e.target.value)}/> </div>
                <div><button onClick={(e)=>setAbrir(false)}>Fechar</button></div>
            </div>
            <div className='div-tabela'>
                <table>
                    <thead>
                        <tr>
                            <th>N.</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Funcao</th>
                        </tr>
                    </thead>

                    <tbody>
                        {usuarios?.map((users,i)=>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{usuarios.nome}</td>
                                <td>{usuarios.email}</td>
                                <td>{usuarios.funcao}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default Tabela_users