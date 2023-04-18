const Sequelize = require("sequelize");
const sequelize = new Sequelize("login", "senha", "seu banco", {
  host: "ip",
  dialect: "postgresql",
  schema: "Projeto",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});

sequelize
  .authenticate()
  .then(function () {
    console.log("Conexão bem sucedida!");
  })
  .catch(function () {
    console.log("Conexão falhou!");
  });

module.exports = sequelize;