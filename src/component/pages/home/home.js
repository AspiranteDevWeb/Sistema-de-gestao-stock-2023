import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom'

import Button from "../auth/components/button/index"
//import useAuth from "../auth/components/hooks/useAuth"
//import {AuthProvider} from "../auth/components/context/auth"
import useAuth from '../auth/components/hooks/useAuth';

import { AuthProvider } from '../auth/components/contexts/auth';
function Home (){

    const {signout}= useAuth()
    const navigate = useNavigate()
    return(
        <>
        <div>Home</div>
        <div><h1>Tem ALguma ideia?....</h1></div>
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