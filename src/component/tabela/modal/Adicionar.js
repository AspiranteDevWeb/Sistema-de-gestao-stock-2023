import React ,{useState}from 'react'
import  Axios  from 'axios'
import './styleAdd.css'


function Adicionar({enviar_Informacao_Adicionar}) {

    const [valor,setValor]=useState()

   /**
    *  const future =(value)=>{
        setValor=(prevValue=>({
            ...prevValue,
            [value.target.name]:value.target.value,
        }))
       
    }

    */
   const informar_Tabela=()=>{
    const informacao = "false";
    enviar_Informacao_Adicionar(informacao)
   }


    const [adiciona,setAdiciona]=useState()

console.log(adiciona,'quero agora')
//problema esta no handlechangevalue

    const handlechangevalue = (value)=>{
        setAdiciona(prevValue=>({
            ...prevValue, ...value
        }))
    }

    const handleClickButton = ()=>{
        //event.preventDefault()
        Axios.post ("http://localhost:3050/EnviarDadoNovosArmazem",{
            idarmazem:adiciona.numero,
            sala:adiciona.sala,
            gaveta:adiciona.gaveta,
            pratileira:adiciona.pratileira,
            corredor:adiciona.corredor,
           

        }).then((response)=>{
            console.log(response,'dados frescos')
        })

        Axios.post ("http://localhost:3050/EnviarDadoNovosProduto",{
            armazem_idarmazem:adiciona.numero,
            produto_nome:adiciona.Titulo,
            produto_formato:valor,
            data_emissao:'',
            duracao:adiciona.duracao,
            produto_observacao:adiciona.observacao,

        }).then((response)=>{
            console.log(response,'dados frescos')
        })
        
    }//adiciona.data_de_emissao

  return (
    <div className='CU'>
        <div className='modal-container'>
           <div className='modal'>
                <form>
                        <button className='red' onClick={informar_Tabela()}>x</button>
                       <label>Numero</label>
                       <input
                             type='text' 
                             placeholder='Digite o Numero' 
                             name='numero' 
                             onChange={e=>handlechangevalue({numero: e.target.value})}
                        />

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
                             onChange={e=>handlechangevalue({data_de_emissao:e.target.value})}/>
                       <label>Tempo/ Horas</label>
                       <input
                             type='time' 
                             name='duracao' 
                             onChange={e=>handlechangevalue({duracao:e.target.value})}
                        />

                       <label>Formato</label>
                       <select  onChange={(e)=>setValor(e.target.value)}>
                            <option name="Betacam" value="Betacam">Betacam</option>
                            <option name="Matic" value="Matic">Matic</option>
                            <option name="DVCAM" value="DVCAM">DVCAM</option>
                            <option name="MHS" value="MHS">MHS</option>
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

                       <button
                             className='concluir-form' 
                             onClick={handleClickButton}
                        >
                            Concluir
                        </button>
                       
                   
                </form>
           </div>
        </div>
    </div>
  )
}

export default Adicionar

