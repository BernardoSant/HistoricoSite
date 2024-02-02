const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data = req.body;

    await db.nota.create(data).then((dataNota) => {
        return res.json({
            error: false,
            message: "Nota Fiscal cadastrada com sucesso!",   
            data: dataNota    
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Nota Fiscal não cadastrado com sucesso!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.nota.findAll().then((dataNota) => {
        return res.json({
            error: false,
            data: dataNota
        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar as Nota Fiscal!"
        });
    });
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    await db.nota.update(data, {
        where: { id: id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Nota Fiscal atualizada com sucesso!"
        });
    }).catch(() => {
        return res.json({
            error: true,
            message: "Erro: Não foi possível atualizar a Nota Fiscal!"
        });
    });
});

module.exports = router;
