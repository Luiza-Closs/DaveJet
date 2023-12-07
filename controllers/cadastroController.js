const { Usuario } = require('../models/userModel');

function cadastroController(req, res){
    const { id, nome, email, senha, id_escola, proficao} = req.body;
    const novoUser = new Usuario( id, nome, email, senha, id_escola );
    console.log(novoUser);
    console.log(proficao);
    novoUser
        .cadastrar(id_escola, proficao)
        .then(()=> console.log("pessoa cadastrada!"))
        console.log(novoUser)
}

function autenticar(req,res){
    const{email, senha} = req.body;
    try{
        const id_senha = Usuario.acharEmail(email);
        if( id_senha == 0 ){
            return res.status(422).send({error: 'Email invalido'});
        } else{
            const senhaCerta = Usuario.conferirSenha(id_senha, senha);
            if( senhaCerta == true ){
                return res.status(200).send({ message: 'Autenticação bem-sucedida' });
            } else {
                return res.status(401).send({ error: 'Senha incorreta' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: 'Erro interno do servidor' });
    }
}

module.exports = {
    cadastroController,
    autenticar
}