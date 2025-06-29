function mostrarTela(tela) {
    const conteudo = document.getElementById("conteudoPrincipal");

    if (tela === "usuarios") {
        conteudo.innerHTML = `
            <h2>Gerenciamento de Usuários</h2>
            <div id="listaUsuarios"><p>Carregando usuários...</p></div>
        `;
        carregarUsuariosFiltrados(
            user => !user.admin && !user.nutricionista, // filtro
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

    // outros casos (dashboard, etc)
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