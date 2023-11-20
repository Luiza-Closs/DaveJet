const connection = require('../database/db');
const bcrypt = require('bcrypt');

async function cripaSenha (senha){
    const rounds = 19;
    const salt = await bcrypt.genSalt(rounds);
    const senhaCripada = await bcrypt.hash(senha , salt)
    return senhaCripada;
}

class Usuario {
    constructor(id, nome, email, senha, id_escola){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.id_escola = id_escola;
    }
    async cadastrar(id_escola){
        const senhazin = await cripaSenha(this.senha)
        console.log(this.nome)
        const query = `insert into pessoa (nome, email) values ('${this.nome}' , '${this.email}'); insert into usuario (senha, id_escola) values ('${senhazin}', ${id_escola})`;
        return new Promise((resolve, reject) => {
            connection.query(query, (e, result) => {
                if (e) {
                    reject(e);
                } else {
                    resolve(result + 'Pessoa adicionada');
                }
            });
        });
        

    }
    async autenticar( email , senha ){

    }
}

module.exports = { Usuario };