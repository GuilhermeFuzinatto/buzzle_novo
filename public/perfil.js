const user = JSON.parse(localStorage.getItem('usuario'));
if (user) {
    const spacenome = document.getElementById('teunome');
    const spaceid = document.getElementById('teuid');
    
    spacenome.textContent = user.nome;
    spaceid.textContent = user.id;
} 