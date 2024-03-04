const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data =req.body;

    await db.Kinay.create(data).then((dataKinay) => {
        return res.json({
            error: false,
            message: "Kinay cadastrada com sucesso!",   
            data: dataKinay    
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Kinay não cadastrado com sucesso!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.Kinay.findAll().then((dataKinay) => {
        return res.json({
            error: false,
            data: dataKinay
        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar as Kinay!"
        });
    });
});


router.delete('/:id', async (req, res) => {
    try {
      const KinayId = req.params.id;
  
      const Kinay = await db.Kinay.findByPk(KinayId);
  
      if (!Kinay) {
        return res.status(404).json({
          error: true,
          message: 'Kinay não encontrado',
        });
      }

      await Kinay.destroy();
  
      return res.json({
        success: true,
        message: 'Kinay excluído com sucesso',
      });
    } catch (error) {
      console.error('Erro ao excluir o Kinay:', error);
      return res.status(500).json({
        error: true,
        message: 'Erro ao excluir o Kinay',
      });
    }
  });




module.exports = router;