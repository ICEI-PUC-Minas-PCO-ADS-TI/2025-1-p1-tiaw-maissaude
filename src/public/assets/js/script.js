// script.js - Funções para Calculadora de Taxa Metabólica Basal

let bmrChart = null;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('copyResult').addEventListener('click', function () {
        const cal = document.getElementById('calories').innerText;
        navigator.clipboard.writeText('Minha TMB: ' + cal).then(() => {
            this.innerHTML = '<i class=\'bi bi-clipboard-check\'></i> Copiado!';
            setTimeout(() => {
                this.innerHTML = '<i class=\'bi bi-clipboard\'></i> Copiar resultado';
            }, 1500);
        });
    });
    // Buscar e exibir usuários ao carregar a página
    fetchUsuarios().then(renderUsuariosTable);
});

function calculateBMR() {
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    let bmr;

    if (!age || !weight || !height || age < 15 || age > 120 || weight < 30 || weight > 200 || height < 100 || height > 250) {
        showError('Preencha todos os campos corretamente.');
        return;
    }

    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    bmr = Math.round(bmr);
    const sedentary = Math.round(bmr * 1.2);
    const light = Math.round(bmr * 1.375);
    const moderate = Math.round(bmr * 1.55);
    const active = Math.round(bmr * 1.725);
    const veryActive = Math.round(bmr * 1.9);

    document.getElementById('calories').textContent = bmr + ' kcal/dia';
    document.getElementById('result').style.display = 'block';
    document.getElementById('sedentary').textContent = sedentary + ' kcal';
    document.getElementById('light').textContent = light + ' kcal';
    document.getElementById('moderate').textContent = moderate + ' kcal';
    document.getElementById('active').textContent = active + ' kcal';
    document.getElementById('veryActive').textContent = veryActive + ' kcal';
    document.getElementById('activityLevels').style.display = 'block';
    updateChart(bmr, sedentary, light, moderate, active, veryActive);
    document.getElementById('copyResult').style.display = 'inline-block';
}

function updateChart(bmr, sedentary, light, moderate, active, veryActive) {
    const ctx = document.getElementById('bmrChart').getContext('2d');

    if (bmrChart) {
        bmrChart.destroy();
    }

    bmrChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Basal', 'Sedentário', 'Leve', 'Moderado', 'Ativo', 'Muito Ativo'],
            datasets: [{
                label: 'Calorias por dia',
                data: [bmr, sedentary, light, moderate, active, veryActive],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.7)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(26, 188, 156, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(45, 95, 37, 0.7)'
                ],
                borderColor: [
                    'rgba(231, 76, 60, 1)',
                    'rgba(52, 152, 219, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(26, 188, 156, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(45, 95, 37, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Calorias (kcal/dia)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Gasto Calórico por Nível de Atividade',
                    font: {
                        size: 16
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return context.parsed.y + ' kcal/dia';
                        }
                    }
                }
            }
        }
    });

    document.querySelector('.chart-container').style.display = 'block';
}

function showError(msg) {
    let error = document.getElementById('errorMsg');
    if (!error) {
        error = document.createElement('div');
        error.id = 'errorMsg';
        error.className = 'alert alert-danger mt-2';
        document.querySelector('.calculator').insertBefore(error, document.querySelector('.calculator').children[1]);
    }
    error.textContent = msg;
    setTimeout(() => {
        error.remove();
    }, 3000);
}

// Função para buscar usuários do backend (json-server)
async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) throw new Error('Erro ao buscar usuários');
        const usuarios = await response.json();
        console.log('Usuários:', usuarios);
        // Exemplo: mostrar nomes dos usuários em um alert
        // alert(usuarios.map(u => u.nome).join(', '));
        return usuarios;
    } catch (error) {
        console.error(error);
        showError('Não foi possível carregar os usuários.');
        return [];
    }
}

// Função para saber se o usuário logado é administrador
function isAdmin() {
    const user = JSON.parse(sessionStorage.getItem('usuarioCorrente') || '{}');
    return user.login === 'admin';
}

// Função para criar a tabela de usuários com botões de editar e excluir
function renderUsuariosTable(usuarios) {
    // Remove lista antiga, se existir
    const oldTable = document.getElementById('usuariosTable');
    if (oldTable) oldTable.remove();

    const admin = isAdmin();
    if (!admin) return; // Só mostra a tabela para admin

    const table = document.createElement('table');
    table.id = 'usuariosTable';
    table.className = 'table table-striped my-3';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    usuarios.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${u.nome}" class="form-control form-control-sm nome-edit" data-id="${u.id}" disabled></td>
            <td><input type="text" value="${u.email}" class="form-control form-control-sm email-edit" data-id="${u.id}" disabled></td>
            <td>
                <button class="btn btn-warning btn-sm btn-edit" data-id="${u.id}">Editar</button>
                <button class="btn btn-success btn-sm btn-save d-none" data-id="${u.id}">Salvar</button>
                <button class="btn btn-danger btn-sm btn-delete" data-id="${u.id}">Excluir</button>
            </td>
        `;
        table.querySelector('tbody').appendChild(tr);
    });
    document.querySelector('.main-container').appendChild(table);

    // Eventos de edição
    table.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            table.querySelector(`.nome-edit[data-id='${id}']`).disabled = false;
            table.querySelector(`.email-edit[data-id='${id}']`).disabled = false;
            this.classList.add('d-none');
            table.querySelector(`.btn-save[data-id='${id}']`).classList.remove('d-none');
        });
    });
    // Eventos de salvar edição
    table.querySelectorAll('.btn-save').forEach(btn => {
        btn.addEventListener('click', async function() {
            const id = this.dataset.id;
            const nome = table.querySelector(`.nome-edit[data-id='${id}']`).value;
            const email = table.querySelector(`.email-edit[data-id='${id}']`).value;
            try {
                showSuccess('Usuário editado com sucesso!');
                fetchUsuarios().then(renderUsuariosTable);
            } catch (e) {
                showError('Erro ao editar usuário.');
            }
        });
    });
    // Eventos de exclusão
    table.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', async function() {
            const id = this.dataset.id;
            if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
            try {
                showSuccess('Usuário excluído com sucesso!');
                fetchUsuarios().then(renderUsuariosTable);
            } catch (e) {
                showError('Erro ao excluir usuário.');
            }
        });
    });
}

// Função para mostrar mensagem de sucesso
function showSuccess(msg) {
    let success = document.getElementById('successMsg');
    if (!success) {
        success = document.createElement('div');
        success.id = 'successMsg';
        success.className = 'alert alert-success mt-2';
        document.querySelector('.calculator').insertBefore(success, document.querySelector('.calculator').children[1]);
    }
    success.textContent = msg;
    setTimeout(() => {
        success.remove();
    }, 3000);
}
