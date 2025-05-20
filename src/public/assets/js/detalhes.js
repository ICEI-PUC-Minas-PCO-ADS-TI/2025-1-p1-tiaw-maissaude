function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function carregarDetalhes() {
    const refeicaoId = getUrlParameter('id');

    fetch('db/refeicoes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })
        .then(refeicoes => {
            const refeicao = refeicoes.find(r => r.id === refeicaoId);
            const container = document.getElementById('detalhes-container');

            if (refeicao) {
                const wrapper = document.createElement('div');
                wrapper.classList.add('detalhes-wrapper');

                const imagemDiv = document.createElement('div');
                imagemDiv.classList.add('imagem');
                const img = document.createElement('img');
                img.src = refeicao.imagem;
                img.alt = refeicao.nome;
                imagemDiv.appendChild(img);

                const conteudoDiv = document.createElement('div');
                conteudoDiv.classList.add('conteudo');

                const h2 = document.createElement('h2');
                h2.textContent = refeicao.nome;

                const p = document.createElement('p');
                p.textContent = refeicao.descricao;

                conteudoDiv.appendChild(h2);
                conteudoDiv.appendChild(p);

                wrapper.appendChild(imagemDiv);
                wrapper.appendChild(conteudoDiv);

                const infoNutricionalDiv = document.createElement('div');
                infoNutricionalDiv.classList.add('info-nutricional');

                if (refeicao.ingredientes && refeicao.ingredientes.length > 0) {
                    const ingredientesDiv = document.createElement('div');
                    ingredientesDiv.classList.add('ingredientes');

                    const h3 = document.createElement('h3');
                    h3.textContent = "Ingredientes:";

                    const ul = document.createElement('ul');
                    refeicao.ingredientes.forEach(ingrediente => {
                        const li = document.createElement('li');
                        li.textContent = ingrediente;
                        ul.appendChild(li);
                    });

                    ingredientesDiv.appendChild(h3);
                    ingredientesDiv.appendChild(ul);
                    infoNutricionalDiv.appendChild(ingredientesDiv);
                }

                if (refeicao.nutricional && refeicao.nutricional.length > 0) {
                    const tabelaDiv = document.createElement('div');
                    tabelaDiv.classList.add('tabela-nutricional-container');

                    const h3 = document.createElement('h3');
                    h3.textContent = "Informações Nutricionais";

                    const tabela = document.createElement('table');
                    tabela.classList.add('tabela-nutricional');

                    const thead = document.createElement('thead');
                    thead.innerHTML = `
                        <tr>
                            <th>Componente</th>
                            <th>Quantidade</th>
                            <th>% VD*</th>
                        </tr>
                    `;
                    tabela.appendChild(thead);

                    const tbody = document.createElement('tbody');
                    refeicao.nutricional.forEach(info => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${info.componente}</td>
                            <td>${info.quantidade}</td>
                            <td>${info.vd}</td>
                        `;
                        tbody.appendChild(tr);
                    });

                    
                }

                wrapper.appendChild(infoNutricionalDiv);

                container.appendChild(wrapper);
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = "Refeição não encontrada.";
                container.appendChild(errorMessage);
            }
        })
        .catch(error => {
            const container = document.getElementById('detalhes-container');
            const errorMessage = document.createElement('p');
            errorMessage.textContent = "Erro ao carregar os detalhes da refeição.";
            container.appendChild(errorMessage);
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', carregarDetalhes);