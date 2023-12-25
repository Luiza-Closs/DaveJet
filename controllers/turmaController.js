const { Turma } = require('../models/turmaModel');

//criar
async function criarTurma(req, res){
    const {id, nome, fase, id_coordenacao} = req.body;
    const novaTurma = new Turma(id, nome, fase, id_coordenacao)
    console.log(novaTurma)
    novaTurma
        .create(id_coordenacao)
        .then(() => console.log('turma cadastrada'))
        console.log(novaTurma);
        res.redirect('professor/'+id_coordenacao)
}

module.exports ={
    criarTurma
}