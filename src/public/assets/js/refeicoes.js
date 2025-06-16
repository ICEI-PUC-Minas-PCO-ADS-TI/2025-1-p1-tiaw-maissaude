document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/refeicoes")
        .then(response => response.json())
        .then(refeicoes => {
            refeicoes.forEach(refeicao => {
                const container = document.querySelector(`#${refeicao.categoria} .image-grid`);
                if (container) {
                    const placeholder = document.createElement("div");
                    placeholder.classList.add("image-placeholder");

                    placeholder.innerHTML = `
                        <a href="detalhes.html?id=${refeicao.id}" class="image-link">
                            <img src="${refeicao.imagem}" alt="${refeicao.nome}">
                            <p>${refeicao.nome}</p>
                        </a>
                    `;

                    container.appendChild(placeholder);
                }
            });
        })
        .catch(error => console.error("Erro ao carregar as refeições:", error));
});