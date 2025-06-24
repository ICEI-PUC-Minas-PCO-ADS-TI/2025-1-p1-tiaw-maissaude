document.addEventListener("DOMContentLoaded", () => {
  gerarGraficoDeMetas(); 

  const filtro = document.getElementById("filtroCategoria");
  filtro.addEventListener("change", () => {
    gerarGraficoDeMetas(filtro.value); 
  });
});

const coresPorCategoria = {
  "saude": "#4CAF50",
  "exercicio": "#2196F3",
  "alimentacao": "#961515"
};

function normalizarCategoria(categoria) {
  return categoria.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

async function gerarGraficoDeMetas(categoriaFiltro = "todas") {
  try {
    const resposta = await fetch("https://48b4388b-3de9-4339-876a-e146817af41e-00-u2urj6cxk22a.spock.replit.dev/metas");
    if (!resposta.ok) {
      throw new Error("Erro ao buscar metas do servidor.");
    }

    let metas = await resposta.json();

    if (categoriaFiltro !== "todas") {
      metas = metas.filter(meta => meta.categoria === categoriaFiltro);
    }

    const canvas = document.getElementById("graficoMetas");
    if (!canvas) {
      console.warn("Canvas do gráfico não encontrado.");
      return;
    }
    const ctx = canvas.getContext("2d");

    // Destroi gráfico anterior se existir
    if (window.graficoMetasInstance) {
      window.graficoMetasInstance.destroy();
    }

    // Se não há metas após o filtro, exibe gráfico vazio
    if (metas.length === 0) {
      window.graficoMetasInstance = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Nenhuma meta"],
          datasets: [{
            label: "Sem dados",
            data: [1],
            backgroundColor: ["#e0e0e0"],
            borderColor: "#fff",
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: () => "Nenhuma meta cadastrada" } }
          }
        }
      });
      return;
    }

    // Dados normais
    const contagem = contarMetasPorCategoria(metas);
    const categorias = Object.keys(contagem);
    const quantidades = Object.values(contagem);

    // Mapeia as cores conforme categoria, padrão cinza se não encontrar
    const cores = categorias.map(cat => coresPorCategoria[normalizarCategoria(cat)] || "#ccc");

    // Cria novo gráfico de pizza com cores alinhadas às tags
    window.graficoMetasInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categorias,
        datasets: [{
          label: "Metas por Categoria",
          data: quantidades,
          backgroundColor: cores,
          borderColor: "#fff",
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || '';
                const value = context.parsed || 0;
                return `${label}: ${value} metas`;
              }
            }
          }
        }
      }
    });

  } catch (erro) {
    console.error("Erro ao gerar gráfico de metas:", erro);
  }
}

function contarMetasPorCategoria(metas) {
  const contagem = {};
  metas.forEach(meta => {
    const categoria = meta.categoria || "Sem Categoria";
    contagem[categoria] = (contagem[categoria] || 0) + 1;
  });
  return contagem;
}
