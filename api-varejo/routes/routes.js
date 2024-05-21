// Bibliotecas e módulos utilizados
const express = require("express");
const router = express.Router();

// Controllers
const usuarioController = require("../controller/usuarioController");
const produtoController = require("../controller/produtoController");

// Rota principal
router.get("/", (req, res) => {
  return res.json({ message: "Sistema de Varejo" });
})

// Rotas do usuário

// POST - Cadastrar
router.post("/add_usuario", usuarioController.UsuarioCreate);

// GET - Listar
router.get("/usuarios/:id?", usuarioController.UsuarioListar);

// PUT - Atualizar 
router.put("/usuarios/:id", usuarioController.UsuarioUpdate);

// DELETE - Excluir
router.delete("/usuarios/:id", usuarioController.UsuarioDelete);

// POST - Login
router.post("/login", usuarioController.UsuarioVerificaLogin);

// Rotas do produto

// POST - Cadastrar
router.post("/add_produto", produtoController.produtoCreate); 

// GET - Listar
router.get("/produtos/:id?", produtoController.ProdutoListar);

// PUT - Atualizar 
router.put("/produtos/:id", produtoController.ProdutoUpdate);

// DELETE - Excluir
router.delete("/produtos/:id", produtoController.ProdutoDelete);

module.exports = router; 