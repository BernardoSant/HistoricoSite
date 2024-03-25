const express = require("express");
const db = require("../db/models");
const router = express.Router();

router.post("/", async (req, res) => {
    var data =req.body;

    await db.Ferias.create(data).then((dataFerias) => {
        return res.json({
            error: false,
            message: "Ferias cadastrada com sucesso!",   
            data: dataFerias    
        });
    }).catch(() => {
        return res.json({
            error: false,
            message: "Erro: Ferias não cadastrada com sucesso!"
        });
    }); 
})

router.get("/", async (req, res) => {
    await db.Ferias.findAll().then((dataFerias) => {
        return res.json({
            error: false,
            data: dataFerias
        });
    }).catch(() => {
        return res.status(500).json({
            error: true,
            message: "Erro: Não foi possível buscar as Ferias!"
        });
    });
});

router.delete('/:idFuncionario', async (req, res) => {
  try {
    const idFuncionario = req.params.idFuncionario;

    const numDestroyed = await db.Ferias.destroy({
      where: { idFuncionario: idFuncionario }
    });

    if (numDestroyed === 0) {
      return res.status(404).json({
        error: true,
        message: 'Ferias não encontrado',
      });
    }

    return res.json({
      success: true,
      message: `Ferias excluído com sucesso. ${numDestroyed} registro(s) excluído(s).`,
    });
  } catch (error) {
    console.error('Erro ao excluir o Ferias:', error);
    return res.status(500).json({
      error: true,
      message: 'Erro ao excluir o Ferias',
    });
  }
});



module.exports = router;