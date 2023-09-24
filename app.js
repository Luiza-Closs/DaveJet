const express = require('express');
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

app.use("", require("./routers/routers"))

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });