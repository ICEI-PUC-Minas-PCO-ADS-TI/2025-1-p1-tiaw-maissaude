//Calculo IMC

const peso = parseFloat(document.getElementById('peso').textContent);
const altura = parseFloat(document.getElementById('altura').textContent);
const imc = (peso / (altura * altura)).toFixed(1);
document.getElementById('imc').textContent = imc;

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

// Estrutura para preenchimento do perfil

window.onload = function () {
    const perfil = JSON.parse(localStorage.getItem('perfilUsuario'));

    if (perfil) {
        document.querySelector('.profile-header p').textContent = `${perfil.nome} • ${perfil.idade} anos`;
        document.getElementById('peso').textContent = perfil.peso;
        document.getElementById('altura').textContent = perfil.altura;
        document.querySelector('#imc').textContent = calcularIMC(perfil.peso, perfil.altura);
        document.querySelectorAll('.info-box')[2].innerHTML = `Sexo <strong>${perfil.sexo}</strong>`;
        document.querySelectorAll('.info-box')[4].innerHTML = `Nível de Atividade <strong>${perfil.atividade}</strong>`;
        document.querySelectorAll('.info-box')[5].innerHTML = `Meta <strong>${perfil.meta}</strong>`;
        document.querySelectorAll('.info-box')[6].innerHTML = `Calorias Diárias Alvo <strong>${perfil.calorias} kcal</strong>`;

        document.querySelectorAll('.macro')[0].innerHTML = `Proteínas <span>${perfil.proteinas}g</span>`;
        document.querySelectorAll('.macro')[1].innerHTML = `Carboidratos <span>${perfil.carboidratos}g</span>`;
        document.querySelectorAll('.macro')[2].innerHTML = `Gorduras <span>${perfil.gorduras}g</span>`;
    }
}

function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);
    return imc.toFixed(1);
}




// Estrutura para preenchimento do perfil

window.onload = function () {
    const perfil = JSON.parse(localStorage.getItem('perfilUsuario'));

    if (perfil) {
        document.querySelector('.profile-header p').textContent = `${perfil.nome} • ${perfil.idade} anos`;
        document.getElementById('peso').textContent = perfil.peso;
        document.getElementById('altura').textContent = perfil.altura;
        document.querySelector('#imc').textContent = calcularIMC(perfil.peso, perfil.altura);
        document.querySelectorAll('.info-box')[2].innerHTML = `Sexo <strong>${perfil.sexo}</strong>`;
        document.querySelectorAll('.info-box')[4].innerHTML = `Nível de Atividade <strong>${perfil.atividade}</strong>`;
        document.querySelectorAll('.info-box')[5].innerHTML = `Meta <strong>${perfil.meta}</strong>`;
        document.querySelectorAll('.info-box')[6].innerHTML = `Calorias Diárias Alvo <strong>${perfil.calorias} kcal</strong>`;

        document.querySelectorAll('.macro')[0].innerHTML = `Proteínas <span>${perfil.proteinas}g</span>`;
        document.querySelectorAll('.macro')[1].innerHTML = `Carboidratos <span>${perfil.carboidratos}g</span>`;
        document.querySelectorAll('.macro')[2].innerHTML = `Gorduras <span>${perfil.gorduras}g</span>`;
    }
}

function calcularIMC(peso, altura) {
    const imc = peso / (altura * altura);
    return imc.toFixed(1);
}

 //ESTRUTURA DA PAGINA DE CADASTRO TESTE
        function salvarPerfil() {
            const perfil = {
                nome: document.getElementById('nome').value,
                idade: document.getElementById('idade').value,
                peso: document.getElementById('peso').value,
                altura: document.getElementById('altura').value,
                sexo: document.getElementById('sexo').value,
                atividade: document.getElementById('atividade').value,
                meta: document.getElementById('meta').value,
                calorias: document.getElementById('calorias').value,
                proteinas: document.getElementById('proteinas').value,
                carboidratos: document.getElementById('carboidratos').value,
                gorduras: document.getElementById('gorduras').value
            };

            localStorage.setItem('perfilUsuario', JSON.stringify(perfil));
            window.location.href = "index.html"; 
        }