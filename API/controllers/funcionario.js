const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data =req.body;

    await db.Funcionario.create(data).then((dataFuncionario) => {
        return res.json({
            error: false,
            message: "Funcionario cadastrada com sucesso!",   
            data: dataFuncionario    
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Funcionario não cadastrado com sucesso!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.Funcionario.findAll().then((dataFuncionario) => {
        return res.json({
            error: false,
            data: dataFuncionario
        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar as Funcionario!"
        });
    });
});


module.exports = router;