function Cargo() {
  let matricula = document.getElementById("matricula").value;
  let mensagemErro = document.getElementById("mensagemErro");

  if (matricula == "admin") {
    window.location.href = "/site/html/dashboardAdmin.html";
  } else if (matricula == "colaborador") {
    window.location.href = "/site/html/dashboardColaborador.html";
  } else if (matricula == "gestor") {
    window.location.href = "/site/html/dashboardGestor.html";
  } else {
    mensagemErro.innerHTML = "Matrícula Inválida!";
    document.getElementById("mensagemErro").classList.add("mensagemErro");
  }
}

