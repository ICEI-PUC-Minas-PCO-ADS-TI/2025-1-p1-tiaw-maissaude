# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="03-Product-design.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

O plano de testes de software é gerado a partir da especificação do sistema e consiste em casos de teste que deverão ser executados quando a implementação estiver parcial ou totalmente pronta. Apresente os cenários de teste utilizados na realização dos testes da sua aplicação. Escolha cenários de teste que demonstrem os requisitos sendo satisfeitos.

Enumere quais cenários de testes foram selecionados para teste. Neste tópico, o grupo deve detalhar quais funcionalidades foram avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

Não deixe de enumerar os casos de teste de forma sequencial e garantir que o(s) requisito(s) associado(s) a cada um deles esteja(m) correto(s) — de acordo com o que foi definido na <a href="03-Product-design.md">Especificação do projeto</a>.

Por exemplo:

| **Caso de teste**  | **CT-001 – Cadastrar perfil**  |
|:---: |:---: |
| Requisito associado | RF-00W - A aplicação deve apresentar, na página principal, a funcionalidade de cadastro de usuários para que estes consigam criar e gerenciar seu perfil. |
| Objetivo do teste | Verificar se o usuário consegue se cadastrar na aplicação. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/index.html](https://maissaude-tiaw.vercel.app/index.html) <br> - Clicar em "Cadastrar-se" na Navbar do site <br> - Preencher os campos obrigatórios (nome, e-mail, senha, ) <br> - Clicar em "Cadastrar" |
| Critério de êxito | - Usuário criado com sucesso. |
| Responsável pela elaboração do caso de teste | Guilherme Teixeira. |

<br>

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-00X - A aplicação deve possuir opção de fazer login, sendo o login o endereço de e-mail e senha. |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/index.html](https://maissaude-tiaw.vercel.app/index.html) <br> - Clicar no botão "Entrar" na Navbar do site <br> - Preencher o campo de e-mail <br> - Preencher o campo de senha <br> - Clicar em "Login" |
| Critério de êxito | - O login foi realizado com sucesso. <br> - O usuário é redirecionado para a home page.|
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |

<br>

| **Caso de teste**  | **CT-003 – Página de Refeições e Detalhes**  |
|:---: |:---: |
| Requisito associado | RF-00Y - O usuário deve conseguir visualizar as suas refeições e seu detalhes. |
| Objetivo do teste | Verificar se o usuário tem acesso a suas refeições personalizadas. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/refeicoes.html](https://maissaude-tiaw.vercel.app/refeicoes.html) <br> - Clicar em uma das refeições <br> - O usuário é redirecionado para uma página de detalhes <br> - O usuário consegue visualizar todos os detalhes da refeição escolhida. |
| Critério de êxito | - O usuário tem acesso as refeições. <br> - O usuário é redirecionado para a página de detalhes.|
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |

<br>

| **Caso de teste**  | **CT-004 – Página de Metas**  |
|:---: |:---: |
| Requisito associado | RF-00Z - O usuário deve conseguir cadastrar suas metas. |
| Objetivo do teste | Verificar se o usuário consegue adicionar uma meta. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/metas.html](https://maissaude-tiaw.vercel.app/metas.html) <br> - No primeiro card, o usuário deve preencher o campo "meta", selecionar sua categorias, e o prazo. <br> - A meta deve aparecer no card do meio, com sua descrição, tag e data. <br> - Quando concluida a meta, a barra de progresso deve estar preenchida. <br> - O último card permite a visualização das suas metas em formato de gráfico, com a opção de filtrá-las, se desejar. |
| Critério de êxito | - O usuário consegue cadastrar suas metas e concluí-las. |
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |

<br>

| **Caso de teste**  | **CT-005 – Página de Consumo de Água**  |
|:---: |:---: |
| Requisito associado | RF-00Z - O usuário deve conseguir calcular a quantidade de água que deve beber. |
| Objetivo do teste | Verificar se o calculo de consumo de água está funcionando. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site [https://maissaude-tiaw.vercel.app/metaagua.html](https://maissaude-tiaw.vercel.app/metaagua.html) <br> - O usuário deve inserir seu peso, selecionar o nível de atividade física e o clima onde vive. Após isso clicar no botão "Calcular minha necessidade de água" <br> - A página deve apresentar a quantidade de água que o usuário deve beber, com um grafico abaixo <br> - Esse resultado da quantidade de água deve ser enviado ao artefato da home page. |
| Critério de êxito | - O usuário consegue calcular seu consumo diario de água |
| Responsável pela elaboração do caso de teste | Guilherme Teixeira |

## Ferramentas de testes (opcional)

Comente sobre as ferramentas de testes utilizadas.
 
> **Links úteis**:
> - [IBM - criação e geração de planos de teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Práticas e técnicas de testes ágeis](http://assiste.serpro.gov.br/serproagil/Apresenta/slides.pdf)
> - [Teste de software: conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e geração de planos de teste de software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de teste para JavaScript](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
