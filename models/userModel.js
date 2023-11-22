const connection = require("../database/db");
const bcrypt = require("bcrypt");

async function cripaSenha(senha) {
  const rounds = 19;
  const salt = await bcrypt.genSalt(rounds);
  const senhaCripada = await bcrypt.hash(senha, salt);
  return senhaCripada;
}

class Usuario {
  constructor(id, nome, email, senha, id_escola) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.id_escola = id_escola;
  }
  async cadastrar(id_escola) {
    const senhazin = await cripaSenha(this.senha);
    console.log(this.nome);
    const query = `insert into pessoa (nome, email) values ('${this.nome}', '${this.email}')`;
    const query2 = `insert into usuario (senha, id_escola) values ('${senhazin}', ${id_escola})`;

    return new Promise((resolve, reject) => {
      connection.query(query, query2, (e, result) => {
        if (e) {
          reject(e);
            // A primeira consulta foi bem-sucedida, agora execute a segunda consulta
            
        } else {
            resolve("Pessoa adicionada com sucesso");
            if (e) {
                reject(e);
                console.log("Erro ao cadastrar usuário");
              } else {
                resolve("Pessoa e usuário adicionados com sucesso");
                console.log("Usuário adicionado");
              }
        }
      });
    });
  }
  async autenticar(email, senha) {}
}

module.exports = { Usuario };
