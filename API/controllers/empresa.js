const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data =req.body;

    await db.Empresa.create(data).then((dataEmpresa) => {
        return res.json({
            error: false,
            message: "Mensagem cadastrada com sucesso!",   
            data: dataEmpresa    
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Mensagem não cadastrada com sucesso!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.Empresa.findAll().then((dataEmpresa) => {
        return res.json({
            error: false,
            data: dataEmpresa
        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar as empresas!"
        });
    });
});


module.exports = router;