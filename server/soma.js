//select sum(nome_do_campo) from nome_tabela;
//select sum(nome)from usuario


//mudar tipo de dado no SQL de varchar para time
//alter table nome_tabela modify nome_coluna time(0); time(0) E o tipo de dado a alterar para armazenar tempo


// criar tabela
//create table jogador (id int,nome varchar(45),equipe varchar(45),time(0)) values (1,'damaiceno','benfica','12:02:60')



//busca a soma de todos valores do campo TEMPO e retorna a soma
app.get("/soma",(req,res)=>{
    let SQ=
    "SELECT sum (usuario.tempo) from usuario"

    db.query(SQL, (err,result)=>{
        if(err) console.log(err)
        else res.status(200).json(result)
    })
})


// CURRENT_TIMESTAMP() .... Envia a data e hora actual
//DATE_FORMAT(NOW(), "%H:%i:%S")...Envia hora actual


let SQL= "INSERT INTO aluno (id,nome,tempo_actual) values('5','rzebtr',CURRENT_TIMESTAMP())"