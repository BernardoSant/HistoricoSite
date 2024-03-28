const express = require("express");
const db = require("../db/models");
const { io } = require("../app.js");
const router = express.Router();

const dataTypes = [
  {
    type: "empresa",
    dbType: db.Empresa,
    msg: "Empresa",
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
});

module.exports = router;
