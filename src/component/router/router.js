import React from 'react'
import {BrowserRouter, Routes, Route}from 'react-router-dom'
import Tabela from '../tabela/tabela'
import Home from '../pages/home/home'

import Signup from "../pages/auth/signup/signup"
import Signin from '../pages/auth/signin/signin'
import UseAuth from '../pages/auth/components/hooks/useAuth'

function Rotas() {

  const Private = ({Item})=>{
    const {signed} = UseAuth()
    return signed > 0 ?<Item/>:<Signin/>
  }
  return (
    <div className="App">
         
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Private Item={Tabela}/>}/>
          <Route exact path="/Home" element={<Home/>}/>
          <Route exact path="/Signin" element={<Signin/>}/>
          <Route exact path="/Signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
     
    
    </div>
  )
}

export default Rotas

