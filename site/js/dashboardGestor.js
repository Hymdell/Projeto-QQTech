function Sair() {
  window.location.href = "/site/html/index.html";
}

/* INICIO DO JS DO POPUP DE SOLICITAÇÃO */
const btnAbrirPopup = document.getElementById("btnAbrirPopup");
const btnFecharPopup = document.getElementById("btnFecharPopup");
const btnSolicitar = document.getElementById("btnSolicitar");
const popup = document.getElementById("popup");

btnAbrirPopup.addEventListener("click", () => {
  popup.style.display = "block";
  popup.classList.add("active");
});

btnFecharPopup.addEventListener("click", () => {
  popup.style.display = "none";
  popup.classList.remove("active");
});

btnSolicitar.addEventListener("click", () => {
  popup.style.display = "none";
  popup.classList.remove("active");
  confpopupsoli.style.display = "block";
});

/* INICIO DO JS DOS POPUPS DE CONFIRMAÇÃO E NEGAÇÃO DA SOLICITAÇÃO */
const btnFecharPopupConfirmacaoCadastro = document.getElementById(
  "btnFecharPopupConfirmacaoSolicitar"
);
const btnFecharPopupNegacaoCadastro = document.getElementById(
  "btnFecharPopupNegacaoSolicitar"
);
const btnOk = document.getElementById("btnOk");
const confpopupsoli = document.getElementById("confirmacaoPopupSolicitar");
const negpopupsoli = document.getElementById("negacaoPopupSolicitar");

btnFecharPopupConfirmacaoSolicitar.addEventListener("click", () => {
  confpopupsoli.style.display = "none";
});

btnFecharPopupNegacaoSolicitar.addEventListener("click", () => {
  negpopupsoli.style.display = "none";
});

btnOk.addEventListener("click", () => {
  confpopupsoli.style.display = "none";
  negpopupsoli.style.display = "none";
});

const dropdown = document.querySelector("#dias-dropdown");
const dataInicioInput = document.querySelector("#data-inicio");
const dataFinalInput = document.querySelector("#data-final");

dropdown.addEventListener("change", atualizaDataFinal);

dataInicioInput.addEventListener("change", atualizaDataFinal);

function atualizaDataFinal() {
  const dataInicio = new Date(dataInicioInput.value);
  const dias = parseInt(dropdown.value);
  const dataFinal = new Date(dataInicio);

  dataFinal.setDate(dataInicio.getDate() + dias);
  const dataFinalFormatada = dataFinal.toISOString().split("T")[0];
  dataFinalInput.value = dataFinalFormatada;
}

//INICIO DO JS DO GRÁFICO DE COLABORADORES
var ctx = document.getElementById('graficoColaboradores').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    datasets: [{
      data: [15, 5],
      backgroundColor: ['#099A56', 'orange'],
      borderColor: ['#000', '#000'],
      borderWidth: 2
    }]
  },
  options: {
    legend: {
      display: true
    },
  }
});

//INICIO DO JS DO GRÁFICO DE SOLICITACOES
var ctx = document.getElementById('graficoSolicitacoes').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [5, 3, 2],
      backgroundColor: ['#099A56', 'orange', 'red'],
      borderColor: ['#000', '#000', '#000'],
      borderWidth: 2
    }]
  },
  options: {
    legend: {
      display: true
    }
  }
});
