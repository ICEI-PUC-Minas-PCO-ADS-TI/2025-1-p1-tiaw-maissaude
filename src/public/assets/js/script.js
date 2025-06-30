const currentIndexes = [];

fetch('https://48b4388b-3de9-4339-876a-e146817af41e-00-u2urj6cxk22a.spock.replit.dev/features')
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

//AVALIACOES

fetch("https://48b4388b-3de9-4339-876a-e146817af41e-00-u2urj6cxk22a.spock.replit.dev/avaliacoes")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('avaliacaoContainer');

    data.forEach(cliente => {
      const card = document.createElement('div');
      card.classList.add('avaliacao-card');

      card.innerHTML = `
          <img src="${cliente.imagem}" alt="${cliente.nome}">
          <h4>${cliente.nome}</h4>
          <p>${cliente.comentario}</p>
          <div class="stars">${'★ '.repeat(cliente.estrelas).trim()}</div>
        `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error('Erro ao carregar avaliações:', error));

//BANNER

fetch("https://48b4388b-3de9-4339-876a-e146817af41e-00-u2urj6cxk22a.spock.replit.dev/laning")
  .then(res => res.json())
  .then(data => {
    // Banner
    const bannerSection = document.getElementById("banner");
    const bannerImg = document.createElement("img");
    bannerImg.src = data[0].imagem;
    bannerImg.alt = data[0].alt || "Banner";
    bannerSection.appendChild(bannerImg);

    // Img-center
    const centerSection = document.getElementById("imgCenter");
    const centerImg = document.createElement("img");
    centerImg.src = data[1].imagem;
    centerImg.alt = data[1].alt || "Imagem Central";
    centerSection.appendChild(centerImg);
  })
  .catch(err => {
    console.error("Erro ao carregar imagens:", err);
  });




