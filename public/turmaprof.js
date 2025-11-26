const turminha = JSON.parse(localStorage.getItem('turma'));
if (turminha) {
    const spacenome = document.getElementById('turmanome');
    const spacedesc = document.getElementById('turmadesc');
    
    spacenome.textContent = turminha.nome;
    spacedesc.textContent = turminha.desc;
} 