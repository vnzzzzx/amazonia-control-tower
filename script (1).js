/* ============================================
   AMAZÔNIA CONTROL TOWER
   PROTÓTIPO ACADÊMICO
   ============================================ */


/* =========================
   NAVEGAÇÃO
   ========================= */

const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".section");
const pageTitle = document.getElementById("pageTitle");

const topbarPageHeading =
  pageTitle?.parentElement;

const titles = {
  dashboard: "Visão geral da operação",
  entregas: "Gestão de entregas",
  rotas: "Rotas e modais",
  prioridade: "Priorização inteligente",
  ia: "Motor de previsão"
};

navItems.forEach(button => {

  button.addEventListener("click", () => {

    const target = button.dataset.section;

    navItems.forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    sections.forEach(section => {
      section.classList.remove("active");
    });

    document.getElementById(target).classList.add("active");

    pageTitle.textContent = titles[target];

if (topbarPageHeading) {

  topbarPageHeading.style.display =
    target === "dashboard"
      ? ""
      : "none";

}
    
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });

});


/* =========================
   HORÁRIO DE SINCRONIZAÇÃO
   ========================= */

function updateClock() {

  const now = new Date();

  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  document.getElementById("syncTime").textContent = time;
}

updateClock();

setInterval(updateClock, 1000);


/* =========================
   TOAST
   ========================= */

const toast = document.getElementById("toast");

function showToast(message) {

  toast.querySelector("p").textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* =========================
   ATUALIZAR DASHBOARD
   ========================= */

const refreshBtn = document.getElementById("refreshBtn");

refreshBtn.addEventListener("click", () => {

  refreshBtn.textContent = "↻ Atualizando...";

  setTimeout(() => {

    /*
      Pequena simulação de mudança
      nos indicadores.
    */

    const deliveries =
      document.getElementById("deliveries");

    const critical =
      document.getElementById("critical");

    const delayed =
      document.getElementById("delayed");

    const offline =
      document.getElementById("offline");

    deliveries.textContent =
      180 + Math.floor(Math.random() * 12);

    critical.textContent =
      24 + Math.floor(Math.random() * 7);

    delayed.textContent =
      6 + Math.floor(Math.random() * 5);

    offline.textContent =
      10 + Math.floor(Math.random() * 10);

    refreshBtn.textContent = "↻ Atualizar";

    showToast("Dados atualizados com sucesso.");

    addLog(
      "Dados operacionais sincronizados.",
      "green"
    );

  }, 900);

});


/* =========================
   LOG DE EVENTOS
   ========================= */

const eventLog =
  document.getElementById("eventLog");

function getCurrentTime() {

  const now = new Date();

  return now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

}


function addLog(message, type = "blue") {

  const item = document.createElement("div");

  item.className = "log-item";

  let icon = "↻";
  let iconClass = "blue-text";

  if (type === "green") {
    icon = "✓";
    iconClass = "green-text";
  }

  if (type === "yellow") {
    icon = "!";
    iconClass = "yellow-text";
  }

  item.innerHTML = `
    <span class="log-time">${getCurrentTime()}</span>

    <span class="log-icon ${iconClass}">
      ${icon}
    </span>

    <span>${message}</span>
  `;

  eventLog.prepend(item);

}


/* =========================
   LIMPAR LOG
   ========================= */

document
  .getElementById("clearLog")
  .addEventListener("click", () => {

    eventLog.innerHTML = "";

    addLog(
      "Registro de eventos limpo pelo operador.",
      "yellow"
    );

  });


/* =========================
   SIMULAÇÃO DE EVENTOS
   ========================= */

const simulatedEvents = [

  {
    message:
      "Embarcação AM-07 atualizou posição.",
    type: "blue"
  },

  {
    message:
      "Pacote #AMZ-49285 entrou em rota.",
    type: "green"
  },

  {
    message:
      "Rota fluvial apresenta atraso.",
    type: "yellow"
  },

  {
    message:
      "Novo pacote prioritário identificado.",
    type: "yellow"
  },

  {
    message:
      "Entrega sincronizada com sucesso.",
    type: "green"
  }

];


setInterval(() => {

  const random =
    simulatedEvents[
      Math.floor(
        Math.random() * simulatedEvents.length
      )
    ];

  addLog(random.message, random.type);

}, 12000);


/* =========================
   SIMULAÇÃO DE IA
   ========================= */

const simulateAI =
  document.getElementById("simulateAI");

const aiResult =
  document.getElementById("aiResult");

simulateAI.addEventListener("click", () => {

  simulateAI.textContent =
    "Analisando dados...";

  simulateAI.disabled = true;

  setTimeout(() => {

    const possibleETA = [
      "17:45",
      "18:05",
      "18:20",
      "18:35",
      "18:50"
    ];

    const eta =
      possibleETA[
        Math.floor(
          Math.random() * possibleETA.length
        )
      ];

    aiResult.innerHTML = `
      <span>ETA calculado pelo motor</span>
      <strong>${eta}</strong>
    `;

    simulateAI.textContent =
      "Simular novo ETA";

    simulateAI.disabled = false;

    showToast(
      "ETA recalculado pelo motor de previsão."
    );

    addLog(
      `ETA recalculado: chegada prevista às ${eta}.`,
      "blue"
    );

  }, 1600);

});


/* =========================
   FILTRO DE REGIÃO
   ========================= */

const regionSelect =
  document.getElementById("regionSelect");

regionSelect.addEventListener("change", () => {

  const region = regionSelect.value;

  if (region === "Todas as regiões") {

    showToast(
      "Visualizando todas as regiões."
    );

  } else {

    showToast(
      `Filtro aplicado: ${region}`
    );

    addLog(
      `Operador selecionou a região: ${region}.`,
      "blue"
    );

  }

});


/* =========================
   BOTÃO TODAS AS ENTREGAS
   ========================= */

document
  .getElementById("showDeliveries")
  .addEventListener("click", () => {

    const entregasButton =
      document.querySelector(
        '[data-section="entregas"]'
      );

    entregasButton.click();

  });


/* =========================
   SIMULAÇÃO DE STATUS
   ========================= */

function updateOperationalStatus() {

  const boat =
    document.getElementById("boats");

  let current =
    parseInt(boat.textContent);

  /*
    Pequena variação para
    simular operação dinâmica.
  */

  if (Math.random() > .5) {
    current += 1;
  } else if (current > 8) {
    current -= 1;
  }

  boat.textContent = current;

}

setInterval(
  updateOperationalStatus,
  15000
);


/* =========================
   PRIMEIRO EVENTO
   ========================= */

setTimeout(() => {

  addLog(
    "Sistema de rastreamento por eventos iniciado.",
    "green"
  );

}, 1000);                                                                                                                                                                                                                                                              /* ============================================
   ETAPA 3C
   PAINEL DE DETALHES DAS ENTREGAS
   ============================================ */


/* =========================
   BANCO DE DADOS SIMULADO
   ========================= */

const deliveryData = {

  "AMZ-49281": {
    id: "#AMZ-49281",
    product: "Medicamento crítico",
    priority: "NÍVEL 1 — EMERGENCIAL",
    priorityClass: "critical",
    status: "Em trânsito — rota com atraso",

    origin: "Agência Manaus",
    destination: "Comunidade X",

    modal: "🚤 Embarcação",
    route: "AM-07",

    initialEta: "16:00",
    currentEta: "18:20",

    delay: "+2h20 de atraso estimado",
    reason: "Atraso identificado no trecho fluvial.",

    events: [
      {
        time: "08:12",
        title: "Saiu da agência",
        description: "Agência operacional de Manaus",
        status: "completed"
      },
      {
        time: "09:03",
        title: "Chegou ao porto",
        description: "Ponto de transferência modal",
        status: "completed"
      },
      {
        time: "09:35",
        title: "Embarcação iniciou viagem",
        description: "Rota fluvial AM-07",
        status: "completed"
      },
      {
        time: "13:42",
        title: "Ponto de transbordo",
        description: "Último evento sincronizado",
        status: "current"
      },
      {
        time: "18:20",
        title: "Previsão de chegada",
        description: "Calculada pelo motor de previsão",
        status: "pending"
      }
    ]
  },


  "AMZ-49284": {
    id: "#AMZ-49284",
    product: "Material médico",
    priority: "NÍVEL 2 — ESSENCIAL",
    priorityClass: "warning",
    status: "Em trânsito — monitoramento",

    origin: "Centro Logístico Manaus",
    destination: "Comunidade Z",

    modal: "🚤 Embarcação",
    route: "AM-11",

    initialEta: "16:10",
    currentEta: "16:45",

    delay: "+35 min na previsão",
    reason: "Condições da rota estão sendo monitoradas.",

    events: [
      {
        time: "07:50",
        title: "Objeto processado",
        description: "Centro Logístico Manaus",
        status: "completed"
      },
      {
        time: "08:40",
        title: "Transferido para o porto",
        description: "Transporte terrestre concluído",
        status: "completed"
      },
      {
        time: "09:25",
        title: "Embarcação iniciou viagem",
        description: "Rota fluvial AM-11",
        status: "completed"
      },
      {
        time: "13:58",
        title: "Em trânsito",
        description: "Último evento sincronizado",
        status: "current"
      },
      {
        time: "16:45",
        title: "Previsão de chegada",
        description: "ETA atualizado pelo sistema",
        status: "pending"
      }
    ]
  },


  "AMZ-49282": {
    id: "#AMZ-49282",
    product: "Material escolar",
    priority: "NÍVEL 2 — ESSENCIAL",
    priorityClass: "normal",
    status: "Em trânsito — dentro do previsto",

    origin: "Agência Manaus",
    destination: "Escola Y",

    modal: "🚤 Embarcação",
    route: "AM-04",

    initialEta: "10:00",
    currentEta: "10:00",

    delay: "Operação dentro do previsto",
    reason: "Nenhuma ocorrência crítica identificada.",

    events: [
      {
        time: "06:15",
        title: "Saiu da agência",
        description: "Agência operacional de Manaus",
        status: "completed"
      },
      {
        time: "06:50",
        title: "Chegou ao porto",
        description: "Transferência concluída",
        status: "completed"
      },
      {
        time: "07:10",
        title: "Embarcação iniciou viagem",
        description: "Rota fluvial AM-04",
        status: "completed"
      },
      {
        time: "08:32",
        title: "Em trânsito",
        description: "Operação dentro do planejamento",
        status: "current"
      },
      {
        time: "10:00",
        title: "Previsão de chegada",
        description: "ETA mantido pelo sistema",
        status: "pending"
      }
    ]
  }

};


/* =========================
   ELEMENTOS DO PAINEL
   ========================= */

const deliveryDrawer =
  document.getElementById("deliveryDrawer");

const deliveryOverlay =
  document.getElementById("deliveryOverlay");

const closeDeliveryDrawer =
  document.getElementById("closeDeliveryDrawer");

const deliveryCards =
  document.querySelectorAll(".delivery-clickable");


/* =========================
   ABRIR PAINEL
   ========================= */

function openDeliveryDrawer(deliveryId) {

  const data = deliveryData[deliveryId];

  if (!data) {
    console.warn(
      "Entrega não encontrada:",
      deliveryId
    );

    return;
  }


  /* IDENTIFICAÇÃO */

  document.getElementById(
    "drawerPackageId"
  ).textContent = data.id;

  document.getElementById(
    "drawerProduct"
  ).textContent = data.product;

  document.getElementById(
    "drawerStatus"
  ).textContent = data.status;


  /* PRIORIDADE */

  const priority =
    document.getElementById(
      "drawerPriority"
    );

  priority.textContent =
    data.priority;

  priority.className =
    `drawer-priority ${data.priorityClass}`;


  /* ROTA */

  document.getElementById(
    "drawerOrigin"
  ).textContent = data.origin;

  document.getElementById(
    "drawerDestination"
  ).textContent = data.destination;

  document.getElementById(
    "drawerModal"
  ).textContent = data.modal;

  document.getElementById(
    "drawerRoute"
  ).textContent = data.route;


  /* ETA */

  document.getElementById(
    "drawerInitialEta"
  ).textContent = data.initialEta;

  document.getElementById(
    "drawerCurrentEta"
  ).textContent = data.currentEta;


  /* PREVISÃO */

  document.getElementById(
    "drawerDelayText"
  ).textContent = data.delay;

  document.getElementById(
    "drawerDelayReason"
  ).textContent = data.reason;


  /* TIMELINE */

  renderDeliveryTimeline(
    data.events
  );


  /* ABRIR */

  deliveryDrawer.classList.add(
    "active"
  );

  deliveryOverlay.classList.add(
    "active"
  );

  document.body.style.overflow =
    "hidden";


  /* REGISTRAR NO LOG */

  if (typeof addLog === "function") {

    addLog(
      `Operador abriu a entrega ${data.id}.`,
      "blue"
    );

  }

}


/* =========================
   CRIAR TIMELINE
   ========================= */

function renderDeliveryTimeline(events) {

  const timeline =
    document.getElementById(
      "drawerTimeline"
    );

  timeline.innerHTML = "";


  events.forEach(event => {

    const item =
      document.createElement("div");

    item.className =
      `drawer-event ${event.status}`;


    let marker = "○";

    if (
      event.status === "completed"
    ) {
      marker = "✓";
    }

    if (
      event.status === "current"
    ) {
      marker = "●";
    }


    item.innerHTML = `
      <div class="event-marker">
        ${marker}
      </div>

      <div class="event-content">

        <span>
          ${event.time}
        </span>

        <strong>
          ${event.title}
        </strong>

        <small>
          ${event.description}
        </small>

      </div>
    `;


    timeline.appendChild(item);

  });

}


/* =========================
   FECHAR PAINEL
   ========================= */

function closeDrawer() {

  deliveryDrawer.classList.remove(
    "active"
  );

  deliveryOverlay.classList.remove(
    "active"
  );

  document.body.style.overflow = "";

}


/* =========================
   CLIQUE NOS CARTÕES
   ========================= */

deliveryCards.forEach(card => {

  card.addEventListener(
    "click",
    () => {

      const deliveryId =
        card.dataset.delivery;

      openDeliveryDrawer(
        deliveryId
      );

    }
  );

});


/* =========================
   BOTÃO X
   ========================= */

closeDeliveryDrawer.addEventListener(
  "click",
  closeDrawer
);


/* =========================
   CLIQUE FORA
   ========================= */

deliveryOverlay.addEventListener(
  "click",
  closeDrawer
);


/* =========================
   TECLA ESC
   ========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      deliveryDrawer.classList.contains(
        "active"
      )
    ) {

      closeDrawer();

    }

  }
);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         /* ============================================
   ETAPA 4C
   GESTÃO DE ENTREGAS
   BUSCA + FILTROS + TABELA CLICÁVEL
   ============================================ */


/* =========================
   ENTREGA ADICIONAL
   ========================= */

/*
  A entrega AMZ-49283 aparece na tabela,
  então adicionamos seus dados ao painel lateral.
*/

deliveryData["AMZ-49283"] = {

  id: "#AMZ-49283",

  product: "Documento",

  priority: "NÍVEL 3 — INSTITUCIONAL",

  priorityClass: "normal",

  status: "Em trânsito — operação normal",

  origin: "Agência Manaus",

  destination: "Comunidade Z",

  modal: "🏍 Veículo",

  route: "AM-12",

  initialEta: "15:40",

  currentEta: "15:40",

  delay: "Operação dentro do previsto",

  reason:
    "Nenhuma ocorrência crítica identificada.",


  events: [

    {
      time: "11:20",
      title: "Objeto processado",
      description: "Agência operacional",
      status: "completed"
    },

    {
      time: "11:45",
      title: "Saiu da unidade",
      description: "Transferência iniciada",
      status: "completed"
    },

    {
      time: "12:30",
      title: "Veículo iniciou rota",
      description: "Rota terrestre AM-12",
      status: "completed"
    },

    {
      time: "14:05",
      title: "Em trânsito",
      description: "Última atualização operacional",
      status: "current"
    },

    {
      time: "15:40",
      title: "Previsão de chegada",
      description: "ETA mantido pelo sistema",
      status: "pending"
    }

  ]

};


/* =========================
   ELEMENTOS DA TELA
   ========================= */

const deliveriesSearch =
  document.getElementById("deliveriesSearch");

const clearDeliverySearch =
  document.getElementById("clearDeliverySearch");

const priorityFilter =
  document.getElementById("priorityFilter");

const modalFilter =
  document.getElementById("modalFilter");

const resetDeliveryFilters =
  document.getElementById("resetDeliveryFilters");

const filterChips =
  document.querySelectorAll(".filter-chip");

const deliveryRows =
  document.querySelectorAll(".delivery-row");

const deliveriesResultText =
  document.getElementById("deliveriesResultText");

const deliveriesCount =
  document.getElementById("deliveriesCount");

const noDeliveries =
  document.getElementById("noDeliveries");

const deliveriesTable =
  document.querySelector(".deliveries-table");


/* =========================
   FILTRO ATIVO
   ========================= */

let activeStatusFilter = "todos";


/* =========================
   NORMALIZAR TEXTO
   ========================= */

/*
  Permite buscar:
  "medico"
  mesmo que esteja escrito:
  "médico"
*/

function normalizeDeliveryText(text) {

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

}


/* =========================
   APLICAR FILTROS
   ========================= */

function applyDeliveryFilters() {

  const searchValue =
    normalizeDeliveryText(
      deliveriesSearch.value.trim()
    );

  const selectedPriority =
    priorityFilter.value;

  const selectedModal =
    modalFilter.value;

  let visibleCount = 0;


  deliveryRows.forEach(row => {

    /*
      Texto completo da linha:
      ID + tipo + destino + modal +
      rota + ETA + status.
    */

    const rowText =
      normalizeDeliveryText(
        row.textContent
      );


    /* BUSCA */

    const matchesSearch =
      searchValue === "" ||
      rowText.includes(searchValue);


    /* STATUS */

    const matchesStatus =
      activeStatusFilter === "todos" ||
      row.dataset.status ===
        activeStatusFilter;


    /* PRIORIDADE */

    const matchesPriority =
      selectedPriority === "todas" ||
      row.dataset.priority ===
        selectedPriority;


    /* MODAL */

    const matchesModal =
      selectedModal === "todos" ||
      row.dataset.modal ===
        selectedModal;


    /* RESULTADO FINAL */

    const shouldShow =
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesModal;


    if (shouldShow) {

      row.classList.remove(
        "filtered-out"
      );

      visibleCount++;

    } else {

      row.classList.add(
        "filtered-out"
      );

    }

  });


  updateDeliveryResults(
    visibleCount
  );

}


/* =========================
   ATUALIZAR CONTADOR
   ========================= */

function updateDeliveryResults(count) {

  if (count === 1) {

    deliveriesResultText.textContent =
      "1 entrega encontrada";

  } else {

    deliveriesResultText.textContent =
      `${count} entregas encontradas`;

  }


  /*
    Se nenhuma entrega estiver visível,
    escondemos a tabela e mostramos
    a mensagem.
  */

  if (count === 0) {

    deliveriesTable.style.display =
      "none";

    noDeliveries.hidden = false;

  } else {

    deliveriesTable.style.display =
      "";

    noDeliveries.hidden = true;

  }

}


/* =========================
   BUSCA EM TEMPO REAL
   ========================= */

deliveriesSearch.addEventListener(
  "input",
  applyDeliveryFilters
);


/* =========================
   LIMPAR BUSCA
   ========================= */

clearDeliverySearch.addEventListener(
  "click",
  () => {

    deliveriesSearch.value = "";

    deliveriesSearch.focus();

    applyDeliveryFilters();

  }
);


/* =========================
   FILTROS RÁPIDOS
   ========================= */

filterChips.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      filterChips.forEach(item => {

        item.classList.remove(
          "active"
        );

      });


      button.classList.add(
        "active"
      );


      activeStatusFilter =
        button.dataset.filter;


      applyDeliveryFilters();

    }
  );

});


/* =========================
   FILTRO DE PRIORIDADE
   ========================= */

priorityFilter.addEventListener(
  "change",
  applyDeliveryFilters
);


/* =========================
   FILTRO DE MODAL
   ========================= */

modalFilter.addEventListener(
  "change",
  applyDeliveryFilters
);


/* =========================
   LIMPAR TODOS OS FILTROS
   ========================= */

resetDeliveryFilters.addEventListener(
  "click",
  () => {

    deliveriesSearch.value = "";

    priorityFilter.value =
      "todas";

    modalFilter.value =
      "todos";

    activeStatusFilter =
      "todos";


    filterChips.forEach(item => {

      item.classList.remove(
        "active"
      );

    });


    const allButton =
      document.querySelector(
        '.filter-chip[data-filter="todos"]'
      );


    if (allButton) {

      allButton.classList.add(
        "active"
      );

    }


    applyDeliveryFilters();


    if (
      typeof showToast ===
      "function"
    ) {

      showToast(
        "Filtros de entregas removidos."
      );

    }

  }
);


/* =========================
   LINHAS CLICÁVEIS
   ========================= */

deliveryRows.forEach(row => {

  /*
    Também permitimos navegação
    usando teclado.
  */

  row.setAttribute(
    "tabindex",
    "0"
  );


  row.addEventListener(
    "click",
    () => {

      const deliveryId =
        row.dataset.delivery;


      openDeliveryDrawer(
        deliveryId
      );

    }
  );


  row.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Enter"
      ) {

        const deliveryId =
          row.dataset.delivery;


        openDeliveryDrawer(
          deliveryId
        );

      }

    }
  );

});


/* =========================
   TOTAL DE ENTREGAS
   ========================= */

deliveriesCount.textContent =
  deliveryRows.length;


/* =========================
   ESTADO INICIAL
   ========================= */

applyDeliveryFilters();                                                                                                                                                                                                                                                                                                                                                                                                                                                                 /* ============================================
   ETAPA 5C
   CONEXÃO ENTRE MAPA E ENTREGAS
   ============================================ */


/* =========================
   ELEMENTOS DO MAPA
   ========================= */

const mapDeliveryMarkers =
  document.querySelectorAll(".map-delivery-marker");

const realMapContainer =
  document.querySelector(".real-map-container");


/* =========================
   DESTACAR ENTREGA NO MAPA
   ========================= */

function highlightMapDelivery(deliveryId) {

  mapDeliveryMarkers.forEach(marker => {

    marker.classList.remove("selected");

  });


  const selectedMarker =
    document.querySelector(
      `.map-delivery-marker[data-delivery="${deliveryId}"]`
    );


  if (selectedMarker) {

    selectedMarker.classList.add("selected");


    if (realMapContainer) {

      realMapContainer.classList.add(
        "map-focused"
      );

    }

  }

}


/* =========================
   LIMPAR DESTAQUE
   ========================= */

function clearMapHighlight() {

  mapDeliveryMarkers.forEach(marker => {

    marker.classList.remove("selected");

  });


  if (realMapContainer) {

    realMapContainer.classList.remove(
      "map-focused"
    );

  }

}


/* =========================
   CLIQUE NOS MARCADORES
   ========================= */

mapDeliveryMarkers.forEach(marker => {

  marker.addEventListener(
    "click",
    event => {

      /*
        Impede que o clique
        seja interpretado pelo mapa.
      */

      event.stopPropagation();


      const deliveryId =
        marker.dataset.delivery;


      highlightMapDelivery(
        deliveryId
      );


      openDeliveryDrawer(
        deliveryId
      );


      if (
        typeof addLog ===
        "function"
      ) {

        addLog(
          `Entrega #${deliveryId} selecionada no mapa.`,
          "blue"
        );

      }

    }
  );

});


/* =========================
   ALERTAS → MAPA
   ========================= */

document
  .querySelectorAll(".delivery-clickable")
  .forEach(card => {

    card.addEventListener(
      "click",
      () => {

        const deliveryId =
          card.dataset.delivery;

        highlightMapDelivery(
          deliveryId
        );

      }
    );

  });


/* =========================
   TABELA → MAPA
   ========================= */

document
  .querySelectorAll(".delivery-row")
  .forEach(row => {

    row.addEventListener(
      "click",
      () => {

        const deliveryId =
          row.dataset.delivery;

        highlightMapDelivery(
          deliveryId
        );

      }
    );


    row.addEventListener(
      "keydown",
      event => {

        if (event.key === "Enter") {

          const deliveryId =
            row.dataset.delivery;

          highlightMapDelivery(
            deliveryId
          );

        }

      }
    );

  });


/* =========================
   FECHAR PAINEL
   ========================= */

/*
  Quando o painel for fechado,
  removemos o destaque do mapa.
*/

if (closeDeliveryDrawer) {

  closeDeliveryDrawer.addEventListener(
    "click",
    clearMapHighlight
  );

}


if (deliveryOverlay) {

  deliveryOverlay.addEventListener(
    "click",
    clearMapHighlight
  );

}


/* =========================
   TECLA ESC
   ========================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {

      clearMapHighlight();

    }

  }
);


/* ============================================
   ETAPA 6C
   CENTRAL DE NOTIFICAÇÕES
   ============================================ */


/* =========================
   ELEMENTOS
   ========================= */

const notificationButton =
  document.getElementById("notificationButton");

const notificationPanel =
  document.getElementById("notificationPanel");

const notificationCount =
  document.getElementById("notificationCount");

const markNotificationsRead =
  document.getElementById("markNotificationsRead");

const clearNotifications =
  document.getElementById("clearNotifications");

const notificationList =
  document.getElementById("notificationList");


/* =========================
   CONTADOR
   ========================= */

function updateNotificationCount() {

  const unreadNotifications =
    document.querySelectorAll(
      ".notification-item.unread"
    );

  const count =
    unreadNotifications.length;


  notificationCount.textContent =
    count;


  if (count === 0) {

    notificationCount.classList.add(
      "hidden"
    );

  } else {

    notificationCount.classList.remove(
      "hidden"
    );

  }

}


/* =========================
   ABRIR / FECHAR PAINEL
   ========================= */

function toggleNotificationPanel() {

  const isOpen =
    notificationPanel.classList.toggle(
      "active"
    );


  notificationButton.setAttribute(
    "aria-expanded",
    isOpen
  );

}


function closeNotificationPanel() {

  notificationPanel.classList.remove(
    "active"
  );


  notificationButton.setAttribute(
    "aria-expanded",
    "false"
  );

}


notificationButton.addEventListener(
  "click",
  event => {

    event.stopPropagation();

    toggleNotificationPanel();

  }
);


/* =========================
   CLIQUE NAS NOTIFICAÇÕES
   ========================= */

notificationList.addEventListener(
  "click",
  event => {

    const notification =
      event.target.closest(
        ".notification-item"
      );


    if (!notification) {
      return;
    }


    /* MARCAR COMO LIDA */

    notification.classList.remove(
      "unread"
    );

    notification.classList.add(
      "read"
    );


    updateNotificationCount();


    /* VERIFICAR SE POSSUI ENTREGA */

    const deliveryId =
      notification.dataset.delivery;


    if (deliveryId) {

      /*
        Abre o mesmo painel de detalhes
        que já usamos no mapa e tabela.
      */

      if (
        typeof openDeliveryDrawer ===
        "function"
      ) {

        openDeliveryDrawer(
          deliveryId
        );

      }


      /*
        Destaca também no mapa,
        caso exista marcador.
      */

      if (
        typeof highlightMapDelivery ===
        "function"
      ) {

        highlightMapDelivery(
          deliveryId
        );

      }


      if (
        typeof addLog === "function"
      ) {

        addLog(
          `Notificação da entrega #${deliveryId} visualizada.`,
          "blue"
        );

      }

    }


    closeNotificationPanel();

  }
);


/* =========================
   MARCAR TODAS COMO LIDAS
   ========================= */

markNotificationsRead.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    const notifications =
      document.querySelectorAll(
        ".notification-item"
      );


    notifications.forEach(item => {

      item.classList.remove(
        "unread"
      );

      item.classList.add(
        "read"
      );

    });


    updateNotificationCount();


    if (
      typeof showToast ===
      "function"
    ) {

      showToast(
        "Todas as notificações foram marcadas como lidas."
      );

    }

  }
);


/* =========================
   LIMPAR NOTIFICAÇÕES
   ========================= */

clearNotifications.addEventListener(
  "click",
  event => {

    event.stopPropagation();


    notificationList.innerHTML = "";


    updateNotificationCount();


    notificationList.innerHTML = `
      <div class="empty-notifications">
        <span>✓</span>

        <strong>
          Nenhuma notificação
        </strong>

        <small>
          Novos alertas aparecerão aqui.
        </small>
      </div>
    `;


    if (
      typeof showToast ===
      "function"
    ) {

      showToast(
        "Central de notificações limpa."
      );

    }

  }
);


/* =========================
   CLIQUE FORA DO PAINEL
   ========================= */

document.addEventListener(
  "click",
  event => {

    const clickedInside =
      notificationPanel.contains(
        event.target
      );

    const clickedButton =
      notificationButton.contains(
        event.target
      );


    if (
      !clickedInside &&
      !clickedButton
    ) {

      closeNotificationPanel();

    }

  }
);


/* =========================
   ESC PARA FECHAR
   ========================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeNotificationPanel();

    }

  }
);


/* =========================
   ESTADO INICIAL
   ========================= */

updateNotificationCount();


/* ============================================
   ETAPA 7C
   ORDENAÇÃO + PAGINAÇÃO + MAIS ENTREGAS
   ============================================ */


/* =========================
   NOVAS ENTREGAS SIMULADAS
   ========================= */

const extraDeliveries = [

  {
    id: "AMZ-49285",
    tipo: "Medicamento",
    destino: "Comunidade Nova",
    prioridade: "emergencial",
    prioridadeNome: "Emergencial",
    modal: "embarcacao",
    modalNome: "🚤 Embarcação",
    rota: "FL-05",
    eta: "19:10",
    status: "atencao",
    statusNome: "Atenção"
  },

  {
    id: "AMZ-49286",
    tipo: "Documentos",
    destino: "Vila Esperança",
    prioridade: "institucional",
    prioridadeNome: "Institucional",
    modal: "veiculo",
    modalNome: "🏍 Veículo",
    rota: "AM-18",
    eta: "12:40",
    status: "transito",
    statusNome: "Em trânsito"
  },

  {
    id: "AMZ-49287",
    tipo: "Material escolar",
    destino: "Comunidade Solimões",
    prioridade: "essencial",
    prioridadeNome: "Essencial",
    modal: "embarcacao",
    modalNome: "🚤 Embarcação",
    rota: "FL-08",
    eta: "17:30",
    status: "transito",
    statusNome: "Em trânsito"
  },

  {
    id: "AMZ-49288",
    tipo: "Material médico",
    destino: "Base Ribeirinha",
    prioridade: "essencial",
    prioridadeNome: "Essencial",
    modal: "aereo",
    modalNome: "✈ Aéreo",
    rota: "AE-02",
    eta: "13:20",
    status: "atencao",
    statusNome: "Atenção"
  },

  {
    id: "AMZ-49289",
    tipo: "Encomenda",
    destino: "Escola Comunitária",
    prioridade: "convencional",
    prioridadeNome: "Convencional",
    modal: "veiculo",
    modalNome: "🏍 Veículo",
    rota: "AM-20",
    eta: "16:00",
    status: "transito",
    statusNome: "Em trânsito"
  },

  {
    id: "AMZ-49290",
    tipo: "Kit primeiros socorros",
    destino: "Comunidade Arara",
    prioridade: "essencial",
    prioridadeNome: "Essencial",
    modal: "embarcacao",
    modalNome: "🚤 Embarcação",
    rota: "FL-11",
    eta: "20:15",
    status: "critico",
    statusNome: "Crítico"
  },

  {
    id: "AMZ-49291",
    tipo: "Documentação",
    destino: "Unidade Regional",
    prioridade: "institucional",
    prioridadeNome: "Institucional",
    modal: "veiculo",
    modalNome: "🏍 Veículo",
    rota: "AM-22",
    eta: "14:50",
    status: "transito",
    statusNome: "Em trânsito"
  },

  {
    id: "AMZ-49292",
    tipo: "Material escolar",
    destino: "Comunidade Jatobá",
    prioridade: "essencial",
    prioridadeNome: "Essencial",
    modal: "embarcacao",
    modalNome: "🚤 Embarcação",
    rota: "FL-14",
    eta: "18:05",
    status: "transito",
    statusNome: "Em trânsito"
  }

];


/* =========================
   ADICIONAR NOVAS LINHAS
   ========================= */

const deliveriesTableBodyDynamic =
  document.getElementById("deliveriesTableBody");


function getPriorityTagClass(priority) {

  if (priority === "emergencial") {
    return "critical-tag";
  }

  if (priority === "essencial") {
    return "essential-tag";
  }

  if (priority === "institucional") {
    return "institutional-tag";
  }

  return "";
}


function getStatusClass(status) {

  if (status === "critico") {
    return "critical-status";
  }

  if (status === "atencao") {
    return "warning-status";
  }

  return "normal-status";
}


extraDeliveries.forEach(delivery => {

  /*
    Evita duplicar as linhas
    caso o código seja executado novamente.
  */

  if (
    document.querySelector(
      `.delivery-row[data-delivery="${delivery.id}"]`
    )
  ) {
    return;
  }


  const row =
    document.createElement("tr");


  row.className =
    "delivery-row";


  row.dataset.delivery =
    delivery.id;

  row.dataset.status =
    delivery.status;

  row.dataset.priority =
    delivery.prioridade;

  row.dataset.modal =
    delivery.modal;


  row.innerHTML = `

    <td>
      <strong class="delivery-id">
        #${delivery.id}
      </strong>
    </td>

    <td>
      ${delivery.tipo}
    </td>

    <td>
      ${delivery.destino}
    </td>

    <td>
      <span class="tag ${getPriorityTagClass(delivery.prioridade)}">
        ${delivery.prioridadeNome}
      </span>
    </td>

    <td>
      ${delivery.modalNome}
    </td>

    <td>
      ${delivery.rota}
    </td>

    <td>
      <strong class="table-eta">
        ${delivery.eta}
      </strong>
    </td>

    <td>
      <span class="status ${getStatusClass(delivery.status)}">
        ${delivery.statusNome}
      </span>
    </td>

    <td>

      <button
        type="button"
        class="row-action"
        aria-label="Ver detalhes da entrega ${delivery.id}"
      >
        →
      </button>

    </td>

  `;


  deliveriesTableBodyDynamic.appendChild(
    row
  );

});


/* =========================
   DADOS DOS NOVOS PAINÉIS
   ========================= */

extraDeliveries.forEach(delivery => {

  deliveryData[delivery.id] = {

    id: `#${delivery.id}`,

    product: delivery.tipo,

    priority:
      delivery.prioridadeNome.toUpperCase(),

    priorityClass:
      delivery.status === "critico"
        ? "critical"
        : delivery.status === "atencao"
          ? "warning"
          : "normal",

    status:
      delivery.statusNome,

    origin:
      "Centro Operacional Manaus",

    destination:
      delivery.destino,

    modal:
      delivery.modalNome,

    route:
      delivery.rota,

    initialEta:
      delivery.eta,

    currentEta:
      delivery.eta,

    delay:
      delivery.status === "critico"
        ? "Ocorrência logística detectada"
        : delivery.status === "atencao"
          ? "Rota em monitoramento"
          : "Operação dentro do previsto",

    reason:
      delivery.status === "critico"
        ? "O sistema identificou risco operacional na rota."
        : delivery.status === "atencao"
          ? "A operação requer acompanhamento."
          : "Nenhuma ocorrência crítica identificada.",

    events: [

      {
        time: "08:20",
        title: "Objeto processado",
        description:
          "Centro Operacional Manaus",
        status: "completed"
      },

      {
        time: "09:10",
        title: "Saiu da unidade",
        description:
          "Transferência iniciada",
        status: "completed"
      },

      {
        time: "10:05",
        title: "Rota iniciada",
        description:
          delivery.rota,
        status: "completed"
      },

      {
        time: "13:40",
        title: "Em trânsito",
        description:
          "Última atualização operacional",
        status: "current"
      },

      {
        time: delivery.eta,
        title: "Previsão de chegada",
        description:
          "ETA calculado pelo sistema",
        status: "pending"
      }

    ]

  };

});


/* ============================================
   PAGINAÇÃO
   ============================================ */

const pageSize =
  document.getElementById("pageSize");

const previousPage =
  document.getElementById("previousPage");

const nextPage =
  document.getElementById("nextPage");

const paginationStart =
  document.getElementById("paginationStart");

const paginationEnd =
  document.getElementById("paginationEnd");

const paginationTotal =
  document.getElementById("paginationTotal");

const paginationPage =
  document.getElementById("paginationPage");
const deliveriesPagination =
  document.getElementById(
    "deliveriesPagination"
  );

let currentDeliveryPage = 1;

let currentSortColumn = null;

let currentSortDirection = "asc";


/* =========================
   PEGAR TODAS AS LINHAS
   ========================= */

function getAllDeliveryRows() {

  return Array.from(
    document.querySelectorAll(
      ".delivery-row"
    )
  );

}


/* =========================
   NORMALIZAÇÃO
   ========================= */

function normalizeTableText(text) {

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );

}


/* =========================
   FILTROS ATUAIS
   ========================= */

function rowMatchesCurrentFilters(row) {

  const search =
    normalizeTableText(
      deliveriesSearch.value.trim()
    );


  const rowText =
    normalizeTableText(
      row.textContent
    );


  const searchMatch =
    search === "" ||
    rowText.includes(search);


  const statusMatch =
    activeStatusFilter === "todos" ||
    row.dataset.status ===
      activeStatusFilter;


  const priorityMatch =
    priorityFilter.value === "todas" ||
    row.dataset.priority ===
      priorityFilter.value;


  const modalMatch =
    modalFilter.value === "todos" ||
    row.dataset.modal ===
      modalFilter.value;


  return (
    searchMatch &&
    statusMatch &&
    priorityMatch &&
    modalMatch
  );

}


/* ============================================
   VALOR PARA ORDENAÇÃO
   ============================================ */

function getDeliverySortValue(
  row,
  column
) {

  const cells =
    row.querySelectorAll("td");


  switch (column) {

    case "id":
      return row.dataset.delivery;

    case "tipo":
      return cells[1]
        ?.textContent.trim() || "";

    case "destino":
      return cells[2]
        ?.textContent.trim() || "";

    case "prioridade": {

      const priorityOrder = {
        emergencial: 1,
        essencial: 2,
        institucional: 3,
        convencional: 4
      };

      return (
        priorityOrder[
          row.dataset.priority
        ] || 99
      );

    }

    case "modal":
      return cells[4]
        ?.textContent.trim() || "";

    case "rota":
      return cells[5]
        ?.textContent.trim() || "";

    case "eta":
      return cells[6]
        ?.textContent.trim() || "";

    case "status":
      return cells[7]
        ?.textContent.trim() || "";

    default:
      return "";

  }

}


/* ============================================
   ORDENAR TABELA
   ============================================ */

function sortDeliveries() {

  if (!currentSortColumn) {
    return;
  }


  const rows =
    getAllDeliveryRows();


  rows.sort((a, b) => {

    let valueA =
      getDeliverySortValue(
        a,
        currentSortColumn
      );

    let valueB =
      getDeliverySortValue(
        b,
        currentSortColumn
      );


    /*
      Se forem números,
      fazemos comparação numérica.
    */

    if (
      typeof valueA === "number" &&
      typeof valueB === "number"
    ) {

      return currentSortDirection === "asc"
        ? valueA - valueB
        : valueB - valueA;

    }


    valueA =
      normalizeTableText(
        String(valueA)
      );

    valueB =
      normalizeTableText(
        String(valueB)
      );


    const result =
      valueA.localeCompare(
        valueB,
        "pt-BR"
      );


    return currentSortDirection === "asc"
      ? result
      : -result;

  });


  rows.forEach(row => {

    deliveriesTableBodyDynamic
      .appendChild(row);

  });

}


/* ============================================
   ATUALIZAR TABELA
   ============================================ */

function refreshDeliveryTable() {

  sortDeliveries();


  const allRows =
    getAllDeliveryRows();


  const filteredRows =
    allRows.filter(
      rowMatchesCurrentFilters
    );


  /*
    Atualizar classes de filtro.
  */

  allRows.forEach(row => {

    const visibleByFilter =
      filteredRows.includes(row);


    row.classList.toggle(
      "filtered-out",
      !visibleByFilter
    );


    row.classList.remove(
      "page-hidden"
    );

  });


  const itemsPerPage =
    Number(
      pageSize.value
    );


  const totalResults =
    filteredRows.length;


  const totalPages =
    Math.max(
      1,
      Math.ceil(
        totalResults /
        itemsPerPage
      )
    );


  if (
    currentDeliveryPage >
    totalPages
  ) {

    currentDeliveryPage =
      totalPages;

  }


  const startIndex =
    (
      currentDeliveryPage - 1
    ) * itemsPerPage;


  const endIndex =
    startIndex +
    itemsPerPage;


  filteredRows.forEach(
    (row, index) => {

      const visibleOnPage =
        index >= startIndex &&
        index < endIndex;


      row.classList.toggle(
        "page-hidden",
        !visibleOnPage
      );

    }
  );


  /* CONTADORES */

  const startDisplay =
    totalResults === 0
      ? 0
      : startIndex + 1;


  const endDisplay =
    Math.min(
      endIndex,
      totalResults
    );


  paginationStart.textContent =
    startDisplay;

  paginationEnd.textContent =
    endDisplay;

  paginationTotal.textContent =
    totalResults;


  paginationPage.textContent =
    `Página ${currentDeliveryPage} de ${totalPages}`;


  deliveriesResultText.textContent =
    totalResults === 1
      ? "1 entrega encontrada"
      : `${totalResults} entregas encontradas`;


  deliveriesCount.textContent =
    allRows.length;


  /* BOTÕES */

  previousPage.disabled =
    currentDeliveryPage <= 1;

  nextPage.disabled =
    currentDeliveryPage >=
    totalPages;


  /* NENHUM RESULTADO */

  if (totalResults === 0) {

    deliveriesTable.style.display =
      "none";

    deliveriesPagination.style.display =
      "none";

    noDeliveries.hidden =
      false;

  } else {

    deliveriesTable.style.display =
      "";

    deliveriesPagination.style.display =
      "";

    noDeliveries.hidden =
      true;

  }

}


/* ============================================
   ORDENAÇÃO NOS CABEÇALHOS
   ============================================ */

const sortButtons =
  document.querySelectorAll(
    ".sort-button"
  );


sortButtons.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      const column =
        button.dataset.sort;


      /*
        Mesma coluna:
        troca ASC / DESC.
      */

      if (
        currentSortColumn ===
        column
      ) {

        currentSortDirection =
          currentSortDirection ===
          "asc"
            ? "desc"
            : "asc";

      } else {

        currentSortColumn =
          column;

        currentSortDirection =
          "asc";

      }


      sortButtons.forEach(item => {

        item.classList.remove(
          "active"
        );


        const icon =
          item.querySelector(
            ".sort-icon"
          );


        if (icon) {
          icon.textContent = "↕";
        }

      });


      button.classList.add(
        "active"
      );


      const icon =
        button.querySelector(
          ".sort-icon"
        );


      if (icon) {

        icon.textContent =
          currentSortDirection ===
          "asc"
            ? "↑"
            : "↓";

      }


      currentDeliveryPage = 1;


      refreshDeliveryTable();

    }
  );

});


/* ============================================
   PAGINAÇÃO
   ============================================ */

previousPage.addEventListener(
  "click",
  () => {

    if (
      currentDeliveryPage > 1
    ) {

      currentDeliveryPage--;

      refreshDeliveryTable();

    }

  }
);


nextPage.addEventListener(
  "click",
  () => {

    currentDeliveryPage++;

    refreshDeliveryTable();

  }
);


pageSize.addEventListener(
  "change",
  () => {

    currentDeliveryPage = 1;

    refreshDeliveryTable();

  }
);


/* ============================================
   ATUALIZAR PAGINAÇÃO QUANDO FILTRAR
   ============================================ */

deliveriesSearch.addEventListener(
  "input",
  () => {

    currentDeliveryPage = 1;

    refreshDeliveryTable();

  }
);


priorityFilter.addEventListener(
  "change",
  () => {

    currentDeliveryPage = 1;

    refreshDeliveryTable();

  }
);


modalFilter.addEventListener(
  "change",
  () => {

    currentDeliveryPage = 1;

    refreshDeliveryTable();

  }
);


filterChips.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      currentDeliveryPage = 1;

      /*
        O código da Etapa 4C
        altera activeStatusFilter.
        Executamos depois dele.
      */

      setTimeout(
        refreshDeliveryTable,
        0
      );

    }
  );

});


clearDeliverySearch.addEventListener(
  "click",
  () => {

    currentDeliveryPage = 1;

    setTimeout(
      refreshDeliveryTable,
      0
    );

  }
);


resetDeliveryFilters.addEventListener(
  "click",
  () => {

    currentDeliveryPage = 1;

    setTimeout(
      refreshDeliveryTable,
      0
    );

  }
);


/* ============================================
   NOVAS LINHAS CLICÁVEIS
   ============================================ */

extraDeliveries.forEach(
  delivery => {

    const row =
      document.querySelector(
        `.delivery-row[data-delivery="${delivery.id}"]`
      );


    if (!row) {
      return;
    }


    row.setAttribute(
      "tabindex",
      "0"
    );


    row.addEventListener(
      "click",
      () => {

        openDeliveryDrawer(
          delivery.id
        );


        /*
          Caso futuramente exista
          marcador dessa entrega.
        */

        if (
          typeof highlightMapDelivery ===
          "function"
        ) {

          highlightMapDelivery(
            delivery.id
          );

        }

      }
    );


    row.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          openDeliveryDrawer(
            delivery.id
          );

        }

      }
    );

  }
);


/* ============================================
   PRIMEIRA RENDERIZAÇÃO
   ============================================ */

refreshDeliveryTable();


/* ============================================
   ETAPA 8C
   SIDEBAR RECOLHÍVEL
   ============================================ */


/* =========================
   ELEMENTOS
   ========================= */

const sidebarToggle =
  document.getElementById("sidebarToggle");

const sidebarToggleIcon =
  document.getElementById("sidebarToggleIcon");

const sidebarToggleText =
  document.querySelector(".sidebar-toggle-text");


/* =========================
   ATUALIZAR BOTÃO
   ========================= */

function updateSidebarButton() {

  const isCollapsed =
    document.body.classList.contains(
      "sidebar-collapsed"
    );


  if (isCollapsed) {

    sidebarToggleIcon.textContent = "›";

    sidebarToggleText.textContent =
      "Expandir menu";

    sidebarToggle.setAttribute(
      "aria-label",
      "Expandir menu lateral"
    );

    sidebarToggle.setAttribute(
      "aria-expanded",
      "false"
    );

  } else {

    sidebarToggleIcon.textContent = "‹";

    sidebarToggleText.textContent =
      "Recolher menu";

    sidebarToggle.setAttribute(
      "aria-label",
      "Recolher menu lateral"
    );

    sidebarToggle.setAttribute(
      "aria-expanded",
      "true"
    );

  }

}


/* =========================
   SALVAR ESTADO
   ========================= */

function saveSidebarState() {

  const isCollapsed =
    document.body.classList.contains(
      "sidebar-collapsed"
    );


  try {

    localStorage.setItem(
      "amazonia-sidebar-collapsed",
      isCollapsed ? "true" : "false"
    );

  } catch (error) {

    console.warn(
      "Não foi possível salvar o estado da sidebar."
    );

  }

}


/* =========================
   ALTERNAR SIDEBAR
   ========================= */

function toggleSidebar() {

  /*
    Em telas pequenas usamos
    o layout responsivo padrão.
  */

  if (window.innerWidth <= 850) {
    return;
  }


  document.body.classList.toggle(
    "sidebar-collapsed"
  );


  updateSidebarButton();

  saveSidebarState();


  /*
    Pequeno aviso para o operador.
  */

  if (
    typeof showToast === "function"
  ) {

    const isCollapsed =
      document.body.classList.contains(
        "sidebar-collapsed"
      );


    showToast(
      isCollapsed
        ? "Menu lateral recolhido."
        : "Menu lateral expandido."
    );

  }

}


/* =========================
   CLIQUE NO BOTÃO
   ========================= */

if (sidebarToggle) {

  sidebarToggle.addEventListener(
    "click",
    toggleSidebar
  );

}


/* =========================
   RESTAURAR PREFERÊNCIA
   ========================= */

function restoreSidebarState() {

  /*
    Em tablet/celular não restauramos
    o modo recolhido do desktop.
  */

  if (window.innerWidth <= 850) {

    document.body.classList.remove(
      "sidebar-collapsed"
    );

    updateSidebarButton();

    return;
  }


  try {

    const savedState =
      localStorage.getItem(
        "amazonia-sidebar-collapsed"
      );


    if (savedState === "true") {

      document.body.classList.add(
        "sidebar-collapsed"
      );

    } else {

      document.body.classList.remove(
        "sidebar-collapsed"
      );

    }

  } catch (error) {

    document.body.classList.remove(
      "sidebar-collapsed"
    );

  }


  updateSidebarButton();

}


/* =========================
   RESPONSIVIDADE
   ========================= */

function handleSidebarResize() {

  if (window.innerWidth <= 850) {

    document.body.classList.remove(
      "sidebar-collapsed"
    );

  } else {

    /*
      Ao voltar para desktop,
      recuperamos a preferência salva.
    */

    try {

      const savedState =
        localStorage.getItem(
          "amazonia-sidebar-collapsed"
        );


      if (savedState === "true") {

        document.body.classList.add(
          "sidebar-collapsed"
        );

      }

    } catch (error) {
      // Mantém estado atual.
    }

  }


  updateSidebarButton();

}


window.addEventListener(
  "resize",
  handleSidebarResize
);


/* =========================
   ESTADO INICIAL
   ========================= */

restoreSidebarState();

/* =====================================================
   ETAPA 9 — ROTAS & MODAIS / MINI MAPA
   Controlador único e limpo
   ===================================================== */

(() => {

  const miniMapPackages = {

    "AMZ-49281": {
      code: "F7",
      name: "Belém → Breves → Gurupá",

      product: "Medicamento",
      weight: "2,4 kg",
      priority: "Emergencial",
      volume: "Pequeno",

      origin: {
        name: "BELÉM",
        x: 650,
        y: 205
      },

      destination: {
        name: "GURUPÁ",
        x: 145,
        y: 155
      },

      stops: [
        {
          name: "Breves",
          x: 390,
          y: 175
        }
      ],

      path:
        "M 650 205 C 555 175 475 185 390 175 C 310 165 235 195 145 155",

paths: {

  /* =============================================
     🚤 AQUAVIÁRIO
     acompanha os canais e faz mais curvas
     ============================================= */

  aquaviario:
    "M 650 205 " +
    "C 610 200 575 188 535 184 " +
    "C 495 180 455 192 420 182 " +
    "C 405 178 398 176 390 175 " +
    "C 350 170 325 185 290 190 " +
    "C 245 198 205 175 170 164 " +
    "C 160 160 152 157 145 155",


  /* =============================================
     🚚 TERRESTRE
     percurso comparativo mais irregular
     ============================================= */

  terrestre:
    "M 650 205 " +
    "L 590 225 " +
    "L 530 212 " +
    "L 470 230 " +
    "L 420 205 " +
    "L 390 175 " +
    "L 330 205 " +
    "L 270 185 " +
    "L 205 175 " +
    "L 145 155",


  /* =============================================
     ✈ AÉREO
     mais direto entre os pontos
     ============================================= */

  aereo:
    "M 650 205 " +
    "Q 520 150 390 175 " +
    "Q 265 145 145 155"

},
      
      recommendedModal: "aereo",
      recommendationScore: 96,

      reason:
        "Carga leve e emergencial. O modal aéreo oferece o menor ETA e capacidade suficiente para este envio.",

      modes: {

        aquaviario: {
          distance: "410 km",
          eta: "13h 20min",
          stages: "3",
          risk: "Médio",
          capacity: "Alta",
          suitability: "78%"
        },

        terrestre: {
          distance: "—",
          eta: "Indisponível",
          stages: "—",
          risk: "Alto",
          capacity: "Média",
          suitability: "18%"
        },

        aereo: {
          distance: "335 km",
          eta: "1h 50min",
          stages: "3",
          risk: "Baixo",
          capacity: "Média",
          suitability: "96%"
        }

      }
    },


    "AMZ-49282": {

      code: "F2",
      name: "Breves → Portel",

      product: "Material escolar",
      weight: "34,5 kg",
      priority: "Essencial",
      volume: "Grande",

      origin: {
        name: "BREVES",
        x: 390,
        y: 165
      },

      destination: {
        name: "PORTEL",
        x: 300,
        y: 270
      },

      stops: [],

      path:
        "M 390 165 C 375 205 340 235 300 270",

paths: {

  /* 🚤 AQUAVIÁRIO
     percurso sinuoso acompanhando canais
  */

  aquaviario:
    "M 390 165 " +
    "C 405 190 385 210 370 225 " +
    "C 355 240 360 255 340 260 " +
    "C 325 265 315 267 300 270",


  /* 🚚 TERRESTRE
     percurso comparativo por estrada
  */

  terrestre:
    "M 390 165 " +
    "L 410 195 " +
    "L 385 220 " +
    "L 365 235 " +
    "L 345 250 " +
    "L 320 250 " +
    "L 300 270",


  /* ✈ AÉREO
     ligação mais direta
  */

  aereo:
    "M 390 165 " +
    "Q 355 200 300 270"

},
      
      recommendedModal: "aquaviario",
      recommendationScore: 95,

      reason:
        "Carga de maior peso. A embarcação apresenta melhor capacidade de transporte e boa adequação ao corredor logístico F2.",

      modes: {

        aquaviario: {
          distance: "135 km",
          eta: "4h 40min",
          stages: "2",
          risk: "Médio",
          capacity: "Alta",
          suitability: "95%"
        },

        terrestre: {
          distance: "170 km",
          eta: "6h 30min",
          stages: "3",
          risk: "Alto",
          capacity: "Média",
          suitability: "55%"
        },

        aereo: {
          distance: "110 km",
          eta: "1h 10min",
          stages: "2",
          risk: "Baixo",
          capacity: "Limitada",
          suitability: "70%"
        }

      }
    },


    "AMZ-49284": {

      code: "F3",
      name: "Breves → Anajás",

      product: "Material médico",
      weight: "18,7 kg",
      priority: "Essencial",
      volume: "Médio",

      origin: {
        name: "BREVES",
        x: 390,
        y: 190
      },

      destination: {
        name: "ANAJÁS",
        x: 465,
        y: 90
      },

      stops: [],

      path:
        "M 390 190 C 410 155 435 120 465 90",

paths: {

  /* 🚤 AQUAVIÁRIO
     acompanha um percurso mais sinuoso
  */

  aquaviario:
    "M 390 190 " +
    "C 400 175 405 160 415 150 " +
    "C 425 140 425 125 438 118 " +
    "C 450 110 455 100 465 90",


  /* 🚚 TERRESTRE
     percurso comparativo por terra
  */

  terrestre:
    "M 390 190 " +
    "L 405 175 " +
    "L 420 165 " +
    "L 420 145 " +
    "L 440 130 " +
    "L 450 110 " +
    "L 465 90",


  /* ✈ AÉREO
     percurso mais direto
  */

  aereo:
    "M 390 190 " +
    "Q 425 135 465 90"

},
      
      recommendedModal: "aquaviario",
      recommendationScore: 92,

      reason:
        "Material médico com peso intermediário. A rota aquaviária oferece capacidade adequada e acesso compatível com o corredor F3.",

      modes: {

        aquaviario: {
          distance: "155 km",
          eta: "5h 10min",
          stages: "2",
          risk: "Médio",
          capacity: "Alta",
          suitability: "92%"
        },

        terrestre: {
          distance: "—",
          eta: "Indisponível",
          stages: "—",
          risk: "Alto",
          capacity: "Média",
          suitability: "24%"
        },

        aereo: {
          distance: "125 km",
          eta: "1h 20min",
          stages: "2",
          risk: "Baixo",
          capacity: "Limitada",
          suitability: "75%"
        }

      }
    },


    "AMZ-49290": {

      code: "F9",
      name: "Portel → Comunidades do Rio Anapu",

      product: "Kit primeiros socorros",
      weight: "12,8 kg",
      priority: "Essencial",
      volume: "Médio",

      origin: {
        name: "PORTEL",
        x: 290,
        y: 205
      },

      destination: {
        name: "RIO ANAPU",
        x: 510,
        y: 275
      },

      stops: [
        {
          name: "Santo Amaro",
          x: 405,
          y: 245
        }
      ],

      path:
        "M 290 205 C 330 220 365 235 405 245 C 445 255 475 265 510 275",

paths: {

  /* 🚤 AQUAVIÁRIO
     acompanha o Rio Anapu
  */

  aquaviario:
    "M 290 205 " +
    "C 320 212 340 232 370 235 " +
    "C 390 238 397 243 405 245 " +
    "C 430 252 445 270 470 268 " +
    "C 485 267 497 272 510 275",


  /* 🚚 TERRESTRE
     percurso comparativo por terra
  */

  terrestre:
    "M 290 205 " +
    "L 325 190 " +
    "L 360 210 " +
    "L 405 245 " +
    "L 440 230 " +
    "L 475 255 " +
    "L 510 275",


  /* ✈ AÉREO
     ligação mais direta
  */

  aereo:
    "M 290 205 " +
    "Q 400 215 510 275"

},
      
      recommendedModal: "aquaviario",
      recommendationScore: 90,

      reason:
        "O destino depende fortemente do acesso fluvial. A embarcação oferece o melhor equilíbrio entre alcance, capacidade e risco operacional.",

      modes: {

        aquaviario: {
          distance: "95 km",
          eta: "3h 30min",
          stages: "3",
          risk: "Médio",
          capacity: "Alta",
          suitability: "90%"
        },

        terrestre: {
          distance: "120 km",
          eta: "6h 10min",
          stages: "4",
          risk: "Alto",
          capacity: "Média",
          suitability: "42%"
        },

        aereo: {
          distance: "82 km",
          eta: "55min",
          stages: "2",
          risk: "Baixo",
          capacity: "Limitada",
          suitability: "76%"
        }

      }
    }

  };


  /* =====================================================
     CONFIGURAÇÃO DOS MODAIS
     ===================================================== */

  const modalConfig = {

    aquaviario: {
      name: "Aquaviário",
      vehicle: "Embarcação",
      icon: "🚤",
      className: "modal-aquaviario",
      color: "#148fd1"
    },

    terrestre: {
      name: "Terrestre",
      vehicle: "Veículo",
      icon: "🚚",
      className: "modal-terrestre",
      color: "#df9a26"
    },

    aereo: {
      name: "Aéreo",
      vehicle: "Aeronave",
      icon: "✈",
      className: "modal-aereo",
      color: "#8264d8"
    }

  };


  /* =====================================================
     ELEMENTOS
     ===================================================== */

  const packageSelect =
    document.getElementById(
      "routeDeliverySelect"
    );


  const routeCodeElement =
    document.getElementById(
      "packageRouteCode"
    );


  const routeNameElement =
    document.getElementById(
      "packageRouteName"
    );


  const activeRoute =
    document.getElementById(
      "packageActiveRoute"
    );


  const mapSvg =
    document.getElementById(
      "packageMapSvg"
    );

  const packageMapContainer =
  mapSvg?.closest(
    ".package-route-map"
  );

  const legendRoute =
    document.querySelector(
      ".package-legend-route"
    );


  const originGroup =
    document.getElementById(
      "packageMapOrigin"
    );


  const destinationGroup =
    document.getElementById(
      "packageMapDestination"
    );


  const originName =
    document.getElementById(
      "packageMapOriginName"
    );


  const destinationName =
    document.getElementById(
      "packageMapDestinationName"
    );


  const stopGroups = [

    document.getElementById(
      "packageIntermediate1"
    ),

    document.getElementById(
      "packageIntermediate2"
    ),

    document.getElementById(
      "packageIntermediate3"
    )

  ];


  const modalCards =
    document.querySelectorAll(
      ".transport-modal-card"
    );


  const previewModal =
    document.getElementById(
      "routePreviewModal"
    );


  const distanceElement =
    document.getElementById(
      "previewDistance"
    );


  const etaElement =
    document.getElementById(
      "previewEta"
    );


  const stagesElement =
    document.getElementById(
      "previewStages"
    );


  const plannerOrigin =
    document.getElementById(
      "routeOrigin"
    );


  const plannerDestination =
    document.getElementById(
      "routeDestination"
    );


  const cargoIdElement =
    document.getElementById(
      "routeCargoId"
    );


  const cargoTypeElement =
    document.getElementById(
      "routeCargoType"
    );


  const cargoWeightElement =
    document.getElementById(
      "routeCargoWeight"
    );


  const cargoPriorityElement =
    document.getElementById(
      "routeCargoPriority"
    );


  const cargoVolumeElement =
    document.getElementById(
      "routeCargoVolume"
    );


  const analyzeButton =
    document.getElementById(
      "calculateRoute"
    );


  const recommendationTitle =
    document.querySelector(
      ".recommendation-main h3"
    );


  const recommendationText =
    document.querySelector(
      ".recommendation-main p"
    );


  const recommendationScore =
    document.querySelector(
      ".recommendation-score strong"
    );


  const zoomIn =
    document.getElementById(
      "packageMapZoomIn"
    );


  const zoomOut =
    document.getElementById(
      "packageMapZoomOut"
    );


  const zoomReset =
    document.getElementById(
      "packageMapReset"
    );


  const zoomLevels = [
    1,
    1.12,
    1.24,
    1.36
  ];


  let currentPackage =
    packageSelect &&
    miniMapPackages[
      packageSelect.value
    ]

      ? packageSelect.value

      : "AMZ-49281";
let currentModal =
  miniMapPackages[
    currentPackage
  ].recommendedModal;

  let zoomIndex = 0;


  /* =====================================================
     RISCO
     ===================================================== */

  function getRiskClass(
    risk
  ) {

    if (
      risk === "Baixo"
    ) {

      return "risk-low";

    }


    if (
      risk === "Médio"
    ) {

      return "risk-medium";

    }


    return "risk-high";

  }


  /* =====================================================
     ORIGEM / DESTINO
     ===================================================== */

/* =====================================================
   ÍCONE DO MODAL NOS PONTOS DO MAPA
   ===================================================== */

const modalPointIcons = {
  aquaviario: "⚓",
  terrestre: "▣",
  aereo: "✈"
};


function updateMapPointIcon(
  group,
  point
) {

  if (
    !group ||
    !point
  ) {
    return;
  }


  let icon =
    group.querySelector(
      ".package-point-modal-icon"
    );


  if (!icon) {

    icon =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );

    icon.setAttribute(
      "class",
      "package-point-modal-icon"
    );

    group.appendChild(
      icon
    );

  }


  icon.setAttribute(
    "x",
    point.x
  );

  icon.setAttribute(
    "y",
    point.y + 1
  );


  icon.textContent =
    modalPointIcons[
      currentModal
    ] || "●";

}
  
  function positionMapPoint(
    group,
    textElement,
    point
  ) {

    if (
      !group ||
      !textElement ||
      !point
    ) {

      return;

    }


    group
      .querySelectorAll(
        "circle"
      )
      .forEach(
        circle => {

          circle.setAttribute(
            "cx",
            point.x
          );


          circle.setAttribute(
            "cy",
            point.y
          );

        }
      );


    textElement.setAttribute(
      "x",
      point.x
    );


    textElement.setAttribute(
      "y",
      point.y + 37
    );


    textElement.textContent =
      point.name;

updateMapPointIcon(
  group,
  point
);
    
  }


  /* =====================================================
     PARADAS
     ===================================================== */

  function updateStops(
    stops
  ) {

    stopGroups.forEach(
      (group, index) => {

        if (
          !group
        ) {

          return;

        }


        const stop =
          stops[index];


        if (
          !stop
        ) {

          group.classList.add(
            "hidden"
          );

          return;

        }


        group.classList.remove(
          "hidden"
        );


        const circle =
          group.querySelector(
            "circle"
          );

/* ÍCONE DA PARADA */

let stopIcon =
  group.querySelector(
    ".package-stop-modal-icon"
  );


if (!stopIcon) {

  stopIcon =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "text"
    );

  stopIcon.setAttribute(
    "class",
    "package-stop-modal-icon"
  );

  group.appendChild(
    stopIcon
  );

}
        
        const text =
          group.querySelector(
            "text"
          );


        if (
          circle
        ) {

          circle.setAttribute(
            "cx",
            stop.x
          );


          circle.setAttribute(
            "cy",
            stop.y
          );

        }


        if (
          text
        ) {

          text.setAttribute(
            "x",
            stop.x
          );


          text.setAttribute(
            "y",
            stop.y - 20
          );


          text.textContent =
            stop.name;

        }

/* POSIÇÃO E SÍMBOLO DA PARADA */

stopIcon.setAttribute(
  "x",
  stop.x
);

stopIcon.setAttribute(
  "y",
  stop.y + 1
);


const stopIconsByModal = {

  aquaviario: "⚓",

  terrestre: "◆",

  aereo: "✈"

};


stopIcon.textContent =
  stopIconsByModal[
    currentModal
  ] || "•";
        
      }
    );

  }


  /* =====================================================
     SINCRONIZAR ORIGEM / DESTINO
     ===================================================== */

  function updatePlannerField(
    element,
    value
  ) {

    if (
      !element
    ) {

      return;

    }


    if (
      element.tagName ===
      "SELECT"
    ) {

      const normalized =
        value
          .trim()
          .toLowerCase();


      let option =
        Array
          .from(
            element.options
          )
          .find(
            item =>

              item.value
                .trim()
                .toLowerCase() ===
                normalized ||

              item.textContent
                .trim()
                .toLowerCase() ===
                normalized

          );


      if (
        !option
      ) {

        option =
          document.createElement(
            "option"
          );


        option.value =
          value;


        option.textContent =
          value;


        element.appendChild(
          option
        );

      }


      element.value =
        option.value;


      return;

    }


    element.value =
      value;

  }


  function updatePlannerRoute(
    route
  ) {

    updatePlannerField(
      plannerOrigin,
      route.origin.name
    );


    updatePlannerField(
      plannerDestination,
      route.destination.name
    );

  }


  /* =====================================================
     CARGA
     ===================================================== */

  function updateCargoInfo(
    route
  ) {

    if (
      cargoIdElement
    ) {

      cargoIdElement.textContent =
        currentPackage;

    }


    if (
      cargoTypeElement
    ) {

      cargoTypeElement.textContent =
        route.product;

    }


    if (
      cargoWeightElement
    ) {

      cargoWeightElement.textContent =
        route.weight;

    }


    if (
      cargoVolumeElement
    ) {

      cargoVolumeElement.textContent =
        route.volume;

    }


    if (
      cargoPriorityElement
    ) {

      cargoPriorityElement.textContent =
        route.priority;


      cargoPriorityElement
        .classList
        .toggle(
          "cargo-critical",
          route.priority ===
            "Emergencial"
        );

    }

  }


  /* =====================================================
     CARDS DE MODAIS
     ===================================================== */

  function updateComparisonCards(
    route
  ) {

    modalCards.forEach(
      card => {

        const modal =
          card.dataset
            .transportModal;


        const data =
          route.modes[
            modal
          ];


        if (
          !data
        ) {

          return;

        }


        const metrics =
          card.querySelectorAll(
            ".modal-metrics > div"
          );


        const eta =
          metrics[0]
            ?.querySelector(
              "strong"
            );


        const risk =
          metrics[1]
            ?.querySelector(
              "strong"
            );


        const capacity =
          metrics[2]
            ?.querySelector(
              "strong"
            );


        const suitability =
          metrics[3]
            ?.querySelector(
              "strong"
            );


        if (
          eta
        ) {

          eta.textContent =
            data.eta;

        }


        if (
          capacity
        ) {

          capacity.textContent =
            data.capacity;

        }


        if (
          suitability
        ) {

          suitability.textContent =
            data.suitability;

        }


        if (
          risk
        ) {

          risk.textContent =
            data.risk;


          risk.classList.remove(
            "risk-low",
            "risk-medium",
            "risk-high"
          );


          risk.classList.add(
            getRiskClass(
              data.risk
            )
          );

        }

      }
    );

  }


  /* =====================================================
     MODAL RECOMENDADO
     ===================================================== */

  function updateRecommendedCard(
    route
  ) {

    modalCards.forEach(
      card => {

        card.classList.remove(
          "recommended"
        );


        card
          .querySelector(
            ".recommended-badge"
          )
          ?.remove();

      }
    );


    const card =
      document.querySelector(
        `[data-transport-modal="${route.recommendedModal}"]`
      );


    if (
      !card
    ) {

      return;

    }


    card.classList.add(
      "recommended"
    );


    const top =
      card.querySelector(
        ".modal-card-top"
      );


    if (
      top
    ) {

      const badge =
        document.createElement(
          "span"
        );


      badge.className =
        "recommended-badge";


      badge.textContent =
        "RECOMENDADO";


      top.appendChild(
        badge
      );

    }

  }


  /* =====================================================
     PAINEL DE RECOMENDAÇÃO
     ===================================================== */

  function updateRecommendationPanel(
    route
  ) {

    const config =
      modalConfig[
        route.recommendedModal
      ];


    if (
      !config
    ) {

      return;

    }


    if (
      recommendationTitle
    ) {

      recommendationTitle.textContent =
        `${config.icon} ${config.vehicle}`;

    }


    if (
      recommendationText
    ) {

      recommendationText.textContent =
        route.reason;

    }


    if (
      recommendationScore
    ) {

      recommendationScore.textContent =
        `${route.recommendationScore}%`;

    }

  }


  /* =====================================================
     SETAS NA ROTA
     ===================================================== */

  function getRouteDirectionArrows() {

    if (
      !mapSvg ||
      !activeRoute
    ) {

      return [];

    }


    let arrows =
      Array.from(
        mapSvg.querySelectorAll(
          ".package-route-direction-arrow"
        )
      );


    if (
      arrows.length
    ) {

      return arrows;

    }


   [
  "24%",
  "50%",
  "76%"
]
      .forEach(
        position => {

          const text =
            document.createElementNS(
              "http://www.w3.org/2000/svg",
              "text"
            );


          text.setAttribute(
            "class",
            "package-route-direction-arrow"
          );


          const textPath =
            document.createElementNS(
              "http://www.w3.org/2000/svg",
              "textPath"
            );


          textPath.setAttribute(
            "href",
            "#packageActiveRoute"
          );


          textPath.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "xlink:href",
            "#packageActiveRoute"
          );


          textPath.setAttribute(
            "startOffset",
            position
          );


          textPath.textContent =
            "➤";


          text.appendChild(
            textPath
          );


          if (
            originGroup &&
            originGroup.parentNode ===
              mapSvg
          ) {

            mapSvg.insertBefore(
              text,
              originGroup
            );

          } else {

            mapSvg.appendChild(
              text
            );

          }

        }
      );


    return Array.from(
      mapSvg.querySelectorAll(
        ".package-route-direction-arrow"
      )
    );

  }


  /* =====================================================
     LEGENDA
     ===================================================== */

  function updateLegend(
    modal,
    color
  ) {

    if (
      !legendRoute
    ) {

      return;

    }


    legendRoute.style.boxShadow =
      `0 0 4px ${color}55`;


    legendRoute.style.background =

      modal === "aereo"

        ? `repeating-linear-gradient(
            90deg,
            ${color} 0 7px,
            transparent 7px 11px
          )`

        : color;

  }


  /* =====================================================
     SELECIONAR MODAL
     ===================================================== */

/* =====================================================
   VEÍCULO SOBRE A ROTA
   ===================================================== */

function updateRouteVehicle(
  config
) {

  if (
    !mapSvg ||
    !activeRoute ||
    !config
  ) {
    return;
  }


  let vehicle =
    document.getElementById(
      "packageRouteVehicle"
    );


  if (!vehicle) {

    vehicle =
      document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );

    vehicle.setAttribute(
      "id",
      "packageRouteVehicle"
    );

    vehicle.setAttribute(
      "class",
      "package-route-vehicle"
    );


    mapSvg.appendChild(
      vehicle
    );

  }


  const totalLength =
    activeRoute.getTotalLength();


  const position =
    activeRoute.getPointAtLength(
      totalLength * 0.55
    );


  vehicle.setAttribute(
    "x",
    position.x
  );

  vehicle.setAttribute(
    "y",
    position.y
  );


  vehicle.textContent =
    config.icon;

}

/* =====================================================
   CENÁRIO VISUAL DO MINI MAPA
   ===================================================== */

function updateModalScene(
  modal
) {

  if (
    !mapSvg ||
    !activeRoute
  ) {
    return;
  }


  const oldScene =
    document.getElementById(
      "packageModalScene"
    );


  if (oldScene) {
    oldScene.remove();
  }


  const scene =
    document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g"
    );


  scene.setAttribute(
    "id",
    "packageModalScene"
  );


  scene.setAttribute(
    "class",
    `package-modal-scene scene-${modal}`
  );


  /* =====================================
     🚤 CENÁRIO AQUAVIÁRIO
     ===================================== */

  if (
    modal === "aquaviario"
  ) {

    scene.innerHTML = `

      <!-- ILHAS -->

      <path
        class="scene-island"
        d="
          M 85 190
          C 115 170 145 174 164 191
          C 145 210 110 214 85 190
          Z
        "
      />

      <path
        class="scene-island"
        d="
          M 470 150
          C 500 133 530 137 548 152
          C 528 170 495 174 470 150
          Z
        "
      />


      <!-- VEGETAÇÃO -->

      <circle
        class="scene-tree"
        cx="100"
        cy="95"
        r="9"
      />

      <circle
        class="scene-tree"
        cx="122"
        cy="103"
        r="12"
      />

      <circle
        class="scene-tree"
        cx="146"
        cy="94"
        r="8"
      />

      <circle
        class="scene-tree"
        cx="590"
        cy="80"
        r="11"
      />

      <circle
        class="scene-tree"
        cx="615"
        cy="91"
        r="8"
      />

      <circle
        class="scene-tree"
        cx="640"
        cy="82"
        r="12"
      />

      <circle
        class="scene-tree"
        cx="210"
        cy="275"
        r="10"
      />

      <circle
        class="scene-tree"
        cx="235"
        cy="282"
        r="8"
      />

      <circle
        class="scene-tree"
        cx="260"
        cy="274"
        r="11"
      />


      <!-- PEQUENOS CANAIS -->

      <path
        class="scene-water-channel"
        d="
          M 55 250
          C 110 220 145 235 185 210
        "
      />

      <path
        class="scene-water-channel"
        d="
          M 575 285
          C 610 255 655 260 700 225
        "
      />

    `;

  }

  /* =====================================
   🚚 CENÁRIO TERRESTRE
   ===================================== */

if (
  modal === "terrestre"
) {

  scene.innerHTML = `

    <!-- RELEVO -->

    <path
      class="scene-hill"
      d="
        M 40 115
        Q 95 65 150 115
        Q 205 70 260 118
        L 260 150
        L 40 150
        Z
      "
    />

    <path
      class="scene-hill secondary"
      d="
        M 500 95
        Q 550 55 600 100
        Q 650 65 710 105
        L 710 145
        L 500 145
        Z
      "
    />


    <!-- ESTRADA SECUNDÁRIA -->

    <path
      class="scene-road"
      d="
        M 30 275
        C 120 235 185 250 250 220
        C 330 185 405 205 470 180
        C 545 150 620 170 730 130
      "
    />


    <!-- VEGETAÇÃO LATERAL -->

    <circle
      class="scene-bush"
      cx="95"
      cy="255"
      r="11"
    />

    <circle
      class="scene-bush"
      cx="120"
      cy="250"
      r="8"
    />

    <circle
      class="scene-bush"
      cx="675"
      cy="190"
      r="10"
    />

    <circle
      class="scene-bush"
      cx="700"
      cy="180"
      r="8"
    />


    <!-- PONTOS URBANOS -->

    <rect
      class="scene-building"
      x="175"
      y="115"
      width="18"
      height="16"
      rx="2"
    />

    <rect
      class="scene-building"
      x="198"
      y="108"
      width="14"
      height="23"
      rx="2"
    />

    <rect
      class="scene-building"
      x="560"
      y="225"
      width="18"
      height="16"
      rx="2"
    />

    <rect
      class="scene-building"
      x="583"
      y="215"
      width="15"
      height="26"
      rx="2"
    />

  `;

}

/* =====================================
   ✈ CENÁRIO AÉREO
   ===================================== */

if (
  modal === "aereo"
) {

  scene.innerHTML = `

    <!-- RELEVO SUAVE -->

    <path
      class="scene-air-ridge"
      d="
        M 20 250
        Q 95 190 165 240
        Q 235 175 315 235
        Q 390 185 470 240
        Q 555 175 740 235
        L 740 330
        L 20 330
        Z
      "
    />


    <!-- CLAREIRAS -->

    <ellipse
      class="scene-clearing"
      cx="180"
      cy="105"
      rx="48"
      ry="24"
    />

    <ellipse
      class="scene-clearing"
      cx="570"
      cy="245"
      rx="55"
      ry="27"
    />


    <!-- NUVEM 1 -->

    <g
      class="scene-cloud"
      transform="translate(80 55)"
    >

      <ellipse
        cx="0"
        cy="10"
        rx="34"
        ry="16"
      />

      <circle
        cx="-16"
        cy="3"
        r="14"
      />

      <circle
        cx="4"
        cy="-4"
        r="19"
      />

      <circle
        cx="23"
        cy="5"
        r="13"
      />

    </g>


    <!-- NUVEM 2 -->

    <g
      class="scene-cloud"
      transform="translate(650 95)"
    >

      <ellipse
        cx="0"
        cy="10"
        rx="38"
        ry="17"
      />

      <circle
        cx="-18"
        cy="3"
        r="15"
      />

      <circle
        cx="5"
        cy="-5"
        r="20"
      />

      <circle
        cx="25"
        cy="5"
        r="14"
      />

    </g>


    <!-- SOMBRAS DAS NUVENS -->

    <ellipse
      class="scene-cloud-shadow"
      cx="92"
      cy="95"
      rx="42"
      ry="12"
    />

    <ellipse
      class="scene-cloud-shadow"
      cx="660"
      cy="137"
      rx="46"
      ry="13"
    />


    <!-- PEQUENA ÁREA DE POUSO / APOIO -->

    <rect
      class="scene-airstrip"
      x="350"
      y="268"
      width="75"
      height="7"
      rx="3"
      transform="rotate(-8 387 271)"
    />

  `;

}
  
  mapSvg.insertBefore(
    scene,
    activeRoute
  );

}
  
  function selectPackageModal(
    modal
  ) {

    const route =
      miniMapPackages[
        currentPackage
      ];


    const config =
      modalConfig[
        modal
      ];


    const metrics =
      route
        ?.modes
        ?.[modal];


    if (
      !route ||
      !config ||
      !metrics
    ) {

      return;

    }

    currentModal =
  modal;

updateMapPointIcon(
  originGroup,
  route.origin
);

updateMapPointIcon(
  destinationGroup,
  route.destination
);

updateStops(
  route.stops
);

    
    /* ================================================
   TROCAR GEOMETRIA DA ROTA PELO MODAL
   ================================================ */

if (
  activeRoute &&
  route.paths &&
  route.paths[
    currentModal
  ]
) {

  activeRoute.setAttribute(
    "d",
    route.paths[
      currentModal
    ]
  );

}

/* VEÍCULO SOBRE A ROTA */

updateRouteVehicle(
  config
);

updateModalScene(
  modal
);
    
    /* ================================================
   VISUAL DO MAPA POR MODAL
   ================================================ */

if (packageMapContainer) {

  packageMapContainer.classList.remove(
    "map-aquaviario",
    "map-terrestre",
    "map-aereo"
  );

  packageMapContainer.classList.add(
    `map-${modal}`
  );

}

    if (
      activeRoute
    ) {

      activeRoute.classList.remove(
        "modal-aquaviario",
        "modal-terrestre",
        "modal-aereo"
      );


      activeRoute.classList.add(
        config.className
      );

    }


    const markerArrow =
      document.querySelector(
        "#packageRouteArrow path"
      );


    if (
      markerArrow
    ) {

      markerArrow.style.fill =
        config.color;

    }


    getRouteDirectionArrows()
      .forEach(
        arrow => {

          arrow.style.fill =
            config.color;

        }
      );


    updateLegend(
      modal,
      config.color
    );


    modalCards.forEach(
      card => {

        card.classList.toggle(

          "active",

          card.dataset
            .transportModal ===
            modal

        );

      }
    );


    if (
      previewModal
    ) {

      const icon =
        previewModal.querySelector(
          "span"
        );


      const name =
        previewModal.querySelector(
          "strong"
        );


      if (
        icon
      ) {

        icon.textContent =
          config.icon;

      }


      if (
        name
      ) {

        name.textContent =
          config.name;

      }

    }


    if (
      distanceElement
    ) {

      distanceElement.textContent =
        metrics.distance;

    }


    if (
      etaElement
    ) {

      etaElement.textContent =
        metrics.eta;

    }


    if (
      stagesElement
    ) {

      stagesElement.textContent =
        metrics.stages;

    }

  }


  /* =====================================================
     ZOOM
     ===================================================== */

  function applyPackageMapZoom() {

    if (
      !mapSvg
    ) {

      return;

    }


    mapSvg.style.transform =
      `scale(${zoomLevels[zoomIndex]})`;


    if (
      zoomOut
    ) {

      zoomOut.disabled =
        zoomIndex === 0;

    }


    if (
      zoomIn
    ) {

      zoomIn.disabled =
        zoomIndex ===
        zoomLevels.length - 1;

    }

  }


  function resetPackageMapZoom() {

    zoomIndex = 0;

    applyPackageMapZoom();

  }


  /* =====================================================
     DESENHAR PACOTE
     ===================================================== */

  function drawSelectedPackage() {

    const route =
      miniMapPackages[
        currentPackage
      ];


    if (
      !route
    ) {

      return;

    }

    /* MODAL INICIAL DO PEDIDO */

currentModal =
  route.recommendedModal;

    if (
      packageSelect &&
      packageSelect.value !==
        currentPackage
    ) {

      packageSelect.value =
        currentPackage;

    }


    if (
      routeCodeElement
    ) {

      routeCodeElement.textContent =
        route.code;

    }


    if (
      routeNameElement
    ) {

      routeNameElement.textContent =
        route.name;

    }


   if (
  activeRoute
) {

  const selectedPath =
    route.paths?.[
      currentModal
    ] ||
    route.path;


  if (selectedPath) {

    activeRoute.setAttribute(
      "d",
      selectedPath
    );

  }

}


    positionMapPoint(
      originGroup,
      originName,
      route.origin
    );


    positionMapPoint(
      destinationGroup,
      destinationName,
      route.destination
    );


    updateStops(
      route.stops
    );


    updatePlannerRoute(
      route
    );


    updateCargoInfo(
      route
    );


    updateComparisonCards(
      route
    );


    updateRecommendedCard(
      route
    );


    updateRecommendationPanel(
      route
    );


    selectPackageModal(
      route.recommendedModal
    );


    resetPackageMapZoom();

  }


  /* =====================================================
     EVENTOS
     ===================================================== */

  packageSelect
    ?.addEventListener(
      "change",
      () => {

        if (
          !miniMapPackages[
            packageSelect.value
          ]
        ) {

          return;

        }


        currentPackage =
          packageSelect.value;


        drawSelectedPackage();

      }
    );


  modalCards.forEach(
    card => {

      card.addEventListener(
        "click",
        () => {

          selectPackageModal(
            card.dataset
              .transportModal
          );

        }
      );

    }
  );


  zoomIn
    ?.addEventListener(
      "click",
      () => {

        if (
          zoomIndex >=
          zoomLevels.length - 1
        ) {

          return;

        }


        zoomIndex++;

        applyPackageMapZoom();

      }
    );


  zoomOut
    ?.addEventListener(
      "click",
      () => {

        if (
          zoomIndex <= 0
        ) {

          return;

        }


        zoomIndex--;

        applyPackageMapZoom();

      }
    );


  zoomReset
    ?.addEventListener(
      "click",
      resetPackageMapZoom
    );


  analyzeButton
    ?.addEventListener(
      "click",
      () => {

        const route =
          miniMapPackages[
            currentPackage
          ];


        if (
          !route
        ) {

          return;

        }


        const originalText =
          analyzeButton
            .textContent;


        analyzeButton.disabled =
          true;


        analyzeButton.textContent =
          "◌ Analisando rota...";


        setTimeout(
          () => {

            updateRecommendedCard(
              route
            );


            updateRecommendationPanel(
              route
            );


            selectPackageModal(
              route.recommendedModal
            );


            analyzeButton.textContent =
              "✓ Melhor rota calculada";


            if (
              typeof showToast ===
              "function"
            ) {

              showToast(
                "Melhor rota calculada."
              );

            }


            setTimeout(
              () => {

                analyzeButton.textContent =
                  originalText;


                analyzeButton.disabled =
                  false;

              },
              1200
            );

          },
          650
        );

      }
    );


  /* =====================================================
     INICIALIZAÇÃO
     ===================================================== */

  drawSelectedPackage();

  applyPackageMapZoom();

})();/* =====================================================
   ETAPA 10A.4
   MAPA OPERACIONAL LEAFLET
   ===================================================== */

(() => {

  const mapElement =
    document.getElementById(
      "operationalMap"
    );


  /*
    Se o elemento não existir
    ou o Leaflet não tiver carregado,
    não executamos o mapa.
  */

  if (
    !mapElement ||
    typeof L === "undefined"
  ) {

    console.warn(
      "Mapa Leaflet não pôde ser iniciado."
    );

    return;

  }


  /*
    Evita erro caso o projeto seja
    recarregado pelo CodePen.
  */

  if (
    window.operationalLeafletMap
  ) {

    window.operationalLeafletMap.remove();

  }


  /* ===================================================
     CRIAR MAPA
     =================================================== */

  const operationalMap =
    L.map(
      "operationalMap",
      {

        zoomControl: false,

        minZoom: 4,

        maxZoom: 18

      }
    );


  /*
    Visão inicial focada no Pará.
  */

  /* ===================================================
   ENQUADRAMENTO INICIAL DA OPERAÇÃO
   =================================================== */

const operationalInitialBounds =
  L.latLngBounds(
    [
      [-6.2, -56.6],
      [0.4, -47.3]
    ]
  );


operationalMap.fitBounds(
  operationalInitialBounds,
  {
    padding: [
      20,
      20
    ]
  }
);
/* ===================================================
   BOTÃO CENTRALIZAR OPERAÇÃO
   =================================================== */

const OperationalCenterControl =
  L.Control.extend({

    options: {
      position: "bottomright"
    },


    onAdd: function() {

      const button =
        L.DomUtil.create(
          "button",
          "operational-center-control"
        );


      button.type =
        "button";


      button.innerHTML =
        "⌖";


      button.title =
        "Centralizar operação";


      button.setAttribute(
        "aria-label",
        "Centralizar operação"
      );


      L.DomEvent
        .disableClickPropagation(
          button
        );


      L.DomEvent.on(
        button,
        "click",
        () => {

          operationalMap.fitBounds(
            operationalInitialBounds,
            {
              padding: [
                20,
                20
              ]
            }
          );

        }
      );


      return button;

    }

  });


const operationalCenterControl =
  new OperationalCenterControl();


operationalCenterControl.addTo(
  operationalMap
);

  /* ===================================================
     MAPA BASE
     =================================================== */

  L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

      maxZoom: 19,

      attribution:
        '&copy; OpenStreetMap contributors'

    }

  ).addTo(
    operationalMap
  );/* ===================================================
   PRIMEIRO PONTO OPERACIONAL REAL
   BELÉM - PA
   =================================================== */

/* ===================================================
   CAMADA DE HUBS OPERACIONAIS
   =================================================== */

const hubLayer =
  L.layerGroup()
    .addTo(
      operationalMap
    );


/* =================================f==================
   BASE DE HUBS
   Coordenadas aproximadas dos centros urbanos
   para o protótipo operacional.
   =================================================== */

const operationalHubs = [

  {
    id: "HUB-BEL",
    name: "Belém",
    type: "principal",
    typeName: "Hub principal",
    lat: -1.4558,
    lng: -48.4902,
    description:
      "Centro principal de consolidação e distribuição."
  },

  {
    id: "HUB-STM",
    name: "Santarém",
    type: "principal",
    typeName: "Hub principal",
    lat: -2.4385,
    lng: -54.6996,
    description:
      "Hub regional para atendimento do oeste do Pará."
  },

  {
    id: "HUB-MAB",
    name: "Marabá",
    type: "principal",
    typeName: "Hub principal",
    lat: -5.3815,
    lng: -49.1323,
    description:
      "Hub estratégico para o sudeste paraense."
  },

  {
    id: "HUB-ATM",
    name: "Altamira",
    type: "principal",
    typeName: "Hub principal",
    lat: -3.2041,
    lng: -52.2094,
    description:
      "Hub regional de conexão com a região do Xingu."
  },


  /* APOIO / TRANSBORDO */

  {
    id: "HUB-BVS",
    name: "Breves",
    type: "apoio",
    typeName: "Hub de apoio",
    lat: -1.6804,
    lng: -50.4791,
    description:
      "Ponto de transbordo estratégico do arquipélago do Marajó."
  },

  {
    id: "HUB-ITB",
    name: "Itaituba",
    type: "apoio",
    typeName: "Hub de apoio",
    lat: -4.2761,
    lng: -55.9836,
    description:
      "Ponto de apoio para corredores do sudoeste paraense."
  },

  {
    id: "HUB-TUC",
    name: "Tucuruí",
    type: "apoio",
    typeName: "Hub de apoio",
    lat: -3.7657,
    lng: -49.6773,
    description:
      "Ponto de apoio e transferência regional."
  },

  {
    id: "HUB-ABA",
    name: "Abaetetuba",
    type: "apoio",
    typeName: "Hub de apoio",
    lat: -1.7218,
    lng: -48.8788,
    description:
      "Apoio logístico próximo ao corredor de Belém."
  },


  /* MICRO-HUBS */

  {
    id: "HUB-POR",
    name: "Portel",
    type: "micro",
    typeName: "Micro-hub",
    lat: -1.9364,
    lng: -50.8211,
    description:
      "Micro-hub para distribuição a comunidades do entorno."
  },

  {
    id: "HUB-ORX",
    name: "Oriximiná",
    type: "micro",
    typeName: "Micro-hub",
    lat: -1.7656,
    lng: -55.8661,
    description:
      "Micro-hub de apoio ao extremo oeste."
  },

  {
    id: "HUB-CAM",
    name: "Cametá",
    type: "micro",
    typeName: "Micro-hub",
    lat: -2.2444,
    lng: -49.4958,
    description:
      "Micro-hub para atendimento regional."
  },

  {
    id: "HUB-AFU",
    name: "Afuá",
    type: "micro",
    typeName: "Micro-hub norte",
    lat: -0.1567,
    lng: -50.3861,
    description:
      "Ponto estratégico para ampliar a cobertura ao norte do Pará."
  }

];


/* ===================================================
   ESTILO DOS HUBS
   =================================================== */

/* ===================================================
   ETAPA 10J.2
   ÍCONE DOS HUBS
   =================================================== */

function createHubIcon(
  hub
) {

  let size = 24;

  let hubClass =
    "hub-micro";


  if (
    hub.type === "principal"
  ) {

    size = 30;

    hubClass =
      "hub-principal";

  }


  if (
    hub.type === "apoio"
  ) {

    size = 26;

    hubClass =
      "hub-apoio";

  }


  return L.divIcon({

    className:
      `hub-symbol-marker ${hubClass}`,

    html: `
      <div class="hub-symbol-inner">
        ◆
      </div>
    `,

    iconSize: [
      size,
      size
    ],

    iconAnchor: [
      size / 2,
      size / 2
    ]

  });

}
/* ===================================================
   CRIAR HUBS NO MAPA
   =================================================== */

operationalHubs.forEach(
  hub => {

   const marker =
  L.marker(
    [
      hub.lat,
      hub.lng
    ],
    {
      icon:
        createHubIcon(
          hub
        )
    }
  );


    /* POPUP AO CLICAR */

    marker.bindPopup(`
      <div class="operational-map-popup">

        <span class="popup-label">
          ${hub.typeName.toUpperCase()}
        </span>

        <strong>
          ${hub.name} - PA
        </strong>

        <small>
          ${hub.description}
        </small>

      </div>
    `);


    /* NOME AO PASSAR O MOUSE */

    marker.bindTooltip(
      hub.name,
      {
        direction: "top",
        offset: [0, -8],
        opacity: 0.95
      }
    );


    /* ADICIONAR À CAMADA */

    marker.addTo(
      hubLayer
    );

  }
);


/* Guardar camada para etapas futuras */

window.operationalHubLayer =
  hubLayer;
  
/* ===================================================
   ETAPA 10C
   CAMADA DE ENTREGAS / PACOTES
   =================================================== */

const deliveryLayer =
  L.layerGroup()
    .addTo(
      operationalMap
    );


/* ===================================================
   ENTREGAS SIMULADAS NO PARÁ
   =================================================== */

const operationalDeliveries = [

  {
    id: "AMZ-49281",
    product: "Medicamento crítico",
    status: "critical",
    statusName: "Crítico",
    lat: -1.55,
    lng: -49.15
  },

  {
    id: "AMZ-49282",
    product: "Material escolar",
    status: "normal",
    statusName: "Normal",
    lat: -1.82,
    lng: -50.15
  },

  {
    id: "AMZ-49284",
    product: "Material médico",
    status: "warning",
    statusName: "Atenção",
    lat: -1.25,
    lng: -50.05
  },

  {
    id: "AMZ-49290",
    product: "Kit primeiros socorros",
    status: "warning",
    statusName: "Atenção",
    lat: -2.05,
    lng: -50.95
  }

];


/* ===================================================
   ESTILO POR STATUS
   =================================================== */

/* ===================================================
   ETAPA 10J.3
   ÍCONE DAS ENTREGAS
   =================================================== */

function createDeliveryIcon(
  delivery
) {

  let deliveryClass =
    "delivery-normal";


  if (
    delivery.status === "critical"
  ) {

    deliveryClass =
      "delivery-critical";

  }


  if (
    delivery.status === "warning"
  ) {

    deliveryClass =
      "delivery-warning";

  }


  return L.divIcon({

    className:
      `delivery-package-marker ${deliveryClass}`,

    html: `
      <div class="delivery-package-inner">
        📦
      </div>
    `,

    iconSize: [
      27,
      27
    ],

    iconAnchor: [
      13.5,
      13.5
    ]

  });

}


/* ===================================================
   CRIAR ENTREGAS NO MAPA
   =================================================== */

operationalDeliveries.forEach(
  delivery => {

   const marker =
  L.marker(
    [
      delivery.lat,
      delivery.lng
    ],
    {
      icon:
        createDeliveryIcon(
          delivery
        )
    }
  );


    marker.bindTooltip(
      `${delivery.id} • ${delivery.product}`,
      {
        direction: "top",
        offset: [0, -8],
        opacity: 0.96
      }
    );


    /* ===================================================
   CLIQUE NA ENTREGA
   ABRIR PAINEL DE DETALHES
   =================================================== */

marker.on(
  "click",
  () => {

    if (
      typeof openDeliveryDrawer ===
      "function"
    ) {

      openDeliveryDrawer(
        delivery.id
      );

    }


    if (
      typeof addLog ===
      "function"
    ) {

      addLog(
        `Entrega #${delivery.id} selecionada no mapa operacional.`,
        "blue"
      );

    }

  }
);


    marker.addTo(
      deliveryLayer
    );

  }
);


/* Guardar camada para controles futuros */

window.operationalDeliveryLayer =
  deliveryLayer;
  /* ===================================================
   ETAPA 10D.1
   CAMADA DE ROTAS OPERACIONAIS
   =================================================== */

const routeLayer =
  L.layerGroup()
    .addTo(
      operationalMap
    );


/* ===================================================
   ROTAS OPERACIONAIS DO PROTÓTIPO
   =================================================== */

const operationalRoutes = [

  {
    id: "F7",
    name: "Belém → Breves → Gurupá",
    modal: "Aquaviário",
    modalType: "aquaviario",
    status: "warning",
    statusName: "Atenção",

    points: [
      [-1.4558, -48.4902],  // Belém
      [-1.6804, -50.4791],  // Breves
      [-1.4050, -51.6400]   // Gurupá
    ]
  },


  {
    id: "F2",
    name: "Breves → Portel",
    modal: "Aquaviário",
    modalType: "aquaviario",
    status: "normal",
    statusName: "Normal",

    points: [
      [-1.6804, -50.4791],  // Breves
      [-1.9364, -50.8211]   // Portel
    ]
  },


  {
    id: "F4",
    name: "Belém → Abaetetuba → Cametá",
    modal: "Terrestre",
    modalType: "terrestre",
    status: "normal",
    statusName: "Normal",

    points: [
      [-1.4558, -48.4902],  // Belém
      [-1.7218, -48.8788],  // Abaetetuba
      [-2.2444, -49.4958]   // Cametá
    ]
  },


  {
    id: "F6",
    name: "Santarém → Itaituba",
    modal: "Terrestre",
    modalType: "terrestre",
    status: "warning",
    statusName: "Atenção",

    points: [
      [-2.4385, -54.6996],  // Santarém
      [-4.2761, -55.9836]   // Itaituba
    ]
  },


  {
    id: "F8",
    name: "Altamira → Tucuruí → Marabá",
    modal: "Aéreo",
    modalType: "aereo",
    status: "critical",
    statusName: "Crítico",

    points: [
      [-3.2041, -52.2094],  // Altamira
      [-3.7657, -49.6773],  // Tucuruí
      [-5.3815, -49.1323]   // Marabá
    ]
  }

];


/* ===================================================
   COR DA ROTA POR CONDIÇÃO
   =================================================== */

function getRouteStyle(
  status,
  modalType
) {

  let color =
    "#28c98b";


  /* CONDIÇÃO CRÍTICA */

  if (
    status === "critical"
  ) {

    color =
      "#ef5964";

  }


  /* CONDIÇÃO DE ATENÇÃO */

  if (
    status === "warning"
  ) {

    color =
      "#f2bd3d";

  }


  /* ESTILO BASE */

  const style = {

    color: color,

    weight: 4,

    opacity: 0.9,

    lineCap: "round",

    lineJoin: "round",

    className:
      `operational-route route-${modalType}`

  };


  /* TERRESTRE
     linha tracejada */

  if (
    modalType ===
    "terrestre"
  ) {

    style.dashArray =
      "8 7";

  }


  /* AÉREO
     traços maiores */

  if (
    modalType ===
    "aereo"
  ) {

    style.dashArray =
      "18 10";

  }


  return style;

}
/* ===================================================
   ETAPA 10J.4
   DIREÇÃO DAS ROTAS
   =================================================== */

function getRouteArrowPosition(
  route,
  progress
) {

  if (
    !route ||
    !route.points ||
    route.points.length < 2
  ) {

    return null;

  }


  const segments = [];

  let totalDistance = 0;


  for (
    let i = 0;
    i < route.points.length - 1;
    i++
  ) {

    const start =
      L.latLng(
        route.points[i]
      );


    const end =
      L.latLng(
        route.points[i + 1]
      );


    const distance =
      start.distanceTo(
        end
      );


    segments.push({
      start,
      end,
      distance
    });


    totalDistance +=
      distance;

  }


  const safeProgress =
    Math.max(
      0,
      Math.min(
        1,
        progress
      )
    );


  const targetDistance =
    totalDistance *
    safeProgress;


  let travelled = 0;


  for (
    const segment of segments
  ) {

    if (
      targetDistance <=
      travelled +
      segment.distance
    ) {

      const localProgress =

        segment.distance === 0

          ? 0

          : (
              targetDistance -
              travelled
            ) /
            segment.distance;


      const lat =
        segment.start.lat +
        (
          segment.end.lat -
          segment.start.lat
        ) *
        localProgress;


      const lng =
        segment.start.lng +
        (
          segment.end.lng -
          segment.start.lng
        ) *
        localProgress;


      /*
        Ângulo visual da seta.
        0° aponta para a direita.
      */

      const angle =
        Math.atan2(
          -(
            segment.end.lat -
            segment.start.lat
          ),
          segment.end.lng -
          segment.start.lng
        ) *
        180 /
        Math.PI;


      return {

        position: [
          lat,
          lng
        ],

        angle: angle

      };

    }


    travelled +=
      segment.distance;

  }


  return null;

}


/* ===================================================
   ÍCONE DA SETA
   =================================================== */

function createRouteArrowIcon(
  color,
  angle
) {

  return L.divIcon({

    className:
      "route-direction-marker",

    html: `
      <div
        class="route-direction-arrow"
        style="
          color: ${color};
          transform: rotate(${angle}deg);
        "
      >
        ➤
      </div>
    `,

    iconSize: [
      18,
      18
    ],

    iconAnchor: [
      9,
      9
    ]

  });

}

/* ===================================================
   DESENHAR ROTAS
   =================================================== */

operationalRoutes.forEach(
  route => {

   const line =
  L.polyline(
    route.points,
    getRouteStyle(
      route.status,
      route.modalType
    )
  );


    line.bindTooltip(
      `${route.id} • ${route.name}`,
      {
        sticky: true,
        opacity: 0.96
      }
    );


    line.bindPopup(`
      <div class="operational-map-popup">

        <span class="popup-label">
          ROTA ${route.id}
        </span>

        <strong>
          ${route.name}
        </strong>

        <small>
          Modal: ${route.modal}
        </small>

        <small>
          Condição: ${route.statusName}
        </small>

      </div>
    `);


    line.addTo(
  routeLayer
);


/* ==========================================
   SETAS DE DIREÇÃO DA ROTA
   ========================================== */

const routeColor =
  getRouteStyle(
    route.status,
    route.modalType
  ).color;


[
  0.35,
  0.70
].forEach(
  progress => {

    const arrowData =
      getRouteArrowPosition(
        route,
        progress
      );


    if (
      !arrowData
    ) {

      return;

    }


    const arrowMarker =
      L.marker(
        arrowData.position,
        {
          icon:
            createRouteArrowIcon(
              routeColor,
              arrowData.angle
            ),

          interactive: false,

          keyboard: false
        }
      );


    arrowMarker.addTo(
      routeLayer
    );

  }
);


/* FECHA operationalRoutes.forEach */

  }
);

/* Guardar camada para controles futuros */

window.operationalRouteLayer =
  routeLayer;

  /* ===================================================
   ETAPA 10E.1
   TRANSPORTES EM ROTA
   =================================================== */

const transportLayer =
  L.layerGroup()
    .addTo(
      operationalMap
    );


/* ===================================================
   TRANSPORTES SIMULADOS
   =================================================== */

const operationalTransports = [

  {
  id: "AM-07",
  type: "aquaviario",
  name: "Embarcação AM-07",
  icon: "🚤",
  route: "F7",
  status: "Em operação",

  progress: 0.30,
  speed: 0.004,
  direction: 1,

  lat: -1.58,
  lng: -49.45
},


  {
  id: "TR-04",
  type: "terrestre",
  name: "Veículo TR-04",
  icon: "🚚",
  route: "F4",
  status: "Em operação",

  progress: 0.45,
  speed: 0.003,
  direction: 1,

  lat: -1.78,
  lng: -49.05
},


  {
  id: "AE-03",
  type: "aereo",
  name: "Aeronave AE-03",
  icon: "✈",
  route: "F8",
  status: "Em operação",

  progress: 0.25,
  speed: 0.006,
  direction: 1,

  lat: -3.65,
  lng: -50.85
}

];

  /* ===================================================
   CALCULAR POSIÇÃO AO LONGO DA ROTA
   =================================================== */

function getPositionAlongRoute(
  routeId,
  progress
) {

  const route =
    operationalRoutes.find(
      item =>
        item.id === routeId
    );


  if (
    !route ||
    !route.points ||
    route.points.length < 2
  ) {

    return null;

  }


  /*
    Mantém o progresso entre
    0 e 1.
  */

  const safeProgress =
    Math.max(
      0,
      Math.min(
        1,
        progress
      )
    );


  /*
    Calculamos o comprimento
    real de cada trecho.
  */

  const segments = [];

  let totalDistance = 0;


  for (
    let i = 0;
    i < route.points.length - 1;
    i++
  ) {

    const start =
      L.latLng(
        route.points[i]
      );


    const end =
      L.latLng(
        route.points[i + 1]
      );


    const distance =
      start.distanceTo(
        end
      );


    segments.push({
      start,
      end,
      distance
    });


    totalDistance +=
      distance;

  }


  /*
    Distância que o transporte
    já percorreu na rota.
  */

  const targetDistance =
    totalDistance *
    safeProgress;


  let travelled = 0;


  for (
    const segment of segments
  ) {

    const nextDistance =
      travelled +
      segment.distance;


    if (
      targetDistance <=
      nextDistance
    ) {

      const segmentProgress =

        segment.distance === 0

          ? 0

          : (
              targetDistance -
              travelled
            ) /
            segment.distance;


      const lat =
        segment.start.lat +
        (
          segment.end.lat -
          segment.start.lat
        ) *
        segmentProgress;


      const lng =
        segment.start.lng +
        (
          segment.end.lng -
          segment.start.lng
        ) *
        segmentProgress;


      return [
        lat,
        lng
      ];

    }


    travelled =
      nextDistance;

  }


  /*
    Segurança:
    caso chegue exatamente ao fim.
  */

  return route.points[
    route.points.length - 1
  ];

}

/* ===================================================
   CRIAR ÍCONE DO TRANSPORTE
   =================================================== */

function createTransportIcon(
  transport
) {

  return L.divIcon({

    className:
      `transport-marker transport-${transport.type}`,

    html: `
  <div class="transport-marker-inner">

    <span class="transport-symbol">

      ${
        transport.type === "aquaviario"
          ? "⛴"
          : transport.type === "terrestre"
            ? "▣"
            : "✈"
      }

    </span>

  </div>
`,

    iconSize: [
      36,
      36
    ],

    iconAnchor: [
      18,
      18
    ]

  });

}


/* ===================================================
   COLOCAR TRANSPORTES NO MAPA
   =================================================== */

operationalTransports.forEach(
  transport => {

    const calculatedPosition =
  getPositionAlongRoute(
    transport.route,
    transport.progress
  );


const initialPosition =
  calculatedPosition || [
    transport.lat,
    transport.lng
  ];


const marker =
  L.marker(
    initialPosition,
    {
      icon:
        createTransportIcon(
          transport
        )
    }
  );


    marker.bindTooltip(
      `${transport.id} • ${transport.name}`,
      {
        direction: "top",
        offset: [0, -15],
        opacity: 0.96
      }
    );


    marker.bindPopup(`
      <div class="operational-map-popup">

        <span class="popup-label">
          TRANSPORTE EM ROTA
        </span>

        <strong>
          ${transport.name}
        </strong>

        <small>
          Rota: ${transport.route}
        </small>

        <small>
          Status: ${transport.status}
        </small>

      </div>
    `);


    marker.addTo(
      transportLayer
    );


    /*
      Guardamos o marcador para
      movimentação futura.
    */

    transport.marker =
      marker;

  }
);

  /* ===================================================
   ETAPA 10E.2.4
   MOVIMENTAÇÃO DOS TRANSPORTES
   =================================================== */

function updateTransportPositions() {

  operationalTransports.forEach(
    transport => {

      if (
        !transport.marker
      ) {

        return;

      }


      /*
        Avançar o transporte
        de acordo com velocidade
        e direção.
      */

      transport.progress +=
        transport.speed *
        transport.direction;


      /*
        Chegou ao destino:
        começa o retorno.
      */

      if (
        transport.progress >= 1
      ) {

        transport.progress = 1;

        transport.direction = -1;

      }


      /*
        Voltou ao início:
        segue novamente ao destino.
      */

      if (
        transport.progress <= 0
      ) {

        transport.progress = 0;

        transport.direction = 1;

      }


      /*
        Calcular nova posição
        sobre a própria rota.
      */

      const position =
        getPositionAlongRoute(
          transport.route,
          transport.progress
        );


      if (
        !position
      ) {

        return;

      }


      /*
        Atualizar posição
        do marcador Leaflet.
      */

      transport.marker
        .setLatLng(
          position
        );

    }
  );

}


/* ===================================================
   ATUALIZAÇÃO AUTOMÁTICA
   =================================================== */

if (
  window.transportSimulationInterval
) {

  clearInterval(
    window.transportSimulationInterval
  );

}


window.transportSimulationInterval =
  setInterval(
    updateTransportPositions,
    700
  );

/* Guardar camada */

window.operationalTransportLayer =
  transportLayer;

/* ===================================================
   ETAPA 10G.1
   ALERTAS OPERACIONAIS NO MAPA
   =================================================== */

const alertLayer =
  L.layerGroup()
    .addTo(
      operationalMap
    );


/* ===================================================
   ALERTAS SIMULADOS
   =================================================== */

const operationalAlerts = [

  {
    id: "ALT-001",

    type: "critical",

    title: "Entrega crítica",

    description:
      "Medicamento prioritário requer acompanhamento imediato.",

    deliveryId:
      "AMZ-49281",

    route:
      "F7",

    lat: -1.58,

    lng: -49.85
  },


  {
    id: "ALT-002",

    type: "warning",

    title: "Trecho em atenção",

    description:
      "Possível atraso operacional no corredor F7.",

    deliveryId:
      "AMZ-49284",

    route:
      "F7",

    lat: -1.67,

    lng: -50.35
  },


  {
    id: "ALT-003",

    type: "critical",

    title: "Rota crítica",

    description:
      "Corredor F8 apresenta condição operacional crítica.",

    deliveryId:
      null,

    route:
      "F8",

    lat: -3.85,

    lng: -50.15
  }

];


/* ===================================================
   CRIAR ÍCONE DE ALERTA
   =================================================== */

function createAlertIcon(
  alert
) {

  const alertClass =

    alert.type === "critical"

      ? "alert-critical"

      : "alert-warning";


  return L.divIcon({

    className:
      `operational-alert-marker ${alertClass}`,

    html: `
      <div class="operational-alert-inner">
        !
      </div>
    `,

    iconSize: [
  24,
  24
],

iconAnchor: [
  12,
  12
]

  });

}


/* ===================================================
   ADICIONAR ALERTAS
   =================================================== */

operationalAlerts.forEach(
  alert => {

    const marker =
      L.marker(
        [
          alert.lat,
          alert.lng
        ],
        {
          icon:
            createAlertIcon(
              alert
            )
        }
      );


    marker.bindTooltip(
      alert.title,
      {
        direction: "top",
        offset: [0, -13],
        opacity: 0.96
      }
    );


    marker.bindPopup(`
      <div class="operational-map-popup">

        <span class="popup-label">
          ALERTA OPERACIONAL
        </span>

        <strong>
          ${alert.title}
        </strong>

        <small>
          ${alert.description}
        </small>

        <small>
          Rota: ${alert.route}
        </small>

      </div>
    `);


    /*
      Se o alerta estiver ligado
      a uma entrega, o clique abre
      o painel de detalhes.
    */

    marker.on(
      "click",
      () => {

        if (
          alert.deliveryId &&
          typeof openDeliveryDrawer ===
            "function"
        ) {

          openDeliveryDrawer(
            alert.deliveryId
          );

        }


        if (
          typeof addLog ===
            "function"
        ) {

          addLog(
            `Alerta ${alert.id} visualizado no mapa.`,
            alert.type === "critical"
              ? "yellow"
              : "blue"
          );

        }

      }
    );


    marker.addTo(
      alertLayer
    );

  }
);


/* Guardar camada */

window.operationalAlertLayer =
  alertLayer;

  /* ===================================================
   ETAPA 10H.1
   CONDIÇÕES CLIMÁTICAS
   =================================================== */

const climateLayer =
  L.layerGroup()
    .addTo(
      operationalMap
    );


/* ===================================================
   CONDIÇÕES SIMULADAS
   =================================================== */

const operationalClimate = [

  {
    id: "CLM-01",

    location: "Belém",

    type: "rain",

    condition: "Chuva moderada",

    impact: "Baixo impacto operacional",

    icon: "🌧",

    lat: -1.4558,

    lng: -48.4902,

    radius: 30000
  },


  {
    id: "CLM-02",

    location: "Breves",

    type: "storm",

    condition: "Chuva intensa",

    impact: "Possível atraso em rotas fluviais",

    icon: "⛈",

    lat: -1.6804,

    lng: -50.4791,

    radius: 45000
  },


  {
    id: "CLM-03",

    location: "Santarém",

    type: "stable",

    condition: "Tempo estável",

    impact: "Operação normal",

    icon: "☀",

    lat: -2.4385,

    lng: -54.6996,

    radius: 35000
  },


  {
    id: "CLM-04",

    location: "Altamira",

    type: "rain",

    condition: "Chuva isolada",

    impact: "Monitoramento recomendado",

    icon: "🌦",

    lat: -3.2041,

    lng: -52.2094,

    radius: 40000
  }

];


/* ===================================================
   ESTILO DA ÁREA CLIMÁTICA
   =================================================== */

function getClimateZoneStyle(
  type
) {

  if (
    type === "storm"
  ) {

    return {
      color: "#8264d8",
      fillColor: "#8264d8",
      fillOpacity: 0.13,
      weight: 1.5,
      opacity: 0.65
    };

  }


  if (
    type === "rain"
  ) {

    return {
      color: "#259ed0",
      fillColor: "#259ed0",
      fillOpacity: 0.11,
      weight: 1.5,
      opacity: 0.6
    };

  }


  return {
    color: "#e3b33d",
    fillColor: "#e3b33d",
    fillOpacity: 0.08,
    weight: 1.5,
    opacity: 0.5
  };

}


/* ===================================================
   ÍCONE CLIMÁTICO
   =================================================== */

function createClimateIcon(
  climate
) {

  return L.divIcon({

    className:
      `climate-marker climate-${climate.type}`,

    html: `
      <div class="climate-marker-inner">
        ${climate.icon}
      </div>
    `,

    iconSize: [
      34,
      34
    ],

    iconAnchor: [
      17,
      17
    ]

  });

}


/* ===================================================
   ADICIONAR CLIMA AO MAPA
   =================================================== */

operationalClimate.forEach(
  climate => {

    const zone =
      L.circle(
        [
          climate.lat,
          climate.lng
        ],
        {
          radius:
            climate.radius,

          ...getClimateZoneStyle(
            climate.type
          )
        }
      );


    zone.addTo(
      climateLayer
    );


    const marker =
      L.marker(
        [
          climate.lat,
          climate.lng
        ],
        {
          icon:
            createClimateIcon(
              climate
            )
        }
      );


    marker.bindTooltip(
      `${climate.location} • ${climate.condition}`,
      {
        direction: "top",
        offset: [0, -14],
        opacity: 0.96
      }
    );


    marker.bindPopup(`
      <div class="operational-map-popup">

        <span class="popup-label">
          CONDIÇÃO CLIMÁTICA
        </span>

        <strong>
          ${climate.location}
        </strong>

        <small>
          ${climate.condition}
        </small>

        <small>
          Impacto: ${climate.impact}
        </small>

      </div>
    `);


    marker.addTo(
      climateLayer
    );

  }
);


/* Guardar camada */

window.operationalClimateLayer =
  climateLayer;
  
  /* ===================================================
   ETAPA 10F.1
   CONTROLE DE CAMADAS DO MAPA
   =================================================== */

const OperationalLayerControl =
  L.Control.extend({

    options: {
      position: "topright"
    },


    onAdd: function() {

      const container =
        L.DomUtil.create(
          "div",
          "operational-layer-control"
        );


      container.innerHTML = `
        <div class="layer-control-header">

          <span>
            CAMADAS DO MAPA
          </span>

          <strong>
            ◫
          </strong>

        </div>


        <label class="layer-control-item">

          <input
            type="checkbox"
            data-layer="deliveries"
            checked
          >

          <span class="layer-control-icon">
            📦
          </span>

          <span>
            Entregas
          </span>

        </label>


        <label class="layer-control-item">

          <input
            type="checkbox"
            data-layer="transports"
            checked
          >

          <span class="layer-control-icon">
            🚤
          </span>

          <span>
            Transportes
          </span>

        </label>


        <label class="layer-control-item">

          <input
            type="checkbox"
            data-layer="hubs"
            checked
          >

          <span class="layer-control-icon">
            ◆
          </span>

          <span>
            Hubs
          </span>

        </label>


        <label class="layer-control-item">

          <input
            type="checkbox"
            data-layer="routes"
            checked
          >

          <span class="layer-control-icon">
            ━
          </span>

          <span>
            Rotas
          </span>

        </label>
<label class="layer-control-item">

  <input
    type="checkbox"
    data-layer="alerts"
    checked
  >

  <span class="layer-control-icon">
    ⚠
  </span>

  <span>
    Alertas
  </span>

</label>
<label class="layer-control-item">

  <input
    type="checkbox"
    data-layer="climate"
    checked
  >

  <span class="layer-control-icon">
    🌧
  </span>

  <span>
    Clima
  </span>

</label>
      `;


      /*
        Impede que clicar no painel
        mova o mapa.
      */

      L.DomEvent
        .disableClickPropagation(
          container
        );


      L.DomEvent
        .disableScrollPropagation(
          container
        );


      return container;

    }

  });


const operationalLayerControl =
  new OperationalLayerControl();


operationalLayerControl.addTo(
  operationalMap
  
);


/* ===================================================
   TROCAR VISIBILIDADE DAS CAMADAS
   =================================================== */

const layerMap = {

  deliveries:
    deliveryLayer,

  transports:
    transportLayer,

  hubs:
    hubLayer,

  routes:
    routeLayer,

  alerts:
    alertLayer,

  climate:
    climateLayer

};


const layerControlContainer =
  operationalLayerControl
    .getContainer();


if (
  layerControlContainer
) {

  layerControlContainer
    .querySelectorAll(
      'input[type="checkbox"]'
    )
    .forEach(
      checkbox => {

        checkbox.addEventListener(
          "change",
          () => {

            const layerName =
              checkbox.dataset.layer;


            const layer =
              layerMap[
                layerName
              ];


            if (
              !layer
            ) {

              return;

            }


            if (
              checkbox.checked
            ) {

              if (
                !operationalMap
                  .hasLayer(
                    layer
                  )
              ) {

                layer.addTo(
                  operationalMap
                );

              }

            } else {

              if (
                operationalMap
                  .hasLayer(
                    layer
                  )
              ) {

                operationalMap
                  .removeLayer(
                    layer
                  );

              }

            }

          }
        );

      }
    );

}


/* Guardar controle */

window.operationalLayerControl =
  operationalLayerControl;

  /* ===================================================
     CONTROLE DE ZOOM
     =================================================== */

  L.control
    .zoom({

      position:
        "bottomright"

    })
    .addTo(
      operationalMap
    );


  /* ===================================================
     SALVAR REFERÊNCIA
     =================================================== */

  window.operationalLeafletMap =
    operationalMap;


  /* ===================================================
     AJUSTAR TAMANHO
     =================================================== */

  setTimeout(
    () => {

      operationalMap
        .invalidateSize();

    },
    300
  );


  window.addEventListener(
    "resize",
    () => {

      operationalMap
        .invalidateSize();

    }
  );

})();


/* =====================================================
  /* =====================================================
   ETAPA 11
   SISTEMA QR CODE CONSOLIDADO
   ===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /* =================================================
       ELEMENTOS
       ================================================= */

    const qrScannerModal =
      document.getElementById(
        "qrScannerModal"
      );

    const openQrScannerBtn =
      document.getElementById(
        "openQrScannerBtn"
      );

    const closeQrScannerBtn =
      document.getElementById(
        "closeQrScannerBtn"
      );

    const cancelQrScannerBtn =
      document.getElementById(
        "cancelQrScannerBtn"
      );

    const qrScannerStatus =
      document.getElementById(
        "qrScannerStatus"
      );

    const qrScannerBackdrop =
      qrScannerModal?.querySelector(
        ".qr-scanner-backdrop"
      );


    if (
      !qrScannerModal ||
      !openQrScannerBtn
    ) {

      console.warn(
        "Estrutura do leitor QR não encontrada."
      );

      return;
    }


    /* =================================================
       GARANTIR PAINEL DE CONFIRMAÇÃO
       ================================================= */

    let qrConfirmationPanel =
      document.getElementById(
        "qrConfirmationPanel"
      );


    if (
      !qrConfirmationPanel &&
      qrScannerStatus
    ) {

      qrConfirmationPanel =
        document.createElement(
          "div"
        );

      qrConfirmationPanel.id =
        "qrConfirmationPanel";

      qrConfirmationPanel.className =
        "qr-confirmation-panel";

      qrConfirmationPanel.hidden =
        true;


      qrConfirmationPanel.innerHTML = `

        <div class="qr-confirmation-title">
          Entrega identificada
        </div>


        <div class="qr-confirmation-delivery">

          <span>
            Código
          </span>

          <strong id="qrConfirmedDeliveryId">
            -
          </strong>

        </div>


        <div class="qr-confirmation-delivery">

          <span>
            Conteúdo
          </span>

          <strong id="qrConfirmedDeliveryProduct">
            -
          </strong>

        </div>


        <div class="qr-confirmation-field">

          <label for="qrEventType">
            Evento operacional
          </label>

          <select id="qrEventType">

            <option value="">
              Selecione
            </option>

            <option value="received">
              Recebido no hub
            </option>

            <option value="in_transit">
              Saiu para transporte
            </option>

            <option value="arrived">
              Chegou ao destino
            </option>

            <option value="delivered">
              Entrega concluída
            </option>

            <option value="incident">
              Ocorrência registrada
            </option>

          </select>

        </div>


        <div class="qr-confirmation-field">

          <label for="qrEventLocation">
            Local
          </label>

          <input
            type="text"
            id="qrEventLocation"
            placeholder="Ex.: Hub Breves"
          >

        </div>


        <button
          type="button"
          id="confirmQrEventBtn"
          class="qr-confirm-event-btn"
        >
          Confirmar atualização
        </button>

      `;


      qrScannerStatus
        .insertAdjacentElement(
          "afterend",
          qrConfirmationPanel
        );

    }


    const qrConfirmedDeliveryId =
      document.getElementById(
        "qrConfirmedDeliveryId"
      );

    const qrConfirmedDeliveryProduct =
      document.getElementById(
        "qrConfirmedDeliveryProduct"
      );

    const qrEventType =
      document.getElementById(
        "qrEventType"
      );

    const qrEventLocation =
      document.getElementById(
        "qrEventLocation"
      );

    const confirmQrEventBtn =
      document.getElementById(
        "confirmQrEventBtn"
      );


    /* =================================================
       ESTADO DO LEITOR
       ================================================= */

    let qrScanner = null;

    let qrScannerRunning =
      false;

    let lastQrCode =
      null;

    let selectedQrDelivery =
      null;

    let lastConfirmedQrEvent = {
  signature: "",
  timestamp: 0
};
    
if (
  confirmQrEventBtn
) {

  confirmQrEventBtn.disabled =
    true;

  confirmQrEventBtn.textContent =
    "Atualizando...";

}

    /* =================================================
       NOMES DOS EVENTOS
       ================================================= */

    const eventNames = {

      received:
        "Recebido no hub",

      in_transit:
        "Saiu para transporte",

      arrived:
        "Chegou ao destino",

      delivered:
        "Entrega concluída",

      incident:
        "Ocorrência registrada"

    };


    const deliveryStatusMap = {

      received:
        "Recebido no hub",

      in_transit:
        "Em trânsito",

      arrived:
        "Chegou ao destino",

      delivered:
        "Entregue",

      incident:
        "Ocorrência registrada"

    };


    /* =================================================
       HUBS
       ================================================= */

    const qrHubLocations = {

      belem: {
        name: "Hub Belém",
        lat: -1.4558,
        lng: -48.4902
      },

      santarem: {
        name: "Hub Santarém",
        lat: -2.4385,
        lng: -54.6996
      },

      maraba: {
        name: "Hub Marabá",
        lat: -5.3815,
        lng: -49.1323
      },

      altamira: {
        name: "Hub Altamira",
        lat: -3.2041,
        lng: -52.2094
      },

      breves: {
        name: "Hub Breves",
        lat: -1.6804,
        lng: -50.4791
      },

      itaituba: {
        name: "Hub Itaituba",
        lat: -4.2761,
        lng: -55.9836
      },

      tucurui: {
        name: "Hub Tucuruí",
        lat: -3.7657,
        lng: -49.6773
      },

      abaetetuba: {
        name: "Hub Abaetetuba",
        lat: -1.7218,
        lng: -48.8788
      },

      portel: {
        name: "Hub Portel",
        lat: -1.9364,
        lng: -50.8211
      },

      oriximina: {
        name: "Hub Oriximiná",
        lat: -1.7656,
        lng: -55.8661
      },

      cameta: {
        name: "Hub Cametá",
        lat: -2.2444,
        lng: -49.4958
      },

      afua: {
        name: "Hub Afuá",
        lat: -0.1567,
        lng: -50.3861
      }

    };

    /* =================================================
   SUGESTÕES DE HUBS NO CAMPO LOCAL
   ================================================= */

if (qrEventLocation) {

  let qrHubDatalist =
    document.getElementById(
      "qrHubOptions"
    );


  if (!qrHubDatalist) {

    qrHubDatalist =
      document.createElement(
        "datalist"
      );

    qrHubDatalist.id =
      "qrHubOptions";

    document.body.appendChild(
      qrHubDatalist
    );

  }


  qrHubDatalist.innerHTML =
    "";


  Object.values(
    qrHubLocations
  ).forEach(
    hub => {

      const option =
        document.createElement(
          "option"
        );

      option.value =
        hub.name;

      qrHubDatalist.appendChild(
        option
      );

    }
  );


  qrEventLocation.setAttribute(
    "list",
    "qrHubOptions"
  );

}


    /* =================================================
       NORMALIZAR TEXTO
       ================================================= */

    function normalizeQrText(
      value
    ) {

      return String(
        value || ""
      )
        .trim()
        .toLowerCase()
        .normalize(
          "NFD"
        )
        .replace(
          /[\u0300-\u036f]/g,
          ""
        );

    }


    function getHubFromLocation(
      value
    ) {

      const key =
        normalizeQrText(
          value
        )
          .replace(
            /^hub\s+/,
            ""
          );


      return (
        qrHubLocations[
          key
        ] ||
        null
      );

    }


    /* =================================================
       LOCALIZAR MARCADOR DA ENTREGA
       ================================================= */

    function getDeliveryMarker(
      deliveryId
    ) {

      const layer =
        window
          .operationalDeliveryLayer;


      if (
        !layer ||
        typeof layer.getLayers !==
          "function"
      ) {

        return null;

      }


      return (
        layer
          .getLayers()
          .find(
            marker => {

              const tooltip =
                marker
                  .getTooltip?.();

              const content =
                tooltip
                  ?.getContent?.();


              return (
                typeof content ===
                  "string" &&
                content.includes(
                  deliveryId
                )
              );

            }
          ) ||
        null
      );

    }


    /* =================================================
       LIMPAR FORMULÁRIO
       ================================================= */

    function resetQrForm() {

      lastQrCode =
        null;

      selectedQrDelivery =
        null;


      if (qrEventType) {

        qrEventType.value =
          "";

      }


      if (qrEventLocation) {

        qrEventLocation.value =
          "";

      }


      if (qrConfirmationPanel) {

        qrConfirmationPanel.hidden =
          true;

      }


      if (qrConfirmedDeliveryId) {

        qrConfirmedDeliveryId
          .textContent =
            "-";

      }


      if (
        qrConfirmedDeliveryProduct
      ) {

        qrConfirmedDeliveryProduct
          .textContent =
            "-";

      }


      if (qrScannerStatus) {

        qrScannerStatus.textContent =
          "Aponte a câmera para o QR Code da encomenda.";

      }

if (
  confirmQrEventBtn
) {

  confirmQrEventBtn.disabled =
    false;

  confirmQrEventBtn.textContent =
    "Confirmar atualização";

}
      
    }


    /* =================================================
       PARAR LEITOR
       ================================================= */

    async function stopQrScanner() {

      if (!qrScanner) {

        qrScannerRunning =
          false;

        return;

      }


      try {

        if (
          qrScannerRunning
        ) {

          await qrScanner.stop();

        }

      } catch (error) {

        console.warn(
          "Não foi possível parar o leitor QR:",
          error
        );

      }


      qrScannerRunning =
        false;


      try {

        qrScanner.clear();

      } catch (error) {

        /* sem ação */

      }


      qrScanner =
        null;

    }


    /* =================================================
       ABRIR MODAL
       ================================================= */

    function openQrScannerModal() {

      qrScannerModal
        .classList.add(
          "active"
        );


      qrScannerModal
        .setAttribute(
          "aria-hidden",
          "false"
        );


      document.body.style.overflow =
        "hidden";


      resetQrForm();


      setTimeout(
        startQrScanner,
        180
      );

    }


    /* =================================================
       FECHAR MODAL
       ================================================= */

    async function closeQrScannerModal() {

      await stopQrScanner();


      qrScannerModal
        .classList.remove(
          "active"
        );


      qrScannerModal
        .setAttribute(
          "aria-hidden",
          "true"
        );


      document.body.style.overflow =
        "";


      resetQrForm();

    }


    /* =================================================
       QR IDENTIFICADO
       ================================================= */

    async function handleQrDecoded(
      decodedText
    ) {

      const qrCode =
        String(
          decodedText
        )
          .trim()
          .toUpperCase();


      if (
        lastQrCode ===
        qrCode
      ) {

        return;

      }


      lastQrCode =
        qrCode;


      /*
        Agora usamos diretamente o
        deliveryData principal.
      */

      const delivery =
        typeof deliveryData !==
          "undefined"
          ? deliveryData[
              qrCode
            ]
          : null;


      /* NÃO ENCONTRADO */

      if (!delivery) {

        if (qrScannerStatus) {

          qrScannerStatus.textContent =
            `QR ${qrCode} não corresponde a uma entrega cadastrada.`;

        }


        setTimeout(
          () => {

            lastQrCode =
              null;

          },
          2000
        );


        return;

      }


      /* ENTREGA ENCONTRADA */

      selectedQrDelivery = {

        id:
          qrCode,

        product:
          delivery.product,

        status:
          delivery.status

      };


      if (qrScannerStatus) {

        qrScannerStatus.textContent =
          `Entrega encontrada: ${qrCode} • ${delivery.product} • Status: ${delivery.status}`;

      }


      if (
        qrConfirmedDeliveryId
      ) {

        qrConfirmedDeliveryId
          .textContent =
            qrCode;

      }


      if (
        qrConfirmedDeliveryProduct
      ) {

        qrConfirmedDeliveryProduct
          .textContent =
            delivery.product;

      }


      if (
        qrConfirmationPanel
      ) {

        qrConfirmationPanel.hidden =
          false;

      }


      if (qrEventType) {

        qrEventType.value =
          "";

      }


      if (qrEventLocation) {

        qrEventLocation.value =
          "";

      }


      await stopQrScanner();


      if (
        typeof addLog ===
        "function"
      ) {

        addLog(
          `QR Code da entrega #${qrCode} identificado.`,
          "green"
        );

      }

    }


    /* =================================================
       INICIAR CÂMERA
       ================================================= */

    async function startQrScanner() {

      if (
        typeof Html5Qrcode ===
        "undefined"
      ) {

        if (qrScannerStatus) {

          qrScannerStatus.textContent =
            "Biblioteca do leitor QR não carregada.";

        }

        return;

      }


      if (
        qrScannerRunning
      ) {

        return;

      }


      qrScanner =
        new Html5Qrcode(
          "qrReader"
        );


      if (qrScannerStatus) {

        qrScannerStatus.textContent =
          "Solicitando acesso à câmera...";

      }


      try {

        await qrScanner.start(

          {
            facingMode:
              "environment"
          },

          {
            fps: 10,

            qrbox: {
              width: 220,
              height: 220
            }
          },

          handleQrDecoded,

          () => {}

        );


        qrScannerRunning =
          true;


        if (qrScannerStatus) {

          qrScannerStatus.textContent =
            "Câmera ativa. Aponte para o QR Code.";

        }

      } catch (error) {

        console.error(
          "Erro ao iniciar leitor QR:",
          error
        );


        qrScannerRunning =
          false;

        qrScanner =
          null;


        if (qrScannerStatus) {

          qrScannerStatus.textContent =
            "Não foi possível acessar a câmera.";

        }

      }

    }


    /* =================================================
       CONFIRMAR EVENTO
       ================================================= */

    confirmQrEventBtn
      ?.addEventListener(
        "click",
        () => {

          if (
            !selectedQrDelivery
          ) {

            if (
              qrScannerStatus
            ) {

              qrScannerStatus
                .textContent =
                  "Leia primeiro o QR Code de uma entrega.";

            }

            return;

          }


          const eventType =
            qrEventType
              ?.value
              .trim();


          const location =
            qrEventLocation
              ?.value
              .trim();


          /* SEM EVENTO */

          if (!eventType) {

            if (
              qrScannerStatus
            ) {

              qrScannerStatus
                .textContent =
                  "Selecione o evento operacional.";

            }


            qrEventType
              ?.focus();


            return;

          }


          /* SEM LOCAL */

          if (!location) {

            if (
              qrScannerStatus
            ) {

              qrScannerStatus
                .textContent =
                  "Informe o local do evento.";

            }


            qrEventLocation
              ?.focus();


            return;

          }


          const operationalDelivery =
            typeof deliveryData !==
              "undefined"
              ? deliveryData[
                  selectedQrDelivery.id
                ]
              : null;


          if (
            !operationalDelivery
          ) {

            if (
              qrScannerStatus
            ) {

              qrScannerStatus
                .textContent =
                  "Entrega não encontrada no banco de dados.";

            }

            return;

          }

          /* =================================================
   PROTEÇÃO CONTRA EVENTO DUPLICADO
   ================================================= */

const eventSignature =
  [
    selectedQrDelivery.id,
    eventType,
    normalizeQrText(
      location
    )
  ].join("|");


const currentTimestamp =
  Date.now();


if (
  lastConfirmedQrEvent.signature ===
    eventSignature &&
  currentTimestamp -
    lastConfirmedQrEvent.timestamp <
    5000
) {

  if (
    qrScannerStatus
  ) {

    qrScannerStatus.textContent =
      "Esta atualização acabou de ser registrada.";

  }

  return;

}


lastConfirmedQrEvent = {

  signature:
    eventSignature,

  timestamp:
    currentTimestamp

};

          /* =================================================
   BLOQUEAR BOTÃO DURANTE A ATUALIZAÇÃO
   ================================================= */

if (
  confirmQrEventBtn
) {

  confirmQrEventBtn.disabled =
    true;

  confirmQrEventBtn.textContent =
    "Atualizando...";

}

          /* DATA E HORA */

          const now =
            new Date();


          const eventName =
            eventNames[
              eventType
            ] ||
            eventType;


          const eventDate =
            now
              .toLocaleDateString(
                "pt-BR"
              );


          const eventTime =
            now
              .toLocaleTimeString(
                "pt-BR",
                {
                  hour:
                    "2-digit",

                  minute:
                    "2-digit"
                }
              );


          /* =================================================
             ATUALIZAR STATUS
             ================================================= */

          operationalDelivery.status =
            deliveryStatusMap[
              eventType
            ] ||
            eventName;


          /* =================================================
             TIMELINE
             ================================================= */

          if (
            Array.isArray(
              operationalDelivery
                .events
            )
          ) {

            operationalDelivery
              .events
              .forEach(
                event => {

                  if (
                    event.status ===
                    "current"
                  ) {

                    event.status =
                      "completed";

                  }

                }
              );


            const newTimelineEvent = {

              time:
                eventTime,

              title:
                eventName,

              description:
                `${location} • ${eventDate} • QR Code`,

              status:
                "current"

            };


            const pendingIndex =
              operationalDelivery
                .events
                .findIndex(
                  event =>
                    event.status ===
                    "pending"
                );


            if (
              pendingIndex >=
              0
            ) {

              operationalDelivery
                .events
                .splice(
                  pendingIndex,
                  0,
                  newTimelineEvent
                );

            } else {

              operationalDelivery
                .events
                .push(
                  newTimelineEvent
                );

            }

          }


          /* =================================================
             STATUS NA TABELA
             ================================================= */

          const row =
            document
              .querySelector(
                `.delivery-row[data-delivery="${selectedQrDelivery.id}"]`
              );


          const severityStatus =
            row
              ?.querySelector(
                ".status"
              );


          if (
            row &&
            severityStatus
          ) {

            let operationalStatus =
              row
                .querySelector(
                  ".qr-operational-status"
                );


            if (
              !operationalStatus
            ) {

              operationalStatus =
                document
                  .createElement(
                    "small"
                  );


              operationalStatus
                .className =
                  "qr-operational-status";


              severityStatus
                .insertAdjacentElement(
                  "afterend",
                  operationalStatus
                );

            }


            operationalStatus
              .textContent =
                operationalDelivery
                  .status;

          }


          if (
            typeof refreshDeliveryTable ===
            "function"
          ) {

            refreshDeliveryTable();

          }


          /* =================================================
             MAPA
             ================================================= */

          const matchedHub =
            getHubFromLocation(
              location
            );


          const deliveryMarker =
            getDeliveryMarker(
              selectedQrDelivery.id
            );


          if (
            matchedHub &&
            deliveryMarker
          ) {

           /* =================================================
   MOSTRAR ENTREGA ATUALIZADA
   ================================================= */

setTimeout(
  () => {

    if (
      deliveryMarker &&
      typeof deliveryMarker.openTooltip ===
        "function"
    ) {

      deliveryMarker.openTooltip();

    }

  },
  1400
);
            
            /* MOVER PACOTE */

            deliveryMarker
              .setLatLng(
                [
                  matchedHub.lat,
                  matchedHub.lng
                ]
              );


            /* DESTACAR PACOTE */

            const markerElement =
              deliveryMarker
                .getElement();


            const markerInner =
              markerElement
                ?.querySelector(
                  ".delivery-package-inner"
                );


            if (
              markerInner
                ?.animate
            ) {

              markerInner.animate(

                [
                  {
                    transform:
                      "scale(1)"
                  },

                  {
                    transform:
                      "scale(1.35)",

                    boxShadow:
                      "0 0 0 7px rgba(32,201,135,.20), 0 0 22px rgba(32,201,135,.45)"
                  },

                  {
                    transform:
                      "scale(1)"
                  }
                ],

                {
                  duration:
                    750,

                  iterations:
                    4,

                  easing:
                    "ease"
                }

              );

            }


            /* CENTRALIZAR MAPA */

            const mapInstance =
              window
                .operationalLeafletMap;


            if (
              mapInstance
            ) {

              mapInstance.stop();


              mapInstance.flyTo(

                [
                  matchedHub.lat,
                  matchedHub.lng
                ],

                7,

                {
                  duration:
                    1.2
                }

              );

            }

          }


          /* =================================================
             HISTÓRICO QR
             ================================================= */

          if (
            !window
              .qrOperationalEvents
          ) {

            window
              .qrOperationalEvents =
                [];

          }


          window
            .qrOperationalEvents
            .push(
              {

                deliveryId:
                  selectedQrDelivery.id,

                product:
                  selectedQrDelivery.product,

                type:
                  eventType,

                typeName:
                  eventName,

                location:
                  location,

                date:
                  eventDate,

                time:
                  eventTime

              }
            );


          /* =================================================
             MENSAGEM
             ================================================= */

          if (
            qrScannerStatus
          ) {

            qrScannerStatus
              .textContent =
                matchedHub
                  ? `${eventName} registrado. ${selectedQrDelivery.id} atualizado para ${matchedHub.name}.`
                  : `${eventName} registrado para ${selectedQrDelivery.id} em ${location}.`;

          }


          /* LOG */

          if (
            typeof addLog ===
            "function"
          ) {

            addLog(
              `${eventName} • #${selectedQrDelivery.id} • ${location}`,
              "green"
            );

          }


          const updatedDeliveryId =
            selectedQrDelivery.id;


          /* =================================================
             FECHAR QR E ABRIR DRAWER
             ================================================= */

          setTimeout(
            async () => {

              await closeQrScannerModal();


              if (
                typeof openDeliveryDrawer ===
                "function"
              ) {

                openDeliveryDrawer(
                  updatedDeliveryId
                );

              }

            },
            900
          );

        }
      );


    /* =================================================
       EVENTOS DO MODAL
       ================================================= */

    openQrScannerBtn
      .addEventListener(
        "click",
        openQrScannerModal
      );


    closeQrScannerBtn
      ?.addEventListener(
        "click",
        closeQrScannerModal
      );


    cancelQrScannerBtn
      ?.addEventListener(
        "click",
        closeQrScannerModal
      );


    qrScannerBackdrop
      ?.addEventListener(
        "click",
        closeQrScannerModal
      );


    document
      .addEventListener(
        "keydown",
        event => {

          if (
            event.key ===
              "Escape" &&
            qrScannerModal
              .classList
              .contains(
                "active"
              )
          ) {

            closeQrScannerModal();

          }

        }
      );

  }
);