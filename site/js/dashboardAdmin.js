function Sair() {
  window.location.href = "/site/html/index.html";
}

/* INICIO DO JS DO POPUP DE CADASTRAR */
const btnAbrirPopup = document.getElementById("btnAbrirPopup");
const btnFecharPopup = document.getElementById("btnFecharPopup");
const btnCadastrar = document.getElementById("btnCadastrar");
const popup = document.getElementById("popup");

btnAbrirPopup.addEventListener("click", () => {
  popup.style.display = "block";
  popup.classList.add("active");
});

btnFecharPopup.addEventListener("click", () => {
  popup.style.display = "none";
  popup.classList.remove("active");
});

btnCadastrar.addEventListener("click", () => {
  popup.style.display = "none";
  popup.classList.remove("active");
  confpopupcad.style.display = "block";
});

/* INICIO DO JS DOS POPUPS DE CONFIRMAÇÃO E NEGAÇÃO DO CADASTRO */
const btnFecharPopupConfirmacaoCadastro = document.getElementById(
  "btnFecharPopupConfirmacaoCadastrar"
);
const btnFecharPopupNegacaoCadastro = document.getElementById(
  "btnFecharPopupNegacaoCadastrar"
);
const btnOkCadastro = document.getElementById("btnOkCadastrar");
const confpopupcad = document.getElementById("confirmacaoPopupCadastrar");
const negpopupcad = document.getElementById("negacaoPopupCadastrar");

btnFecharPopupConfirmacaoCadastro.addEventListener("click", () => {
  confpopupcad.style.display = "none";
});

btnFecharPopupNegacaoCadastro.addEventListener("click", () => {
  negpopupcad.style.display = "none";
});

btnOkCadastro.addEventListener("click", () => {
  confpopupcad.style.display = "none";
  negpopupedit.style.display = "none";
});

/* INICIO DO JS DO POPUP DE EDITAR */
const btnEditar = document.getElementById("btnEditar");
const btnEditarConcluir = document.getElementById("btnEditarConcluir");
const btnFecharPopupEditar = document.getElementById("btnFecharPopupEditar");
const editpopup = document.getElementById("popup-editar");

btnEditar.addEventListener("click", () => {
  editpopup.style.display = "block";
  editpopup.classList.add("active");
});

btnFecharPopupEditar.addEventListener("click", () => {
  editpopup.style.display = "none";
  editpopup.classList.remove("active");
});

btnEditarConcluir.addEventListener("click", () => {
  editpopup.style.display = "none";
  editpopup.classList.remove("active");
  confpopupedit.style.display = "block";
});

/* INICIO DO JS DOS POPUPS DE CONFIRMAÇÃO E NEGAÇÃO DA EDIÇÃO */
const btnFecharPopupConfirmacaoEditar = document.getElementById(
  "btnFecharPopupConfirmacaoEditar"
);
const btnFecharPopupNegacaoEditar = document.getElementById(
  "btnFecharPopupNegacaoEditar"
);
const btnOkEditar = document.getElementById("btnOkEditar");
const confpopupedit = document.getElementById("confirmacaoPopupEditar");
const negpopupedit = document.getElementById("negacaoPopupEditar");

btnFecharPopupConfirmacaoEditar.addEventListener("click", () => {
  confpopupedit.style.display = "none";
});

btnFecharPopupNegacaoEditar.addEventListener("click", () => {
  negpopupedit.style.display = "none";
});

btnOkEditar.addEventListener("click", () => {
  confpopupedit.style.display = "none";
  negpopupedit.style.display = "none";
});