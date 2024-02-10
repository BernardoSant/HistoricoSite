const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data =req.body;

    await db.Cargo.create(data).then((dataCargo) => {
        return res.json({
            error: false,
            message: "Cargo cadastrado com sucesso!",   
            data: dataCargo    
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Cargo não cadastrado!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.Cargo.findAll().then((dataCargo) => {
        return res.json({
            error: false,
            data: dataCargo
        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar os Cargo!"
        });
    });
});


module.exports = router;