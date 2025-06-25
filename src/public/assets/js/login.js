document.addEventListener("DOMContentLoaded", () => {

    const formLogin = document.getElementById("login");
    if (formLogin) {
        formLogin.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const senha = document.getElementById("senha").value;

            try {
                const resposta = await fetch(`https://48b4388b-3de9-4339-876a-e146817af41e-00-u2urj6cxk22a.spock.replit.dev/usuarios?email=${email}&senha=${senha}`);
                const usuarios = await resposta.json();

                if (usuarios.length === 1) {
                    const Usuario = usuarios[0];

                    sessionStorage.setItem("Usuario", JSON.stringify(Usuario));

                    localStorage.setItem("usuarioLogado", Usuario.email);

                    window.location.href = "home.html";
                } else {
                    document.getElementById("erro-login").textContent = "E-mail ou senha inválidos.";
                }
            } catch (erro) {
                console.error("Erro ao fazer login:", erro);
            }
        });
    }

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
        if (btnSair) {
            btnSair.addEventListener("click", () => {
                sessionStorage.removeItem("Usuario");
                localStorage.removeItem("usuarioLogado"); 
                window.location.href = "login.html";
            });
        }
    } else {
        if (iconeUsuario) {
            iconeUsuario.addEventListener("click", () => {
                window.location.href = "login.html";
            });
        }
    }
});
