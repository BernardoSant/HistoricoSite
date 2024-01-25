const express = require("express");
const cors = require('cors')
const app = express();

app.use(express.json())

const db = require('./db/models')

app.use((req, res, next) => {
    // Qualquer endereço pode fazer requisição
    res.header("Access-Control-Allow-Origin", "*");
    // Tipos de método que a API aceita
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    // Permitir o envio de dados para API
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // Executar o cors
    app.use(cors());
    // Quando não houver erro deve continuar o processamento
    next();
});

const empresa = require("./controllers/empresa");

app.use("/empresa", empresa)

app.listen(3030, () =>{
    console.log(" Servidor iniciado na porta 3030: http://localhost:3030")
});