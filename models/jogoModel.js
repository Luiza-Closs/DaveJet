const connection = require('../database/db')

class Jogo {
    constructor (id_jogo, nome, dificultade, categoria, caminho){
        this.id_jogo= id_jogo;
        this.nome = nome;
        this.dificultade = dificultade;
        this.categoria = categoria;
        this.caminho = caminho;
    }
    listar(){
        const query = `select * from jogo order by dificuldade`
        return new Promise((resolve, reject) =>{
            connection.query(query, function(err, results){
                if(err){
                    reject("Erro na consulta")
                } else {
                    resolve(results)
                }
            })
        })
    }
    achar(){
        let query = `select caminho from jogo where id_jogo = ${this.id_jogo}`;
        return new Promise((resolve, reject) => {
            connection.query(query, function(err, results){
                if(err){
                    reject("Erro na consulta");
                }else{
                    resolve(results);
                }
            })
        })
    }
}

module.exports = { Jogo }