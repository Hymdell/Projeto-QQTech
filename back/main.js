const express = require("express");
const Sequelize = require("sequelize");
const { Op } = require("sequelize");
const path = require("path");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const app = express();
const Colaboradores = require("./models/Colaboradores");
const SolicitacoesFerias = require("./models/SolicitacoesFerias");
const sequelize = require("./models/db");
const rotas = require("./rotas");
let link;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "front")));
app.use(bodyParser.urlencoded({ extended: true }));
rotas(app);

app.post("/login", async (req, res) => {
  const Matricula = req.body.matricula;
  const Senha = req.body.senha;

  const usuario = await Colaboradores.findOne({
    where: {
      matricula: Matricula,
      senha: Senha,
    },
  });

  if (!usuario) {
    console.log("Usuário não encontrado");
    return res.status(401).send("Usuário ou senha inválidos");
  }

  res.cookie("matricula", Matricula);
  res.cookie("tipo", usuario.tipo);
  res.cookie("gestor", usuario.gestor);
  res.redirect("/verificarStatusColaboradores");
});

app.get("/dashboard", async (req, res) => {
  const matricula = req.cookies.matricula;
  const tipo = req.cookies.tipo;
  if (tipo === "ADMIN") {
    res.sendFile(path.join(__dirname, "front/html/dashboardAdmin.html"));
  } else if (tipo === "COLABORADOR") {
    res.sendFile(path.join(__dirname, "front/html/dashboardColaborador.html"));
  } else if (tipo === "GESTOR") {
    res.sendFile(path.join(__dirname, "front/html/dashboardGestor.html"));
  } else {
    console.log("ERRO" + tipo + matricula);
  }
});

app.post("/admin", async (req, res) => {
  const TipoPopup = req.body.tipopopup;
  const Matricula = req.body.matricula;
  const Nome = req.body.nome;
  const EmailQQ = req.body.email;
  const Gmail = req.body.gmail;
  const Senha = "1234";
  const Contrato = req.body.contrato;
  const Funcao = req.body.cargodropdown;
  const Tipo = req.body.tipo;
  const DataIngresso = req.body.dataingresso;
  const Gestor = req.body.gestordropdown;
  const Status = "ATIVO";
  if (TipoPopup == "CADASTRO") {
    try {
      const colaborador = await Colaboradores.create({
        matricula: Matricula,
        nome: Nome,
        emailqq: EmailQQ,
        gmail: Gmail,
        senha: Senha,
        contrato: Contrato,
        funcao: Funcao,
        tipo: Tipo,
        dataingresso: DataIngresso,
        gestor: Gestor,
        status: Status,
      });
      res.status(201).redirect("/dashboard");
    } catch (error) {
      console.error(error);
      res.status(500).redirect("/dashboard");
    }
  } else if (tipopoup == "EDITAR") {
    console.log("EDITADO");
  }
});

app.post("/solicitarColaborador", async (req, res) => {
  const Matricula = req.cookies.matricula;
  const Tipo = req.cookies.tipo;
  const dataAtual = new Date();
  const DataCriacao =
    dataAtual.toISOString().split("T")[0] +
    " " +
    dataAtual.toLocaleTimeString();
  const DataInicio = req.body.datainicio;
  const Dias = req.body.dias;
  const DataFinal = req.body.datafinal;
  const Status = "PENDENTE";
  const Mensagem = "";
  const Lido = false;
  let DecimoTerceiro = req.body.decimoterceiro;
  if (DecimoTerceiro == "SIM") {
    DecimoTerceiro = true;
  } else {
    DecimoTerceiro = false;
  }
  const data = {
    data_inicio: DataInicio,
    dias: Dias,
    data_final: DataFinal,
    matricula: Matricula,
  };
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/envioNotificacao",
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  try {
    const solicitacao = await SolicitacoesFerias.create({
      colaborador: Matricula,
      datacriacao: DataCriacao,
      datainicio: DataInicio,
      dias: Dias,
      datafinal: DataFinal,
      status: Status,
      mensagem: Mensagem,
      lido: Lido,
      decimoterceiro: DecimoTerceiro,
    });
    res.status(201).redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/dashboard");
  }
});

app.post("/solicitarGestor", async (req, res) => {
  const Matricula = req.cookies.matricula;
  const Tipo = req.cookies.tipo;
  const dataAtual = new Date();
  const DataCriacao =
    dataAtual.toISOString().split("T")[0] +
    " " +
    dataAtual.toLocaleTimeString();
  const DataInicio = req.body.datainicio;
  const Dias = req.body.dias;
  const DataFinal = req.body.datafinal;
  const Status = "PENDENTE";
  const Mensagem = "";
  const Lido = false;
  let DecimoTerceiro = req.body.decimoterceiro;
  if (DecimoTerceiro == "SIM") {
    DecimoTerceiro = true;
  } else {
    DecimoTerceiro = false;
  }
  const data = {
    data_inicio: DataInicio,
    dias: Dias,
    data_final: DataFinal,
    matricula: Matricula,
  };
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/envioNotificacao",
      data
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  try {
    const solicitacao = await SolicitacoesFerias.create({
      colaborador: Matricula,
      datacriacao: DataCriacao,
      datainicio: DataInicio,
      dias: Dias,
      datafinal: DataFinal,
      status: Status,
      mensagem: Mensagem,
      lido: Lido,
      decimoterceiro: DecimoTerceiro,
    });
    res.status(201).redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(500).redirect("/dashboard");
  }
});

app.post("/atualizaLido", async (req, res) => {
  const idSolicitacaoNoti = req.body.idSolicitacaoNoti;
    try {
      const solicitacao = await SolicitacoesFerias.findByPk(idSolicitacaoNoti);
      if (solicitacao) {
        if (solicitacao.status == "APROVADO" || solicitacao.status == "NEGADO") {
          solicitacao.lido = true;
          await solicitacao.save();
        }
        res.status(200).redirect("/dashboard");
      } else {
        res.status(404).redirect("/dashboard");
      }
    } catch (error) {
      console.log(error);
      res.status(500).redirect("/dashboard");
    }
});

app.post("/atualizarStatus", async (req, res) => {
  const { idSolicitacao, mensagemGestor, statusAtualizado } = req.body;
  try {
    const solicitacao = await SolicitacoesFerias.findByPk(idSolicitacao);
    if (solicitacao) {
      solicitacao.mensagem = mensagemGestor;
      solicitacao.status = statusAtualizado;
      await solicitacao.save();
      res.status(200).redirect("/dashboard");
    } else {
      res.status(404).redirect("/dashboard");
    }
  } catch (error) {
    console.log(error);
    res.status(500).redirect("/dashboard");
  }
});

app.post("/logout", async (req, res) => {
  res.clearCookie();
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front/html/index.html"));
});

app.get("/colaboradores", async (req, res) => {
  const colaboradores = await Colaboradores.findAll();
  res.json(colaboradores);
});

app.get("/colaborador", async (req, res) => {
  const Matricula = req.cookies.matricula;
  const usuario = await Colaboradores.findOne({
    where: {
      matricula: Matricula,
    },
  });
  res.json(usuario);
});

app.get("/gestores", async (req, res) => {
  const usuario = await Colaboradores.findAll({
    where: {
      tipo: "GESTOR",
    },
  });
  res.json(usuario);
});

app.get("/solicitacoesTodas", async (req, res) => {
  const Matricula = req.cookies.matricula;
  const solicitacoes = await SolicitacoesFerias.findAll({
    include: [
      {
        model: Colaboradores,
        as: "colaboradore",
        include: [
          {
            model: Colaboradores,
            as: "Gestor",
            where: { gestor: Matricula },
          },
        ],
      },
    ],
    where: { colaborador: { [Op.ne]: Matricula } },
  });
  res.json(solicitacoes);
});

app.get("/solicitacoesMinhas", async (req, res) => {
  const matricula = req.cookies.matricula;
  const solicitacoes = await SolicitacoesFerias.findAll({
    where: {
      colaborador: { [Op.eq]: matricula },
    },
  });
  res.json(solicitacoes);
});

app.get("/solicitacaoMinhaUltima", async (req, res) => {
  const matricula = req.cookies.matricula;
  const solicitacoes = await SolicitacoesFerias.findAll({
    where: {
      colaborador: { [Op.eq]: matricula },
      lido: { [Op.eq]: false },
    },
    order: [["datacriacao", "DESC"]],
    limit: 1,
  });
  const ultimaSolicitacao = solicitacoes[0];
  if (ultimaSolicitacao) {
    const dataAtual = new Date();
    const dataInicioFerias = new Date(ultimaSolicitacao.datainicio);
    const dataFinalFerias = new Date(ultimaSolicitacao.datafinal);
    let status = "ATIVO";
    if (dataAtual >= dataInicioFerias && dataAtual <= dataFinalFerias) {
      status = "FERIAS";
    }
    await Colaboradores.update(
      { status: status },
      { where: { matricula: matricula } }
    );
    res.json(ultimaSolicitacao);
  } else {
    res.json(false);
  }
});

app.get("/solicitacaoUltimaAprovada", async (req, res) => {
  const matricula = req.cookies.matricula;
  const solicitacoes = await SolicitacoesFerias.findAll({
    where: {
      colaborador: { [Op.eq]: matricula },
      status: { [Op.eq]: "APROVADO" },
    },
    order: [["datafinal", "DESC"]],
    limit: 1,
  });
  const ultimaSolicitacao = solicitacoes[0];
  if (ultimaSolicitacao) {
    res.json(ultimaSolicitacao);
  } else {
    res.json(false);
  }
});

app.get("/equipe", async (req, res) => {
  const Matricula = req.cookies.matricula;
  const colaboradores = await Colaboradores.findAll({
    where: {
      [Op.or]: [
        { gestor: Matricula },
        { matricula: Matricula }
      ]
    }
  });
  res.json(colaboradores);
});

app.get("/equipeMinha", async (req, res) => {
  const Matricula = req.cookies.gestor;
  const colaboradores = await Colaboradores.findAll({
    where: {
      [Op.or]: [
        { gestor: Matricula },
        { matricula: Matricula }
      ]
    }
  });
  res.json(colaboradores);
});

app.get("/verificarStatusColaboradores", async (req, res) => {
  try {
    const colaboradores = await Colaboradores.findAll();
    for (const colaborador of colaboradores) {
      const solicitacoes = await SolicitacoesFerias.findAll({
        where: { colaborador: colaborador.matricula },
        order: [["datainicio", "ASC"]],
      });
      const umAnoDepois = new Date(colaborador.dataingresso);
      umAnoDepois.setFullYear(umAnoDepois.getFullYear() + 1);
      const agora = new Date();
      if (agora >= umAnoDepois) {
        const umAnoDepoisSolicitacoes = solicitacoes.filter(
          (solicitacao) =>
            new Date(solicitacao.datainicio) >= umAnoDepois &&
            new Date(solicitacao.datafinal) <= agora
        );
        if (umAnoDepoisSolicitacoes.length === 0) {
          await Colaboradores.update(
            { status: "ATRASO" },
            { where: { matricula: colaborador.matricula } }
          );
        }
      }
    }
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Erro ao verificar status dos colaboradores:", error);
    res.redirect("/dashboard");
  }
});

app.post("/relatorioEquipe", async (req, res) => {
  const Matricula = req.cookies.matricula;
  const colaboradores = await Colaboradores.findAll({
    where: {
      [Op.or]: [{ matricula: Matricula }, { gestor: Matricula }],
    },
  });

  try {
    const response = await axios.post("http://127.0.0.1:8000/relatorioEquipePy", colaboradores);
    console.log(response.data);
    link = response.data.download_link;
  } catch (error) {
    console.error(error);
  }
  res.redirect("/dashboard");
});

app.post("/relatorioMinhas", async (req, res) => {
  const Matricula = req.cookies.matricula;
  const solicitacoes = await SolicitacoesFerias.findAll({
    where: {
      colaborador: { [Op.eq]: Matricula },
    },
  });
  try {
    const response = await axios.post("http://127.0.0.1:8000/relatorioMinhasPy", solicitacoes);
    console.log(response.data);
    link = response.data.download_link;
  } catch (error) {
    console.error(error);
  }
  res.redirect("/dashboard");
});

app.post("/relatorioTodas", async (req, res) => {
  const Matricula = req.cookies.matricula;
  const solicitacoes = await SolicitacoesFerias.findAll({
    include: [
      {
        model: Colaboradores,
        as: "colaboradore",
        include: [
          {
            model: Colaboradores,
            as: "Gestor",
            where: { gestor: Matricula },
          },
        ],
      },
    ],
    where: { colaborador: { [Op.ne]: Matricula } },
  });
  try {
    const response = await axios.post("http://127.0.0.1:8000/relatorioTodasPy", solicitacoes);
    console.log(response.data);
    link = response.data.download_link;
  } catch (error) {
    console.error(error);
  }
  res.redirect("/dashboard");
});

app.get("/downloadRelatorio", async (req, res) => {
  if (!link) {
    res.status(404);
    return;
  }
  res.send(link);
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
