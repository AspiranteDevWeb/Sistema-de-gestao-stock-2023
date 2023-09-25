/**
 * class SomarTempo{
 *  construct(tempo){
 *      this.tempo=tempo;
 *  }
 *  
 *  somartempos(){return 'tempo total E ${tempo}'}
 * }
 * module.export= SomarTempo;....class ou module.export= {SomarTempo:SomarTempo}
 * module.export= tempo;....variavel
 * module.export={SomarTempo,}...objecto
 * module.export=somartempos;...funcao
 * 
 * module.export = pode exportar variavel, objecto ,class ou funcao. 
 * @param {*} tempo1 
 * @param {*} tempo2 
 * @returns 
 */

// require('./index/express') para poder usar express configurado na o
//calcular tempo

function somartempos(tempo1, tempo2) {

    var array1 = tempo1.split(':');
    
    var tempo_seg1 = (parseInt(array1[0]) * 3600) + (parseInt(array1[1]) * 60) + parseInt(array1[2]);
    
    var array2 = tempo2.split(':');
    
    var tempo_seg2 = (parseInt(array2[0]) * 3600) + (parseInt(array2[1]) * 60) + parseInt(array2[2]);
    
    var tempofinal = parseInt(tempo_seg1) + parseInt(tempo_seg2);
    
    var hours = Math.floor(tempofinal / (60 * 60));
    
    var divisorMinutos = tempofinal % (60 * 60);
    
    var minutes = Math.floor(divisorMinutos / 60);
    
    var divisorSeconds = divisorMinutos % 60;
    
    var seconds = Math.ceil(divisorSeconds);
    
    var contador = "";
    
    if (hours < 10) { contador = "0" + hours + ":"; } else { contador = hours + ":"; }
    
    if (minutes < 10) { contador += "0" + minutes + ":"; } else { contador += minutes + ":"; }
    
    if (seconds < 10) { contador += "0" + seconds; } else { contador += seconds; }
    
    return contador;
    
    }
    

    const express=require("express")
    const app=express()
    const mysql=require("mysql2")
    const cors=require("cors")

    const db = mysql.createPool({
        host : "localhost",
        user:"root",
        password:"",
        database: "bd_sistema_gestao_2023"
    });

    app.get("/timer",(req,res)=>{

       let SQL= "SELECT time FROM produto"

        db.query(SQL,(err,result)=>{
            if(err) console.log(err);
            else res.status(200).json(result);
        })
    })
    
