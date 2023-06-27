import React, {useState,useEffect} from 'react'
import Adicionar from './modal/Adicionar'
import Editar from './modal-2/editar'
import './styles.css'
import  Axios  from 'axios'


const Tabela = () => {
    const [pessoa,setPessoa]=useState([])
    console.log(pessoa,'o que pessoa apresenta')

    const [estado,setEstado]=useState(false)

    const recebe_Informacao_Adicionar = (dados)=>{
        setEstado(dados)
    }

    const [novoEstado,setNovoEstado]=useState(false)

    const recebe_informacao_editar = (dado_boolean)=>{
        setNovoEstado(dado_boolean)
    }

    useEffect(()=>{
        gaigai()
       },[])
       
   
     const gaigai = async ()=>{
    try {
        const response = await Promise.all([
            Axios.get("http://localhost:3020/tudo")
        ])
        response.forEach ((response)=>{
            if (Array?.isArray(response.data)){
                setPessoa(pessoa=>[...pessoa,
                ...response.data])
            }
        })
    } catch (error){
        console.log(error)
    }
   }

   function fechar_modal_editar(){
    setNovoEstado(false)
   }
    
  return (
    <div className='geral'>
        <div className='principal'>
        <div className='tema'>
            <h1>Gestão de Cassete</h1>
            <div className='pesquisa'><input placeholder='pesquisar...'></input></div>
            <button className='butoes-add' onClick={()=>setEstado(!estado)}>Adicionar</button>
        </div>
        <div className='div-tabela'>
            
            <table>
                <thead>
                   <tr>
                    <th>Numero </th>
                    <th>Titulo</th>
                    <th>Data Emisao</th>
                    <th>Tempo/ Horas</th>
                    <th>Formato</th>
                    <th>Sala</th>
                    <th>Gaveta</th>
                    <th>Partileira</th>
                    <th>Corredor</th>
                    <th>Observacao</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                   </tr>
                </thead>
                <tbody>

                {typeof pessoa !=="undefined" &&
                pessoa.map((dado,i)=>(
                    <tr key={i}>
                    <td> {i} </td>
                    <td> {dado.produto_nome} </td>
                    <td> {dado.data_emissao} </td>
                    <td> {dado.tempo} </td>
                    <td> {dado.produto_formato} </td>
                    <td> {dado.sala} </td>
                    <td> {dado.gaveta} </td>
                    <td> {dado.pratileira} </td>
                    <td> {dado.corredor} </td>
                    <td className= 'observacao'> {dado.produto_observacao} </td>
                    <td className='butoes'>
                        
                        <button className='butoes-act' onClick={()=>setNovoEstado(!novoEstado)}>Alterar</button>
                    </td>
                    <td>
                        <button className='butoes-remov' >Eliminar</button>
                    </td>
                   </tr>
                ))}
                   
                   
                </tbody>
            </table>
        </div>
        <br/>
       
        <hr/>
        <div>
            {estado && <Adicionar
                enviar_Informacao_Adicionar={recebe_Informacao_Adicionar}
             />}
        </div>
        <div>{novoEstado && <Editar 
                            enviar_informacao_actualizada_editar={recebe_informacao_editar}
                            pessoa={pessoa}
                            setPessoa={setPessoa}
                            //setNovoEstado={setNovoEstado}
                            fechar_modal_editar={fechar_modal_editar}
            />}
        </div>
        </div>
    </div>
  )
} 

export default Tabela
