// Simula un database con email e password valide
const validCredentials = [
    { email: "prova@prova.it", password: "123" }
];
// Resetta i campi email e password quando la pagina viene ricaricata
window.addEventListener('load', function() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene l'invio predefinito del form

    // Ottieni i valori inseriti nei campi
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');


    // Verifica se l'email e la password sono valide
    const isValid = validCredentials.some(user => user.email === email && user.password === password);

    if (isValid) {
        // Reindirizza alla pagina dei dossier
        window.location.href = 'dossier_selection.html'; // Sostituisci con la tua URL della pagina dei dossier
    } else {
        // Mostra il messaggio di errore
        errorMessage.textContent = 'Email o password non valide. Riprova.';
        errorMessage.style.display = 'block';
    }
    
});
// Rimuovi il messaggio di errore quando l'utente modifica i campi
document.getElementById('email').addEventListener('input', () => {
    document.getElementById('errorMessage').style.display = 'none';
});

document.getElementById('password').addEventListener('input', () => {
    document.getElementById('errorMessage').style.display = 'none';
});
