const express= require ("express")
const app = express()
const mysql=require("mysql2")
const cors = require ("cors")


const db= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database: "bd_sistema_gestao_2023",
});
app.use(cors ());
app.use(express.json());

app.listen(port=3020,()=>{
    console.log("Servidor do formulario em funcionamento na porta" ,`${port}`)
})


app.post ("/EnviarDadoNovosArmazem", (req, res)=>{
    const idarmazem= req.body.idarmazem;
    const sala = req.body.sala;
    const gaveta=req.body.gaveta;
    const pratileira=req.body.pratileira;
    const corredor = req.body.corredor;

     let SQL=
     "INSERT INTO armazem (idarmazem,sala,gaveta,pratileira,corredor) VALUES (?,?,?,?,?)" ;
     db.query( SQL, [idarmazem,sala,gaveta,pratileira,corredor], (err, result) =>{
        console.log(err);
    });
 }); 

 app.post ("/EnviarDadoNovosProduto", (req, res)=>{
    const {armazem_idarmazem}= req.body;
    const {produto_nome}= req.body;
    const produto_formato =req.body.produto_formato;
    const data_emissao =req.body.data_emissao;
    const tempo=req.body.duracao;
    const produto_observacao = req.body.produto_observacao;
   
   

     let SQL=
     "INSERT INTO produto (armazem_idarmazem,produto_nome,produto_formato,tempo,data_emissao,produto_observacao) VALUES (?,?,?,?,?,?)" ;
     db.query( SQL, [armazem_idarmazem,produto_nome,produto_formato,tempo,data_emissao,produto_observacao], (err, result) =>{
        console.log(err);
    });
 });
 

 app.get("/tudo", (req,res)=>{
    let SQL=

   "select armazem.armazem,armazem.sala,armazem.gaveta,armazem.pratileira,armazem.corredor,produto.produto_nome,produto.produto_formato,produto.tempo,produto.produto_observacao from armazem inner join produto where armazem.idarmazem = produto.armazem_idarmazem;"
    db.query( SQL, (err,result)=>{
       if (err) console.log(err);
       else res.status(200).json(result);
    });
});


/////////login e logout/////

app.post ("/Enviar_login", (req, res)=>{
    const {nome}= req.body;
    const email= req.body.email;

    let SQL=
    "INSERT INTO usuario (nome, email) VALUES (?,?)";
    db.query( SQL, [nome, email], (err, result) =>{
        console.log(err);
    });
}); 


app.get("/recebe_signup", (req,res)=>{
    let SQL=
    "SELECT * FROM usuario";

    db.query( SQL, (err,result)=>{
    if (err) console.log(err);
    else res.status(200).json(result);
    });
});




app.post ("/signup", (req, res)=>{
    
    const {email}= req.body;
    const {senha1}= req.body;
    const {senha2}= req.body;

    let SQL=
    "INSERT INTO usuario ( email, senha1, senha2) VALUES (?,?,?)";
    db.query( SQL, [ email, senha1, senha2], (err, result) =>{
        console.log(err);
    });
}); 

