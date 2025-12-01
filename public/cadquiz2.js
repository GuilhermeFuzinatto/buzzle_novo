const user = JSON.parse(localStorage.getItem('usuario'));

let numeroPergunta = 1;

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
