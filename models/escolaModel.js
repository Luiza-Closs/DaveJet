const database = require("../database/db");
const bcrypt = require("bcrypt");

class EscolaModel {
  criarEscola(nome, cnpj, senha) {
    const hashSenha = bcrypt.hashSync(senha, 10);
    return new Promise((resolve, reject) => {
      database.query(
        "insert into escola (nome, cnpj, senha) values (?, ?, ?)",
        [nome, cnpj, hashSenha],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results.insertId);
        }
      );
    });
  }

  async listarEscolas() {
    return new Promise((resolve, reject) => {
      database.query("select * from escola; ", (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  }
}

module.exports = EscolaModel;
