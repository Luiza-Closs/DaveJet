const userModel = require('../models/userModel')
const escolaModel = require('../models/escolaModel')

function escolasNoCadastro(req, res){
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
}

function cadastroController(req, res){
    const {nome, email, cpf, senha, escolaSelecionada } = req.body;
    userModel.addUser( nome, email, cpf, senha, escolaSelecionada, (err, results) => {
        if (err) {
            console.error('erro ao adicionar usuario: ', err)
        } else {
            console.log('Usuario adicionado com sucesso.')
            res.redirect('')
        }
    })
}

module.exports = {
    cadastroController,
    escolasNoCadastro
}