//Criação dos graficos
(async function() {
  new Chart(
    document.getElementById('graficoEstatistica'),
    {
      type: 'bar',
      data: await createGraficoEstatistica(),
      options: {
         indexAxis: 'y',
         scales: {
          y: {
            beginAtZero: true
          }
        }
      } 
    }
  )


  new Chart(
    document.getElementById('graficoNutricionista'),
    {
      type: 'doughnut',
      data: await createGraficoNutricionista(),
    }
  )

   new Chart(
    document.getElementById('graficoAssinantesMes'),
    {
      type: 'bar',
      data: await createGraficoAssinantesMes(),
      options: {
        scales: {
          y: {
            beginAtZero: true
         }
       }
     }
    }
  )

})();


//Grafico de especialidades de nurticonistas
async function createGraficoNutricionista(){
  let dataJson = await loadData("nutricionistas");

  const data = {
  labels: [
    'Pediatrico',
    'Esportivo',
    'Clinico'
  ],
  datasets: [{
    label: 'Número total',
    data: [dataJson.Pediatrico, dataJson.Clinico, dataJson.Esportivo],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
      hoverOffset: 4
    }]
  };

  return data;
}

//Grafico de Cadastrados
async function createGraficoEstatistica(){
  let dataJson = await loadData("usuarios");
  
  const data = {
    labels: ["Nutricionistas", "Usuarios", "Assinantes"],
    datasets: [{
      label: 'Cadastrados',
      data: [dataJson.nutricionistas, dataJson.usuarios, dataJson.assinantes],
      backgroundColor: [
        'rgba(34, 139, 34, 0.9)',
        'rgba(34, 139, 34, 0.9)',
        'rgba(34, 139, 34, 0.9)',
      ],
      borderWidth: 2
    }]
  };
  
  return data;
}

//Grafico de Assinantes por mês
async function createGraficoAssinantesMes(){
  let dataJson = await loadData("usuarios");

 const labels = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];
  const data = {
     labels: labels,
     datasets: [{
      label: 'Assinantes por mes',
      data: [dataJson.assinantes],
      backgroundColor: [
        'rgb(255, 205, 86)'
      ],
      borderWidth: 2
    }]
  };
  return data;
}



// Carrega dados externos
async function loadData(nomeArquivo) {
  try {
    const response = await fetch("../db/" + nomeArquivo + ".json");
    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }
    const dados = await response.json();
    return dados;
  } catch (erro) {
      console.error('Erro ao ler o arquivo JSON:', erro);
  }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
  // Carrega CSS apenas se necessário
  if (!document.querySelector('link[href="assets/css/style.css"]')) {
    const linkCSS = document.createElement('link');
    linkCSS.rel = 'stylesheet';
    linkCSS.href = 'assets/css/style.css';
    document.head.appendChild(linkCSS);
  }

});
