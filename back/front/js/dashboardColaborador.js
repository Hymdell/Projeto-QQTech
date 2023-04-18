fetch("/solicitacoesMinhas")
  .then((response) => response.json())
  .then((minhassolicitacoes) => {
    const tabelaCorpo = document.getElementById("tabela-solicitacoes");
    const mensagemaquisitivo = document.getElementById("mensagem-aquisitivo");
    const mensagem15dias = document.getElementById("mensagem-15dias");

    let totalDiasFerias = 0; 
    let numFerias15Dias = 0; 

    minhassolicitacoes.forEach((solicitacao, index) => {
      const dataCriacao = new Date(solicitacao.datacriacao).toLocaleString(
        "pt-BR",
        { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" }
      );
      const dataInicio = new Date(solicitacao.datainicio).toLocaleString(
        "pt-BR",
        { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" }
      );
      const dataFinal = new Date(solicitacao.datafinal).toLocaleString(
        "pt-BR",
        { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" }
      );
      const linha = document.createElement("tr");
      let Decimo;
      if (solicitacao.decimoterceiro == true) {
        Decimo = "SIM";
      } else {
        Decimo = "NÃO";
      }
      linha.innerHTML = `
          <td>${dataCriacao}</td>
          <td>${dataInicio}</td>
          <td>${solicitacao.dias}</td>
          <td>${dataFinal}</td>
          <td>${Decimo}</td>
          <td>${solicitacao.status}</td>
        `;
      tabelaCorpo.appendChild(linha);

      totalDiasFerias += solicitacao.dias;
      if (solicitacao.dias === 15 && solicitacao.status != "PENDENTE") {
        numFerias15Dias++;
      }
    });
    if (totalDiasFerias < 30 && numFerias15Dias === 0) {
      mensagem15dias.innerHTML =
        "Atenção: você ainda não tirou férias de 15 dias no ano.";
    }
  });

fetch("/solicitacaoMinhaUltima")
  .then((response) => response.json())
  .then((ultimasolicitacao) => {
    const numeroNotificacoes = document.getElementById("numero-notificacoes");
    const notificacaoIndicador = document.getElementById(
      "notificacao-indicador"
    );
    const idSolicitacao = document.getElementById("idSolicitacaoNoti");
    if (
      ultimasolicitacao.status !== "PENDENTE" &&
      ultimasolicitacao.lido === false
    ) {
      notificacaoIndicador.classList.add("active");
      const currentCount = parseInt(
        numeroNotificacoes.innerHTML.match(/\d+/)[0]
      );
      numeroNotificacoes.innerHTML = `Você tem ${
        currentCount + 1
      } notificações!`;
    }
    if (!ultimasolicitacao) {
      console.error("Nenhuma solicitação encontrada.");
      const h2MensagemGestor = document.getElementById("mensagem-gestor");
      h2MensagemGestor.innerHTML = "Aguarde a ação de seu gestor";
      return;
    }
    const tabelaCorpo = document.getElementById("tabela-notificacao");
    const linha = document.createElement("tr");
    const dataCriacao = new Date(ultimasolicitacao.datacriacao).toLocaleString(
      "pt-BR",
      { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" }
    );
    const dataInicio = new Date(ultimasolicitacao.datainicio).toLocaleString(
      "pt-BR",
      { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" }
    );
    const dataFinal = new Date(ultimasolicitacao.datafinal).toLocaleString(
      "pt-BR",
      {
        timeZone: "UTC",
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }
    );
    let Decimo;
    if (ultimasolicitacao.decimoterceiro == true) {
      Decimo = "SIM";
    } else {
      Decimo = "NÃO";
    }
    linha.innerHTML = `
        <td>${dataCriacao}</td>
        <td>${dataInicio}</td>
        <td>${ultimasolicitacao.dias}</td>
        <td>${dataFinal}</td>
        <td>${ultimasolicitacao.status}</td>
        <td>${Decimo}</td>
      `;
    const mensagemGestor = ultimasolicitacao.mensagem;
    idSolicitacao.value = ultimasolicitacao.id;
    const h2MensagemGestor = document.getElementById("mensagem-gestor");
    if (mensagemGestor && mensagemGestor.trim() !== "") {
      h2MensagemGestor.innerHTML = mensagemGestor;
    } else {
      h2MensagemGestor.innerHTML = "Aguarde a ação de seu gestor";
    }
    tabelaCorpo.appendChild(linha);
  });

fetch("/colaborador")
  .then((response) => response.json())
  .then((colaborador) => {
    const dataAtual = new Date();
    const decimo = document.getElementById("decimoterceiro");
    const nome = document.getElementById("nomeColaborador");
    const matricula = document.getElementById("matriculaColaborador");
    const cargo = document.getElementById("cargoColaborador");
    const gestor = document.getElementById("gestorColaborador");
    const mensagem = document.getElementById("mensagemAviso");
    const dataIngresso = new Date(colaborador.dataingresso);
    nome.innerHTML = "Nome: " + colaborador.nome;
    matricula.innerHTML = "Matrícula:: " + colaborador.matricula;
    cargo.innerHTML = "Cargo: " + colaborador.funcao;
    gestor.innerHTML = "Gestor: " + colaborador.gestor;
    if (dataAtual - dataIngresso >= 365 * 24 * 60 * 60 * 1000) {
      btnAbrirPopup.setAttribute("enabled", true);
    } else {
      btnAbrirPopup.setAttribute("disabled", true);
      mensagem.innerHTML = "Você não possui 1 ano de empresa!";
    }
    if (colaborador.contrato === "CLT") {
      decimo.setAttribute("enabled", true);
    } else if (colaborador.contrato === "PJ") {
      decimo.setAttribute("disabled", true);
    }
  });

fetch("/solicitacaoUltimaAprovada")
  .then((response) => response.json())
  .then((data) => {
    const mensagemaquisitivo = document.getElementById("mensagem-aquisitivo");
    const dataFinal = moment.utc(data.datafinal);
    const dataAtual = moment();
    const diffInMonths = dataAtual.diff(dataFinal, "months");
    if (diffInMonths >= 11) {
      mensagemaquisitivo.innerHTML =
        "Se passaram exatos 11 meses desde a última solicitação, por favor tire férias!";
    } else if (diffInMonths >= 1) {
      mensagemaquisitivo.innerHTML = `Se passaram ${diffInMonths} meses desde a última solicitação de férias aprovada.`;
    } else {
      mensagemaquisitivo.innerHTML =
        "Não se passou nem 1 mês desde a última solicitação de férias aprovada.";
    }
  })
  .catch((error) => console.error(error));

fetch("/equipeMinha")
  .then((response) => response.json())
  .then((colaboradores) => {
    const tabela = document.querySelector("#tabela-equipe");
    let ativos = 0;
    let ferias = 0;
    let atraso = 0;
    const colaboradoresTotal = document.querySelector("#colaboradores-total");
    const colaboradoresAtivos = document.querySelector("#colaboradores-ativos");
    const colaboradoresFerias = document.querySelector("#colaboradores-ferias");
    const colaboradoresAtraso = document.querySelector("#colaboradores-atraso");

    colaboradoresTotal.textContent =
      "Total: " + colaboradores.length + " Colaboradores";
    colaboradoresAtivos.textContent =
      "Ativos " +
      colaboradores.filter((colaborador) => colaborador.status === "ATIVO")
        .length;
    colaboradoresFerias.textContent =
      "Férias " +
      colaboradores.filter((colaborador) => colaborador.status === "FERIAS")
        .length;
    colaboradoresAtraso.textContent =
      "Atrasados " +
      colaboradores.filter((colaborador) => colaborador.status === "ATRASO")
        .length;
    colaboradores.forEach((colaborador) => {
      const dataIngresso = new Date(colaborador.dataingresso).toLocaleString(
        "pt-BR",
        { timeZone: "UTC", day: "numeric", month: "numeric", year: "numeric" }
      );
      const linha = document.createElement("tr");
      linha.innerHTML = `
          <td>${colaborador.nome}</td>
          <td>${colaborador.matricula}</td>
          <td>${colaborador.funcao}</td>
          <td>${dataIngresso}</td>
          <td>${
            colaborador.status === "ATIVO"
              ? "Ativo"
              : colaborador.status === "FERIAS"
              ? "Férias"
              : "Atraso"
          }</td>
        `;
      tabela.appendChild(linha);

      if (colaborador.status === "ATIVO") {
        ativos++;
      } else if (colaborador.status === "ATRASO") {
        atraso++;
      } else {
        ferias++;
      }
    });

    const ctx = document
      .getElementById("graficoColaboradores")
      .getContext("2d");
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        datasets: [
          {
            data: [ativos, ferias, atraso],
            backgroundColor: ["#099A56", "orange", "red"],
            borderColor: ["#000", "#000"],
            borderWidth: 2,
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
      },
    });
  })
  .catch((error) => {
    console.error("Erro ao buscar colaboradores:", error);
  });

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

/* INICIO DO JS DO POPUP DE NOTIFICAÇÃO */
const btnNotificacao = document.getElementById("btnNotificacao");
const btnOkNotificacao = document.getElementById("btnOkNotificacao");
const btnFecharPopupNotificacao = document.getElementById(
  "btnFecharPopupNotificacao"
);
const popupNotificacao = document.getElementById("popupNotificacao");

btnNotificacao.addEventListener("click", () => {
  popupNotificacao.style.display = "block";
  popupNotificacao.classList.add("active");
});

btnFecharPopupNotificacao.addEventListener("click", () => {
  popupNotificacao.style.display = "none";
  popupNotificacao.classList.add("remove");
});

btnOkNotificacao.addEventListener("click", () => {
  popupNotificacao.style.display = "none";
  popupNotificacao.classList.remove("active");
});

/* INICIO DO JS DO POPUP DA EQUIPE */
const btnEquipe = document.getElementById("btnEquipe");
const btnFecharPopupEquipe = document.getElementById("btnFecharPopupEquipe");
const popupEquipe = document.getElementById("popupEquipe");

btnEquipe.addEventListener("click", () => {
  popupEquipe.style.display = "block";
  popupEquipe.classList.add("active");
});

btnFecharPopupEquipe.addEventListener("click", () => {
  popupEquipe.style.display = "none";
  popupEquipe.classList.remove("active");
});

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
  popupDinamico.style.display = "block";
  if (1 == 1) {
    document.getElementById("textoDinamico").innerHTML =
      "Solicitação realizada com sucesso!";
  } else {
    document.getElementById("textoDinamico").innerHTML =
      "Solicitação não foi realizada!";
  }
});

/* INICIO DO JS DO CALENDARIO DA SOLICITAÇÃO */
const dropdown = document.querySelector("#dias");
const dataInicioInput = document.querySelector("#datainicio");
const dataFinalInput = document.querySelector("#datafinal");

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
