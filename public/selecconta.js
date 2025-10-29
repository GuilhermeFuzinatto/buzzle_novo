// Função para listar todos os alunos, oq era sobre buscar foi comentado
async function listarContas() {
    /*
    const email = document.getElementById('email').value.trim();  // Pega o valor do email digitado no input

    if (email) {
        // Se CPF foi digitado, adiciona o parâmetro de consulta
        url += `?email=${email}`;
    }
    */

    let url = '/contas';  // URL padrão para todos os clientes

    try {
        const response = await fetch(url);
        const aluno = await response.json();

        const tabela = document.getElementById('tabelaaluno');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (aluno.length === 0) {
            // Caso não encontre cadastros, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="2">Nenhum cadastro encontrado.</td></tr>';
        } else {
            aluno.forEach(aluno => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${aluno.al_id}</td>
                    <td>${aluno.al_email}</td>
                    <td>${aluno.al_nome}</td>
                    <td>${aluno.al_senha}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar cadastros:', error);
    }
}
    let url = '/aluno';  // URL padrão para todos os clientes

    try {
        const response = await fetch(url);
        const aluno = await response.json();

        const tabela = document.getElementById('tabelaaluno');
        tabela.innerHTML = ''; // Limpa a tabela antes de preencher

        if (aluno.length === 0) {
            // Caso não encontre cadastros, exibe uma mensagem
            tabela.innerHTML = '<tr><td colspan="2">Nenhum cadastro encontrado.</td></tr>';
        } else {
            aluno.forEach(aluno => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${aluno.al_id}</td>
                    <td>${aluno.al_email}</td>
                    <td>${aluno.al_nome}</td>
                    <td>${aluno.al_senha}</td>
                `;
                tabela.appendChild(linha);
            });
        }
    } catch (error) {
        console.error('Erro ao listar cadastros:', error);
    }
}