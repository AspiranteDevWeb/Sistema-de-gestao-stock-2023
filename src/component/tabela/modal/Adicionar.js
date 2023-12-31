import React ,{useState}from 'react'
import  Axios  from 'axios'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css'
import './styleAdd.css'


function Adicionar({enviar_Informacao_Adicionar,setEstado}) {

    const [valor,setValor]=useState();
    const [error,setError]=useState();
   /**
    *  const future =(value)=>{
        setValor=(prevValue=>({
            ...prevValue,
            [value.target.name]:value.target.value,
        }))
       
    }

    */
   //const informar_Tabela=()=>{
    //const informacao = "false";
    //enviar_Informacao_Adicionar(informacao)
   //}


    const [adiciona,setAdiciona]=useState("")

console.log(adiciona,'quero agora')
//problema esta no handlechangevalue

    const handlechangevalue = (value)=>{
        setAdiciona(prevValue=>({
            ...prevValue, ...value
        }))
    }

    const handleClickButton = (e)=>{
        if (!adiciona.Titulo | !adiciona.data_de_emissao | !adiciona.sala){
            //setError("Preencha todos os campos");
            toast("Preencha todos os campos !");
            return;
        }else{
                Axios.post ("http://localhost:3050/EnviarDadoNovosArmazem",{
                    //idarmazem:adiciona.numero,
                    sala:adiciona.sala,
                    gaveta:adiciona.gaveta,
                    pratileira:adiciona.pratileira,
                    corredor:adiciona.corredor,
                

                }).then((response)=>{
                    console.log(response,'dados frescos')
                })

                Axios.post ("http://localhost:3050/EnviarDadoNovosProduto",{
                // armazem_idarmazem:adiciona.numero,
                    produto_nome:adiciona.Titulo,
                    produto_formato:valor,
                    data_emissao:adiciona.data_de_emissao,
                    duracao:adiciona.duracao,
                    produto_observacao:adiciona.observacao,

                }).then((response)=>{
                    console.log(response,'dados frescos')
                })

                enviar_Informacao_Adicionar()
            }
        
        //setEstado(false)
        //e.preventDefault()
    }//adiciona.data_de_emissao

  return (
    <div className='CD'>
        <div className='modal-container'>
           <div className='modal'>
                <div className="form">
                        <button className='red' onClick={enviar_Informacao_Adicionar}>x</button>
                       

                       <label>Titulo</label>
                       <input
                             type='text' 
                             placeholder='Digite o Titulo da cassete' 
                             name='Titulo'
                             onChange={e=>handlechangevalue({Titulo: e.target.value})}
                             
                        />

                       <label>Data Emisao</label>
                       <input
                             type='date' 
                             placeholder='Digite a Data da Emissao' 
                             name='data_de_emissao' 
                             onChange={e=>handlechangevalue({data_de_emissao:e.target.value})}
                             
                             />
                       <label>Tempo/ Horas</label>
                       <input
                             type='time' 
                             name='duracao'
                             step="2" 
                             onChange={e=>handlechangevalue({duracao:e.target.value})}
                        />

                       <label>Formato</label>
                       <select  onChange={(e)=>setValor(e.target.value)}>
                            <option>Seleciona formato</option>
                            <option name="Betacam" value="Betacam">Betacam</option>
                            <option name="UMatic" value="U-Matic">U-Matic</option>
                            <option name="DVCAM" value="DVCAM">DVCAM</option>
                            <option name="VHS" value="MHS">VHS</option>
                            <option name="Minav" value="Minav">Minav</option>
                        </select> 

                       <label>Sala</label>
                       <input
                             type='text' 
                             name='sala' 
                             placeholder='digite a sala' 
                             onChange={e=>handlechangevalue({sala:e.target.value})}
                             
                        />

                       <label>Gaveta</label>
                       <input 
                            type='text'
                            name='gaveta' 
                            placeholder='digite a gaveta' 
                            onChange={e=>handlechangevalue({gaveta:e.target.value})}
                        />

                       <label>Pratileira</label>
                       <input
                             type='text' 
                             name='pratileira' 
                             placeholder='digite a pratileira' 
                             onChange={e=>handlechangevalue({pratileira:e.target.value})}
                        />

                       <label>Corredor</label>
                       <input
                             type='text'
                             name='corredor' 
                             placeholder='digite o corredor' 
                             onChange={e=>handlechangevalue({corredor:e.target.value})}
                        />

                       <label>Observacao</label>
                       <input 
                            type='text' 
                            name='observacao' 
                            placeholder='digite a sua observacao' 
                            onChange={e=>handlechangevalue({observacao:e.target.value})}
                            
                        />

                        <ToastContainer/>

                       <button
                             className='concluir-form' 
                             onClick={handleClickButton}
                        >
                            Concluir
                        </button>
                       
                   
                </div>
           </div>
        </div>
    </div>
  )
}

export default Adicionar

/**
 * <label>Numero</label>
                       <input
                             type='text' 
                             placeholder='Digite o Numero' 
                             name='numero' 
                             onChange={e=>handlechangevalue({numero: e.target.value})}
                        />
 */