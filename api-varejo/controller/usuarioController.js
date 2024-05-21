// Bibliotecas e módulos utilizados
const Usuario = require("../model/usuarioModel");
const jwt = require("jsonwebtoken");

module.exports = class usuarioController {
  // Create
  static async UsuarioCreate(req, res) {
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
    };
    await Usuario.create(usuario);
    res.json({ message: "Usuário cadastrado com sucesso!" });
  }
  
  // Read
  static async UsuarioListar(req, res) {
    const id_usuario = req.params.id;
    if (id_usuario) {
      const usuario = await Usuario.findOne({
        where: { id_usuario: id_usuario },
      });
      res.json(usuario);
    } else {
      const usuario = await Usuario.findAll({ raw: true });
      res.json(usuario);
    }
  }
  
  // Update
  static async UsuarioUpdate(req, res) {
    const id_usuario = req.params.id;
    let nome = req.body.nome;
    let email = req.body.email;
    let senha = req.body.senha;
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
    };
    await Usuario.update(usuario, { where: { id_usuario: id_usuario } });
    res.json({
      message:
        "Cadastro atualizado com sucesso! Foram atualizados as sequintes informações: ",
      dados: usuario,
    });
  }
  
  // Delete
  static async UsuarioDelete(req, res) {
    const id_usuario = req.params.id;
    await Usuario.destroy({ where: { id_usuario: id_usuario } });
    res.json({ message: "Usuário excluído com sucesso!" });
  }

  // Verificar login
  static async UsuarioVerificaLogin(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;
    const dados = {
      email: email,
      senha: senha,
    };
    const usuario = await Usuario.findOne({
      where: { email: email, senha: senha },
    }).then((usuario) => {
      if (usuario != undefined) {
        const id = usuario.id_usuario;
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 300,
        });
        return res.json({ auth: true, token: token }); 
      } else {
        res.status(402).json({ message: "Erro ao logar no sistema." });
      }
    });
  }
  
  // Verificar token JWT
  static async verificaJWT(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token)
      return res.status(401).json({
        auth: false,
        message: "Nenhum token criado.",
      });
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err)
        return res.status(500).json({
          auth: false,
          message: "Falha na autenticação com o token.",
        });

      req.userId = decoded.id;
      next();
    });
  }
};
