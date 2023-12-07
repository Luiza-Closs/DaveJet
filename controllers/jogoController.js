const { Jogo } = require('../models/jogoModel')

async function listarJogos(req, res){
    console.log('chegou no controller')
    try{
        const jogos = await Jogo.listar();
        console.log(jogos)
        res.render('menuJogos.ejs', { jogos : jogos})
    } catch(e){
        res.status(500).json({error:'Erro ao listar jogos'})
    }
}

async function encontrarJogo(id) {
    console.log('entrou no controler encontrar Jogo');

    const jogo = await Jogo.acharJogo(id);

    return jogo;
}

function receberResultado(req, res) {

}

module.exports = {
    listarJogos,
    encontrarJogo
}