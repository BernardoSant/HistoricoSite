const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data = req.body;

    await db.pedido.create(data).then((dataPedido) => {
        return res.json({
            error: false,
            message: "Pedido cadastrado com sucesso!",   
            data: dataPedido    
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Pedido não cadastrado com sucesso!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.pedido.findAll().then((dataPedido) => {
        return res.json({
            error: false,
            data: dataPedido
        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar as Pedidos!"
        });
    });
});

router.put("/:numeroPDD", async (req, res) => {
    const { numeroPDD } = req.params;
    const data = req.body;

    await db.pedido.update(data, {
        where: { numeroPDD: numeroPDD }
    }).then(() => {
        return res.json({
            error: false,
            message: "Pedido atualizado com sucesso!"
        });
    }).catch(() => {
        return res.json({
            error: true,
            message: "Erro: Não foi possível atualizar o pedido!"
        });
    });
});

module.exports = router;
