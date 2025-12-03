const user = JSON.parse(localStorage.getItem("usuario"));


q.alternativas.forEach(alt => {
const btn = document.createElement("div");
btn.classList.add("alternativa");
btn.textContent = alt.av_texto;


if (respostasAluno[q.pe_numero] === alt.av_numero) {
btn.classList.add("selecionada");
}


btn.onclick = () => {
respostasAluno[q.pe_numero] = alt.av_numero;
mostrarQuestao();
};


altDiv.appendChild(btn);
});


atualizarBotoes();

function atualizarBotoes() {
document.getElementById("btnPrev").style.display = indexAtual === 0 ? "none" : "inline-block";
document.getElementById("btnNext").style.display = indexAtual === perguntas.length - 1 ? "none" : "inline-block";
document.getElementById("btnFinish").style.display = indexAtual === perguntas.length - 1 ? "inline-block" : "none";
}


// navegação


document.getElementById("btnPrev").onclick = () => {
if (indexAtual > 0) indexAtual--;
mostrarQuestao();
};


document.getElementById("btnNext").onclick = () => {
if (indexAtual < perguntas.length - 1) indexAtual++;
mostrarQuestao();
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