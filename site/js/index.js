function Cargo() {
  let matricula = document.getElementById("matricula").value;
  if (matricula == "admin") {
    window.location.href = "/site/html/dashboardAdmin.html";
  } else if (matricula == "colaborador") {
    window.location.href = "/site/html/dashboardColaborador.html";
  } else if (matricula == "gestor") {
    window.location.href = "/site/html/dashboardGestor.html";
  } else {
    alert("Matricula Invalida!");
  }
}
