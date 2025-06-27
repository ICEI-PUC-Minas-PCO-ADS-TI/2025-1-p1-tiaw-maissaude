# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da solução](images/exemplo-arquitetura.png)

## Funcionalidades

Esta seção apresenta as funcionalidades da solução.

##### Funcionalidade 1 - Cadastro de contatos ⚠️ EXEMPLO ⚠️

Permite a inclusão, leitura, alteração e exclusão de contatos para o sistema

* **Estrutura de dados:** [Contatos](#estrutura-de-dados---contatos)
* **Instruções de acesso:**
  * Abra o site e efetue o login;
  * Acesse o menu principal e escolha a opção "Cadastros";
  * Em seguida, escolha a opção "Contatos".
* **Tela da funcionalidade**:

![Tela de funcionalidade](images/exemplo-funcionalidade.png)

> ⚠️ **APAGUE ESTA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente cada uma das funcionalidades que a aplicação fornece tanto para os usuários, quanto aos administradores da solução.
>
> Inclua, para cada funcionalidade, itens como: (1) títulos e descrição da funcionalidade; (2) estrutura de dados associada; (3) o detalhe sobre as instruções de acesso e uso.

### Estruturas de dados

Descrição das estruturas de dados utilizadas na solução com exemplos no formato JSON.Info.

##### Estrutura de dados - Usuários 

Registro dos usuários do sistema utilizados para cadastro e login do sistema.

```json
  {
    "usuario": "amalia",
    "email": "amalia@",
    "senha": "123456",
    "id": "BNlpEQk"
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

Refeições indicadas para o usúario

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

**Images**:

* Unsplash - [https://unsplash.com/](https://unsplash.com/) ⚠️ EXEMPLO ⚠️

**Fonts:**

* Icons Font Face - [https://fontawesome.com/](https://fontawesome.com/) ⚠️ EXEMPLO ⚠️

**Scripts:**

* jQuery - [http://www.jquery.com/](http://www.jquery.com/) ⚠️ EXEMPLO ⚠️
* Bootstrap 4 - [http://getbootstrap.com/](http://getbootstrap.com/) ⚠️ EXEMPLO ⚠️

> ⚠️ **APAGUE ESTA PARTE ANTES DE ENTREGAR SEU TRABALHO**
>
> Apresente os módulos e APIs utilizados no desenvolvimento da solução. Inclua itens como: (1) frameworks, bibliotecas, módulos, etc. utilizados no desenvolvimento da solução; (2) APIs utilizadas para acesso a dados, serviços, etc.


## Hospedagem

A aplicação Ma+s Saúde foi desenvolvida como uma plataforma web, utilizando tecnologias do lado do cliente (HTML, CSS, JavaScript) e integrando-se a um backend simulado via JSON Server. A escolha das plataformas de hospedagem considerou a facilidade de uso, compatibilidade com as tecnologias adotadas e a estabilidade no acesso aos recursos.

**Front-end**

O front-end (HTML, CSS, JavaScript e imagens) está hospedado na plataforma Vercel. A escolha foi feita pela facilidade de uso, deploy automatizado via GitHub e suporte eficiente para aplicações web estáticas e SPA (Single Page Applications). O site pode ser acessado por meio de uma URL gerada automaticamente pela Vercel.

**JSON Server**

Utilizamos o JSON Server para simular uma API REST com um arquivo .json. No entanto, por limitações técnicas, não foi possível hospedar o servidor diretamente no Vercel. Por isso, optamos pela Replit, onde adaptamos o ambiente para que fosse possível hospedar o JSON Server. Essa solução permitiu a manipulação dos dados (metas, refeições, favoritos, etc.) via requisições HTTP, integrando-se perfeitamente ao front-end.
