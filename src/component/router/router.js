import React, { useEffect } from 'react'
import {BrowserRouter, Routes, Route}from 'react-router-dom'
import Tabela from '../tabela/tabela'
import Home from '../pages/home/home'

import Signup from "../pages/auth/signup/signup"
import Signin from '../pages/auth/signin/signin'
import UseAuth from '../pages/auth/components/hooks/useAuth'

import Signun_change from "../pages/auth/signin_change/signin_change"
//import './navBar_Geral.css'
function Rotas() {

  const Private = ({Item})=>{
    const {signed} = UseAuth()
    return signed > 0 ?<Item/>:<Signin/>
  }

  const Priva=({Iten})=>{
    const {online_usuarios}= UseAuth()
    console.log (online_usuarios, 'rota Priva')
    return online_usuarios === "lourenco.lampiao@gmail.com"?<Iten/>:<Tabela/>
  }
 
  return (
      <>
         
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Private Item={Tabela}/>}/>
          <Route exact path="/Home" element={<Priva Iten={Home}/>}/>
          <Route exact path="/Signin" element={<Signin/>}/>
          <Route exact path="/Signup" element={<Signup/>}/>
          <Route exact path="/mudar" element={<Signun_change/>}/>
          <Route path ="*" element={<Signin/>}/>
        </Routes>
      </BrowserRouter>
     
    
      </>
  )
}

export default Rotas

