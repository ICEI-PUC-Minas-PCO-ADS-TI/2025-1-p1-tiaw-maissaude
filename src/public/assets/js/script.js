document.addEventListener('DOMContentLoaded', function() {
  // Configuração do calendário - totalmente dinâmico
  let semanaAtual = 0;
  const dataAtual = new Date();
  let mesAtual = dataAtual.getMonth();
  let anoAtual = dataAtual.getFullYear();

  // Elementos do DOM
  const diasMesElement = document.getElementById('dias-mes');
  const tituloSemanaElement = document.getElementById('titulo-semana');
  const btnSemanaAnterior = document.getElementById('semana-anterior');
  const btnProximaSemana = document.getElementById('proxima-semana');
  
  // Nomes dos meses
  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  // Função para calcular quantas semanas tem o mês
  function getTotalSemanasNoMes() {
    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1);
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0);
    
    // Dias no mês + dias da semana do primeiro dia
    const totalDias = ultimoDiaMes.getDate() + primeiroDiaMes.getDay();
    return Math.ceil(totalDias / 7);
  }

  // Função para atualizar o calendário
  function atualizarCalendario() {
    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1);
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0);
    const totalSemanas = getTotalSemanasNoMes();
    
    // Ajustar semana atual se for maior que o total de semanas
    if (semanaAtual >= totalSemanas) {
      semanaAtual = totalSemanas - 1;
    }
    
    // Encontrar o primeiro dia da semana atual
    let primeiroDiaSemana = new Date(anoAtual, mesAtual, 1);
    primeiroDiaSemana.setDate(primeiroDiaSemana.getDate() + (semanaAtual * 7) - primeiroDiaSemana.getDay() + 1);
    
    // Ajustar se estiver antes do primeiro dia do mês
    if (primeiroDiaSemana < primeiroDiaMes) {
      primeiroDiaSemana = new Date(primeiroDiaMes);
    }
    
    // Atualizar título
    tituloSemanaElement.textContent = `${meses[mesAtual]} ${anoAtual} - Semana ${semanaAtual + 1}`;
    
    // Gerar os dias da semana
    diasMesElement.innerHTML = '';
    let dataRender = new Date(primeiroDiaSemana);
    
    for (let i = 0; i < 7; i++) {
      const span = document.createElement('span');
      
      // Verificar se o dia está dentro do mês atual
      if (dataRender.getMonth() === mesAtual && dataRender.getFullYear() === anoAtual) {
        span.textContent = dataRender.getDate();
        
        // Destacar o dia atual
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
    
    // Desabilitar botões quando necessário
btnSemanaAnterior.disabled = semanaAtual === 0 && mesAtual === 0 && anoAtual === new Date().getFullYear();
btnProximaSemana.disabled = false; 
}
  
  // Função para mudar de mês
  function mudarMes(incremento) {
    mesAtual += incremento;
    
    // Ajustar ano se necessário
    if (mesAtual > 11) {
      mesAtual = 0;
      anoAtual++;
    } else if (mesAtual < 0) {
      mesAtual = 11;
      anoAtual--;
    }
    
    semanaAtual = 0; // Reset para primeira semana do novo mês
    atualizarCalendario();
  }
  
  // Event listeners para os botões
  btnSemanaAnterior.addEventListener('click', function() {
    if (semanaAtual > 0) {
      semanaAtual--;
    } else {
      mudarMes(-1); // Vai para o mês anterior
    }
    atualizarCalendario();
  });
  
btnProximaSemana.addEventListener('click', function() {
    const totalSemanas = getTotalSemanasNoMes();
    
    if (semanaAtual < totalSemanas - 1) {
        semanaAtual++;
    } else {
        mudarMes(1);
        // Garantir que não vamos para uma semana inexistente no novo mês
        semanaAtual = 0;
    }
    atualizarCalendario();
});

function getTotalSemanasNoMes() {
    const primeiroDiaMes = new Date(anoAtual, mesAtual, 1);
    const ultimoDiaMes = new Date(anoAtual, mesAtual + 1, 0);
    
    // Dias no mês + dias da semana do primeiro dia
    const totalDias = ultimoDiaMes.getDate() + primeiroDiaMes.getDay();
    return Math.ceil(totalDias / 7);
}

  // Inicializar o calendário
  atualizarCalendario();















const mealData = [
    { hora: "08:00", refeicao: "Café da manhã", icone: "☕" },
    { hora: "11:00", refeicao: "Lanche da manhã", icone: "🍞" },
    { hora: "13:00", refeicao: "Almoço", icone: "🍗" },
    { hora: "16:00", refeicao: "Lanche da tarde", icone: "🍞" },
    { hora: "16:00", refeicao: "Jantar", icone: "🍽️" },
    { hora: "16:00", refeicao: "Lanche da noite", icone: "🥪" }
];

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















  

  // Código para o controle de líquidos
  const addButton = document.getElementById('add-agua');
  const addOptions = document.getElementById('add-options');
  const consumoTotal = document.getElementById('consumo-total');
  const progressBar = document.getElementById('progress-bar');
  const metaConsumo = 2240; // Meta em ml
  
  let consumoAtual = 0;
  
  // Alternar visibilidade das opções de quantidade
  addButton.addEventListener('click', function() {
    addOptions.classList.toggle('hidden');
  });
  
  // Adicionar água quando um botão de quantidade é clicado
  document.querySelectorAll('.quantity-btn').forEach(button => {
    button.addEventListener('click', function() {
      const amount = parseInt(this.getAttribute('data-amount'));
      consumoAtual += amount;
      
      // Atualizar display
      consumoTotal.textContent = consumoAtual + ' ml';
      
      // Calcular e atualizar barra de progresso
      const progresso = Math.min((consumoAtual / metaConsumo) * 100, 100);
      progressBar.style.width = progresso + '%';
      
      // Esconder opções após seleção
      addOptions.classList.add('hidden');
      
      // Salvar no localStorage
      localStorage.setItem('consumoAgua', consumoAtual);
    });
  });
  
  // Carregar consumo salvo ao iniciar
  const savedConsumo = localStorage.getItem('consumoAgua');
  if (savedConsumo) {
    consumoAtual = parseInt(savedConsumo);
    consumoTotal.textContent = consumoAtual + ' ml';
    const progresso = Math.min((consumoAtual / metaConsumo) * 100, 100);
    progressBar.style.width = progresso + '%';
  }
});