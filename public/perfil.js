const user = JSON.parse(localStorage.getItem('usuario'));
if (user) {
    const spacenome = document.getElementById('teunome');
    
    spacenome.textContent = '${user.nome}';
} 