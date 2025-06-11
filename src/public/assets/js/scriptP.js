
// Estrutura para preenchimento do perfil

window.onload = async function () {
    const perfilId = localStorage.getItem('perfilId');
    if (!perfilId) return;

    try {
        const response = await fetch(`http://localhost:3000/perfil/${perfilId}`);
        if (!response.ok) throw new Error("Perfil não encontrado");

        const perfil = await response.json();

        document.querySelector('.profile-header p').textContent = `${perfil.nome} • ${perfil.idade} anos`;
        document.getElementById('peso').textContent = perfil.peso;
        document.getElementById('altura').textContent = perfil.altura;
        document.getElementById('imc').textContent = calcularIMC(perfil.peso, perfil.altura);
        document.querySelectorAll('.info-box')[2].innerHTML = `Sexo <strong>${perfil.sexo}</strong>`;
        document.querySelectorAll('.info-box')[4].innerHTML = `Nível de Atividade <strong>${perfil.atividade}</strong>`;
        document.querySelectorAll('.info-box')[5].innerHTML = `Meta <strong>${perfil.meta}</strong>`;
        document.querySelectorAll('.info-box')[6].innerHTML = `Calorias Diárias Alvo <strong>${perfil.calorias} kcal</strong>`;

        document.querySelectorAll('.macro')[0].innerHTML = `Proteínas <span>${perfil.proteinas}g</span>`;
        document.querySelectorAll('.macro')[1].innerHTML = `Carboidratos <span>${perfil.carboidratos}g</span>`;
        document.querySelectorAll('.macro')[2].innerHTML = `Gorduras <span>${perfil.gorduras}g</span>`;
    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
    }
};

function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);
    return imc.toFixed(1);
}

            //Frase Motivacional
            
            const input = document.getElementById("goalInput");
            const container = document.getElementById("goalContainer");
            
            input.addEventListener("keydown", function (event) {
                if (event.key === "Enter" && input.value.trim() !== "") {
                    const chip = document.createElement("div");
                    chip.className = "goal-chip";
            
                    const text = document.createElement("span");
                    text.textContent = input.value.trim();
            
                    const closeBtn = document.createElement("span");
                    closeBtn.textContent = "×";
                    closeBtn.className = "close-btn";
                    closeBtn.onclick = () => chip.remove();
            
                    chip.appendChild(text);
                    chip.appendChild(closeBtn);
                    container.appendChild(chip);
            
                    input.value = "";
                }
            });