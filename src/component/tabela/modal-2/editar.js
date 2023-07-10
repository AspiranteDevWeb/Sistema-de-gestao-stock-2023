import React , {useState}from 'react'
import Axios  from 'axios'
import '../modal/styleAdd.css'


function Editar({ pessoaSeleccionada,enviar_informacao_actualizada_editar,pessoa,setPessoa,setNovoEstado,fechar_modal_editar,numeroReferencia}) {
console.log(pessoa,'pessoa testando agora novo editar')
    const [formato,setFormato]=useState()

    const [va, setVa]=useState()
console.log(va,'alterar variavel receber')


    const Presente = (value)=>{
        setVa(prevValue=>({
            ...prevValue,
            [value.target.name]:value.target.value,
        }))
    }

    
   /**
    *  const actualiza_informacao_tabela = ()=>{
        const informacao_boleana2 = "false";
        //setNovoEstado="false"
        enviar_informacao_actualizada_editar(informacao_boleana2)
        console.log("testando....")
    }
    */console.log(pessoaSeleccionada, 'id do armazem para alterar')

    const handleUpdateValue = () =>{
       
        Axios.put("http://localhost:3050/Actualizar_dados_Produto",{
            armazem_idarmazem:pessoaSeleccionada.idarmazem,
            produto_nome:va.titulo,
            produto_formato:formato,
            data_emissao:'',
            tempo:va.tempo,
            duracao:va.duracao,
            produto_observacao:va.observacao,
        }).then((response)=>{
            console.log(response,'hum..hum..hum...ja avisei')
        })

        Axios.put("http://localhost:3050/Actualizar_dados_Armazem",{
            idarmazem:pessoaSeleccionada.idarmazem,
            sala:va.sala,
            gaveta:va.gaveta,
            pratileira:va.pratileira,
            corredor:va.corredor,
        }).then ((response)=>{
            console.log(response,'cuidados...ja comecou actualizacao')
            
        })

        fechar_modal_editar()
    }
  return (
    <div className='modal-container'>
           <div className='modal'>
                <div>
                    <div><h2>Editar</h2></div>
                    <button className='red'
                        onClick={fechar_modal_editar}
                    >
                        x
                    </button>
                </div>
                <div>
                        
                       <label>Numero</label>
                       <input 
                            type='text'
                            //placeholder='Alterar numero'
                            name='numero'
                            defaultValue={pessoaSeleccionada.armazem_idarmazem}
                            onChange={Presente}
                        ></input>

                       <label>Titulo</label>
                       <input
                            type='text'
                           //placeholder="Alterar o nome"
                            name='titulo'
                            defaultValue={pessoaSeleccionada.produto_nome}
                            onChange={Presente}></input>

                       <label>Data Emisao</label>
                       <input
                            type='date'
                            placeholder='Alterar data da Emissao'
                            name='data_de_emissao'
                            defaultValue={pessoaSeleccionada.data_emissao}
                            onChange={Presente}
                        ></input>

                       <label>Tempo/ Horas</label>
                       <input
                            type='time'
                            placeholder='Alterar o tempo'
                            name='duracao'
                            defaultValue={pessoaSeleccionada.tempo}
                            onChange={Presente}
                       ></input>

                       <label>Formato</label>
                       <select  onChange={(e)=>setFormato(e.target.value)}>
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
                            placeholder='Alterar a sala'
                            defaultValue={pessoaSeleccionada.sala}
                            onChange={Presente}
                       ></input>

                       <label>Gaveta</label>
                       <input
                            type='text'
                            name='gaveta'
                            placeholder='Alterar a gavete'
                            defaultValue={pessoaSeleccionada.gaveta}
                            onChange={Presente}
                       ></input>

                       <label>Partileira</label>
                       <input
                            type='text'
                            name='pratileira'
                            placeholder='Alterar a pratileira'
                            defaultValue={pessoaSeleccionada.pratileira}
                            onChange={Presente}
                       ></input>

                       <label>Corredor</label>
                       <input
                             type='text'
                             name='corredor' 
                             placeholder='digite o corredor'
                             defaultValue={pessoaSeleccionada.corredor} 
                             onChange={Presente}
                       ></input>

                       <label>Observacao</label>
                       <input
                            type='text' 
                            name='observacao' 
                            placeholder='digite a sua observacao' 
                            defaultValue={pessoaSeleccionada.produto_observacao}
                            onChange={Presente}
                        ></input>

                       <button className='concluir-form' onClick={handleUpdateValue}>Concluir</button>
                       
                   
                </div>
            </div>
    </div>
  )
}

export default Editar

