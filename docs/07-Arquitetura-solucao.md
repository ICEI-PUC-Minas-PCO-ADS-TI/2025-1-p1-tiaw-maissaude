# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

A aplicação Ma+s Saúde é estruturada em duas partes principais: o front-end e o backend simulado. O front-end foi desenvolvido com HTML, CSS e JavaScript, adotando o modelo de SPA (Single Page Application), onde o conteúdo é carregado dinamicamente sem recarregar a página. Ele inclui páginas como a home com metas diárias, sistema de login/cadastro, painel administrativo e gráficos interativos com a biblioteca Chart.js. Já o backend foi simulado utilizando o JSON Server, que fornece uma API REST baseada em um arquivo .json, permitindo operações de CRUD com os dados da aplicação, como usuários, refeições, metas e favoritos. Em relação à hospedagem, o front-end está no Vercel, plataforma moderna e de fácil uso, enquanto o backend, por limitações do Vercel com servidores contínuos, foi hospedado no Replit, onde foi criado um mini-servidor adaptado para simular corretamente o comportamento do JSON Server.

## Funcionalidades

Esta seção apresenta as funcionalidades da solução.

##### Funcionalidade 1 - Cadastro e login

Permite ao usuário se autenticar no sistema e criar uma nova conta para acessar as funcionalidades da aplicação.

* **Instruções de acesso:**
  * Acesse o site e vá para a página “Login/Cadastro”;
  * Informe seu nome, e-mail e senha para se cadastrar;
  * O usuario é redirecionado para o login, basta utilizar as informações cadastradas;
  * O usuário será redirecionado para a home page.
* **Tela da funcionalidade**:

![login html](https://github.com/user-attachments/assets/2c5973d8-9f2a-44e2-bbea-4d6a0aa149b5)

##### Funcionalidade 2 - Home Page

Permite que o usuário tenha uma panorama geral do site, conseguindo controlar sua ingestão de água e calorias, controlar horarios de refeiçoes e mais.

* **Instruções de acesso:**
  * Acesse o site e vá para a página principal;
  * Altere os valores de calorias e liquidos;
  * Configure seus horarios de refeições;
  * Tenha um carrossel indicando refeições.
* **Tela da funcionalidade**:

![home](https://github.com/user-attachments/assets/ccab8b36-65cb-4d96-976e-34ab0d3e8b74)

##### Funcionalidade 3 - Metas

Permite cadastrar, visualizar e acompanhar metas de saúde, com exibição de progresso e gráficos.

* **Instruções de acesso:**
  * Acesse o site e vá para a página “Metas”;
  * Cadastre a meta no primeiro card;
  * Veja a meta listada no card do meio;
  * Visualize os gráficos no último card.
* **Tela da funcionalidade**:

![metas](https://github.com/user-attachments/assets/3ba81c94-e16b-48b0-b791-e4c06daef3b6)

##### Funcionalidade 4 - Consumo de água

Permite calcular a quantidade ideal de água diária com base em informações do usuário e registrar a ingestão ao longo do dia.

* **Instruções de acesso:**
  * Acesse o site e vá para a página “Consumo de água”;
  * Preencha os dados e clique em “Calcular minha necessidade de água”;
  * O resultado é exibido com um gráfico e enviado à homepage para controle diário.
* **Tela da funcionalidade**:

![agua](https://github.com/user-attachments/assets/0af5351e-5c04-4e94-9a3e-2693bcb4176d)

##### Funcionalidade 5 - Consumo de Calorias

Permite calcular a quantidade ideal de calorias diária com base em informações do usuário e registrar a ingestão ao longo do dia.

* **Instruções de acesso:**
  * Acesse o site e vá para a página “Calculadora TMB”;
  * Preencha os dados e clique em “Calcular Calorias Basais”;
  * O resultado é exibido com um gráfico e enviado à homepage para controle diário.
* **Tela da funcionalidade**:

![metabolismo](https://github.com/user-attachments/assets/456e0399-ff66-4fde-9354-214416f94c4b)

##### Funcionalidade 6 - Página de Administradores

Permite o administrador visualizar a qunatidade de usuários presentes no site, assim como nutricionista. além de poder remove-los.

* **Instruções de acesso:**
  * Faça login com o usuário do administrador;
  * Tenha acesso a um painel atualizado em tempo real com informações dos usuários;
  * É possivel remover usuário e nutricionistas.
* **Tela da funcionalidade**:

![adm](https://github.com/user-attachments/assets/a17c26e1-4da7-4cfe-8b59-8b7cf40d72de)

### Estruturas de dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info.

##### Estrutura de dados - Usuários 

Registro dos usuários do sistema utilizados para cadastro e login do sistema.

```json
    {
      "usuario": "Amalia",
      "email": "amalia@gmail.com",
      "senha": "123456",
      "dataCadastro": "2025-06-24T03:54:12.793Z",
      "id": "G5M2FLm"
    }
```

##### Estrutura de dados - Metas

Metas dos usuários

```json
  {
    "texto": "Correr 10km",
    "categoria": "Exercício",
    "prazo": "2025-06-28",
    "concluida": false,
    "userId": "BaavtvZ",
    "id": 2
  }
  
```

##### Estrutura de dados - Refeições

Refeições indicadas para o usuário

```json
  {
    "id": "1",
    "nome": "Panqueca de Mirtilo",
    "imagem": "assets/images/refeicoes/panquecamirtilo.jpeg",
    "descricao": "Com 15g de proteína por porção, esta panqueca proteica é preparada sem adição de açúcares e sem o uso de farinha branca. A combinação de mirtilos naturais com chocolate   branco de alta qualidade garante um sabor marcante, aliado a uma composição nutritiva. Uma escolha prática e equilibrada para quem valoriza refeições saborosas e funcionais.",
    "ingredientes": [
       "clara de ovo", "farelo de aveia", "gema de ovo", "maltitol", "chocolate branco sem açúcar", "mirtilo", "whey 80%", "leite em pó integral",
      ],
    "nutricional": [
        {"componente": "Valor energético", "quantidade": "310 kcal", "vd": "16%"},
        {"componente": "Carboidratos", "quantidade": "37 g", "vd": "12%"},
        {"componente": "Proteínas", "quantidade": "15 g", "vd": "20%"},
      ]
    "categoria": "cafe-da-manha"
  }
  
```

### Módulos e APIs

Esta seção apresenta os módulos e APIs utilizados na solução.

**Fontes**:

* Google Fonts - [https://fonts.google.com/specimen/Montserrat](https://fonts.google.com/specimen/Montserrat)

**Images**:

* Unsplash - [https://unsplash.com/](https://unsplash.com/) 

**Scripts:**

* Chart.js - [https://www.chartjs.org/](https://www.chartjs.org/)
* AnyChart - [https://www.anychart.com/](https://www.anychart.com/)

## Hospedagem

A aplicação Ma+s Saúde foi desenvolvida como uma plataforma web, utilizando tecnologias do lado do cliente (HTML, CSS, JavaScript) e integrando-se a um backend simulado via JSON Server. A escolha das plataformas de hospedagem considerou a facilidade de uso, compatibilidade com as tecnologias adotadas e a estabilidade no acesso aos recursos.

**Front-end**

O front-end (HTML, CSS, JavaScript e imagens) está hospedado na plataforma Vercel. A escolha foi feita pela facilidade de uso, deploy automatizado via GitHub e suporte eficiente para aplicações web estáticas e SPA (Single Page Applications). O site pode ser acessado por meio de uma URL gerada automaticamente pela Vercel.

**JSON Server**

Utilizamos o JSON Server para simular uma API REST com um arquivo .json. No entanto, por limitações técnicas, não foi possível hospedar o servidor diretamente no Vercel. Por isso, optamos pela Replit, onde adaptamos o ambiente para que fosse possível hospedar o JSON Server. Essa solução permitiu a manipulação dos dados (metas, refeições, favoritos, etc.) via requisições HTTP, integrando-se perfeitamente ao front-end.
