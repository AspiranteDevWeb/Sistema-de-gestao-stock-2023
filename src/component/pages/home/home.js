import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom'

import Button from "../auth/components/button/index"
//import useAuth from "../auth/components/hooks/useAuth"
//import {AuthProvider} from "../auth/components/context/auth"
import useAuth from '../auth/components/hooks/useAuth';
import Navibar_Geral from '../auth/components/cabecalho/navBar_Geral';
import { AuthProvider } from '../auth/components/contexts/auth';

import Signup from '../auth/signup/signup';


function Home (){

    const {signout}= useAuth()
    const navigate = useNavigate()
    return(
        <>
        <Navibar_Geral/>
        
        <Signup/>
        <Button
            Text = "Sair"
            onClick={()=>[signout(), navigate("/Signin")]}
        >
            Sair
        </Button>
        </>
    )
}
export default Home;