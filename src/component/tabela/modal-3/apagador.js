import React,{useState,useEffect} from "react";
import Axios from "axios"

export default function Apagador({setErase,id}) {

   // const [edit,setEdit]=useState(id)
   
     const handleRemoveValue =()=>{
        
        Axios.delete(`http://localhost:3020/delete_armazem/${id.idarmazem}`)

        Axios.delete(`http://localhost:3020/delete_produto/${id.idarmazem}`)

        setErase(false)
     }

    
    return(
        <>
        <div>
            <button
                onClick={()=>setErase(false)}
            >
                x
            </button>
            <p>Tem a certeza que pretente eliminar este registro?</p>
            <button 
            onClick={handleRemoveValue}
            >
                confirmar
            </button>
        </div>
        </>
    )
}