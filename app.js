const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const database = require('./database/db')
const PORT = 2000

const router = require('./routers/routers')

database.connect((err) => {
    if(err){
        console.log("Erro ao conectar: ", err)
        return
    }
    console.log("Conexão bem sucedida")
});

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static("public"))

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
