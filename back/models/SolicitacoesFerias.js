const Sequelize = require("sequelize");
const database = require("./db");
const Colaboradores = require("./Colaboradores");

const SolicitacoesFerias = database.define(
  "solicitacoesferias",
  {
    colaborador: {
      type: Sequelize.STRING(6),
      allowNull: false,
      references: {
        model: Colaboradores,
        key: "matricula",
      },
    },
    datacriacao: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    datainicio: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    dias: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    datafinal: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING(8),
      allowNull: false,
    },
    mensagem: {
      type: Sequelize.STRING(255),
      allowNull: false,
    },
    lido: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    decimoterceiro: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tablename: "solicitacoesferias",
  }
);

SolicitacoesFerias.belongsTo(Colaboradores, { foreignKey: "colaborador" });

module.exports = SolicitacoesFerias;
