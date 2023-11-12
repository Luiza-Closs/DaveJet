const connection = require('../database/db');

async function cripaSenha (senha){
    const rounds = 19;
    const salt = await bcrypt.genSalt(rounds);
    const senhaCripada = await bcrypt.hash(senha , salt)
    return senhaCripada;
}

class Usuario {

    async cadastrar( nome , email , senha , id_escola ){
        const query = "insert into pessoa ( nome , email ) value ('"+nome+"' , '"+data+"' )";
        let resPessoa = await connection.query(query);

        if(resPessoa){
            query = "insert into usuario ( id_pessoa , senha ) value ('"+resPessoa.insertId+"' , '"+cripaSenha(senha)+"' )";
            let resUsuario = await connection.query(query);
            if(resUsuario){
                resp = { "Status":"Não Bugou", 'id_pessoa':resPessoa.insertId }
            } else {
                resp = { "Status":"Bugou", "error":resUsuario}
            }
        } else{
            resp = { "Status":"Bugou", "error":resPessoa}
        }
        return resp;

    }
    async autenticar( email , senha ){

    }
}

module.exports = Usuario;