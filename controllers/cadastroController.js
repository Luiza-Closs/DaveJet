const { Usuario } = require('../models/userModel');

/*function escolasNoCadastro(req, res){
    escolaModel.listarEscolas((err, escolas) =>{
        if (err) {
            console.error('Erro au buscar escolas: ', err)
            res.render('erro', { mensagem: 'Erro ao buscar escolas'}) 
        } else if( escolas[0] ){
            res.render( 'Nenhuma escola cadastrada', { mensagem : 'Nenhuma escola cadastrada '})
        } else {
            res.render('formularioCadastro',{ escolas })
        }
    })
}*/

function cadastroController(req, res){
    const { id, nome, email, senha, id_escola} = req.body;
    const novoUser = new Usuario( id, nome, email, senha, id_escola );
    console.log(novoUser);
    novoUser
        .cadastrar(id_escola)
        .then(()=> console.log("pessoa cadastrada!"))
        console.log(novoUser)
}

module.exports = {
    cadastroController
}