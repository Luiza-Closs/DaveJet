const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const cadastroController = require('./controllers/cadastroController');

//const router = require('./routers/routers');

const app = express();
const database = require('./database/db');
const { Turma } = require('./models/turmaModel');
const AlunoController = require('./controllers/alunoController')
const jogoController = require('./controllers/jogoController')
const PORT = 2000


database.connect((err) => {
    if(err){
        console.log("Erro ao conectar: ", err);
        return
    }
    console.log("Conexão bem sucedida")
});

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static("public"))


app.get('/cadastro', cadastroController.escolasNoCadastro);
app.post('/cadastro', cadastroController.cadastroController);
// app.use('/', router);
/*app.get('/', (req, res) => {
    res.send("<h1>Olá Luiza!!</h1>");
});*/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Dave.Jet 1.0', 'start.html'));
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});



app.get('/cadastroAluno', async(req, res) =>{
    try{
        const turmas = await new Turma().list();
        res.render('cadastroAluno', {turmas:turmas})
    } catch(e){
        console.error(e);
        res.status(400).json({message:'erro ao carregar turmas'})
    }
})

app.post('/cadastroAluno', AlunoController.criarAluno);

app.get("/listaJogo", jogoController.listarJogos)

app.get('/jogo/:id', (req, res) => {
    const caminhoAbsoluto = path.join(__dirname, 'views', 'telaJogo.ejs');
    console.log('Caminho Completo:', caminhoAbsoluto);
    res.render(caminhoAbsoluto);
});
