document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').classList.add('colapsado');
});

document.getElementById('calcularBtn').addEventListener('click', calcularAgua);

let waterChart = null;

function calcularAgua() {
    const peso = parseFloat(document.getElementById("peso").value);
    const atividade = parseFloat(document.getElementById("atividade").value);
    const clima = parseFloat(document.getElementById("clima").value);

    if (isNaN(peso)) {
        alert("Por favor, insira seu peso corretamente!");
        return;
    }

    const aguaBase = peso * 35;
    const aguaTotal = (aguaBase * atividade * clima) / 1000; 

    // 🔹 Salva o valor em ml no localStorage
    const aguaEmMl = Math.round(aguaTotal * 1000);
    localStorage.setItem('metaAguaDiaria', aguaEmMl);

    const resultadoDiv = document.getElementById("resultado");
    const chartContainer = document.querySelector(".chart-container");
    const container = document.querySelector(".container");

    resultadoDiv.innerHTML = `
        <h3>Resultado</h3>
        <p>Você deve beber aproximadamente:</p>
        <p style="font-size: 24px; color: #1e90ff; font-weight: bold;">
            ${aguaTotal.toFixed(2)} litros/dia
        </p>
    `;

    resultadoDiv.style.display = "block";
    chartContainer.style.display = "block";

    void resultadoDiv.offsetWidth;

    resultadoDiv.classList.add("mostrar");
    chartContainer.classList.add("mostrar");

    container.classList.remove("colapsado");

    criarGrafico(aguaTotal);
}

function criarGrafico(aguaTotal) {
    const ctx = document.getElementById('waterChart').getContext('2d');

    if (waterChart) {
        waterChart.destroy();
    }

    waterChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sua necessidade diária é'],
            datasets: [{
                data: [aguaTotal],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}