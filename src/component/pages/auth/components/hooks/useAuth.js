import React,{useContext} from 'react'
//import {AuthContext} from "../contexts/auth"
import { AuthContext } from '../contexts/auth';
const UseAuth = () => {
    const context = useContext(AuthContext);
  return context;
}

export default UseAuth
