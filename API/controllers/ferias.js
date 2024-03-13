const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data =req.body;

    await db.Ferias.create(data).then((dataFerias) => {
        return res.json({
            error: false,
            message: "Ferias cadastrada com sucesso!",   
            data: dataFerias    
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Ferias não cadastrada com sucesso!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.Ferias.findAll().then((dataFerias) => {
        return res.json({
            error: false,
            data: dataFerias
        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar as Ferias!"
        });
    });
});


module.exports = router;