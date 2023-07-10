/**
 * import React from 'react'

export default function Search_box({pessoa,levar,setCasseteSelecionado,pesquisar}){

    const pesquisar = ()=>{
        <>
            {pessoa?.filter(cassete=>{
            const searchTerm = levar
            const osnome=cassete.produto_nome
            
            return searchTerm && osnome.startsWith(searchTerm)
            })
            .map((cassete,i)=>(
                <div 
                key={i}
                // onClick={()=>pesquisar(cassete)}
                onClick={()=>setCasseteSelecionado(cassete)}
                >
                    {cassete.produto_nome} 
                </div>
                
            ))}
        </>
    }
    return(
        <>
            {pesquisar()}
        </>
    )
}
 */