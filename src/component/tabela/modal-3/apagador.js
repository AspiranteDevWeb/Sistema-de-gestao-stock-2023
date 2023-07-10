import React,{useState,useEffect} from "react";
import Axios from "axios"

import './apagar.css'

export default function Apagador({setErase,id}) {

   // const [edit,setEdit]=useState(id)
   
     const handleRemoveValue =()=>{
        
        Axios.delete(`http://localhost:3050/delete_armazem/${id.idarmazem}`)

        Axios.delete(`http://localhost:3050/delete_produto/${id.idarmazem}`)

        setErase(false)
     }

    
    return(
        <div className="card_pai_apagar_fora">
        <div className="card_pai_apagar_confirar">
            <button className="button_sair_confirmar"
                onClick={()=>setErase(false)}
            >
                x
            </button>
            <p>Tem a certeza que pretente eliminar este registro<strong className="strong_ponto_interrogacao">?</strong></p>
            <button className="button_apagar_confirmar"
            onClick={handleRemoveValue}
            >
                Confirmar
            </button>
        </div>
        </div>
    )
}