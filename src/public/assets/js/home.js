document.addEventListener("DOMContentLoaded", () => {
  // --- Script 1: carregar refeições ---
  fetch("http://localhost:3000/refeicoes")
    .then(response => response.json())
    .then(refeicoes => {
      refeicoes.forEach(refeicao => {
        const container = document.querySelector(`#${refeicao.categoria} .image-grid`);
        if (container) {
          const placeholder = document.createElement("div");
          placeholder.classList.add("image-placeholder");
          placeholder.innerHTML = `
            <a href="detalhes.html?id=${refeicao.id}" class="image-link">
              <img src="${refeicao.imagem}" alt="${refeicao.nome}">
              <p>${refeicao.nome}</p>
            </a>
          `;
          container.appendChild(placeholder);
        }
      });
    })
    .catch(error => console.error("Erro ao carregar as refeições:", error));

  // --- Script 2: calendário dinâmico ---
  let semanaAtual = 0;
  const dataAtual = new Date();
  let mesAtual = dataAtual.getMonth();
  let anoAtual = dataAtual.getFullYear();

  const diasMesElement = document.getElementById('dias-mes');
  const tituloSemanaElement = document.getElementById('titulo-semana');
  const btnSemanaAnterior = document.getElementById('semana-anterior');
  const btnProximaSemana = document.getElementById('proxima-semana');

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  function getTotalSemanasNoMes() {
    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1);
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0);
    const totalDias = ultimoDiaMes.getDate() + primeiroDiaMes.getDay();
    return Math.ceil(totalDias / 7);
  }

  function atualizarCalendario() {
    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1);
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0);
    const totalSemanas = getTotalSemanasNoMes();

    if (semanaAtual >= totalSemanas) {
      semanaAtual = totalSemanas - 1;
    }

    let primeiroDiaSemana = new Date(anoAtual, mesAtual, 1);
    primeiroDiaSemana.setDate(primeiroDiaSemana.getDate() + (semanaAtual * 7) - primeiroDiaSemana.getDay() + 1);

    if (primeiroDiaSemana < primeiroDiaMes) {
      primeiroDiaSemana = new Date(primeiroDiaMes);
    }

    tituloSemanaElement.textContent = `${meses[mesAtual]} ${anoAtual} - Semana ${semanaAtual + 1}`;
    diasMesElement.innerHTML = '';
    let dataRender = new Date(primeiroDiaSemana);

    for (let i = 0; i < 7; i++) {
      const span = document.createElement('span');
      if (dataRender.getMonth() === mesAtual && dataRender.getFullYear() === anoAtual) {
        span.textContent = dataRender.getDate();

        const hoje = new Date();
        if (dataRender.getDate() === hoje.getDate() &&
          dataRender.getMonth() === hoje.getMonth() &&
          dataRender.getFullYear() === hoje.getFullYear()) {
          span.classList.add('dia-atual');
        }
      } else {
        span.textContent = '';
      }
      diasMesElement.appendChild(span);
      dataRender.setDate(dataRender.getDate() + 1);
    }

    btnSemanaAnterior.disabled = semanaAtual === 0 && mesAtual === 0 && anoAtual === new Date().getFullYear();
    btnProximaSemana.disabled = false;
  }

  function mudarMes(incremento) {
    mesAtual += incremento;
    if (mesAtual > 11) {
      mesAtual = 0;
      anoAtual++;
    } else if (mesAtual < 0) {
      mesAtual = 11;
      anoAtual--;
    }
    semanaAtual = 0;
    atualizarCalendario();
  }

  btnSemanaAnterior.addEventListener('click', () => {
    if (semanaAtual > 0) {
      semanaAtual--;
    } else {
      mudarMes(-1);
    }
    atualizarCalendario();
  });

  btnProximaSemana.addEventListener('click', () => {
    const totalSemanas = getTotalSemanasNoMes();
    if (semanaAtual < totalSemanas - 1) {
      semanaAtual++;
    } else {
      mudarMes(1);
      semanaAtual = 0;
    }
    atualizarCalendario();
  });

  atualizarCalendario();

  // --- Script 3: agenda de refeições carregada do JSON ---
  fetch("http://localhost:3000/mealSchedule")
    .then(response => response.json())
    .then(mealData => {
      const container = document.getElementById("meal-schedule");
      mealData.forEach(item => {
        const div = document.createElement("div");
        div.className = "meal";
        div.innerHTML = `
          <span>${item.icone}</span>
          <span class="time">${item.hora}</span>
          <span>${item.refeicao}</span>
        `;
        container.appendChild(div);
      });
    })
    .catch(error => console.error("Erro ao carregar agenda de refeições:", error));

  // --- Script 4: controle de líquidos via JSON ---
  const addButton = document.getElementById('add-agua');
  const addOptions = document.getElementById('add-options');
  const consumoTotal = document.getElementById('consumo-total');
  const progressBar = document.getElementById('progress-bar');
  const metaElemento = document.getElementById('meta-consumo');

  let consumoAtual = 0;

  // 🔹 Recupera o email do usuário logado para buscar a meta correta
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  let metaConsumo = 2240; // valor padrão caso não encontre meta personalizada

  if (usuarioLogado) {
    const metaSalva = localStorage.getItem(`${usuarioLogado}_metaAguaDiaria`);
    if (metaSalva) {
      metaConsumo = parseInt(metaSalva);
    }
  }

  metaElemento.textContent = `${metaConsumo} ml`;

  // Recalcula progresso com base na meta
  function atualizarProgresso() {
    const progresso = Math.min((consumoAtual / metaConsumo) * 100, 100);
    progressBar.style.width = progresso + '%';
  }

  // Cria os botões com quantidades
  function criarBotoesAgua(options) {
    addOptions.innerHTML = '';
    options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'quantity-btn';
      btn.textContent = option.label || `${option.amount} ml`;
      btn.setAttribute('data-amount', option.amount);
      addOptions.appendChild(btn);

      btn.addEventListener('click', () => {
        consumoAtual += option.amount;
        consumoTotal.textContent = consumoAtual + ' ml';
        localStorage.setItem('consumoAgua', consumoAtual);
        atualizarProgresso();
        addOptions.classList.add('hidden');
      });
    });

    const zerarBtn = document.createElement('button');
    zerarBtn.id = 'zerar-consumo';
    zerarBtn.className = 'reset-button';
    zerarBtn.textContent = 'Zerar Consumo';
    addOptions.appendChild(zerarBtn);

    zerarBtn.addEventListener('click', () => {
      consumoAtual = 0;
      consumoTotal.textContent = '0 ml';
      localStorage.setItem('consumoAgua', 0);
      atualizarProgresso();
      addOptions.classList.add('hidden');
    });
  }

  addButton.addEventListener('click', () => {
    addOptions.classList.toggle('hidden');
  });

  const zerarButton = document.getElementById('zerar-consumo');
  if (zerarButton) {
    zerarButton.addEventListener('click', () => {
      consumoAtual = 0;
      consumoTotal.textContent = '0 ml';
      localStorage.setItem('consumoAgua', 0);
      atualizarProgresso();
    });
  }

  // Carrega opções de água
  fetch("http://localhost:3000/waterOptions")
    .then(response => response.json())
    .then(options => criarBotoesAgua(options))
    .catch(error => console.error("Erro ao carregar opções de água:", error));

  // Restaura consumo salvo
  const savedConsumo = localStorage.getItem('consumoAgua');
  if (savedConsumo) {
    consumoAtual = parseInt(savedConsumo);
    consumoTotal.textContent = consumoAtual + ' ml';
    atualizarProgresso();
  }

  // --- Script 5: controle de Calorias via JSON ---
  const addCaloriasBtn = document.getElementById('add-calorias');
  const addOptionsCalorias = document.getElementById('add-options-calorias');
  const consumoCalorias = document.getElementById('consumo-calorias');
  const progressBarCalorias = document.getElementById('progress-bar-calorias');
  const metaCalorias = document.getElementById('meta-calorias');

  let caloriasAtuais = 0;

  // Recupera email do usuário logado para buscar meta personalizada e consumo
  let metaCaloriasValor = 2000; // valor padrão

  if (usuarioLogado) {
    const metaSalva = localStorage.getItem(`${usuarioLogado}_metaCaloriasDiaria`);
    if (metaSalva) {
      metaCaloriasValor = parseInt(metaSalva);
    }
  }

  metaCalorias.textContent = `${metaCaloriasValor} kcal`;

  function atualizarProgressoCalorias() {
    const progresso = Math.min((caloriasAtuais / metaCaloriasValor) * 100, 100);
    progressBarCalorias.style.width = progresso + '%';
  }

  function criarBotoesCalorias(options) {
    addOptionsCalorias.innerHTML = '';
    options.forEach(option => {
      const btn = document.createElement('button');
      btn.className = 'quantity-btn';
      btn.textContent = option.label || `${option.amount} kcal`;
      btn.setAttribute('data-amount', option.amount);
      addOptionsCalorias.appendChild(btn);

      btn.addEventListener('click', () => {
        caloriasAtuais += option.amount;
        consumoCalorias.textContent = caloriasAtuais + ' kcal';
        if (usuarioLogado) {
          localStorage.setItem(`${usuarioLogado}_consumoCalorias`, caloriasAtuais);
        } else {
          localStorage.setItem('consumoCalorias', caloriasAtuais);
        }
        atualizarProgressoCalorias();
        addOptionsCalorias.classList.add('hidden');
      });
    });

    const zerarBtn = document.createElement('button');
    zerarBtn.className = 'reset-button';
    zerarBtn.textContent = 'Zerar Consumo';
    addOptionsCalorias.appendChild(zerarBtn);

    zerarBtn.addEventListener('click', () => {
      caloriasAtuais = 0;
      consumoCalorias.textContent = '0 kcal';
      if (usuarioLogado) {
        localStorage.setItem(`${usuarioLogado}_consumoCalorias`, 0);
      } else {
        localStorage.setItem('consumoCalorias', 0);
      }
      atualizarProgressoCalorias();
      addOptionsCalorias.classList.add('hidden');
    });
  }

  addCaloriasBtn.addEventListener('click', () => {
    addOptionsCalorias.classList.toggle('hidden');
  });

  // Carrega opções de calorias
  fetch("http://localhost:3000/kcalOptions")
    .then(response => response.json())
    .then(options => criarBotoesCalorias(options))
    .catch(error => console.error("Erro ao carregar opções de calorias:", error));

  // Restaura consumo salvo, personalizado por usuário
  let savedCalorias = 0;
  if (usuarioLogado) {
    savedCalorias = localStorage.getItem(`${usuarioLogado}_consumoCalorias`);
  }
  if (!savedCalorias) {
    savedCalorias = localStorage.getItem('consumoCalorias');
  }

  if (savedCalorias) {
    caloriasAtuais = parseInt(savedCalorias);
    consumoCalorias.textContent = caloriasAtuais + ' kcal';
    atualizarProgressoCalorias();
  }
})