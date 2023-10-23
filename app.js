const express = require('express');
const bodyParser = require('body-parser');
const cadastroController = require('./controllers/cadastroController');

const router = require('./routers/routers');

const app = express();
const database = require('./database/db')
const PORT = 5511


database.connect((err) => {
    if(err){
        console.log("Erro ao conectar: ", err);
        return
    }
    console.log("Conexão bem sucedida")
})

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/cadastro', cadastroController.escolasNoCadastro);
app.post('/cadastro', cadastroController.cadastroController);
// app.use('/', router);
app.get('/', (req, res) => {
    res.send("<h1>Olá Luiza!!</h1>");
});

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });