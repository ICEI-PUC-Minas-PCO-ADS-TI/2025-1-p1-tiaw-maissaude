const currentIndexes = [];

fetch("https://48b4388b-3de9-4339-876a-e146817af41e-00-u2urj6cxk22a.spock.replit.dev/featureData")
  .then(res => res.json())
  .then(data => {
    const featuresContainer = document.querySelector('.features');

    data.forEach((group, groupIndex) => {
      currentIndexes[groupIndex] = 0;

      const featureDiv = document.createElement('div');
      featureDiv.classList.add('feature');
      featureDiv.dataset.featureIndex = groupIndex;

      const img = document.createElement('img');
      img.className = 'feature-img';
      img.src = group[0].img;
      img.alt = 'feature';

      const textDiv = document.createElement('div');
      textDiv.className = 'feature-text';

      const title = document.createElement('h3');
      title.className = 'feature-title';
      title.innerHTML = group[0].title;

      const desc = document.createElement('p');
      desc.className = 'feature-description';
      desc.textContent = group[0].description;

      const button = document.createElement('button');
      button.className = 'feature-seta';
      button.textContent = '→';

      // Evento do botão
      button.addEventListener('click', () => {
        currentIndexes[groupIndex] = (currentIndexes[groupIndex] + 1) % group.length;
        const next = group[currentIndexes[groupIndex]];
        img.src = next.img;
        title.innerHTML = next.title;
        desc.textContent = next.description;
      });

      textDiv.appendChild(title);
      textDiv.appendChild(desc);
      featureDiv.appendChild(img);
      featureDiv.appendChild(textDiv);
      featureDiv.appendChild(button);
      featuresContainer.appendChild(featureDiv);
    });
  })
  .catch(error => console.error("Erro ao carregar as features:", error));
