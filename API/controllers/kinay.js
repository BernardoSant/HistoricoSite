const express = require("express");
const db = require("../db/models");
const { io } = require("../app.js");
const router = express.Router();

const dataTypes = [
  {
    type: "kinay",
    dbType: db.Kinay,
    msg: "Kinay",
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

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
      await dbType.update(data, {
        where: { id: id },
      });
      const allData = await dbType.findAll();
      io.emit(`${type} data`, allData);
      return res.json({
        error: false,
        message: `${msg} atualizado com sucesso!!`,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: `ERRO: Não foi possível atualizar o ${msg}!`,
      });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;

      const data = await dbType.findByPk(id);

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
