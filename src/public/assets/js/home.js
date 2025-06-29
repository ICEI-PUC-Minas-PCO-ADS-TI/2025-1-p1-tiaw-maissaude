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
  const dataAtual = new Date(); // hoje
  let mesAtual = dataAtual.getMonth();
  let anoAtual = dataAtual.getFullYear();

  const diasMesElement = document.getElementById('dias-mes');
  const tituloSemanaElement = document.getElementById('titulo-semana') || null;
  const btnSemanaAnterior = document.getElementById('semana-anterior');
  const btnProximaSemana = document.getElementById('proxima-semana');

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  function calcularSemanaDoAno(data) {
    const primeiroDiaAno = new Date(data.getFullYear(), 0, 1);
    const diffDias = Math.floor((data - primeiroDiaAno) / (1000 * 60 * 60 * 24));
    return Math.floor((diffDias + primeiroDiaAno.getDay()) / 7);
  }

  function atualizarCalendario() {
    const dataInicioAno = new Date(anoAtual, 0, 1);

    const diaSemanaPrimeiro = dataInicioAno.getDay();
    const ajuste = (diaSemanaPrimeiro === 0 ? -6 : 1) - diaSemanaPrimeiro;

    const dataInicioSemana = new Date(dataInicioAno);
    dataInicioSemana.setDate(dataInicioSemana.getDate() + ajuste + (semanaAtual * 7));

    const dataFimSemana = new Date(dataInicioSemana);
    dataFimSemana.setDate(dataFimSemana.getDate() + 6);

    mesAtual = dataInicioSemana.getMonth();
    anoAtual = dataInicioSemana.getFullYear();

    if (tituloSemanaElement) {
      tituloSemanaElement.textContent = `Semana de ${dataInicioSemana.getDate()} de ${meses[dataInicioSemana.getMonth()]} até ${dataFimSemana.getDate()} de ${meses[dataFimSemana.getMonth()]}`;
    }

    diasMesElement.innerHTML = '';
    let dataRender = new Date(dataInicioSemana);

    for (let i = 0; i < 7; i++) {
      const span = document.createElement('span');
      span.textContent = dataRender.getDate();

      if (dataRender.getMonth() !== mesAtual) {
        span.classList.add('fora-do-mes');
      }

      if (
        dataRender.getDate() === dataAtual.getDate() &&
        dataRender.getMonth() === dataAtual.getMonth() &&
        dataRender.getFullYear() === dataAtual.getFullYear()
      ) {
        span.classList.add('dia-atual');
      }

      diasMesElement.appendChild(span);
      dataRender.setDate(dataRender.getDate() + 1);
    }
  }

  btnSemanaAnterior.addEventListener('click', () => {
    if (semanaAtual > 0) {
      semanaAtual--;
      atualizarCalendario();
    }
  });

  btnProximaSemana.addEventListener('click', () => {
    semanaAtual++;
    atualizarCalendario();
  });

  semanaAtual = calcularSemanaDoAno(dataAtual);
  atualizarCalendario();

  // --- Script 3: agenda de refeições com edição inline, exclusão e adição (sem ícones) ---
  fetch("http://localhost:3000/mealSchedule")
    .then(response => response.json())
    .then(mealData => {
      const container = document.getElementById("meal-schedule");
      container.innerHTML = '';

      mealData.forEach(item => {
        const div = criarRefeicaoElemento(item);
        container.appendChild(div);
      });

      const form = document.createElement("div");
      form.className = "adicionar-refeicao";
      form.innerHTML = `
      <input type="text" id="nova-hora" placeholder="08:00">
      <input type="text" id="nova-refeicao" placeholder="Café da manhã">
      <button id="btn-adicionar">Adicionar</button>
    `;
      container.appendChild(form);

      document.getElementById("btn-adicionar").addEventListener("click", () => {
        const hora = document.getElementById("nova-hora").value.trim();
        const refeicao = document.getElementById("nova-refeicao").value.trim();

        if (!hora || !refeicao) {
          alert("Preencha o horário e o nome da refeição.");
          return;
        }

        const novaRefeicao = { hora, refeicao };

        fetch("http://localhost:3000/mealSchedule", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novaRefeicao)
        })
          .then(res => res.json())
          .then(data => {
            const novaDiv = criarRefeicaoElemento(data);
            container.insertBefore(novaDiv, form);
            document.getElementById("nova-hora").value = "";
            document.getElementById("nova-refeicao").value = "";
          })
          .catch(err => console.error("Erro ao adicionar refeição:", err));
      });
    })
    .catch(error => console.error("Erro ao carregar agenda de refeições:", error));

  function criarRefeicaoElemento(item) {
    const div = document.createElement("div");
    div.className = "meal";
    div.innerHTML = `
    <span class="hora-editavel" data-id="${item.id}">${item.hora}</span>
    <span>${item.refeicao}</span>
    <button class="delete-meal" data-id="${item.id}">🗑️</button>
  `;
    return div;
  }

  document.getElementById("meal-schedule").addEventListener("click", (e) => {

    if (e.target.classList.contains("hora-editavel")) {
      const span = e.target;
      const id = span.dataset.id;
      const horaAtual = span.textContent;

      const input = document.createElement("input");
      input.type = "text";
      input.value = horaAtual;
      input.className = "hora-input";
      input.dataset.id = id;

      span.replaceWith(input);
      input.focus();

      input.addEventListener("blur", salvarHora);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") input.blur();
      });

      function salvarHora() {
        const novaHora = input.value;

        fetch(`http://localhost:3000/mealSchedule/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hora: novaHora })
        })
          .then(res => {
            if (!res.ok) throw new Error("Erro ao salvar horário.");
            const novoSpan = document.createElement("span");
            novoSpan.className = "hora-editavel";
            novoSpan.dataset.id = id;
            novoSpan.textContent = novaHora;
            input.replaceWith(novoSpan);
          })
          .catch(err => {
            alert("Erro ao atualizar hora.");
            console.error(err);
          });
      }
    }

    if (e.target.classList.contains("delete-meal")) {
      const id = e.target.dataset.id;
      if (confirm("Deseja excluir esta refeição?")) {
        fetch(`http://localhost:3000/mealSchedule/${id}`, {
          method: "DELETE"
        })
          .then(res => {
            if (res.ok) e.target.closest(".meal").remove();
          })
          .catch(err => console.error("Erro ao excluir refeição:", err));
      }
    }
  });

  // --- Script 4: controle de líquidos via JSON ---
  const addButton = document.getElementById('add-agua');
  const addOptions = document.getElementById('add-options');
  const consumoTotal = document.getElementById('consumo-total');
  const progressBar = document.getElementById('progress-bar');
  const metaElemento = document.getElementById('meta-consumo');

  let consumoAtual = 0;

  const usuarioLogado = localStorage.getItem('usuarioLogado');
  let metaConsumo = 2240; 

  if (usuarioLogado) {
    const metaSalva = localStorage.getItem(`${usuarioLogado}_metaAguaDiaria`);
    if (metaSalva) {
      metaConsumo = parseInt(metaSalva);
    }
  }

  metaElemento.textContent = `${metaConsumo} ml`;

  function atualizarProgresso() {
    const progresso = Math.min((consumoAtual / metaConsumo) * 100, 100);
    progressBar.style.width = progresso + '%';
  }

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
        if (usuarioLogado) {
          localStorage.setItem(`${usuarioLogado}_consumoAgua`, consumoAtual);
        }
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
      if (usuarioLogado) {
        localStorage.setItem(`${usuarioLogado}_consumoAgua`, 0);
      }
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

  fetch("http://localhost:3000/waterOptions")
    .then(response => response.json())
    .then(options => criarBotoesAgua(options))
    .catch(error => console.error("Erro ao carregar opções de água:", error));

  let savedConsumo = 0;
  if (usuarioLogado) {
    savedConsumo = localStorage.getItem(`${usuarioLogado}_consumoAgua`);
  }
  if (savedConsumo) {
    consumoAtual = parseInt(savedConsumo);
    consumoTotal.textContent = consumoAtual + ' ml';
    atualizarProgresso();
  }

  const addCaloriasBtn = document.getElementById('add-calorias');
  const addOptionsCalorias = document.getElementById('add-options-calorias');
  const consumoCalorias = document.getElementById('consumo-calorias');
  const progressBarCalorias = document.getElementById('progress-bar-calorias');
  const metaCalorias = document.getElementById('meta-calorias');

  let caloriasAtuais = 0;

  let metaCaloriasValor = 2000;

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

  fetch("http://localhost:3000/kcalOptions")
    .then(response => response.json())
    .then(options => criarBotoesCalorias(options))
    .catch(error => console.error("Erro ao carregar opções de calorias:", error));

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