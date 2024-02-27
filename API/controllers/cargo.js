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

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    await db.nota.update(data, {
        where: { id: id }
    }).then(() => {
        return res.json({
            error: false,
            message: "Cargo atualizado com sucesso!"
        });
    }).catch(() => {
        return res.json({
            error: true,
            message: "Erro: Não foi possível atualizar o Cargo!"
        });
    });
});

router.delete('/:id', async (req, res) => {
    try {
      const cargoId = req.params.id;
  
      // Encontre o cargo pelo ID
      const cargo = await db.Cargo.findByPk(cargoId);
  
      if (!cargo) {
        return res.status(404).json({
          error: true,
          message: 'Cargo não encontrado',
        });
      }
  
      // Exclua o cargo
      await cargo.destroy();
  
      return res.json({
        success: true,
        message: 'Cargo excluído com sucesso',
      });
    } catch (error) {
      console.error('Erro ao excluir o cargo:', error);
      return res.status(500).json({
        error: true,
        message: 'Erro ao excluir o cargo',
      });
    }
  });


module.exports = router;