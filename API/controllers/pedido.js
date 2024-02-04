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

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    await db.pedido.update(data, {
        where: { id: id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Pedido atualizada com sucesso!"
        });
    }).catch(() => {
        return res.json({
            error: true,
            message: "Erro: Não foi possível atualizar a Pedido!"
        });
    });
});

module.exports = router;
