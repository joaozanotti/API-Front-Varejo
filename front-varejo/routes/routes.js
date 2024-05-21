// Bibliotecas e módulos utilizados
const express = require("express");
const Services = require("../services/services");
const router = express.Router();

// Rota principal
router.get("/", (req, res) => {
  res.send("Seja bem vindo ao nosso sistema de Varejo Virtual.");
});

// Rotas de login
router.get("/login", (req, res) => {
  res.render("usuarios/login");
});

router.post("/login", Services.UsuarioLogin);

// Rotas de cadastro de usuário
router.get("/usuarios/Cadastrar", (req, res) => {
  res.render("usuarios/Cadastrar");
});

router.post("/usuarios/Cadastrar", Services.UsuarioCreate);

// Rota de listagem de usuário
router.get("/usuarios/listar", Services.UsuarioListar);

// Rotas de atualização de usuário
router.get("/usuarios/Atualizar/:id_usuario/:nome/:email/:senha", (req, res) => {
  let usuario = {
    id_usuario: req.params.id_usuario,
    nome: req.params.nome,
    email: req.params.email,
    senha: req.params.senha,
  };
  res.render("usuarios/Atualizar", { usuario });
});

router.post("/usuarios/Update", Services.UsuarioUpdate); 

// Rota de exclusão de usuário
router.post("/usuarios/Delete", Services.UsuarioDelete); 

// Rotas de cadastro de produto
router.get("/produtos/Cadastrar", (req, res) => {
  res.render("produtos/Cadastrar");
});

router.post("/produtos/Cadastrar", Services.ProdutoCreate);

// Rota de listagem de produto
router.get("/produtos/listar", Services.ProdutoListar);

// Rotas de atualização de produto
router.get("/produtos/Atualizar/:id_produto/:nome/:descricao/:preco", (req, res) => {
  let produto = {
    id_produto: req.params.id_produto,
    nome: req.params.nome,
    descricao: req.params.descricao,
    preco: req.params.preco,
    //link: req.params.link,
  };
  res.render("produtos/Atualizar", { produto });
});

router.post("/produtos/Update", Services.ProdutoUpdate); 

// Rota de exclusão de produto
router.post("/produtos/Delete", Services.ProdutoDelete); 

// Rota de adicionar produto ao carrinho
router.get("/carrinho/Adicionar/:id/:nome", Services.CarrinhoAdicionarItem);

// Rota de listar itens do carrinho
router.get("/carrinho/listar", Services.CarrinhoListar);

// Rota de remover item do carrinho
router.get("/carrinho/remover/:item", Services.CarrinhoRemoverItem);

module.exports = router;