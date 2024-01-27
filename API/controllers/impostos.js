const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data =req.body;

    await db.Impostos.create(data).then((dataImposto) => {
        return res.json({
            error: false,
            message: "Imposto cadastrada com sucesso!",   
            data: dataImposto    
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Imposto não cadastrado com sucesso!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.Impostos.findAll().then((dataImposto) => {
        return res.json({
            error: false,
            data: dataImposto
        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar as Impstos!"
        });
    });
});


module.exports = router;