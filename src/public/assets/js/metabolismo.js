document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.container').classList.add('colapsado');
});

document.getElementById("bmrForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Coleta de dados
    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const selectedActivity = document.getElementById("activityLevel").value;

    if (isNaN(age) || isNaN(weight) || isNaN(height)) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Cálculo da TMB
    let bmr = 0;
    if (gender === "male") {
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else {
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    // Fatores de atividade
    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };

    const selectedCalories = bmr * activityFactors[selectedActivity];

    // Mostra resultado com estilo
    const resultadoDiv = document.getElementById("result");
    const chartContainer = document.querySelector(".chart-container");
    const container = document.querySelector(".container");

    resultadoDiv.innerHTML = `
        <h2>Resultado</h2>
        <p>Com base no nível de atividade "<strong>${selectedActivity}</strong>":</p>
        <p style="font-size: 24px; color: #28a745; font-weight: bold;">
            ${selectedCalories.toFixed(0)} kcal/dia
        </p>
    `;

    resultadoDiv.style.display = "block";
    chartContainer.style.display = "block";

    void resultadoDiv.offsetWidth;

    resultadoDiv.classList.add("mostrar");
    chartContainer.classList.add("mostrar");
    container.classList.remove("colapsado");

    // Exibe também os valores por nível de atividade (caso deseje manter abaixo)
    for (const [level, factor] of Object.entries(activityFactors)) {
        const totalCalories = bmr * factor;
        const levelElement = document.getElementById(level);
        if (levelElement) {
            levelElement.textContent = `${totalCalories.toFixed(0)} kcal`;
        }
    }

    renderChart(bmr, activityFactors);
});

// Gráfico com Chart.js
let bmrChart = null;

function renderChart(bmr, activityFactors) {
    const ctx = document.getElementById("bmrChart").getContext("2d");

    const labels = {
        sedentary: "Sedentário",
        light: "Levemente Ativo",
        moderate: "Moderadamente Ativo",
        active: "Muito Ativo",
        veryActive: "Extremamente Ativo"
    };

    const data = Object.entries(activityFactors).map(([level, factor]) => ({
        label: labels[level],
        calories: bmr * factor
    }));

    const chartData = {
        labels: data.map(d => d.label),
        datasets: [{
            label: "Calorias por Nível de Atividade",
            data: data.map(d => d.calories.toFixed(0)),
            backgroundColor: "#84c77d",
            borderRadius: 8
        }]
    };

    const config = {
        type: "bar",
        data: chartData,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => value + " kcal"
                    }
                }
            }
        }
    };

    if (bmrChart) {
        bmrChart.destroy();
    }
    bmrChart = new Chart(ctx, config);
}