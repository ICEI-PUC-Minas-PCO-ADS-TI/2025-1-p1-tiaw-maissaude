const form = document.getElementById("formMetas");
const input = document.getElementById("campoEntrada");
const categoriaSelect = document.getElementById("categoria");
const dataPrazoInput = document.getElementById("dataPrazo");
const lista = document.getElementById("listaMetas");
const progressBar = document.getElementById("progressBar");

let metas = [];
const apiURL = "http://localhost:3000/metas";

async function carregarMetas() {
    try {
        const res = await fetch(apiURL);
        metas = await res.json();
        renderizarMetas();
    } catch (error) {
        console.error("Erro ao carregar metas:", error);
    }
}

async function adicionarMeta(meta) {
    try {
        const res = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(meta)
        });
        const novaMeta = await res.json();
        metas.push(novaMeta);
        renderizarMetas();
    } catch (error) {
        console.error("Erro ao adicionar meta:", error);
    }
}

async function atualizarMeta(meta) {
    try {
        await fetch(`${apiURL}/${meta.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(meta)
        });
    } catch (error) {
        console.error("Erro ao atualizar meta:", error);
    }
}

async function excluirMeta(id) {
    try {
        await fetch(`${apiURL}/${id}`, { method: "DELETE" });
        metas = metas.filter(meta => meta.id !== id);
        renderizarMetas();
    } catch (error) {
        console.error("Erro ao excluir meta:", error);
    }
}

function atualizarBarraProgresso() {
    const total = metas.length;
    const concluidas = metas.filter(m => m.concluida).length;
    const percentual = total === 0 ? 0 : (concluidas / total) * 100;
    progressBar.style.width = `${percentual}%`;
}

function renderizarMetas() {
    lista.innerHTML = "";

    metas.forEach(meta => {
        const li = document.createElement("li");

        const spanTexto = document.createElement("span");
        spanTexto.textContent = meta.texto;
        spanTexto.className = meta.concluida ? "concluida" : "";
        spanTexto.style.cursor = "pointer";

        spanTexto.addEventListener("click", () => {
            const inputEditar = document.createElement("input");
            inputEditar.type = "text";
            inputEditar.value = meta.texto;
            inputEditar.classList.add("input-edicao");

            inputEditar.addEventListener("blur", async () => {
                const novoTexto = inputEditar.value.trim();
                if (novoTexto !== "" && novoTexto !== meta.texto) {
                    meta.texto = novoTexto;
                    await atualizarMeta(meta);
                }
                renderizarMetas();
            });

            inputEditar.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    inputEditar.blur();
                }
            });

            li.replaceChild(inputEditar, spanTexto);
            inputEditar.focus();
        });

        const btnConcluir = document.createElement("button");
        btnConcluir.innerHTML = meta.concluida ? "✖" : "✅";
        btnConcluir.title = meta.concluida ? "Desmarcar" : "Concluir";
        btnConcluir.style.marginRight = "10px";
        btnConcluir.addEventListener("click", async () => {
            meta.concluida = !meta.concluida;
            await atualizarMeta(meta);
            renderizarMetas();
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "🗑️";
        btnExcluir.title = "Excluir meta";
        btnExcluir.addEventListener("click", async () => {
            await excluirMeta(meta.id);
        });

        // Tags
        const tagsContainer = document.createElement("div");
        tagsContainer.style.marginTop = "5px";

        if (meta.categoria) {
            const categoriaTag = document.createElement("span");
            categoriaTag.textContent = meta.categoria;
            categoriaTag.classList.add("tag-categoria", meta.categoria.toLowerCase());
            tagsContainer.appendChild(categoriaTag);
        }

        if (meta.prazo) {
            const prazoTag = document.createElement("span");
            prazoTag.textContent = meta.prazo;
            prazoTag.classList.add("tag-data");
            tagsContainer.appendChild(prazoTag);
        }

        li.appendChild(btnConcluir);
        li.appendChild(spanTexto);
        li.appendChild(tagsContainer);
        li.appendChild(btnExcluir);

        lista.appendChild(li);
    });

    atualizarBarraProgresso();
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    const categoria = categoriaSelect.value;
    const prazo = dataPrazoInput.value;

    if (texto === "") {
        input.classList.add("input-erro");
        return;
    }

    const novaMeta = {
        texto,
        categoria,
        prazo,
        concluida: false
    };

    input.value = "";
    categoriaSelect.value = "";
    dataPrazoInput.value = "";
    input.classList.remove("input-erro");

    await adicionarMeta(novaMeta);
});

carregarMetas();