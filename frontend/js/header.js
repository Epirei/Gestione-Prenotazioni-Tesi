document.addEventListener("DOMContentLoaded", () => {

    // Gestione del pulsante logout
    const logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
        window.location.href = "login.html";
    });

    // Gestione del pulsante per tornare alla selezione dei dossier
    const dossierButton = document.getElementById("prenotazioni");
    dossierButton.addEventListener("click", () => {
        window.location.href = "booking_plans.html"; // Reindirizza alla selezione dei dossier
    });

    const icon = document.getElementById("icon");
    icon.addEventListener("click", () => {
        window.location.href = "profile.html";
    });

});
