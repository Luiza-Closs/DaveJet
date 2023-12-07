const connection = require("../database/db");

class Resultado {
    constructor(id_resultado, resultado, id_aluno, id_jogo){
        this.id_resultado=id_resultado;
        this.resultado=resultado;
        this.id_aluno=id_aluno;
        this.id_jogo=id_jogo;
    }
    /*resultado model{
        media = Number
        descrição 
    }*/

    //Adicionar resultado
    addResult(){
        const query = `insert into resultado ( resultado, id_aluno, id_jogo ) values (${this.resultado}, ${this.id_aluno}, ${this.id_jogo})`
        return new Promise((resolve, reject) =>{
            connection.query(query, (err, result) =>{
                if(err){
                    reject(err);
                } else{
                    resolve(`Resultado adicionado com sucesso!!`+result);
                }
            })
        })
    }
    updateResults(id){
        const query = `updade `
    }
    //listar resultado
    listResult(){
        const query = `select * from where id_aluno = ${this.id_aluno}`
        return new Promise ((resolve,reject)=>{
            connection.query(query,(err,rows)=>{
                if(err){
                    reject(err);
                }else{
                    resolve(rows);
                }
            })
        })
    }

}

module.exports = { Resultado }