
  
  const featureData = [
    [ 
      {
        img: "img/nutricao1.png",
        title: "Acompanhamento inteligente",
        description: "Acompanhe de forma simples e rápida sua saúde, nosso site nutricional"
      },
      {
        img: "img/imagemFeatures4.webp",
        title: "Monitore sua saúde facilmente",
        description: "Acompanhe indicadores como IMC, ingestão de nutrientes e hábitos alimentares em tempo real."
      }
    ],
    [ 
      {
        img: "img/nutricao2.jpg",
        title: "Mais cores no prato,<br>mais saúde na vida.",
        description: "A alimentação saudável é a chave para uma vida mais proativa e equilibrada, além de prevenir diversas doenças e deficiências físicas, monitore a sua saúde agora mesmo com o Ma+s Saude."
      },
      {
        img: "img/imagemFeatures5.jpg",
        title: "Descubra novos sabores naturais",
        description: "Combine vegetais, frutas e leguminosas para criar pratos deliciosos e nutritivos."
      }
    ],
    [ 
      {
        img: "img/nutricao3.jpg",
        title: "<span class='highlight'>Atenção</span> Perca de forma tradicional",
        description: "Cada prato \"feita de forma tradicional\" é uma ode à excelência. Desde o meticuloso corte do sashimi até a preparação delicada do sushi, cada etapa é uma reverência à herança culinária do Japão."
      },
      {
        img: "img/ImagemFeatures6.jpg",
        title: "<span class='highlight'>Dica</span> Herança e sabor na medida certa",
        description: "Adote receitas milenares adaptadas à nutrição moderna com o toque do Ma+s Saúde."
      }
    ]
  ];

  
  const currentIndexes = [0, 0, 0];

  
  const features = document.querySelectorAll(".feature");

  features.forEach((featureEl, featureIndex) => {
    const button = featureEl.querySelector(".feature-seta");
    const imgEl = featureEl.querySelector(".feature-img");
    const titleEl = featureEl.querySelector(".feature-title");
    const descEl = featureEl.querySelector(".feature-description");

    button.addEventListener("click", () => {
      
      currentIndexes[featureIndex] = (currentIndexes[featureIndex] + 1) % featureData[featureIndex].length;
      const nextContent = featureData[featureIndex][currentIndexes[featureIndex]];

      
      imgEl.src = nextContent.img;
      titleEl.innerHTML = nextContent.title;
      descEl.textContent = nextContent.description;
    });
  });

