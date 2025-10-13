function verSenhaAluno() {
    const inputao = document.getElementById('prsenha');
    if (inputao.type === 'password') {
        inputao.type = 'text';
    } else {
        inputao.type = 'password';
    }
}

function verSenhaProf() {
    const inputao = document.getElementById('prsenha');
    if (inputao.type === 'password') {
        inputao.type = 'text';
    } else {
        inputao.type = 'password';
    }
}