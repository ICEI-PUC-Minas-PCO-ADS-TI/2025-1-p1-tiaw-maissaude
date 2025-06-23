document.getElementById("bmrForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Coleta de dados
    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    // Cálculo da TMB (fórmula de Harris-Benedict)
    let bmr = 0;
    if (gender === "male") {
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
    } else if (gender === "female") {
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
    }

    // Exibe a TMB arredondada
    document.getElementById("calories").textContent = `${bmr.toFixed(0)} kcal`;

    // Fatores de atividade
    const activityFactors = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };

    // Cálculo e exibição das calorias por nível de atividade
    for (const [level, factor] of Object.entries(activityFactors)) {
        const totalCalories = bmr * factor;
        document.getElementById(level).textContent = `${totalCalories.toFixed(0)} kcal`;
    }

    // Gráfico com Chart.js
    renderChart(bmr, activityFactors);
});

// Gera o gráfico
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