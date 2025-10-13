function verSenhaAluno() {
    const inputao = document.getElementById('alsenha');
    const divzao = document.getElementById('aldivsenha');
    const imagizona = document.getElementById('alzoi');
    if (inputao.type === 'password') {
        inputao.type = 'text';
        divzao.style.backgroundColor = '#ffda33';
        imagizona.src = 'imagens/vesim.png';
    } else {
        inputao.type = 'password';
        divzao.style.backgroundColor = '#e4e4e4';
        imagizona.src = 'imagens/venao.png';
    }
}

function verSenhaProf() {
    const inputao = document.getElementById('prsenha');
    const divzao = document.getElementById('prdivsenha');
    const imagizona = document.getElementById('przoi');
    if (inputao.type === 'password') {
        inputao.type = 'text';
        divzao.style.backgroundColor = '#ffda33';
        imagizona.src = 'imagens/vesim.png';
    } else {
        inputao.type = 'password';
        divzao.style.backgroundColor = '#e4e4e4';
        imagizona.src = 'imagens/venao.png';
    }
}