# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="03-Product-design.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. Apresente os cenários de teste utilizados na realização dos testes da sua aplicação. Escolha cenários de teste que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico, o grupo deve detalhar quais funcionalidades foram avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

| **Caso de teste**  | **CT-001 – Cadastrar perfil**  |
|:---: |:---: |
| Requisito associado | RF-001 - Cadastro de usuário no site. |
| Objetivo do teste | Verificar se o usuário consegue se cadastrar na aplicação. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/index.html](https://maissaude-tiaw.vercel.app/index.html) <br> - Clicar em "Cadastrar-se" na Navbar do site <br> - Preencher os campos obrigatórios (nome, e-mail, senha, ) <br> - Clicar em "Cadastrar" |
| Critério de êxito | - Usuário criado com sucesso. |
| Responsável pela elaboração do caso de teste | Guilherme Teixeira. |

<br>

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-001 - Login de usuário. |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/index.html](https://maissaude-tiaw.vercel.app/index.html) <br> - Clicar no botão "Entrar" na Navbar do site <br> - Preencher o campo de e-mail <br> - Preencher o campo de senha <br> - Clicar em "Login" |
| Critério de êxito | - O login foi realizado com sucesso. <br> - O usuário é redirecionado para a home page.|
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |

<br>

| **Caso de teste**  | **CT-003 – Home Page**  |
|:---: |:---: |
| Requisito associado | RF-006 - Registro de consumo de água e calorias <br> RF-007 - Consultar horarios de refeições <br> RF-008 - Carrossel com indicações de refeições |
| Objetivo do teste | Verificar se o usuário tem acesso ao panorama do site. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/home.html](https://maissaude-tiaw.vercel.app/home.html) <br> - O usuário deve conseguir adicionar a quantidade de água e calorias consumidas, assim como também remover se necessario <br> - O usuário podera consultar os horarios do seu planejamento para se alimentar <br> - No fim da página deve haver um pequeno carrossel com algumas refeições do seu plano personalizado <br> |
| Critério de êxito | - Usuário logado tem acesso a home page. |
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |

<br>

| **Caso de teste**  | **CT-004 – Página de Refeições e Detalhes**  |
|:---: |:---: |
| Requisito associado | RF-002 - O usuário deve conseguir visualizar as refeições indicadas e seus detalhes. |
| Objetivo do teste | Verificar se o usuário tem acesso a suas refeições. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/refeicoes.html](https://maissaude-tiaw.vercel.app/refeicoes.html) <br> - Clicar em uma das refeições <br> - O usuário é redirecionado para uma página de detalhes <br> - O usuário consegue visualizar todos os detalhes da refeição escolhida. |
| Critério de êxito | - O usuário tem acesso as refeições. <br> - O usuário é redirecionado para a página de detalhes.|
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |

<br>

| **Caso de teste**  | **CT-005 – Página de Metas**  |
|:---: |:---: |
| Requisito associado | RF-003 - Cadastro de metas. |
| Objetivo do teste | Verificar se o usuário consegue adicionar uma meta. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/metas.html](https://maissaude-tiaw.vercel.app/metas.html) <br> - No primeiro card, o usuário deve preencher o campo "meta", selecionar sua categorias, e o prazo. <br> - A meta deve aparecer no card do meio, com sua descrição, tag e data. <br> - Quando concluida a meta, a barra de progresso deve estar preenchida. <br> - O último card permite a visualização das suas metas em formato de gráfico, com a opção de filtrá-las, se desejar. |
| Critério de êxito | - O usuário consegue cadastrar suas metas e concluí-las. |
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |

<br>

| **Caso de teste**  | **CT-006 – Página de Consumo de Água**  |
|:---: |:---: |
| Requisito associado | RF-004 - Calculo de consumo de água. |
| Objetivo do teste | Verificar se o calculo de consumo de água está funcionando. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/metaagua.html](https://maissaude-tiaw.vercel.app/metaagua.html) <br> - O usuário deve inserir seu peso, selecionar o nível de atividade física e o clima onde vive. Após isso clicar no botão "Calcular minha necessidade de água" <br> - A página deve apresentar a quantidade de água que o usuário deve beber, com um grafico abaixo <br> - Esse resultado da quantidade de água deve ser enviado ao artefato da home page. |
| Critério de êxito | - O usuário consegue calcular seu consumo diario de água |
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |

<br>

| **Caso de teste**  | **CT-007 – Calculadora TMB**  |
|:---: |:---: |
| Requisito associado | RF-005 - O usuário deve conseguir calcular a quantidade de calorias que deve ingerir por dia. |
| Objetivo do teste | Verificar se o calculo de kcal está funcionando. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/metabolismo.html](https://maissaude-tiaw.vercel.app/metabolismo.html) <br> - O usuário deve selecionar seu sexo, inserir sua idade, peso, altura e o nível de atividade física praticada.  Após isso clicar no botão "Calcular Calorias Basais" <br> - A página deve apresentar a quantidade de kcal que o usuário deve ingerir, com um grafico abaixo <br> - Esse resultado da quantidade de kcal deve ser enviado ao artefato da home page. |
| Critério de êxito | - O usuário consegue calcular seu consumo diario de kcal |
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |
