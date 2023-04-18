const path = require("path");

//ROTAS DOS ARQUIVOS JS, CSS e Imagens
function routes(app) {
  //CSS
  app.get("/front/css/dashboardAdminStyle.css", (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "front/css/dashboardAdminStyle.css"));
  });

  app.get("/front/css/dashboardColaboradorStyle.css", (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(
      path.join(__dirname, "front/css/dashboardColaboradorStyle.css")
    );
  });

  app.get("/front/css/dashboardGestorStyle.css", (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "front/css/dashboardGestorStyle.css"));
  });

  app.get("/front/css/globalStyle.css", (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "front/css/globalStyle.css"));
  });

  app.get("/front/css/indexStyle.css", (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "front/css/indexStyle.css"));
  });

  app.get("/front/css/popupsAdmin.css", (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "front/css/popupsAdmin.css"));
  });

  app.get("/front/css/popupsColaborador.css", (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "front/css/popupsColaborador.css"));
  });

  app.get("/front/css/popupsGestor.css", (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "front/css/popupsGestor.css"));
  });

  //JS
  app.get("https://cdn.jsdelivr.net/npm/chart.js", (req, res) => {
    res.set("Content-Type", "text/css");
    res.sendFile(path.join(__dirname, "https://cdn.jsdelivr.net/npm/chart.js"));
  });

  app.get("/front/js/dashboardAdmin.js", (req, res) => {
    res.set("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "front/js/dashboardAdmin.js"));
  });

  app.get("/front/js/dashboardColaborador.js", (req, res) => {
    res.set("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "front/js/dashboardColaborador.js"));
  });

  app.get("/front/js/dashboardGestor.js", (req, res) => {
    res.set("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "front/js/dashboardGestor.js"));
  });

  app.get("/front/js/index.js", (req, res) => {
    res.set("Content-Type", "text/javascript");
    res.sendFile(path.join(__dirname, "front/js/index.js"));
  });

  //IMAGENS
  app.get("/front/img/bell-solid.svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.sendFile(path.join(__dirname, "front/img/bell-solid.svg"));
  });

  app.get("/front/img/envelope-solid.svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.sendFile(path.join(__dirname, "front/img/envelope-solid.svg"));
  });

  app.get("/front/img/id-card-solid.svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.sendFile(path.join(__dirname, "front/img/id-card-solid.svg"));
  });

  app.get("/front/img/key-solid.svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.sendFile(path.join(__dirname, "front/img/key-solid.svg"));
  });

  app.get("/front/img/Logo_QueroQuero.png", (req, res) => {
    res.set("Content-Type", "image/png");
    res.sendFile(path.join(__dirname, "front/img/Logo_QueroQuero.png"));
  });

  app.get("/front/img/Logo_VerdeCard.png", (req, res) => {
    res.set("Content-Type", "image/png");
    res.sendFile(path.join(__dirname, "front/img/Logo_VerdeCard.png"));
  });

  app.get("/front/img/plus-solid.svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.sendFile(path.join(__dirname, "front/img/plus-solid.svg"));
  });

  app.get("/front/img/right-from-bracket-solid.svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.sendFile(
      path.join(__dirname, "front/img/right-from-bracket-solid.svg")
    );
  });

  app.get("/front/img/user-solid.svg", (req, res) => {
    res.set("Content-Type", "image/svg+xml");
    res.sendFile(path.join(__dirname, "front/img/user-solid.svg"));
  });
  console.log("Rotas estéticas iniciadas com sucesso!");
}
module.exports = routes;
