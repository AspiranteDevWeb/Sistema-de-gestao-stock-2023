import React, {Component} from 'react'
import * as C from "./stylesButton"

const Button = ({Text, onClick,type})=>{
    return(
        <C.Button
            type={type}
            onClick={onClick}
        >
            {Text}
        </C.Button>
    )
}
export default Button