const connection = require('../database/db');
const util = require("util");

const queryPromise = util.promisify(connection.query).bind(connection);

class Jogo {
    constructor (id_jogo, nome, dificultade, categoria, caminho){
        this.id_jogo= id_jogo;
        this.nome = nome;
        this.dificultade = dificultade;
        this.categoria = categoria;
        this.caminho = caminho;
    }
    static async listar(){
        console.log('chegou no model');
        const query = `select * from jogo order by dificuldade`
        return new Promise((resolve, reject) =>{
            connection.query(query, function(err, results){
                if(err){
                    reject("Erro na consulta")
                } else {
                    resolve(results)
                    console.log(results)
                }
            })
        })
    }
    static async acharJogo(jogoId){
        let query = `select * from jogo where id_jogo = ${jogoId}`;
        let result = (await queryPromise(query));

        result = JSON.parse(JSON.stringify(result));
        if (result.length === 0) {
            return null;
        } else {
            result = result[0];
            return result;
        }
    }
}

module.exports = { Jogo }