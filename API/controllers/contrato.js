const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data = req.body;

    await db.Contrato.create(data).then((dataContrato) => {
        return res.json({
            error: false,
            message: "Contrato cadastrado com sucesso!",   
            data: dataContrato   
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Contrato não cadastrado com sucesso!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.Contrato.findAll().then((dataContrato) => {
        return res.json({
            error: false,
            data: dataContrato        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar os Contratos!"
        });
    });
});

router.put("/:numeroCT", async (req, res) => {
    const { numeroCT } = req.params;
    const data = req.body;

    await db.Contrato.update(data, {
        where: { numeroCT: numeroCT }
    }).then(() => {
        return res.json({
            error: false,
            message: "Contrato atualizado com sucesso!"
        });
    }).catch(() => {
        return res.json({
            error: true,
            message: "Erro: Não foi possível atualizar o Contrato!"
        });
    });
});

module.exports = router;
