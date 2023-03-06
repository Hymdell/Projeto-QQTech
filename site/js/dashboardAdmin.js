function Sair() {
  window.location.href = "/site/html/index.html";
}

const btnAbrirPopup = document.getElementById("btnAbrirPopup");
const btnFecharPopup = document.getElementById("btnFecharPopup");
const btnFecharPopupConfirmacao = document.getElementById("btnFecharPopupConfirmacao");
const btnFecharPopupNegacao = document.getElementById("btnFecharPopupNegacao");
const btnCadastrar = document.getElementById("btnCadastrar");
const botaoFechar = document.getElementById('fecharPopup');
const popup = document.getElementById("popup");
const confpopup = document.getElementById('confirmacaoPopup');
const negpopup = document.getElementById('negacaoPopup');

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
  confpopup.style.display = "block";
});

botaoFechar.addEventListener('click', () => {
  confpopup.style.display = 'none';
});

btnFecharPopupConfirmacao.addEventListener("click", () => {
  confpopup.style.display = "none";
});

btnFecharPopupNegacao.addEventListener("click", () => {
  confpopup.style.display = "none";
});