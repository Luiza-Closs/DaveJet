const { Aluno }= require('../models/alunoModel')

//configurar aluno
//criar
async function criarAluno (req, res){
    /*const turmaId = req.session.turma.id_turma
    turma = await Turma.findById(turmaId)*/

    const { id, nome, id_turma } = req.body;
    const novoAluno = new Aluno( id, nome, id_turma)
    console.log(novoAluno);
    novoAluno
        .adicionar(id_turma)
        .then(() => console.log("Criança cadastrada com sucesso!"))
        console.log(novoAluno);
    
}

//deletar
async function deletarAluno(req,res){
    if (await Aluno.deletar(req.params.id_aluno)){
        res.redirect(/**Arquivo não criado */)
    } else {
        res.redirect(/**Arquivo não criado */)
        console.log('não deu pra deletar a criança')
    }
}
//update
async function updateAluno(req,res){
    const { id } = req.params;
    const { nome, id_turma } = req.body;
    Aluno.update( id, nome, id_turma)
}
//listar alunos 
async function listarAlunos (req, res){
    const turmaId = req.body.turma
    listaAlunos = await Aluno.listar_de_turma(turmaId)
    //res.render(/*Pagina ainda não criada*/, {alunos: listarAlunos})
}

module.exports ={
    criarAluno,
    deletarAluno,
    updateAluno,
    listarAlunos
}