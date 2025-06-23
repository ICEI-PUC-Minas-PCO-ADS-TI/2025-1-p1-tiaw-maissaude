const form = document.getElementById("formMetas");
const input = document.getElementById("campoEntrada");
const categoriaSelect = document.getElementById("categoria");
const dataPrazoInput = document.getElementById("dataPrazo");
const lista = document.getElementById("listaMetas");
const progressBar = document.getElementById("progressBar");
const filtroCategoriaSelect = document.getElementById("filtroCategoria");

let metas = [];

function carregarMetas() {
  fetch("http://localhost:3000/metas")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar metas");
      return res.json();
    })
    .then(data => {
      metas = data;
      renderizarMetas();
      gerarGraficoDeMetas(filtroCategoriaSelect.value);
    })
    .catch(error => {
      console.error("Erro ao carregar metas:", error);
    });
}

function adicionarMeta(meta) {
  fetch("http://localhost:3000/metas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meta)
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro ao adicionar meta");
    return res.json();
  })
  .then(novaMeta => {
    metas.push(novaMeta);
    renderizarMetas();
    gerarGraficoDeMetas(filtroCategoriaSelect.value);
  })
  .catch(error => {
    console.error("Erro ao adicionar meta:", error);
  });
}

function atualizarMeta(meta) {
  fetch(`http://localhost:3000/metas/${meta.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meta)
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro ao atualizar meta");
    gerarGraficoDeMetas(filtroCategoriaSelect.value);
  })
  .catch(error => {
    console.error("Erro ao atualizar meta:", error);
  });
}

function excluirMeta(id) {
  fetch(`http://localhost:3000/metas/${id}`, {
    method: "DELETE"
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro ao excluir meta");
    metas = metas.filter(meta => meta.id !== id);
    renderizarMetas();
    gerarGraficoDeMetas(filtroCategoriaSelect.value);
  })
  .catch(error => {
    console.error("Erro ao excluir meta:", error);
  });
}

function atualizarBarraProgresso() {
  const total = metas.length;
  const concluidas = metas.filter(m => m.concluida).length;
  const percentual = total === 0 ? 0 : (concluidas / total) * 100;
  progressBar.style.width = `${percentual}%`;
}

function renderizarMetas() {
  lista.innerHTML = "";

  const categoriaFiltro = filtroCategoriaSelect.value;
  const metasFiltradas = categoriaFiltro === "todas"
    ? metas
    : metas.filter(meta => meta.categoria === categoriaFiltro);

  metasFiltradas.forEach(meta => {
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

      inputEditar.addEventListener("blur", () => {
        const novoTexto = inputEditar.value.trim();
        if (novoTexto !== "" && novoTexto !== meta.texto) {
          meta.texto = novoTexto;
          atualizarMeta(meta);
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
    btnConcluir.addEventListener("click", () => {
      meta.concluida = !meta.concluida;
      atualizarMeta(meta);
      renderizarMetas();
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "🗑️";
    btnExcluir.title = "Excluir meta";
    btnExcluir.addEventListener("click", () => {
      excluirMeta(meta.id);
    });

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

form.addEventListener("submit", (e) => {
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

  adicionarMeta(novaMeta);
});

filtroCategoriaSelect.addEventListener("change", () => {
  renderizarMetas();
  gerarGraficoDeMetas(filtroCategoriaSelect.value);
});

carregarMetas();