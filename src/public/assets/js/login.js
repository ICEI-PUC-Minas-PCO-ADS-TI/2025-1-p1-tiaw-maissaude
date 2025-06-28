document.addEventListener("DOMContentLoaded", () => {
    const urlBase = "http://localhost:3000/usuarios";

    const btnSignIn = document.getElementById("signin");
    const btnSignUp = document.getElementById("signup");
    const container = document.querySelector(".container");
    const body = document.querySelector("body");

    // Alternar entre as classes do body para animação
    if (btnSignIn && btnSignUp) {
        btnSignIn.addEventListener("click", () => {
            body.className = "sign-in-js";
            container.classList.remove("sign-up-mode");
        });

        btnSignUp.addEventListener("click", () => {
            body.className = "sign-up-js";
            container.classList.add("sign-up-mode");
        });
    }

    // ----------- CADASTRO -----------
    const usuario = document.getElementById("usuario");
    const emailCadastro = document.getElementById("email-cad");
    const senhaCadastro = document.getElementById("senha-cad");

    if (usuario && emailCadastro && senhaCadastro) {
        const btnCadastro = document.querySelector(".first-content .form .btn-second");

        btnCadastro?.addEventListener("click", async (event) => {
            event.preventDefault();

            if (!usuario.value || !emailCadastro.value || !senhaCadastro.value) {
                alert("Preencha todos os campos");
                return;
            }

            const novoUsuario = {
                usuario: usuario.value,
                email: emailCadastro.value,
                senha: senhaCadastro.value,
            };

            try {
                const resposta = await fetch(`${urlBase}?email=${encodeURIComponent(novoUsuario.email)}`);
                const usuariosExistentes = await resposta.json();

                if (usuariosExistentes.length > 0) {
                    alert("Este e-mail já está cadastrado. Tente outro.");
                    return;
                }

                const res = await fetch(urlBase, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(novoUsuario)
                });

                if (res.ok) {
                    alert("Usuário criado com sucesso!");
                    container.classList.remove("sign-up-mode");
                    body.className = "sign-in-js";
                } else {
                    alert("Erro ao criar usuário.");
                }

            } catch (err) {
                console.error("Erro ao criar usuário:", err);
                alert("Erro no servidor. Tente novamente.");
            }
        });
    }

    // ----------- LOGIN -----------
    const emailLogin = document.getElementById("email-log");
    const senhaLogin = document.getElementById("senha-log");

    if (emailLogin && senhaLogin) {
        const btnLogin = document.querySelector(".second-content .form .btn-second");

        btnLogin?.addEventListener("click", async (e) => {
            e.preventDefault();

            if (!emailLogin.value || !senhaLogin.value) {
                alert("Preencha todos os campos para fazer login.");
                return;
            }

            try {
                const resposta = await fetch(`${urlBase}?email=${emailLogin.value}&senha=${senhaLogin.value}`);
                const usuarios = await resposta.json();

                if (usuarios.length === 1) {
                    const Usuario = usuarios[0];

                    sessionStorage.setItem("Usuario", JSON.stringify(Usuario));
                    localStorage.setItem("usuarioLogado", Usuario.email);
                    localStorage.setItem("userId", Usuario.id);

                    window.location.href = "home.html";
                } else {
                    alert("E-mail ou senha inválidos.");
                }
            } catch (erro) {
                console.error("Erro ao fazer login:", erro);
                alert("Erro ao conectar com o servidor.");
            }
        });
    }

    // ----------- MENU DO USUÁRIO -----------
    const usuarioLogado = JSON.parse(sessionStorage.getItem("Usuario"));
    const usuarioContainer = document.querySelector(".usuario-container");
    const iconeUsuario = document.getElementById("icone-usuario");

    if (usuarioLogado && usuarioContainer) {
        const menuUsuario = document.createElement("div");
        menuUsuario.className = "menu-usuario";
        menuUsuario.style.display = "none";
        menuUsuario.innerHTML = `
            <p>Olá, ${usuarioLogado.usuario}</p>
            <button id="btn-sair">Sair</button>
        `;
        usuarioContainer.appendChild(menuUsuario);

        if (iconeUsuario) {
            iconeUsuario.addEventListener("click", (e) => {
                e.stopPropagation();
                const visivel = menuUsuario.style.display === "block";
                menuUsuario.style.display = visivel ? "none" : "block";
            });
        }

        document.addEventListener("click", (e) => {
            if (!e.target.closest(".usuario-container")) {
                menuUsuario.style.display = "none";
            }
        });

        const btnSair = menuUsuario.querySelector("#btn-sair");
        btnSair?.addEventListener("click", () => {
            sessionStorage.removeItem("Usuario");
            localStorage.removeItem("usuarioLogado");
            localStorage.removeItem("userId");
            window.location.href = "login.html";
        });
    } else {
        if (iconeUsuario) {
            iconeUsuario.addEventListener("click", () => {
                window.location.href = "login.html";
            });
        }
    }
});