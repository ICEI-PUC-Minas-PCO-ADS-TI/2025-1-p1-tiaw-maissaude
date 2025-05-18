function getParameter(name) {
    const urlParams = new URLSearchParams
        (window.location.search);
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
}

document.addEventListener
('DOMContentLoaded', carregarDetalhes);
