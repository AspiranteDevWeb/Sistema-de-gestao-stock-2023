const express= require ("express")
const app = express()
const mysql=require("mysql2")
const cors = require ("cors")


/**
 * const tempo = require('./bd_time_calculator')
 *      ou
 * const {SomarTempo} = require ('./bd_time_calculator')
 * 
 * const soma = new SomarTempo("16:23")
 * console.log(SomarTempo.somartempos())
 */

/**
 * const db= mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database: "bd_sistema_gestao_2023",
});
 */

const db= mysql.createConnection({
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


 app.get("/tudo/",(req,res)=>{
    let SQL =
    "select armazem.idarmazem,armazem.sala,armazem.gaveta,armazem.pratileira,armazem.corredor,produto.produto_nome,produto.produto_formato,produto.tempo,produto.data_emissao,produto.produto_observacao from armazem inner join produto where armazem.idarmazem = produto.armazem_idarmazem;"
         db.query( SQL, (err,result)=>{
            if (err) console.log(err);
            else res.status(200).json(result);
         });
       
 })
//tirei ,armazem.armazem dos select
 app.get("/tudo/:levar", (req,res)=>{
    const {levar}= req.params;
    console.log(levar, "show samething")
    if(levar == null || levar == undefined || levar == 1){

        let SQL=

        "select armazem.idarmazem,armazem.sala,armazem.gaveta,armazem.pratileira,armazem.corredor,produto.produto_nome,produto.produto_formato,produto.tempo,produto.data_emissao,produto.produto_observacao from armazem inner join produto where armazem.idarmazem = produto.armazem_idarmazem;"
         db.query( SQL, (err,result)=>{
            if (err) console.log(err);
            else res.status(200).json(result);
         });
       
    }
   else{
        let SQL =

        "select armazem.idarmazem,armazem.sala,armazem.gaveta,armazem.pratileira,armazem.corredor,produto.produto_nome,produto.produto_formato,produto.tempo,produto.data_emissao,produto.produto_observacao from armazem join produto on armazem.idarmazem = produto.armazem_idarmazem  WHERE produto.produto_nome like ?;"

        db.query(SQL,[`%${levar}%`]  ,(err,result)=>{
            if(err)console.log(err)
            else res.status(200).json(result);
        })
    }
});
//levar,

/////////login e logout/////

app.post ("/Enviar_login", (req, res)=>{
    const {nome}= req.body;
    const email= req.body.email;

    try {
        let SQL=
        "INSERT INTO usuario (nome, email) VALUES (?,?)";
        db.query( SQL, [nome, email], (err, result) =>{
            console.log(err);
        });
    }catch (err){
        console.log(" falha oa inserir dados do usuario")
    }
}); 


//recebe usuario que esta online (alterado 16:11 07/10-/2023)

app.get("/buscar_usuario_id",(req,res)=>{
    let SQL="SELECT * FROM usuario_online;"

    db.query(SQL, (err,result)=>{
        if (err)console.log(err);
        else res.status(200).json(result)
    });
})


//recebe_signup corresponde a usuarios
app.get("/recebe_signup", (req,res)=>{
    let SQL=
    "SELECT * FROM usuario";

    db.query( SQL, (err,result)=>{
    if (err) console.log(err);
    else res.status(200).json(result);
    });
});


//recebe_signup esta a filtrar dados dos usuarios no sistema. Neste caso filtra pelo nome 
app.get ("/recebe_signup/:buscarNome",(req,res)=>{
    const {buscarNome}= req.params;

    let SQL=
        "SELECT * FROM usuario WHERE nome like ?;"

    db.query(SQL,[`%${buscarNome}%`],(err,result)=>{
        if(err) console.log(err,'falha ao chamar os dados do usuarios');
        else console.log(result,"Chamou o nome, email,senhas e funcao do usuario");
    })
})



/////
app.post ("/signup", (req, res)=>{
    const {nome}=req.body;
    const {email}= req.body;
    const {senha1}= req.body;
    const {senha2}= req.body;
    const funcao =req.body.tipo;

    try {
        let SQL=
        "INSERT INTO usuario ( nome, email, senha1, senha2,funcao) VALUES (?,?,?,?,?)";
        db.query( SQL, [ nome,email, senha1, senha2,funcao], (err, result) =>{
            console.log(err);
        });
    }catch (err){
        console.log('falha ao inserir dados do usuario no bd')
    }

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

//updating user password

app.put ("/updating_usuario",(res,req)=>{
    const {id}=req.body;
    const {actual_password}=req.body;

    if (id){

        let SQL="UPDATE usuario SET senha1=?, senha2=? WHERE id=?;"

        db.query(SQL,[actual_password,actual_password,id],(err,result)=>{
            if(err) console.log(err, "Error on request userLogin by ID")
            else console.log(result,'user data from usuario table')
        })
    }
    
})


//updating produto

app.put ("/Actualizar_dados_Produto",(req,res)=>{

    const {armazem_idarmazem}=req.body;
    const produto_nome=req.body.produto_nome;
    const produto_formato =req.body.produto_formato;
    const data_emissao=req.body.data_emissao;
    //const duracao=req.body.duracao;
    const tempo=req.body.tempo;
    const produto_observacao=req.body.produto_observacao;
    
   if (produto_nome != null || produto_nome != undefined){
    let SQL = "UPDATE produto set produto_nome=? where armazem_idarmazem=?";
    db.query(SQL,[produto_nome,armazem_idarmazem],(err,result)=>{
        if(err) console.log(err,"atencao...titulo vazio")
        //else res.send(result)
        else console.log(result,'atencao...titulo ou produto_nome actualizado')
    })
   }
   if (produto_formato != null || produto_formato != undefined){
    let SQL= "UPDATE produto set produto_formato=? where armazem_idarmazem=?";
    db.query(SQL,[produto_formato,armazem_idarmazem],(err,result)=>{
        if(err) console.log(err,"atencao...produto_formato vazio")
        //else res.send(result)
        else console.log(result,'atencao...produto_formato actualizado')
    })
   }

   if (data_emissao != null || data_emissao != undefined){
    let SQL = "UPDATE produto set data_emissao=? where armazem_idarmazem =?";
    db.query(SQL,[data_emissao,armazem_idarmazem],(err,result)=>{
        if(err) console.log(err,"atencao...data_emissao vazio")
        //else res.send(result)
        else console.log(result,'atencao...data_emissao actualizado')
    })
   }

   if (tempo!=null || tempo != undefined){
    let SQL = "UPDATE produto set tempo=? WHERE armazem_idarmazem=?";
        db.query(SQL,[tempo,armazem_idarmazem],(err,result)=>{
            if(err) console.log(err,"atencao...tempo vazio")
            //else res.send(result)
            else console.log(result,'tempo atencao...actualizado')
        })
    
   }

   if (produto_observacao != null || produto_observacao != undefined){
    SQL="UPDATE produto set produto_observacao=? WHERE armazem_idarmazem=?";
    db.query(SQL,[produto_observacao,armazem_idarmazem],(err,result)=>{
        if(err) console.log(err,"atencao...produto_observacao vazio")
        //else res.send(result)
        else console.log(result,'atencao...produto_observacao actualizado')
    })
   }//else

  /**
   *  if (produto_nome !="" && produto_formato !="" && tempo != "" && data_emissao != "" && produto_observacao !=""){
    let SQL = "UPDATE produto set produto_nome=?,produto_formato=?,tempo=?,data_emissao=?,produto_observacao=? where armazem_idarmazem=?";
    db.query(SQL,[produto_nome,produto_formato,tempo,data_emissao,produto_observacao,armazem_idarmazem],(err,result)=>{
        if(err) console.log(err)
        else res.send(result)
    })
   }
   */
    
})

app.put ("/Actualizar_dados_Armazem",(req,res)=>{

    const idarmazem=req.body.idarmazem;
    const {sala}= req.body;
    const {gaveta}=req.body;
    const pratileira=req.body.pratileira;
    const corredor=req.body.corredor;

    if(sala != null || sala != undefined){
        let SQL = "UPDATE armazem set sala=? WHERE idarmazem=?";
        db.query(SQL,[sala,idarmazem],(err,result)=>{
            if(err) console.log(err,"atencao...sala vazio")
            //else res.send(result)
            else console.log(result,'atencao...sala actualizado')
        })
    }

    if(gaveta != null || gaveta != undefined){
        let SQL = "UPDATE armazem set gaveta=? WHERE idarmazem=?";
        db.query(SQL,[gaveta,idarmazem],(err,result)=>{
            if(err)console.log(err,"atencao...gaveta vazio")
           // else res.send(result)
           else console.log(result,'atencao...gaveta actualizado')
        })
    }

    if(pratileira != null || pratileira != undefined){
        let SQL = "UPDATE armazem set pratileira=? WHERE idarmazem=?";
        db.query(SQL,[pratileira,idarmazem],(err,result)=>{
            if (err) console.log(err,"atencao...pratileira vazio")
           // else res.send(result)
           else console.log(result,'atencao...pratileira actualizado')
        })
    }

    if(corredor != null || corredor != undefined){
        let SQL =
        "UPDATE armazem SET corredor=? WHERE idarmazem=?";
        db.query(SQL,[corredor,idarmazem],(err,result)=>{
            if(err)console.log(err,"atencao...corredor vazio")
           // else res.send(result)
           else console.log(result,'atencao...corredor actualizado')
        })
    }//else

   /**
    *  if(sala != "" && gaveta != "" && pratileira != "" && corredor !=""){
        let SQL = "UPDATE armazem set sala=?,gaveta=?,pratileira=?,corredor=?  where idarmazem=? ";
        db.query(SQL,[sala,gaveta,pratileira,corredor, idarmazem], (err,result)=>{
            if(err) console.log(err)
            else res.send(result)
        } )
    }
    */
})


app.post ("/dados_usuario_online",(req,res)=>{

    
    
    try{

        const nome =req.body.namePessoa;
    const {email} =req.body;
    const data_inicio=req.body.data_inicio;
    const hora_inicio=req.body.hora_inicio;
    const {token}=req.body;

        /**essa condicionais  */
        if(!nome | !email | ! token){
            //return res.status(422).json({msg:'o email do usuario logado nao chegou'})
            console.log('o email ou token do usuario logado nao chegou na API')
        }else {

            let SQL = "INSERT INTO usuario_online (nome, email,data_inicio,hora_inicio,token) values (?,?,?,?,?)";
            db.query( SQL, [ nome, email, data_inicio, hora_inicio,token], (err, result) =>{
                if (err) console.log(err,'falha....nao conseguio inserir dados pra usuario online....');
                else console.log(result,'insercao de dados usuario logado');
            })
        }

        
    } catch(err){
        console.log('nao esta ser possivel enviar os dados do usuario online para bd')
    }
})


// soma da hora


app.get ("/somaTempo",(req,res)=>{
    try{
        let SQL= "select sec_to_time(sum(time_to_sec(tempo))) as tempototal from produto ";
        //03.10.2023===> mudei script de soma 
        //let SQL = "SELECT sum(tempo - cast('0:0:0' as tempototal)) from produto"; //as time=> nao funciona
        //SELECT sum(tempo) as tempototal from produto====> faz a soma total dos valores



        db.query(SQL,(err,result)=>{
            if(err)console.log(err)
            //else res.status(200).json(result,'apresentando a soma total....');//json.stringify(result)//JSON.parse(result)
            //else res.status(200).send({tempototal:result}) ou ....send(String(result)) ou ....send((result).toString())
            else res.end(JSON.stringify(result,'aaaaaaaaaa...'))
            //json({result},'apresentando a soma.....')
            //else res.status(200).json(Number(result))
            //else res.status(200).send(result)
            console.log(result);
        })

    }catch(err){
        console.log("falha na soma do tempo");
        return res.json({ok: 'soma tempo nao deu certo'});
    }
})




















//elimina grupo
// Script para eliminar varios itens de uma so vez na tabela
//SQL="delete from usuario where id between 1 and 165;"


//busca de forma ordenada
//select * from usuario_online order by id ASC ;