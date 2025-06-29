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

    // semana começa na segunda
    const dia = hoje.getDay();
    const diff = dia === 0 ? 6 : dia - 1; // domingo=6, segunda=0, etc
    const primeiroDiaSemana = new Date(hoje);
    primeiroDiaSemana.setHours(0,0,0,0);
    primeiroDiaSemana.setDate(hoje.getDate() - diff);

    const ultimoDiaSemana = new Date(primeiroDiaSemana);
    ultimoDiaSemana.setDate(primeiroDiaSemana.getDate() + 6);

    // zera horas para comparação só de data
    function zerarHoras(d) {
        const nova = new Date(d);
        nova.setHours(0,0,0,0);
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
        })
        .catch(err => {
            document.getElementById("totalUsuarios").innerHTML = `<p>Erro</p>`;
            document.getElementById("totalNutricionistas").innerHTML = `<p>Erro</p>`;
            document.getElementById("novosMes").innerHTML = `<p>Erro</p>`;
            document.getElementById("novosSemana").innerHTML = `<p>Erro</p>`;
        });
}