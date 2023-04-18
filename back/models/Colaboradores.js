const Sequelize = require("sequelize");
const database = require("./db");

const Colaboradores = database.define(
  "colaboradores",
  {
    matricula: {
      type: Sequelize.STRING(6),
      autoincrement: false,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    emailqq: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    gmail: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    senha: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    contrato: {
      type: Sequelize.STRING(3),
      allowNull: false,
    },
    funcao: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    tipo: {
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    dataingresso: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    gestor: {
      type: Sequelize.STRING(6),
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING(6),
      allowNull: false,
    },
  },
  {
    tablename: "colaboradores",
  }
);

Colaboradores.belongsTo(Colaboradores, {
  as: "Gestor",
  foreignKey: {
    name: "gestor",
    allowNull: true,
  },
});

module.exports = Colaboradores;
