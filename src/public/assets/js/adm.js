function mostrarTela(tela) {
    const conteudo = document.getElementById("conteudoPrincipal");

    if (tela === "usuarios") {
        conteudo.innerHTML = `
            <h2>Gerenciamento de Usuários</h2>
            <div id="listaUsuarios"><p>Carregando usuários...</p></div>
        `;
        carregarUsuariosFiltrados(
            user => !user.admin && !user.nutricionista,
            "listaUsuarios",
            "Nenhum usuário comum encontrado."
        );
    }

    if (tela === "nutricionistas") {
        conteudo.innerHTML = `
            <h2>Nutricionistas Cadastrados</h2>
            <div id="listaNutricionistas"><p>Carregando nutricionistas...</p></div>
        `;
        carregarUsuariosFiltrados(
            user => user.nutricionista === true,
            "listaNutricionistas",
            "Nenhum nutricionista encontrado."
        );
    }

    if (tela === "dashboard") {
        conteudo.innerHTML = `
        <h2>Dashboard</h2>
        <div class="cards-dashboard">
            <div class="card-total" id="totalUsuarios">
                <p>Usuários cadastrados</p>
                <h3>...</h3>
            </div>
            <div class="card-total" id="totalNutricionistas">
                <p>Nutricionistas cadastrados</p>
                <h3>...</h3>
            </div>
            <div class="card-total" id="novosMes">
                <p>Novos cadastros (mês)</p>
                <h3>...</h3>
            </div>
            <div class="card-total" id="novosSemana">
                <p>Novos cadastros (semana)</p>
                <h3>...</h3>
            </div>
        </div>
        <canvas id="graficoCrescimento" width="400" height="200" style="margin-top:30px;"></canvas>
    `;
        carregarDadosDashboard();
    }
}

function carregarUsuariosFiltrados(filtroFn, idContainer, mensagemVazio) {
    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(dados => {
            const lista = document.getElementById(idContainer);
            const filtrados = dados.filter(filtroFn);

            if (filtrados.length === 0) {
                lista.innerHTML = `<p>${mensagemVazio}</p>`;
                return;
            }

            lista.innerHTML = filtrados.map(user => `
                <div class="card-usuario">
                    <h3>${user.usuario}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>ID:</strong> ${user.id}</p>
                </div>
            `).join("");
        })
        .catch(err => {
            document.getElementById(idContainer).innerHTML = `<p>Erro ao carregar dados: ${err}</p>`;
        });
}

function ehDesteMes(dataStr) {
    const hoje = new Date();
    const data = new Date(dataStr);
    return data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear();
}

function ehDestaSemana(dataStr) {
    const hoje = new Date();
    const data = new Date(dataStr);

    const dia = hoje.getDay();
    const diff = dia === 0 ? 6 : dia - 1; 
    const primeiroDiaSemana = new Date(hoje);
    primeiroDiaSemana.setHours(0, 0, 0, 0);
    primeiroDiaSemana.setDate(hoje.getDate() - diff);

    const ultimoDiaSemana = new Date(primeiroDiaSemana);
    ultimoDiaSemana.setDate(primeiroDiaSemana.getDate() + 6);

    function zerarHoras(d) {
        const nova = new Date(d);
        nova.setHours(0, 0, 0, 0);
        return nova;
    }

    const dataZerada = zerarHoras(data);
    const inicioSemana = zerarHoras(primeiroDiaSemana);
    const fimSemana = zerarHoras(ultimoDiaSemana);

    return dataZerada >= inicioSemana && dataZerada <= fimSemana;
}

function carregarDadosDashboard() {
    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(dados => {
            const totalUsuarios = dados.filter(user => !user.admin && !user.nutricionista).length;
            const totalNutricionistas = dados.filter(user => user.nutricionista === true).length;

            const novosMes = dados.filter(user => user.dataCadastro && ehDesteMes(user.dataCadastro)).length;
            const novosSemana = dados.filter(user => user.dataCadastro && ehDestaSemana(user.dataCadastro)).length;

            document.querySelector("#totalUsuarios h3").textContent = totalUsuarios;
            document.querySelector("#totalNutricionistas h3").textContent = totalNutricionistas;
            document.querySelector("#novosMes h3").textContent = novosMes;
            document.querySelector("#novosSemana h3").textContent = novosSemana;

            criarGraficoCrescimento(dados);
        })
        .catch(err => {
            document.getElementById("totalUsuarios").innerHTML = `<p>Erro</p>`;
            document.getElementById("totalNutricionistas").innerHTML = `<p>Erro</p>`;
            document.getElementById("novosMes").innerHTML = `<p>Erro</p>`;
            document.getElementById("novosSemana").innerHTML = `<p>Erro</p>`;
        });
}

function criarGraficoCrescimento(usuarios) {

    const hoje = new Date();
    const meses = [];
    for (let i = 11; i >= 0; i--) {
        const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
        const mesAno = (data.getMonth() + 1).toString().padStart(2, "0") + "/" + data.getFullYear();
        meses.push(mesAno);
    }

    const contagemMeses = meses.map(mesAno => {
        return usuarios.filter(user => {
            if (!user.dataCadastro) return false;
            const data = new Date(user.dataCadastro);
            const dataMesAno = (data.getMonth() + 1).toString().padStart(2, "0") + "/" + data.getFullYear();
            return dataMesAno === mesAno;
        }).length;
    });

    const ctx = document.getElementById("graficoCrescimento").getContext("2d");

    if (window.graficoUsuarios) {
        window.graficoUsuarios.destroy();
    }

    // Cria o gráfico
    window.graficoUsuarios = new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'Novos Cadastros Mensais',
                data: contagemMeses,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                x: { title: { display: true, text: 'Mês/Ano' } },
                y: { title: { display: true, text: 'Cadastros' }, beginAtZero: true, precision: 0 }
            }
        }
    });
}

function mostrarTela(tela) {
    const conteudo = document.getElementById("conteudoPrincipal");

    if (tela === "usuarios") {
        conteudo.innerHTML = `
            <h2>Gerenciamento de Usuários</h2>
            <div id="listaUsuarios"><p>Carregando usuários...</p></div>
        `;
        carregarUsuariosFiltrados(
            user => !user.admin && !user.nutricionista,
            "listaUsuarios",
            "Nenhum usuário comum encontrado."
        );

        setTimeout(() => {
            const lista = document.getElementById("listaUsuarios");
            if (lista) {
                lista.addEventListener("click", (e) => {
                    if (e.target.classList.contains("btn-excluir")) {
                        const id = e.target.getAttribute("data-id");
                        deletarUsuario(id);
                    }
                });
            }
        }, 300);
    }

    if (tela === "nutricionistas") {
        conteudo.innerHTML = `
            <h2>Nutricionistas Cadastrados</h2>
            <div id="listaNutricionistas"><p>Carregando nutricionistas...</p></div>
        `;
        carregarUsuariosFiltrados(
            user => user.nutricionista === true,
            "listaNutricionistas",
            "Nenhum nutricionista encontrado."
        );
        
    }

    if (tela === "dashboard") {
        conteudo.innerHTML = `
        <h2>Dashboard</h2>
        <div class="cards-dashboard">
            <div class="card-total" id="totalUsuarios">
                <p>Usuários cadastrados</p>
                <h3>...</h3>
            </div>
            <div class="card-total" id="totalNutricionistas">
                <p>Nutricionistas cadastrados</p>
                <h3>...</h3>
            </div>
            <div class="card-total" id="novosMes">
                <p>Novos cadastros (mês)</p>
                <h3>...</h3>
            </div>
            <div class="card-total" id="novosSemana">
                <p>Novos cadastros (semana)</p>
                <h3>...</h3>
            </div>
        </div>
        <div class="grafico"><canvas id="graficoCrescimento" width="400" height="200" style="margin-top:30px;"></canvas></div>
    `;
        carregarDadosDashboard();
    }
}

function carregarUsuariosFiltrados(filtroFn, idContainer, mensagemVazio) {
    fetch("http://localhost:3000/usuarios")
        .then(res => res.json())
        .then(dados => {
            const lista = document.getElementById(idContainer);
            const filtrados = dados.filter(filtroFn);

            if (filtrados.length === 0) {
                lista.innerHTML = `<p>${mensagemVazio}</p>`;
                return;
            }

            lista.innerHTML = filtrados.map(user => `
                <div class="card-usuario" data-id="${user.id}">
                    <h3>${user.usuario}</h3>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>ID:</strong> ${user.id}</p>
                    <button class="btn-excluir" data-id="${user.id}">Excluir</button>
                </div>
            `).join("");
        })
        .catch(err => {
            document.getElementById(idContainer).innerHTML = `<p>Erro ao carregar dados: ${err}</p>`;
        });
}

function deletarUsuario(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    fetch(`http://localhost:3000/usuarios/${id}`, {
        method: "DELETE",
    })
    .then(res => {
        if (res.ok) {
            alert("Usuário excluído com sucesso!");
            mostrarTela("usuarios"); 
        } else {
            alert("Erro ao excluir usuário.");
        }
    })
    .catch(err => {
        alert("Erro ao excluir usuário: " + err);
    });
}

function logout() {
    sessionStorage.removeItem("Usuario");
    localStorage.removeItem("usuarioLogado");
    localStorage.removeItem("userId");

    window.location.href = "login.html";
}

window.onload = function() {
    mostrarTela('dashboard');
};