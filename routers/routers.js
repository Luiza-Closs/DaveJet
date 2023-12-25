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
        
        res.render('professor', { infoTotal, id_usuario: id });
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno do servidor');
    }
})

router.get('/cadastroAluno/:id_usuario', async(req, res) =>{
    try{
        const id = req.params.id_usuario;
        const turmas = await new Turma().list(id);
        res.render('cadastroAluno', {turmas:turmas, id_usuario:id})
    } catch(e){
        console.error(e);
        res.status(400).json({message:'erro ao carregar turmas'})
    }
})
router.post('/cadastroAluno', AlunoController.criarAluno);

router.get("/listaJogo/:id_aluno", async(req,res) =>{
    try{
        const id = req.params.id_aluno;
        const jogos = await Jogo.listar();
        console.log("ID_ALUNO:", id);
        res.render('menuJogos.ejs', { jogos: jogos, id_aluno: id });
    } catch(e){
        console.error(e);
        res.status(400).json({message:'erro ao carregar turmas'})
    }
})

router.get('/abrirJogo/:id_jogo/:id_aluno', async (req, res) =>{
    try{
        const id = req.params.id_jogo
        const id_aluno = req.params.id_aluno
        console.log('id aluno =>', id_aluno)
        console.log("id=>",id);
        const jogo = await jogoController.encontrarJogo(id);
        console.log(await jogoController.encontrarJogo(id))
        const caminho = jogo.caminho;
        if(!caminho){
            res.redirect('menuJogos')
        } else {
            console.log(jogo)
            res.render('telaJogo', {jogo, id_aluno});
        }
    } catch(e){
        console.error(e);
        res.status(400).json({message:'erro ao carregar jogo'})
    }
})

router.get('/criarTurma/:id_usuario', async (req, res) => {
    try {
        const id = req.params.id_usuario;
        res.render('criarTurma', { id_usuario: id });
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: 'Erro ao criar a turma' });
    }
});

router.post('/criarTurma', turmaController.criarTurma)

router.get('/inicioDeJogo/:id_turma', async(req, res) =>{
    const id_turma = req.params.id_turma;
    const turmar = await new Turma().find(id_turma)
    const turma = turmar[0]
    console.log(turma);
    res.render('main', {turma : turma})
})

router.get('/escolherNome/:id_turma', async(req,res) =>{
    const id_turma = req.params.id_turma;
    const aluno = await new Aluno().listar_da_turma(id_turma);
    console.log(aluno)
    res.render('nomeDoAluno', {alunos : aluno , id_turma })
})

module.exports = router