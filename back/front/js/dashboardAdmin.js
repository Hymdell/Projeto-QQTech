fetch("/colaboradores")
  .then((response) => response.json())
  .then((colaboradores) => {
    const tabelaCorpo = document.getElementById("tabela-usuarios");
    colaboradores.forEach((colaborador, index) => {
      const linha = document.createElement("tr");
      linha.innerHTML = `
          <td>${colaborador.nome}</td>
          <td>${colaborador.matricula}</td>
          <td>${colaborador.emailqq}</td>
          <td>${colaborador.gmail}</td>
          <td>${colaborador.contrato}</td>
          <td>${colaborador.funcao}</td>
          <td>${colaborador.dataingresso}</td>
          <td>${colaborador.gestor}</td>
        `;
      tabelaCorpo.appendChild(linha);
    });
  });

fetch("/colaborador")
  .then((response) => response.json())
  .then((colaborador) => {
    const decimo = document.getElementById("decimoterceiro");
    const nome = document.getElementById("nomeAdmin");
    const matricula = document.getElementById("matriculaAdmin");
    const cargo = document.getElementById("cargoAdmin");
    const gestor = document.getElementById("gestorAdmin");
    nome.innerHTML = "Nome: " + colaborador.nome;
    matricula.innerHTML = "Matrícula:: " + colaborador.matricula;
    cargo.innerHTML = "Cargo: " + colaborador.funcao;
    gestor.innerHTML = "Gestor: " + colaborador.gestor;
    if (colaborador.contrato === "CLT") {
      decimo.setAttribute("disabled", false);
    } else if (colaborador.contrato === "PJ") {
      decimo.setAttribute("disabled", true);
    }
  });

  fetch('/gestores')
    .then(response => response.json())
    .then(data => {
      const dropdown = document.getElementById('gestordropdown');
      data.forEach(gestor => {
        const option = document.createElement('option');
        option.value = gestor.matricula;
        option.text = gestor.nome;
        dropdown.appendChild(option);
      });
    })
    .catch(error => console.error(error));

/* INICIO DO JS DO POPUP DINÂMICO */
const FecharPopupDinamico = document.getElementById("btnFecharPopupDinamico");
const btnOk = document.getElementById("btnOk");
const popupDinamico = document.getElementById("popupDinamico");

FecharPopupDinamico.addEventListener("click", () => {
  popupDinamico.style.display = "none";
});

btnOk.addEventListener("click", () => {
  popupDinamico.style.display = "none";
});

/* INICIO DO JS DO POPUP DE CADASTRAR */
const btnAbrirPopup = document.getElementById("btnAbrirPopup");
const btnFecharPopup = document.getElementById("btnFecharPopup");
const btnCadastrar = document.getElementById("btnCadastrar");
const popup = document.getElementById("popup");
var titulopopup = document.getElementById("titulo-popup");
var tipopopup = document.getElementById("tipopopup");

btnAbrirPopup.addEventListener("click", () => {
  popup.style.display = "block";
  popup.classList.add("active");
  titulopopup.innerHTML = "CADASTRO";
  tipopopup.value = "CADASTRO";
});

btnFecharPopup.addEventListener("click", () => {
  popup.style.display = "none";
  popup.classList.remove("active");
});

/* INICIO DO JS DO POPUP DE CONFIRMAÇÃO DE EXCLUSÃO */
const btnSimExcluir = document.getElementById("btnSimExcluir");
const btnNaoExcluir = document.getElementById("btnNaoExcluir");
const btnFecharPopupExcluir = document.getElementById("btnFecharPopupExcluir");
const btnOkExcluir = document.getElementById("btnOkExcluir");
const popupexcluir = document.getElementById("PopupExcluir");

btnFecharPopupExcluir.addEventListener("click", () => {
  popupexcluir.style.display = "none";
  popupexcluir.classList.remove("active");
});

btnSimExcluir.addEventListener("click", () => {
  popupexcluir.style.display = "none";
  popupexcluir.classList.remove("active");
  popupDinamico.style.display = "block";
  if (1 == 1) {
    document.getElementById("textoDinamico").innerHTML =
      "Colaborador excluído com sucesso!";
  } else {
    document.getElementById("textoDinamico").innerHTML =
      "Colaborador não foi excluído!";
  }
});

btnNaoExcluir.addEventListener("click", () => {
  popupexcluir.style.display = "none";
  popupexcluir.classList.remove("active");
});
