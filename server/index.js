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

app.listen(port=3050,()=>{
    console.log("Servidor do formulario em funcionamento na porta" ,`${port}`)
})


app.post ("/EnviarDadoNovosArmazem", (req, res)=>{
    //const idarmazem= req.body.idarmazem;
    const sala = req.body.sala;
    const gaveta=req.body.gaveta;
    const pratileira=req.body.pratileira;
    const corredor = req.body.corredor;

     let SQL=
     "INSERT INTO armazem (sala,gaveta,pratileira,corredor) VALUES (?,?,?,?)" ;
     db.query( SQL, [sala,gaveta,pratileira,corredor], (err, result) =>{
        console.log(err);
    });
 }); 

 app.post ("/EnviarDadoNovosProduto", (req, res)=>{
   // const {armazem_idarmazem}= req.body;
    const {produto_nome}= req.body;
    const produto_formato =req.body.produto_formato;
    const data_emissao =req.body.data_emissao;
    const tempo=req.body.duracao;
    const produto_observacao = req.body.produto_observacao;
   
   

     let SQL=
     "INSERT INTO produto (produto_nome,produto_formato,tempo,data_emissao,produto_observacao) VALUES (?,?,?,?,?)" ;
     db.query( SQL, [produto_nome,produto_formato,tempo,data_emissao,produto_observacao], (err, result) =>{
        console.log(err);
    });
 });
 

 app.get("/tudo", (req,res)=>{
    let SQL=

   "select armazem.idarmazem,armazem.armazem,armazem.sala,armazem.gaveta,armazem.pratileira,armazem.corredor,produto.produto_nome,produto.produto_formato,produto.tempo,produto.data_emissao,produto.produto_observacao from armazem inner join produto where armazem.idarmazem = produto.armazem_idarmazem;"
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


app.delete("/delete_armazem/:id",(req,res) => {
    const {id}=req.params;
    let SQL = "DELETE FROM armazem WHERE idarmazem=?";
    db.query(SQL,[id],(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.delete("/delete_produto/:id",(req,res)=>{
    const {id}=req.params;
    //PRECISA ELELIMINAR A RESTRICAO; ALLTER TABLE produto RESTRICT;
    let SQL = "DELETE FROM produto WHERE armazem_idarmazem=?";
    db.query(SQL,[id],(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

//app.delete ("/teste1_deletar/:id",(res,req)=>{
  //  const {id}=req.params;
   // let SQL = "delete produto,armazem from armazem join produto on armazem.idarmazem = produto.armazem_idarmazem where idarmazem = 5"
//})



app.put ("/Actualizar_dados_Produto",(req,res)=>{

    const {armazem_idarmazem}=req.body;
    const produto_nome=req.body.produto_nome;
    const produto_formato =req.body.produto_formato;
    const data_emissao=req.body.data_emissao;
    const duracao=req.body.duracao;
    const produto_observacao=req.body.produto_observacao;
    const tempo=req.body.tempo;
    
   
    let SQL = "UPDATE produto Set produto_nome=?,produto_formato=?,tempo=?,data_emissao=?,produto_observacao=? where armazem_idarmazem=?";
    db.query(SQL,[produto_nome,produto_formato,tempo,data_emissao,produto_observacao,armazem_idarmazem],(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
})

app.put ("/Actualizar_dados_Armazem",(req,res)=>{

    const idarmazem=req.body.idarmazem;
    const {sala}= req.body;
    const {gaveta}=req.body;
    const pratileira=req.body.pratileira;
    const corredor=req.body.corredor;
    let SQL = "UPDATE armazem Set sala=?,gaveta=?,pratileira=?,corredor=?  where idarmazem=? ";
    db.query(SQL,[sala,gaveta,pratileira,corredor, idarmazem], (err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    } )
})


app.post ("/dados_usuario_online",(req,res)=>{

    const {nome} =req.body;
    const {email} =req.body;
    const data_inicio=req.body.data_inicio;
    const hora_inicio=req.body.hora_inicio;
    /**essa condicionais  */
    if(!email){
        return res.status(422).json({msg:'o email do usuario logado nao chegou'})
    }

    let SQL = "INSERT INTO usuario_online (nome, email,data_inicio,hora_inicio) values (?,?,?,?)";
    db.query( SQL, [ nome, email, data_inicio, hora_inicio], (err, result) =>{
        console.log(err);
        console.log('insercao de dados usuario logado',result);
    })
})