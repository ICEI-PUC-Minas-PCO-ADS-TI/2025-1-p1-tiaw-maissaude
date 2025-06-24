const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const form = document.getElementById("cadastro");

const urlBase = "https://48b4388b-3de9-4339-876a-e146817af41e-00-u2urj6cxk22a.spock.replit.dev/usuarios";

function criarUsuario() {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const novoUsuario = {
            usuario: usuario.value,
            email: email.value,
            senha: senha.value,
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
                window.location.href = "login.html";
                form.reset();
            } else {
                alert("Erro ao criar usuário.");
            }

        } catch (err) {
            console.error("Erro ao verificar/criar usuário:", err);
            alert("Erro no servidor. Tente novamente mais tarde.");
        }
    });
}

criarUsuario();
