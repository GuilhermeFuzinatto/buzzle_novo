const user = JSON.parse(localStorage.getItem('usuario'));

// Função para listar as turmas
async function listarTurma() {
    try {
        const response = await fetch(`/aluno/${user.id}/turmas`);
        const turmas = await response.json();

        const sec = document.getElementById('subsecturmas');
        sec.innerHTML = '';

        if (turmas.length === 0) {
            sec.innerHTML = '<div class="divtur">Nenhuma turma</div>';
            return;
        }

        turmas.forEach(turma => {
            sec.innerHTML += `
                <button class="divtur" onclick="selecTurma(${turma.tu_id}, '${turma.tu_nome}', '${turma.tu_desc}')">
                    ${turma.tu_nome}
                </button>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}


function selecTurma(id, nome, desc, prid){
    const dadosTurma = {
        tipo: 'turma',
        id: id,
        nome: nome,
        desc: desc,
        prid: prid
    };

    localStorage.setItem('turma', JSON.stringify(dadosTurma));

    if(user.tipo === 'aluno'){
        window.location.href = 'turmaaluno.html';
    }else if(user.tipo === 'prof'){
        window.location.href = 'turmaprof.html';
    }
    
}

// === MODAL ===
function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

document.getElementById("btnFecharModal").onclick = function () {
    document.getElementById("modal").style.display = "none";
};

// === ENTRAR NA TURMA ===
document.getElementById("btnEntrarTurma").onclick = async function () {
    const turmaId = document.getElementById("inputTurmaId").value.trim();

    if (!turmaId) {
        alert("Digite um ID de turma!");
        return;
    }

    try {
        const res = await fetch(`/turma/${turmaId}/addAluno`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ al_id: user.id })
        });

        if (!res.ok) {
            alert("Erro ao entrar na turma.");
            return;
        }

        alert("Você entrou na turma com sucesso!");
        document.getElementById("modal").style.display = "none";

        listarTurma(); // atualiza lista no aside
    }
    catch (e) {
        console.error(e);
        alert("Erro ao entrar na turma.");
    }
};