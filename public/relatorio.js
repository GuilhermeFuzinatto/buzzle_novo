const user = JSON.parse(localStorage.getItem('usuario'));
const quiz = JSON.parse(localStorage.getItem("quiz")); // dados do quiz selecionado

// Função para pegar query param qz_id
function getQuizId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('qz_id');
}

// Função para formatar data e hora
function formatDateTime(datetimeString) {
    const dt = new Date(datetimeString);
    return dt.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

async function carregarRelatorio() {
    const qz_id = getQuizId();
    if (!qz_id) {
        alert('ID do quiz não encontrado na URL');
        return;
    }

    // Buscar dados do quiz (para pegar nome e valor)
    const quizRes = await fetch(`/quiz/${qz_id}`);
    if (!quizRes.ok) {
        alert('Quiz não encontrado');
        return;
    }
    const quiz = await quizRes.json();

    // Exibir nome do quiz
    document.getElementById('quizNome').textContent = `Quiz: ${quiz.qz_nome} (Valor: ${quiz.qz_valor})`;

    // Buscar respostas do quiz
    const respostasRes = await fetch(`/quiz/${qz_id}/respostas`);
    if (!respostasRes.ok) {
        alert('Erro ao buscar respostas');
        return;
    }
    const respostas = await respostasRes.json();

    const tbody = document.querySelector('#relatorioTable tbody');
    tbody.innerHTML = '';

    respostas.forEach(resp => {
        // resp deve conter: aluno (nome), datahora, qtdCertas, totalQuestoes
        // Calcular nota: (qtdCertas / totalQuestoes) * valor do quiz
        const percentual = resp.qtdCertas / resp.totalQuestoes;
        const nota = percentual * quiz.qz_valor;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${resp.alunoNome}</td>
            <td>${formatDateTime(resp.dataHora)}</td>
            <td>${resp.qtdCertas} / ${resp.totalQuestoes}</td>
            <td>${nota.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });

    if (respostas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Nenhuma resposta registrada para este quiz.</td></tr>';
    }
}

// Executa ao carregar a página
window.onload = carregarRelatorio;
