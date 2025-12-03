const user = JSON.parse(localStorage.getItem("usuario"));
const quiz = JSON.parse(localStorage.getItem("quiz")); // dados do quiz selecionado
let perguntas = [];
let indexAtual = 0;
let respostasAluno = {};
let re_id = null; // id da resposta, se necessário para o backend

const quizTitulo = document.getElementById("quizTitulo");
const questionContainer = document.getElementById("question-container");

// Função para carregar as perguntas do backend
async function carregarQuiz() {
    quizTitulo.textContent = "Carregando...";

    try {
        // Buscar perguntas com alternativas
        const res = await fetch(`/quiz/${quiz.id}/completo`);
        const data = await res.json();
        perguntas = data.perguntas || [];

        if (perguntas.length === 0) {
        quizTitulo.textContent = "Nenhuma pergunta encontrada.";
        return;
        }

        // Criar tentativa no backend (iniciar quiz)
        const resInit = await fetch('/quiz/iniciar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ al_id: user.al_id, qz_id: quiz.id })
        });
        const initData = await resInit.json();
        re_id = initData.re_id;

        indexAtual = 0;
        respostasAluno = {};
        quizTitulo.textContent = quiz.nome;

        mostrarQuestao();

    } catch (error) {
        quizTitulo.textContent = "Erro ao carregar o quiz.";
        console.error(error);
    }
}

// Função para mostrar uma questão
function mostrarQuestao() {
  const q = perguntas[indexAtual];
  quizTitulo.textContent = quiz.nome + ` (Questão ${indexAtual + 1} de ${perguntas.length})`;

  questionContainer.innerHTML = ""; // limpa a questão atual

  const perguntaTexto = document.createElement("p");
  perguntaTexto.textContent = q.pe_texto;
  questionContainer.appendChild(perguntaTexto);

  // cria div para alternativas
  const altDiv = document.createElement("div");
  altDiv.classList.add("alternativas-container");

  q.alternativas.forEach(alt => {
    const btn = document.createElement("div");
    btn.classList.add("alternativa");
    btn.textContent = alt.av_texto;

    if (respostasAluno[q.pe_numero] === alt.av_numero) {
      btn.classList.add("selecionada");
    }

    btn.onclick = () => {
      respostasAluno[q.pe_numero] = alt.av_numero;
      mostrarQuestao(); // atualiza seleção
    };

    altDiv.appendChild(btn);
  });

  questionContainer.appendChild(altDiv);

  atualizarBotoes();
}

function atualizarBotoes() {
  document.getElementById("btnPrev").style.display = indexAtual === 0 ? "none" : "inline-block";
  document.getElementById("btnNext").style.display = indexAtual === perguntas.length - 1 ? "none" : "inline-block";
  document.getElementById("btnFinish").style.display = indexAtual === perguntas.length - 1 ? "inline-block" : "none";
}

// Botões navegação
document.getElementById("btnPrev").onclick = () => {
  if (indexAtual > 0) {
    indexAtual--;
    mostrarQuestao();
  }
};

document.getElementById("btnNext").onclick = () => {
  if (indexAtual < perguntas.length - 1) {
    indexAtual++;
    mostrarQuestao();
  }
};

document.getElementById("btnFinish").onclick = async () => {
  const respostasArray = Object.keys(respostasAluno).map(pe => ({
    pe_numero: Number(pe),
    av_numero: respostasAluno[pe]
  }));

  const res = await fetch("/quiz/finalizar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ re_id, respostas: respostasArray })
  });

  const resultado = await res.json();

  alert(`Você acertou ${resultado.certas} questões! Nota: ${resultado.nota}`);
  window.location.href = "turmaaluno.html";
};

carregarQuiz();
