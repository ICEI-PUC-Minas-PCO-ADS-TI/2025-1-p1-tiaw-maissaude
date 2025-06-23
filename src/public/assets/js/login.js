// login.js - Script para gerenciar o login de usuários em uma aplicação web
// Página inicial de Login
const LOGIN_URL = "/modulos/login/login.html";
let RETURN_URL = "/modulos/login/index.html";
const API_URL = '/usuarios';

// Objeto para o banco de dados de usuários baseado em JSON
var db_usuarios = {};

// Objeto para o usuário corrente
var usuarioCorrente = {};

// DADOS MOCKADOS PARA FUNCIONAR EM HOSPEDAGEM ESTÁTICA
const MOCK_USUARIOS = [
  {
    id: 1,
    login: "admin",
    senha: "123",
    nome: "Administrador do Sistema",
    email: "admin@abc.com"
  },
  {
    id: 2,
    login: "user",
    senha: "123",
    nome: "Usuario Comum",
    email: "user@abc.com"
  },
  {
    id: 3,
    login: "rommel",
    senha: "123",
    nome: "Rommel",
    email: "rommel@gmail.com"
  }
];

// Inicializa a aplicação de Login
function initLoginApp () {
    let pagina = window.location.pathname;
    if (pagina != LOGIN_URL) {
        // CONFIGURA A URLS DE RETORNO COMO A PÁGINA ATUAL
        sessionStorage.setItem('returnURL', pagina);
        RETURN_URL = pagina;

        // INICIALIZA USUARIOCORRENTE A PARTIR DE DADOS NO LOCAL STORAGE, CASO EXISTA
        usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
        if (usuarioCorrenteJSON) {
            usuarioCorrente = JSON.parse (usuarioCorrenteJSON);
        } else {
            window.location.href = LOGIN_URL;
        }

        // REGISTRA LISTENER PARA O EVENTO DE CARREGAMENTO DA PÁGINA PARA ATUALIZAR INFORMAÇÕES DO USUÁRIO
        document.addEventListener('DOMContentLoaded', function () {
            showUserInfo ('userInfo');
        });
    }
    else {
        // VERIFICA SE A URL DE RETORNO ESTÁ DEFINIDA NO SESSION STORAGE, CASO CONTRARIO USA A PÁGINA INICIAL
        let returnURL = sessionStorage.getItem('returnURL');
        RETURN_URL = returnURL || RETURN_URL
        
        // INICIALIZA BANCO DE DADOS DE USUÁRIOS
        carregarUsuarios(() => {
            console.log('Usuários carregados...');
        });
    }
};


function carregarUsuarios(callback) {
    db_usuarios = MOCK_USUARIOS;
    callback();
}

// Verifica se o login do usuário está ok e, se positivo, direciona para a página inicial
function loginUser (login, senha) {

    // Verifica todos os itens do banco de dados de usuarios 
    // para localizar o usuário informado no formulario de login
    for (var i = 0; i < db_usuarios.length; i++) {
        var usuario = db_usuarios[i];

        // Se encontrou login, carrega usuário corrente e salva no Session Storage
        if (login == usuario.login && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.login;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;

            // Salva os dados do usuário corrente no Session Storage, mas antes converte para string
            sessionStorage.setItem ('usuarioCorrente', JSON.stringify (usuarioCorrente));

            // Retorna true para usuário encontrado
            return true;
        }
    }

    // Se chegou até aqui é por que não encontrou o usuário e retorna falso
    return false;
}

// Apaga os dados do usuário corrente no sessionStorage
function logoutUser () {
    sessionStorage.removeItem ('usuarioCorrente');
    window.location = LOGIN_URL;
}

function addUser (nome, login, senha, email) {

    // Cria um objeto de usuario para o novo usuario 
    let usuario = { "login": login, "senha": senha, "nome": nome, "email": email };

    // Envia dados do novo usuário para ser inserido no JSON Server
    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
    })
        .then(response => response.json())
        .then(data => {
            // Adiciona o novo usuário na variável db_usuarios em memória
            db_usuarios.push (usuario);
            displayMessage("Usuário inserido com sucesso");
        })
        .catch(error => {
            console.error('Erro ao inserir usuário via API JSONServer:', error);
            displayMessage("Erro ao inserir usuário");
        });
}

function showUserInfo (element) {
    var elemUser = document.getElementById(element);
    if (elemUser) {
        elemUser.innerHTML = `${usuarioCorrente.nome} (${usuarioCorrente.login}) 
                    <a onclick="logoutUser()">❌</a>`;
    }
}

// Função utilitária para saber se o usuário está logado
function isUserLoggedIn() {
    return !!sessionStorage.getItem('usuarioCorrente');
}

// Função para saber se o usuário logado é administrador
function isAdmin() {
    const user = JSON.parse(sessionStorage.getItem('usuarioCorrente') || '{}');
    // Considera admin se login for 'admin' (ajuste conforme sua regra)
    return user.login === 'admin';
}

// Exemplo de uso: esconder botões de editar/excluir se não for admin
function toggleUserActions() {
    const admin = isAdmin();
    document.querySelectorAll('.btn-edit, .btn-save, .btn-delete').forEach(btn => {
        btn.style.display = admin ? '' : 'none';
    });
}

// Inicializa as estruturas utilizadas pelo LoginApp
initLoginApp ();