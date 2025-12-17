function login(email, senha) {
    return apiPost("login", { email, password: senha })
        .then(res => {
            if (res.message === 'Login successful') {
                window.location.href = "dashboard.html";
            } else {
                alert("Login inválido");
            }
        })
        .catch(err => {
            alert("Erro no login");
        });
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
