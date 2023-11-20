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

async function encontrarJogo (req, res){
    try{
        const caminho = await Jogo.achar(req.params.id);
        const caminhoCompleto = `/game${caminho}/script.js`;
        console.log({ caminhoCompleto })
        res.json({ caminhoCompleto });
    } catch ( e ){
        res.status(404).json({ error: 'Não foi possível localizar o jogo.' })
    }
}

module.exports = {
    listarJogos,
    encontrarJogo
}