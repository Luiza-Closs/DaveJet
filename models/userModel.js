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
  async cadastrar(id_escola, proficao) {
    try {
      const senhazin = await cripaSenha(this.senha);
      // Query para inserir uma nova pessoa
      const queryPessoa = `INSERT INTO pessoa (nome, email) VALUES ('${this.nome}', '${this.email}')`;
      // Query para obter o ID da pessoa recém-inserida
      const queryIdPessoa = `SELECT id_pessoa FROM pessoa WHERE nome = '${this.nome}'`;
      // Query para inserir um novo usuário
      const queryUsuario = `INSERT INTO usuario (id_usuario, senha, id_escola) VALUES (?, '${senhazin}', ${id_escola})`;
      // Inserir nova pessoa
      const resultPessoa = await this.executarQuery(queryPessoa);
      // Obter o ID da pessoa recém-inserida
      const resultIdPessoa = await this.executarQuery(queryIdPessoa);
      // Garantir que há um resultado válido antes de prosseguir
      if (resultIdPessoa.length === 0 || !resultIdPessoa[0].id_pessoa) {
        throw new Error("Erro ao obter o ID da pessoa recém-inserida");
      }
      const idPessoa = resultIdPessoa[0].id_pessoa;
      // Inserir novo usuário usando o ID da pessoa
      const resultUsuario = await this.executarQuery(queryUsuario, [idPessoa]);
      if( proficao == "Professor(a)" ){
        console.log('é professor');
        await this.Professor(idPessoa);
      } else if( proficao == "Coordenador(a)"){
        console.log('é coordenador');
        await this.coordenador(idPessoa);
      }

      return idPessoa;
    } catch (error) {
      console.error(error);
      throw error; // Propaga o erro para quem chamou a função
    }
  }

  // Função auxiliar para executar consultas
  static async executarQuery(query, params) {
    return new Promise((resolve, reject) => {
      connection.query(query, params, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static acharEmail(email){
    try{
      const query = `select id_pessoa from pessoa where email = '${email}'`
      const result = this.executarQuery(query);
      if( result[0] == 0 ){
        throw new Error('Não existe esse email');
      } else {
        return result;
      }
    } catch (e ){
      console.log('erro: ', e);
    }
  }

  static conferirSenha(id, senha){
    try{
      const query = `select senha from usuario where id_usuario = ${id}`
      const result = this.executarQuery(query);
      const senhazin =  cripaSenha(senha);
      if( result[0].senha != senhazin ){
        throw new Error('A senha está errada');
      } else {
        return true;
      }
    } catch (e){
      console.log('erro: ', e);
      throw e;
    }
  }

  Professor(id){
    try{
      const query = `insert into professor (id_professor) value (${id})`;
      const result = this.executarQuery(query);
      if(result[0] == 0){
        throw new Error('Erro no cadastro do professor');
      } else{
        return result;
      }
    } catch(e){
      console.log(' erro: ',e);
      throw e;
    }
  }
  coordenador(id){
    try{
      const query = `insert into coordenacao (id_coordenacao) value (${id})`;
      const result = this.executarQuery(query);
      if(result[0] == 0){
        throw new Error('Erro no cadastro do coordenador');
      } else{
        return result;
      }
    } catch(e){
      console.log(' erro: ',e);
      throw e;
    }
  }
}

module.exports = { Usuario };
