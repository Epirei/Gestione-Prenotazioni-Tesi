document.addEventListener("DOMContentLoaded", () => {
    const requestId = window.location.href.split("/").pop().replace(".html", "").replace("richiesta", "");
    let documenti = JSON.parse(localStorage.getItem("documenti")) || [];

    if (requestId < documenti.length) {
        const request = documenti[requestId]; // Prendiamo i dettagli del documento

        let anteprima = "";
        if (request.fileType.startsWith("image/")) {
            // Se il file è un'immagine, la mostriamo e la rendiamo cliccabile
            anteprima = `<a href="${request.fileData}" target="_blank">
                            <img src="${request.fileData}" alt="Anteprima" 
                            style="max-width: 300px; display: block; margin-top: 10px;">
                         </a>`;
        } else if (request.fileType === "application/pdf") {
            // Se è un PDF, mostriamo un'anteprima cliccabile per aprirlo
            anteprima = `<a href="${request.fileData}" target="_blank">
                            <embed src="${request.fileData}" type="application/pdf" 
                            width="400" height="500">
                         </a>`;
        } else {
            // Per altri file, forniamo un link per il download
            anteprima = `<a href="${request.fileData}" target="_blank">
                            📄 Apri il file (${request.fileName})
                         </a>`;
        }

        document.getElementById("requestDetails").innerHTML = `
            <p><strong>Nome:</strong> ${request.nome} ${request.cognome}</p>
            <p><strong>Data di Scadenza:</strong> ${request.data}</p>
            <p><strong>Stato:</strong> ${request.status}</p>
            <p><strong>File:</strong></p>
            ${anteprima}`;
    } else {
        document.getElementById("requestDetails").innerHTML = "<p>Richiesta non trovata.</p>";
    }

    // Bottone back
    document.getElementById("back").addEventListener("click", () => {
        window.location.href = "dossier.html";
    });
});
