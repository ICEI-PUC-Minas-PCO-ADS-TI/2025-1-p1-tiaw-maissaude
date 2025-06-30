document.addEventListener("DOMContentLoaded", () => {
  fetch("https://48b4388b-3de9-4339-876a-e146817af41e-00-u2urj6cxk22a.spock.replit.dev/refeicoes")
    .then(response => response.json())
    .then(refeicoes => {
      const track = document.getElementById("carousel-track-categorias");

      // Agrupa refeições por categoria
      const categoriasMap = {};
      refeicoes.forEach(refeicao => {
        if (!categoriasMap[refeicao.categoria]) {
          categoriasMap[refeicao.categoria] = [];
        }
        categoriasMap[refeicao.categoria].push(refeicao);
      });

      const categorias = Object.keys(categoriasMap);

      // Para cada categoria, cria um "slide"
      categorias.forEach(categoria => {
        const slide = document.createElement("div");
        slide.classList.add("carousel-slide");

        categoriasMap[categoria].forEach(refeicao => {
          const item = document.createElement("div");
          item.classList.add("image-placeholder");
          item.innerHTML = `
            <a href="detalhes.html?id=${refeicao.id}" class="image-link">
              <img src="${refeicao.imagem}" alt="${refeicao.nome}">
            </a>
          `;
          slide.appendChild(item);
        });

        track.appendChild(slide);
      });

      // Navegação
      let index = 0;
      const slides = track.children;

      function updateCarousel() {
        const width = track.clientWidth;
        track.style.transform = `translateX(-${index * width}px)`;
      }

      document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
        if (index > 0) {
          index--;
          updateCarousel();
        }
      });

      document.querySelector(".carousel-btn.next").addEventListener("click", () => {
        if (index < slides.length - 1) {
          index++;
          updateCarousel();
        }
      });

      window.addEventListener("resize", updateCarousel);
    })
    .catch(error => console.error("Erro ao carregar refeições:", error));
});
