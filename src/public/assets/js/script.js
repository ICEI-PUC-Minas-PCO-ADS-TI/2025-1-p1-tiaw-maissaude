const currentIndexes = [0, 0, 0];
const features = document.querySelectorAll(".feature");

fetch("http://localhost:3000/featureData")
  .then(response => response.json())
  .then(featureData => {
    features.forEach((featureEl, featureIndex) => {
      const button = featureEl.querySelector(".feature-seta");
      const imgEl = featureEl.querySelector(".feature-img");
      const titleEl = featureEl.querySelector(".feature-title");
      const descEl = featureEl.querySelector(".feature-description");

      button.addEventListener("click", () => {
        currentIndexes[featureIndex] =
          (currentIndexes[featureIndex] + 1) % featureData[featureIndex].length;

        const nextContent = featureData[featureIndex][currentIndexes[featureIndex]];
        imgEl.src = nextContent.img;
        titleEl.innerHTML = nextContent.title;
        descEl.innerHTML = nextContent.description;
      });
    });
  })
  .catch(error => console.error('Erro ao carregar o JSON de features:', error));