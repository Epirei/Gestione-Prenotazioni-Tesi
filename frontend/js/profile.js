document.getElementById("profileButton").addEventListener("click", function() {
    sessionStorage.setItem("previousPage", window.location.href); // Salva la pagina attuale
    window.location.href = "profile.html"; // Reindirizza al profilo
});
