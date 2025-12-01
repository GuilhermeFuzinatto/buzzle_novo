// ===================== VARIÁVEIS GERAIS =====================

let questoes = {};        // armazena todas as questões
let questaoAtual = 1;     // questão que está sendo editada
let numeroPergunta = 1;   // compatível com seu código antigo

// ===================== INÍCIO DA PÁGINA =====================

window.onload = () => {
    criarQuestaoNoAside();  // cria card da Questão 1
    criarPergunta();        // cria área da Questão 1
    document.getElementById("tipo1").focus();
};

// ===================== AO SAIR DA PÁGINA =====================

window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
    e.returnValue = "";
});

// ===================== CRIAR CARD NO ASIDE =====================

function criarQuestaoNoAside() {
    const lista = document.getElementById("listaQuestoes");

    // remove botão +- caso exista, pra recolocar depois
    const botaoAntigo = document.getElementById("adicionarQuestao");
    if (botaoAntigo) botaoAntigo.remove();

    // cria card da questão atual
    const card = document.createElement("div");
    card.className = "questaoCard";
    card.innerText = "Questão " + questaoAtual;
    card.dataset.num = questaoAtual;

    card.onclick = () => {
        salvarQuestaoAtual();
        questaoAtual = parseInt(card.dataset.num);
        carregarQuestao(questaoAtual);
    };

    lista.appendChild(card);

    // cria botão de adicionar
    const botaoAdd = document.createElement("button");
    botaoAdd.id = "adicionarQuestao";
    botaoAdd.innerText = "Adicionar Questão";

    botaoAdd.onclick = () => {
        salvarQuestaoAtual();
        questaoAtual++;
        criarQuestaoNoAside();
        criarPergunta();
    };

    lista.appendChild(botaoAdd);
}

// ===================== LIMPAR E CRIAR NOVA QUESTÃO =====================

function criarPergunta() {
    const enun = document.getElementById("enuntxt");
    const inputs = document.querySelectorAll("#secalt input[type=text]");
    const checks = document.querySelectorAll(".checkinput");

    enun.value = "";

    inputs.forEach(i => i.value = "");
    checks.forEach(c => c.checked = false);

    voltarCheckbox();
    tipo1.focus();
}

// ===================== SALVAR QUESTÃO ATUAL =====================

function salvarQuestaoAtual() {
    const enun = document.getElementById("enuntxt").value;
    const textos = [...document.querySelectorAll("#secalt input[type=text]")].map(i => i.value);
    const checks = [...document.querySelectorAll(".checkinput")].map(c => c.checked);

    // salvar em estrutura
    questoes[questaoAtual] = {
        tipo: document.body.getAttribute("data-tipo") || "1",
        enunciado: enun,
        alternativas: textos,
        certas: checks.reduce((acc, v, i) => v ? [...acc, i] : acc, [])
    };
}

// ===================== CARREGAR QUESTÃO DO ASIDE =====================

function carregarQuestao(num) {
    const q = questoes[num];

    if (!q) {
        criarPergunta();
        return;
    }

    document.body.setAttribute("data-tipo", q.tipo);

    // carregar enunciado
    document.getElementById("enuntxt").value = q.enunciado;

    // carregar alternativas
    const inputs = document.querySelectorAll("#secalt input[type=text]");
    q.alternativas.forEach((txt, i) => inputs[i].value = txt);

    // voltar checkbox padrão
    voltarCheckbox();

    // dependendo do tipo, transformar ou marcar
    if (q.tipo == "3") transformarParaVF();

    if (q.tipo == "1" || q.tipo == "2") {
        const checks = document.querySelectorAll(".checkinput");
        checks.forEach((chk, i) => chk.checked = q.certas.includes(i));
    }

    // atualizar visual do tipo
    if (q.tipo == "1") tipo1.focus();
    if (q.tipo == "2") tipo2.focus();
    if (q.tipo == "3") tipo3.focus();
}



// ===============================================================
// ===================== CONTROLE DOS TIPOS ======================
// ===============================================================

const tipo1 = document.getElementById("tipo1");
const tipo2 = document.getElementById("tipo2");
const tipo3 = document.getElementById("tipo3");

tipo1.addEventListener("focus", () => mudarTipo(1));
tipo2.addEventListener("focus", () => mudarTipo(2));
tipo3.addEventListener("focus", () => mudarTipo(3));

function mudarTipo(tipo) {
    document.body.setAttribute("data-tipo", tipo);

    if (tipo == 1) {
        voltarCheckbox();
        ativarTipoUnico();
    } 
    else if (tipo == 2) {
        voltarCheckbox();
        ativarTipoMultiplo();
    } 
    else if (tipo == 3) {
        transformarParaVF();
    }
}



// ===============================================================
// ===================== TIPO 1 — ÚNICA CORRETA ==================
// ===============================================================

function ativarTipoUnico() {
    const checks = document.querySelectorAll(".checkinput");

    checks.forEach(chk => {
        chk.onclick = () => {
            checks.forEach(c => {
                if (c !== chk) c.checked = false;
            });
        };
    });
}



// ===============================================================
// ===================== TIPO 2 — MÚLTIPLAS ======================
// ===============================================================

function ativarTipoMultiplo() {
    const checks = document.querySelectorAll(".checkinput");
    checks.forEach(chk => chk.onclick = null);
}



// ===============================================================
// ===================== TIPO 3 — V / F ==========================
// ===============================================================

function transformarParaVF() {
    const divs = document.querySelectorAll("#secalt div");

    divs.forEach(div => {
        const label = div.querySelector(".checklabel");

        if (label.classList.contains("vf-convertido")) return;

        label.style.display = "none";

        const select = document.createElement("select");
        select.className = "selectVF";
        select.innerHTML = `
            <option value="V">V</option>
            <option value="F">F</option>
        `;

        label.classList.add("vf-convertido");
        div.prepend(select);
    });
}



// ===============================================================
// ===================== VOLTAR PARA CHECKBOX ====================
// ===============================================================

function voltarCheckbox() {
    const divs = document.querySelectorAll("#secalt div");

    divs.forEach(div => {
        const select = div.querySelector(".selectVF");
        const label = div.querySelector(".checklabel");

        if (select) select.remove();

        if (label) {
            label.style.display = "inline-flex";
            label.classList.remove("vf-convertido");
        }
    });
}
