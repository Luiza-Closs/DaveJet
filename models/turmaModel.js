const connection = require('../database/db');

class Turma {
    constructor(id_turma, nome, fase, id_coordenacao){
        this.id_turma = id_turma;
        this.nome = nome;
        this.fase = fase;
        this.id_coordenacao = id_coordenacao;
    }
    create(){
        const query = `insert into turma (nome, fase, id_coordenacao) values ('${this.nome}', ${this.fase} , ${this.id_coordenacao})`
        return new Promise((resolve, reject) =>{
            connection.query(query, (err, result) =>{
                if(err){
                    reject(err);
                } else{
                    resolve(`Turma adicionada com sucesso!!`+result);
                }
            })
        })
    }
    delete(){
        const query = `delete from turma where id_turma = ${this.id_turma}`
        return new Promise ((resolve ,reject)=>{
            connection.query(query, (err, result)=>{
                if(err){
                    reject(err);
                } else {
                    resolve("Turma deletada com sucesso!"+result);
                }
            })
        })
    }
    update(){
        const query = `update turma set nome = '${this.nome}' , fase = ${this.fase} where id_turma = ${this.id_turma}`
        return new Promise ((resonve, reject) =>{
            connection.query(query, (err, result)=>{
                if(err){
                    reject(err);
                } else{
                    resove("Dados da turma atualizados"+result);
                }
            })
        } )
    }
    list(){/*where id_coordenacao = ${this.id_coordenacao}*/
        const query = `select * from turma`
        return new Promise ((resolve, reject) =>{
            connection.query(query, (err, rows) =>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })

    }
}

module.exports = { Turma }