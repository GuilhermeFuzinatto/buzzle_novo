const user = JSON.parse(localStorage.getItem('usuario'));

let numeroPergunta = 1;

window.onload = () => {
    document.getElementById("tipo1").focus();
    criarPergunta();
};

/*
function criarPergunta() {
    const sec = document.getElementById("secmain");

    const div = document.createElement("div");
    div.className = "pergunta";

    div.innerHTML = `
        <h3>Pergunta ${numeroPergunta}</h3>
        <input type="text" class="input-enunciado" placeholder="Digite o enunciado">

        <div class="alternativas">
            <input type="text" class="alt" placeholder="Alternativa 1">
            <input type="text" class="alt" placeholder="Alternativa 2">
            <input type="text" class="alt" placeholder="Alternativa 3">
            <input type="text" class="alt" placeholder="Alternativa 4">
        </div>
    `;

    sec.appendChild(div);
    numeroPergunta++;
}
*/

//========== CONTROLE DOS TIPOS DE QUESTAO ==========

const tipo1 = document.getElementById("tipo1");
const tipo2 = document.getElementById("tipo2");
const tipo3 = document.getElementById("tipo3");

tipo1.addEventListener("focus", () => mudarTipo(1));
tipo2.addEventListener("focus", () => mudarTipo(2));
tipo3.addEventListener("focus", () => mudarTipo(3));

function mudarTipo(tipo) {
    document.body.setAttribute("data-tipo", tipo);

    if (tipo == 1) {
        tipo1.style.border = "border: 0.4rem solid #ffda33;"
        voltarCheckbox();
        ativarTipoUnico();
    } 
    else if (tipo == 2) {
        tipo1.style.border = "border: 0.4rem solid #ffda33;"
        voltarCheckbox();
        ativarTipoMultiplo();
    } 
    else if (tipo == 3) {
        tipo1.style.border = "border: 0.4rem solid #ffda33;"
        transformarParaVF();
    }
}

//========== TIPO 1 ==========
// Apenas 1 checkbox marcada
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

//========== TIPO 2 ==========
// Múltiplas corretas
function ativarTipoMultiplo() {
    const checks = document.querySelectorAll(".checkinput");
    checks.forEach(chk => chk.onclick = null);
}

//========== TIPO 3 ==========
// Troca checkbox por select V/F
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

//========== VOLTAR PARA CHECKBOX ==========
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