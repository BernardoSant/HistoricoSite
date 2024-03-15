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
            message: "Erro: Não foi possível buscar as Imposto!"
        });
    });
});

router.delete('/:id', async (req, res) => {
    try {
      const ImpostosId = req.params.id;
  
      const Impostos = await db.Impostos.findByPk(ImpostosId);
  
      if (!Impostos) {
        return res.status(404).json({
          error: true,
          message: 'Imposto não encontrado',
        });
      }

      await Impostos.destroy();
  
      return res.json({
        success: true,
        message: 'Imposto excluído com sucesso',
      });
    } catch (error) {
      console.error('Erro ao excluir o Imposto:', error);
      return res.status(500).json({
        error: true,
        message: 'Erro ao excluir o Imposto',
      });
    }
  });



module.exports = router;