const express = require('express');
const router = express.Router();
const path = require('path')
const session = require('express-session')

const { Turma } = require('../models/turmaModel')
const { Escola } = require('../models/escolaModel')
const { Jogo } = require('../models/jogoModel')
const AlunoController = require('../controllers/alunoController')
const jogoController = require('../controllers/jogoController')
const cadastroController = require('../controllers/cadastroController')
const turmaController = require('../controllers/turmaController');
const { Aluno } = require('../models/alunoModel');

router.use(session({secret:'batata'}))

router.get('/', (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'start.ejs'));
});


router.get('/cadastro', async(req, res) =>{
    try{
        const escolas = await new Escola().list();
        res.render('cadastro', {escolas:escolas})
    } catch(e){
        console.error(e)
        res.status(500).json({message:'erro ao carregar turmas'});
    }
})
router.post('/cadastro', cadastroController.cadastroController)

router.get('/autenticar', async(req, res) =>{
    console.log('clicado em autenticar');
    try{
        res.render('autenticar')
    } catch(e){
        console.error(e);
    }
})
router.post('/autenticar', cadastroController.autenticar)

router.get('/professor/:id_usuario', async(req, res) => {
    try{
        const id = req.params.id_usuario;
        const turmas = await new Turma().listId(id);
        const infoTotal = [];
        if( turmas.length == 0){
            infoTotal.push({
                tipo:'avizo',
                mensagem:`Não há turmas cadastradas para o professor ${req.params.nome}`
            })
        } else{
            const idsTurmas = turmas.map(turma => turma.id_turma);
        const alunos = await new Aluno().listar_de_turma(idsTurmas);

        for(const turma of turmas){
            infoTotal.push({
                tipo:'turma',
                dados: turma
            });
            const alunosDaTurma = alunos.filter(aluno => aluno.id_turma === turma.id_turma);
            for (const aluno of alunosDaTurma) {
                infoTotal.push({
                    tipo:'aluno',
                    dados: aluno
                })
            }
        }
        }
        
        res.render('professor', {infoTotal})
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
})

router.get('/cadastroAluno', async(req, res) =>{
    try{
        const turmas = await new Turma().list();
        res.render('cadastroAluno', {turmas:turmas})
    } catch(e){
        console.error(e);
        res.status(400).json({message:'erro ao carregar turmas'})
    }
})
router.post('/cadastroAluno', AlunoController.criarAluno);

router.get("/listaJogo", jogoController.listarJogos)

router.get('/abrirJogo/:id_jogo', async (req, res) =>{
    try{
        const id = req.params.id_jogo
        console.log("id=>",id);
        const jogo = await jogoController.encontrarJogo(id);
        console.log(await jogoController.encontrarJogo(id))
        const caminho = jogo.caminho;
        if(!caminho){
            res.redirect('menuJogos')
        } else {
            console.log(jogo)
            res.render('telaJogo', {jogo});
        }
    } catch(e){
        console.error(e);
        res.status(400).json({message:'erro ao carregar jogo'})
    }
})
router.post('/abrirJogo/:id', async(req, res) =>{
    try{
        
    } catch(e){
        console.error(e);

    }
})

router.get('/criarTurma', async( req, res ) =>{
    try{
        res.render('criarTurma')
    } catch(e){
        console.error(e)
        res.status(400).json({message:'Erro ao criar a turma'});
    }
})
router.post('/criarTurma', turmaController.criarTurma)

router.get('/inicioDeJogo/:id_turma/:id_escola', async(req, res) =>{
    const id_turma = req.params.id_turma;
    const id_escola = req.params.id_escola;
    console.log(id_turma);
    console.log(id_escola);
    res.render('main')
})

module.exports = router