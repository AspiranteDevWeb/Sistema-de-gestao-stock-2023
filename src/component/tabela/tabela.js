import React, {useState,useEffect, createRef} from 'react'
import Adicionar from './modal/Adicionar'
import Editar from './modal-2/editar'
import './styles.css'
import  Axios  from 'axios'
import Apagador from "./modal-3/apagador"
import Navibar_Geral from '../pages/auth/components/cabecalho/navBar_Geral'
//import Search_box from './search/pesquisa'

//import '../'
const Tabela = () => {
    const [pessoa,setPessoa]=useState([])
    console.log(pessoa,'o que pessoa apresenta')

    const [estado,setEstado]=useState(false)

    function recebe_Informacao_Adicionar (){
        setEstado(false)
    }

    const [novoEstado,setNovoEstado]=useState(false)

    const recebe_informacao_editar = (dado_boolean)=>{
        setNovoEstado(dado_boolean)
    }

   useEffect(()=>{
    
   },[pessoa])
    //const [escopoPessoa,setEscopoPessoa]=useState({})
const [pessoaSeleccionada,setPessoaSeleccionada]=useState([])
    console.log(pessoaSeleccionada,'testando edit env')
      function handleClickAlterar(pessoa){
        //event.preventDefault()
        console.log(pessoa, 've se recebe alguma coisa edi')
        setNovoEstado(!novoEstado)
        setPessoaSeleccionada(pessoa)
        //const novaPessoa=pessoa.find((valor)=>valor.id===id)
       /**
        *  setNumeroAgora(prevValue=>
                    [...prevValue,i]
                    
                )
        */
      }

      const [erase,setErase]=useState(false)
      const [id,setId]=useState()

     const apagartudo = (i)=>{
        //event.preventDefault()
        console.log(i,'id para apagar...')
        
        setErase(!erase)
        setId(i)
        return(
        <>
            
        </>
        )
     }

      /**
       * 
    const [numeroReferencia,setNumeroReferencia]=useState([])
    useEffect(()=>{
        const contador = Array(pessoa?.length).fill().map((_,i)=>numeroReferencia[i] ||createRef())
        setNumeroReferencia(contador)
    },[pessoa])

    console.log({numeroReferencia})
       */


    const [levar,setLevar]=useState('')
    console.log(levar, 'dados inseridos na searchbox/input')
    
   
     const gaigai = async ()=>{
        //event.preventDefault()
    try {
        const response = await Promise.all([
            Axios.get(`http://localhost:3050/tudo/${levar}`//,{
                //params:{levar:levar}
           // }
            )
        ])
        response.forEach ((response)=>{
            if (Array?.isArray(response.data)){
                setPessoa(response.data)
            }
        })
    } catch (error){
        console.log(error)
    }
   }

   useEffect(()=>{
    gaigai()
   },[levar])

   useEffect(()=>{},[levar])
   
   const [total,setTotal]=useState()
   console.log ('a soma do valor total',total)
   
   const somaHoras =async()=>{
        
        try {
            
                Axios.get("http://localhost:3050/somaTempo") .then(
                (response)=>{ setTotal(response.data)}
            )
        
        } catch (error){
            console.log(error)
        }
   }
   useEffect(()=>{somaHoras()},[pessoa])
   //const [controlarabrirPesquisar,setControlarabrirPesquisar]=useState(false)
   //const [casseteSelecionado,setCasseteSelecionado]=useState()
   //const abrirPesquisa = (e)=>{
    //setLevar(e.target.value)
    //setControlarabrirPesquisar(true)
  // }
   //const fecharPesquisa=(cassete)=>{
    //setCasseteSelecionado(!controlarabrirPesquisar)

   //}

   function fechar_modal_editar(){
    //e.eventDefault()
    setNovoEstado(false)
   }

  return (
    <div className='fundo_pagina_tabela'>
    <Navibar_Geral/>
    <br/><br/><br/>
        <div className='geral'>
        <div className='principal'>
        <div className='tema'>
            <h1>Gestão de Cassete</h1>
            <div className='pesquisa'>
                <input placeholder='pesquisar...'
               // onChange={()=>abrirPesquisa(e)}
                onChange={(e)=>setLevar(e.target.value)}
                ></input>
            </div>
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

                { //pessoa?//.filter(dado=>{
                   // const searchTerm= levar
                   // const osnome=dado.produto_nome

                   // return searchTerm === "" ? dado :searchTerm && osnome.includes(searchTerm)
              //  })
              pessoa?.map((dado,i)=>(
                    <tr key={i}>
                    <td> {i+1} </td>
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
                        
                        <button className='butoes-act' key={i} onClick={() =>handleClickAlterar(dado)}>Alterar</button>
                    </td>
                    <td>
                        <button className='butoes-remov' key={i} onClick={()=>apagartudo(dado)} >Eliminar</button>
                    </td>
                   </tr>
                ))}
                   
                   
                </tbody>

                {typeof total !="undefined" &&  
                 <tfoot>
                    
                    <tr className='Total-time'>
                     <td><strong>Tempo Total de Gravacao</strong></td>
                     <td> {total[0].tempototal} </td>
                    </tr>
                    
                 </tfoot>
                 }

            </table>
        </div>
        <br/>
       
        <hr/>
        <div>
            {estado && <Adicionar
                enviar_Informacao_Adicionar={recebe_Informacao_Adicionar}
                setEstado={setEstado}
             />}
        </div>
        <div>{novoEstado && <Editar 
                          //  enviar_informacao_actualizada_editar={recebe_informacao_editar}
                         //   pessoa={pessoa}
                         //   setPessoa={setPessoa}
                            //setNovoEstado={setNovoEstado}
                            fechar_modal_editar={fechar_modal_editar}
                           // numeroReferencia={numeroReferencia}
                            //i={numeroAgora}

                            pessoaSeleccionada={pessoaSeleccionada}
            />}
        </div>
        <div>
        {erase && <Apagador setErase={setErase} id={id} />}
        </div>

        </div>
    </div>
    </div>
  )
} 

export default Tabela


/**
 * 
          <div> 
           // {controlarabrirPesquisar && <Search_box pessoa={pessoa} levar={levar} fecharPesquisa={fecharPesquisa()}/>}
        </div>
 */