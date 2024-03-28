const express = require("express");
const db = require("../db/models");
const { io } = require("../app.js");
const router = express.Router();

const dataTypes = [
  {
    type: "pedido",
    dbType: db.pedido,
    msg: "Pedido",
  },
];

dataTypes.forEach(({ type, dbType, msg }) => {
  router.post("/", async (req, res) => {
    var data = req.body;

    try {
      const dataDB = await dbType.create(data);

      const allData = await dbType.findAll();
      io.emit(`${type} data`, allData);
      return res.json({
        error: false,
        message: `${msg} cadastrado com sucesso(a)!`,
        data: dataDB,
      });
    } catch (error) {
      return res.json({
        error: false,
        message: `ERRO: ${msg} não cadastrado(a)!`,
      });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const dataDB = await dbType.findAll();
      const allData = await dbType.findAll();
      io.emit(`${type} data`, allData);
      return res.json({
        error: false,
        data: dataDB,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: `ERRO: ${msg} não encontrado(a)!`,
      });
    }
  });

  router.put("/:numeroPDD", async (req, res) => {
    const { numeroPDD } = req.params;
    const data = req.body;

    await dbType.update(data, {
        where: { numeroPDD: numeroPDD }
    }).then(() => {
        return res.json({
            error: false,
            message: `${msg} atualizado com sucesso!`
        });
    }).catch(() => {
        return res.json({
            error: true,
            message: `Erro: Não foi possível atualizar o ${msg}!`
        });
    });
  });

  router.delete("/:numeroPDD", async (req, res) => {
    try {
      const numeroPDD = req.params.numeroPDD;

      const data = await dbType.findByPk(numeroPDD);

      if (!data) {
        return res.status(404).json({
          error: true,
          message: `${msg} não encontrado`,
        });
      }

      await data.destroy();

      const allData = await dbType.findAll();
      io.emit(`${type} data`, allData);

      return res.json({
        success: true,
        message: `${msg} excluído com sucesso`,
      });
    } catch (error) {
      console.error(`Erro ao excluir o ${msg}:`, error);
      return res.status(500).json({
        error: true,
        message: `Erro ao excluir o ${msg}`,
      });
    }
  });
});

module.exports = router;
