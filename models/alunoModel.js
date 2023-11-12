const connection = require('../database/db');

class Aluno {
    constructor(id_aluno, nome, id_turma){
        this.id_aluno = id_aluno;
        this.nome = nome;
        this.id_turma = id_turma;
    }
    //listar de turma
    listar_de_turma(turmaId){
        const query = 'select * from aluno where id_turma ='+turmaId;
        return new Promise(( resolve, reject) =>{
            connection.query(query , (err, results)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }
    //deletar
    deletar(id_aluno){
        const query = `delete from aluno where id_aluno=${id_aluno}`;
        return new Promise(( resolve, reject ) =>{
            connection.query(query , (err, result) =>{
                if(err){
                    reject(err);
                } else {
                    resolve(`Aluno com id ${id_aluno} deletado com sucesso`);
                }
            })
        })

    }
    //adicionar
    adicionar(turmaId){
        const query = `insert into aluno (nome, id_turma) values ('${this.nome}', ${turmaId})`
        return new Promise((resolve, reject) =>{
            connection.query(query, (err, result) =>{
                if(err){
                    reject(err);
                } else{
                    resolve(`Aluno adicionado com sucesso!!`+result);
                }
            })
        })
        // this.id = resp.insertId;
    }
    //update
    update( id, nome, turmaId ){
        const query = `update aluno set nome = '${nome}' , id_turma = ${turmaId} where id_aluno = ${id}`
        return new Promise ((resonve, reject) =>{
            connection.query(query, (err, result)=>{
                if(err){
                    reject(err);
                } else{
                    resove("Dados do aluno atualizados"+result);
                }
            })
        } )
    }
}

module.exports = { Aluno }