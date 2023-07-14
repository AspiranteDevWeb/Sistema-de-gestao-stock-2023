import React from 'react'
import { Link } from 'react-router-dom'

import './navBar_Geral.css'

export default function Navibar_Geral(){
    return(
        <>
            <nav className="Cabecalho_geral">
                <div className='logo_user_empresa'>

                    <div className='logo_empresa'>Logo</div>

                    <div className='usuario'>
                        <div className='logo_usuario'>LogoUser</div>
                        <div className='nome_usuario'>nome</div>
                    </div>

                </div>
                <div className='wwww'>
                
                            <div></div>
                            <ul className="nav-list">
                                
                                <li className="itens"><Link to="/Home">Home</Link></li>
                                <li className="itens"><Link to ="/"> Tabela Cassete  </Link></li>
                                <li className="itens"><Link to ="/Signup"> Signup </Link></li>
                           </ul>
                           <div></div>
                </div>
            </nav>
           
        </>
    )
}