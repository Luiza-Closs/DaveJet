const express = require("express");
const router = express.Router();
const escolaModel = require("../models/escolaModel");

router.get("/", async (req, res) => {
  try {
    const escolas = await escolaModel.listarEscolas();
    res.render("addEscola.ejs", { escolas });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar escolas");
  }
});

router.get("/criarEscola", (req, res) => {
  res.render("addEscola.ejs", { addEscola });
});

router.post("/criarEscola", async (req, res) => {
  const { nome, cnpj, senha } = req.body;
  try {
    await escolaModel.criarEscola(nome, cnpj, senha);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar escola");
  }
});

module.exports = router;
