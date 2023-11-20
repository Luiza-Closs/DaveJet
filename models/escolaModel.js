const connection = require("../database/db");

class Escola {
  constructor( id_escola, nome, media, cnpj, senha ){
    this.id_escola = id_escola;
    this.nome = nome;
    this.media = media;
    this.cnpj = cnpj;
    this.senha = senha;
  }
  create(){
    const query = `insert into escola (nome, media, cnpj, senha) values ('${this.nome}', ${this.media}, ${this.cnpj}, ${this.senha})`
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
  list(){
    const query = `select * from escola`
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

module.exports = { Escola }