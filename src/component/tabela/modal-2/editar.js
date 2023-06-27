import React , {useState}from 'react'

import '../modal/styleAdd.css'

function Editar({ enviar_informacao_actualizada_editar,pessoa,setPessoa,setNovoEstado,fechar_modal_editar}) {
console.log(pessoa,'pessoa testando agora novo editar')
    const [formato,setFormato]=useState()
    let [va, setVa]=useState()
console.log(va,'alterar variavel receber')
    const Presente = (value)=>{
        setVa(prevValue=>({
            ...prevValue,
            [value.target.name]:value.target.value,
        }))
    }

    const actualiza_informacao_tabela = ()=>{
        const informacao_boleana2 = "false";
        //setNovoEstado="false"
        enviar_informacao_actualizada_editar(informacao_boleana2)
        console.log("testando....")
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
                <form>
                        
                       <label>Numero</label>
                       <input 
                            type='text'
                            placeholder='Alterar numero'
                            name='numero'
                            onChange={Presente}
                        ></input>

                       <label>Titulo</label>
                       <input
                            type='text'
                           //placeholder="Alterar o nome"
                            name='titulo'
                            defaultValue={pessoa[0].produto_nome}
                            onChange={Presente}></input>

                       <label>Data Emisao</label>
                       <input
                            type='date'
                            placeholder='Alterar data da Emissao'
                            name='data_de_emissao'
                            onChange={Presente}
                        ></input>

                       <label>Tempo/ Horas</label>
                       <input
                            type='time'
                            placeholder='Alterar o tempo'
                            name='duracao'
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
                            onChange={Presente}
                       ></input>

                       <label>Gaveta</label>
                       <input
                            type='text'
                            name='gaveta'
                            placeholder='Alterar a gavete'
                            onChange={Presente}
                       ></input>

                       <label>Partileira</label>
                       <input
                            type='text'
                            name='pratileira'
                            placeholder='Alterar a pratileira'
                            onChange={Presente}
                       ></input>

                       <label>Corredor</label>
                       <input
                             type='text'
                             name='corredor' 
                             placeholder='digite o corredor' 
                             onChange={Presente}
                       ></input>

                       <label>Observacao</label>
                       <input
                            type='text' 
                            name='observacao' 
                            placeholder='digite a sua observacao' 
                            onChange={Presente}
                        ></input>

                       <button className='concluir-form' type='button'>Concluir</button>
                       
                   
                </form>
            </div>
    </div>
  )
}

export default Editar

