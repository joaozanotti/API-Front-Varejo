// Bibliotecas e módulos utilizados
const axios = require("axios");
const endereco = "https://58c385a6-5b24-4872-8b0e-d9cb58c1deef-00-3el4p3lhk5ouv.picard.replit.dev/";

module.exports = class Services {
  // Verificar o usuário
  static async UsuarioLogin(req, res) {
    let valores = req.body;
    const options = {
      url: endereco + "login",
      method: "POST",
      data: valores,
    };
    axios(options).then((usuario) => {
      if (usuario != undefined) {
        return res.render("logado");
      }
    });
  }

  // Create de usuário
  static async UsuarioCreate(req, res) {
    let valores = req.body;
    const options = {
      url: endereco + "add_usuario",
      method: "POST",
      data: valores,
    };
    axios(options);
    const mensagem = "Usuário cadastrado com sucesso!";
    res.render("mensagem", { mensagem });
  }

  // Listar usuários
  static async UsuarioListar(req, res) {
    const options = {
      url: endereco + "usuarios",
      method: "GET",
      data: {},
    };
    axios(options).then((response) => {
      console.log(response.data);
      const usuario = response.data;
      res.render("usuarios/listar", { usuario });
    });
  }

  // Update de usuário
  static async UsuarioUpdate(req, res) {
    let valores = req.body;
    const options = {
      url: endereco + "usuarios/" + valores.id_usuario,
      method: "PUT",
      data: valores,
    };
    axios(options);
    const mensagem = "Usuário atualizado com sucesso!";
    res.render("mensagem", { mensagem });
  }

  // Delete de usuário
  static async UsuarioDelete(req, res) {
    let id_usuario = req.body.id_usuario;
    const options = {
      url: endereco + "usuarios/" + id_usuario,
      method: "DELETE",
    };
    axios(options);
    const mensagem = "Usuário excluído com sucesso!";
    res.render("mensagem", { mensagem });
  }

  // Create de produto
  static async ProdutoCreate(req, res) {
    let valores = req.body;
    const options = {
      url: endereco + "add_produto",
      method: "POST",
      data: valores,
    };
    axios(options);
    const mensagem = "Produto cadastrado com sucesso!";
    res.render("mensagem", { mensagem });
  }

  // Listar produtos
  static async ProdutoListar(req, res) {
    const options = {
      url: endereco + "produtos",
      method: "GET",
      data: {},
    };
    axios(options).then((response) => {
      console.log(response.data);
      const produto = response.data;
      res.render("produtos/listar", { produto });
    });
  }

  // Update de produto
  static async ProdutoUpdate(req, res) {
    let valores = req.body;
    const options = {
      url: endereco + "produtos/" + valores.id_produto,
      method: "PUT",
      data: valores,
    };
    axios(options);
    const mensagem = "Produto atualizado com sucesso!";
    res.render("mensagem", { mensagem });
  }

  // Delete de produto
  static async ProdutoDelete(req, res) {
    let id_produto = req.body.id_produto;
    const options = {
      url: endereco + "produtos/" + id_produto,
      method: "DELETE",
    };
    axios(options);
    const mensagem = "Produto excluído com sucesso!";
    res.render("mensagem", { mensagem });
  }

  // Adicionar produto ao carrinho
  static async CarrinhoAdicionarItem(req, res) {
    const item = {
      id: req.params.id,
      nome: req.params.nome,
    };
    if (req.cookies.carrinho) {
      // Se já existe, adiciona o novo item
      const carrinho = JSON.parse(req.cookies.carrinho);
      carrinho.push(item);
      res.cookie("carrinho", JSON.stringify(carrinho), {
        maxAge: 900000,
        httpOnly: true,
      });
    } else {
      // Se não existe, cria um novo carrinho com o item
      const carrinho = [item];
      res.cookie("carrinho", JSON.stringify(carrinho), {
        maxAge: 900000,
        httpOnly: true,
      });
    }
    const mensagem = "Item adicionado ao carrinho!";
    res.render("mensagem", { mensagem });
  }
  
  // Remover produto do carrinho
  static async CarrinhoRemoverItem(req, res) {
    const itemDeletar = req.params.item;
    let mensagem;
    // Verificando se existe um cookie para o carrinho
    if (req.cookies.carrinho) {
      // Obtendo o carrinho atual do cookie
      let carrinho = JSON.parse(req.cookies.carrinho);

      // Removendo o item do carrinho, se existir
      carrinho = carrinho.filter((item) => item.id !== itemDeletar);
      // Atualizando o cookie com o carrinho modificado
      res.cookie("carrinho", JSON.stringify(carrinho), {
        maxAge: 900000,
        httpOnly: true,
      });

      mensagem = "Item removido do carrinho!";
    } else {
       mensagem = "Carrinho vazio!";
    }
    res.render("mensagem", { mensagem });
  }

  // Listar produtos do carrinho
  static async CarrinhoListar(req, res) {
    let mensagem;
    // Rota para exibir o carrinho
    if (req.cookies.carrinho) {
      const carrinho = JSON.parse(req.cookies.carrinho);
      if (carrinho.length > 0) {
        res.render("carrinhos/listar", { carrinho });
      } else {
        mensagem = "Carrinho vazio!";
      } 
    } else {
      mensagem = "Carrinho vazio!";
    }
    res.render("mensagem", { mensagem });
  }
};
