window.addEventListener("load", () => {
  localStorage.removeItem("downloadLink");
});
const downloadBtn = document.getElementById("btnRelatorioDownload");
downloadBtn.addEventListener("click", async () => {
  const downloadLink = await fetch("/downloadRelatorio").then((res) =>
    res.text()
  );
  const a = document.createElement("a");
  a.href = downloadLink;
  a.download = "relatorio.csv";
  a.click();
});

fetch("/solicitacaoMinhaUltima")
  .then((response) => response.json())
  .then((ultimasolicitacao) => {
    const numeroNotificacoes = document.getElementById("numero-notificacoes");
    const idSolicitacaoNoti = document.getElementById("idSolicitacaoNoti");
    const notificacaoIndicador = document.getElementById(
      "notificacao-indicador"
    );
    const h2MensagemGestor = document.getElementById("mensagem-gestor");
    if (
      ultimasolicitacao.status != "PENDENTE" &&
      ultimasolicitacao.lido === false
    ) {
      notificacaoIndicador.classList.add("active");
      const currentCount = parseInt(
        numeroNotificacoes.innerHTML.match(/\d+/)[0]
      );
      numeroNotificacoes.innerHTML = `Você tem ${
        currentCount + 1
      } notificações!`;
    }else{
      notificacaoIndicador.classList.remove("active");
      numeroNotificacoes.innerHTML = `Você tem 0 notificações!`;
    }
    if (!ultimasolicitacao) {
      console.error("Nenhuma solicitação encontrada.");
      h2MensagemGestor.innerHTML = "Aguarde a ação de seu gestor";
      return;
    }
    const tabelaCorpo = document.getElementById("tabela-ultima");
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
    idSolicitacaoNoti.value = ultimasolicitacao.id;
    if (mensagemGestor && mensagemGestor.trim() !== "") {
      h2MensagemGestor.innerHTML = mensagemGestor;
    } else {
      h2MensagemGestor.innerHTML = "Aguarde a ação de seu gestor";
    }
    tabelaCorpo.appendChild(linha);
  })
  .catch((error) => console.error(error));

fetch("/solicitacoesTodas")
  .then((response) => response.json())
  .then((todassolicitacoes) => {
    const tabelaCorpo = document.getElementById("tabela-todas");
    const tabelaCorpo2 = document.getElementById("tabela-pendentes");
    const numeroNotificacoes = document.getElementById("numero-notificacoes");
    const graficoAprovados = document.getElementById("grafico-aprovados");
    const graficoPendentes = document.getElementById("grafico-pendentes");
    const graficoNegados = document.getElementById("grafico-negados");
    const notificacaoIndicador = document.getElementById(
      "notificacao-indicador"
    );
    const statusAtualizado = document.getElementById("statusAtualizado");
    const idSolicitacao = document.getElementById("idSolicitacao");
    let Decimo = "";
    let contadorPendentes = 0;
    let contadorAprovadas = 0;
    let contadorNegadas = 0;
    todassolicitacoes.forEach((solicitacao, index) => {
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
      if (solicitacao.decimoterceiro == true) {
        Decimo = "SIM";
      } else {
        Decimo = "NÃO";
      }
      if (solicitacao.status == "PENDENTE") {
        notificacaoIndicador.classList.add("active");
        contadorPendentes++;
        const linha2 = document.createElement("tr");
        linha2.innerHTML = `
          <td>${solicitacao.colaborador}</td>
          <td>${dataCriacao}</td>
          <td>${dataInicio}</td>
          <td>${solicitacao.dias}</td>
          <td>${dataFinal}</td>
          <td>${solicitacao.status}</td>
          <td>${Decimo}</td>
          <td>
            <button title="Aprovar" class="aprovar" value="${solicitacao.id}" id="btnAprovar${index}">
              <i class="fa-solid fa-check"></i>
            </button>
            <button title="Negar" class="negar" value="${solicitacao.id}" id="btnNegar${index}">
              <i class="fa-solid fa-x"></i>
            </button>
          </td>
        `;
        tabelaCorpo2.appendChild(linha2);
        const btnAprovar = document.getElementById(`btnAprovar${index}`);
        btnAprovar.addEventListener("click", () => {
          idSolicitacao.value = btnAprovar.value;
          statusAtualizado.value = "APROVADO";
          popupSolicitacoesPendentes.style.display = "none";
          popupSolicitacoesPendentes.classList.add("remove");
          document.getElementById("textoDinamicoEscolha").innerHTML =
            "Envie uma mensagem para o colaborador (opcional)";
          popupEscolha.style.display = "block";
        });
        const btnNegar = document.getElementById(`btnNegar${index}`);
        btnNegar.addEventListener("click", () => {
          idSolicitacao.value = btnNegar.value;
          statusAtualizado.value = "NEGADO";
          popupSolicitacoesPendentes.style.display = "none";
          popupSolicitacoesPendentes.classList.add("remove");
          document.getElementById("textoDinamicoEscolha").innerHTML =
            "Envie o motivo da solicitação ter sido negada (obrigatorio)";
          popupEscolha.style.display = "block";
        });
      } else if (solicitacao.status == "APROVADO") {
        contadorAprovadas++;
      } else if (solicitacao.status == "NEGADO") {
        contadorNegadas++;
      } else {
        notificacaoIndicador.classList.remove("active");
      }
      const linha = document.createElement("tr");
      linha.innerHTML = `
          <td>${solicitacao.colaborador}</td>
          <td>${dataCriacao}</td>
          <td>${dataInicio}</td>
          <td>${solicitacao.dias}</td>
          <td>${dataFinal}</td>
          <td>${Decimo}</td>
          <td>${solicitacao.status}</td>
        `;
      tabelaCorpo.appendChild(linha);
    });
    numeroNotificacoes.innerHTML = `Você tem ${contadorPendentes} notificações!`;
    notificacaoIndicador.classList.add("active");
    graficoAprovados.innerHTML = `Aprovados ${contadorAprovadas}`;
    graficoPendentes.innerHTML = `Pendentes ${contadorPendentes}`;
    graficoNegados.innerHTML = `Negados ${contadorNegadas}`;

    const ctx = document.getElementById("graficoSolicitacoes").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        datasets: [
          {
            data: [contadorAprovadas, contadorPendentes, contadorNegadas],
            backgroundColor: ["#099A56", "orange", "red"],
            borderColor: ["#000", "#000", "#000"],
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
  });
  
fetch("/solicitacoesMinhas")
  .then((response) => response.json())
  .then((minhassolicitacoes) => {
    const tabelaCorpo = document.getElementById("tabela-minhas");
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
      if (solicitacao.status === "APROVADO") {
        totalDiasFerias += solicitacao.dias;
      }
      if (solicitacao.dias >= 15 && solicitacao.status === "APROVADO") {
        numFerias15Dias++;
      }
    });
    if (totalDiasFerias < 30 && numFerias15Dias === 0) {
      mensagem15dias.innerHTML =
        "Atenção: você ainda não tirou férias de 15 dias no ano.";
    }
  })
  .catch((error) => console.error(error));

fetch("/colaborador")
  .then((response) => response.json())
  .then((colaborador) => {
    const dataAtual = new Date();
    const nome = document.getElementById("nomeGestor");
    const matricula = document.getElementById("matriculaGestor");
    const cargo = document.getElementById("cargoGestor");
    const gestor = document.getElementById("gestorGestor");
    const mensagem = document.getElementById("mensagemAviso");
    const dataIngressoSide = document.getElementById("dataIngresso");
    const dataIngresso = new Date(colaborador.dataingresso);
    const contrato = colaborador.contrato;
    nome.innerHTML = "Nome: " + colaborador.nome;
    matricula.innerHTML = "Matrícula: " + colaborador.matricula;
    cargo.innerHTML = "Cargo: " + colaborador.funcao;
    gestor.innerHTML = "Gestor: " + colaborador.gestor;
    if (dataAtual - dataIngresso >= 365 * 24 * 60 * 60 * 1000) {
      btnAbrirPopup.setAttribute("enabled", true);
    } else {
      btnAbrirPopup.setAttribute("disabled", true);
      mensagem.innerHTML = "Você não possui 1 ano de empresa!";
    }
    if (contrato == "CLT") {
      document.getElementById("decimoterceiro").enabled = true;
    } else {
      document.getElementById("decimoterceiro").disabled = true;
    }
  })
  .catch((error) => console.error(error));

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

fetch("/equipe")
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

/*INICIO DO JS DOS BOTÕES DA SIDEBAR */
const btnSolicitacoes = document.getElementById("btnSolicitacoes");
const tabela2 = document.getElementById("tabela2");

btnSolicitacoes.addEventListener("click", () => {
  if (tabela2.classList.contains("active")) {
    tabela2.classList.remove("active");
    btnSolicitacoes.innerHTML =
      'Minhas Solicitações <span style="color: #dd8d24"><i class="fa-solid fa-user"></i></span>';
  } else {
    tabela2.classList.add("active");
    btnSolicitacoes.innerHTML =
      'Todas Solicitações <span style="color: #dd8d24"><i class="fa-solid fa-user-group"></i></span>';
  }
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
const btnFecharPopupNotificacao = document.getElementById(
  "btnFecharPopupNotificacao"
);
const btnFecharPopupNotificacaoMinha = document.getElementById(
  "btnFecharPopupNotificacaoMinha"
);
const btnOkNotificacao = document.getElementById("btnOkNotificacao");
const btnEscolha = document.getElementById("btnEscolha");
const btnMinhas = document.getElementById("btnMinhas");
const btnPendentes = document.getElementById("btnPendentes");
const btnFecharPopupEscolha = document.getElementById("btnFecharPopupEscolha");
const btnFecharPopupEscolhaNotificacoes = document.getElementById(
  "btnFecharPopupEscolhaNotificacoes"
);
const popupSolicitacoesPendentes = document.getElementById(
  "popupSolicitacoesPendentes"
);
const popupEscolha = document.getElementById("popupEscolha");
const popupNotificacao = document.getElementById("popupNotificacao");
const PopupEscolhaNotificacoes = document.getElementById(
  "PopupEscolhaNotificacoes"
);

btnNotificacao.addEventListener("click", () => {
  PopupEscolhaNotificacoes.style.display = "block";
  PopupEscolhaNotificacoes.classList.add("active");
});

btnMinhas.addEventListener("click", () => {
  PopupEscolhaNotificacoes.style.display = "none";
  PopupEscolhaNotificacoes.classList.remove("active");
  popupNotificacao.style.display = "block";
  popupNotificacao.classList.add("active");
});

btnPendentes.addEventListener("click", () => {
  PopupEscolhaNotificacoes.style.display = "none";
  PopupEscolhaNotificacoes.classList.remove("active");
  popupSolicitacoesPendentes.style.display = "block";
  popupSolicitacoesPendentes.classList.add("active");
});

btnEscolha.addEventListener("click", () => {
  popupEscolha.style.display = "none";
  popupDinamico.style.display = "block";
  if (1 == 1) {
    document.getElementById("textoDinamico").innerHTML =
      "Ação realizada com sucesso!";
  } else {
    document.getElementById("textoDinamico").innerHTML =
      "Ação não foi realizada!";
  }
});

btnFecharPopupEscolha.addEventListener("click", () => {
  popupEscolha.style.display = "none";
  popupSolicitacoesPendentes.style.display = "block";
  popupSolicitacoesPendentes.classList.add("active");
});

btnFecharPopupEscolhaNotificacoes.addEventListener("click", () => {
  PopupEscolhaNotificacoes.style.display = "none";
  PopupEscolhaNotificacoes.classList.remove("active");
});

btnFecharPopupNotificacao.addEventListener("click", () => {
  popupSolicitacoesPendentes.style.display = "none";
  popupSolicitacoesPendentes.classList.remove("active");
});

btnFecharPopupNotificacaoMinha.addEventListener("click", () => {
  popupNotificacao.style.display = "none";
  popupNotificacao.classList.remove("active");
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
  gerarLista();
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

/* INICIO DO JS DO BOTÃO DE RELÁTORIO */
const popuprelatorio = document.getElementById("popupEscolhaRelatorio");
const btnRelatorio = document.getElementById("btnRelatorio");
const btnFecharPopupEscolhaRelatorio = document.getElementById(
  "btnFecharPopupEscolhaRelatorio"
);
btnRelatorio.addEventListener("click", () => {
  popuprelatorio.style.display = "block";
  popuprelatorio.classList.add("active");
});
btnFecharPopupEscolhaRelatorio.addEventListener("click", () => {
  popuprelatorio.style.display = "none";
  popuprelatorio.classList.remove("active");
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
