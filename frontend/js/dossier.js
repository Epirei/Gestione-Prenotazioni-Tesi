document.addEventListener("DOMContentLoaded", () => {
    const requestList = document.querySelector("#documentList"); // Lista delle richieste
    const confirmModal = new bootstrap.Modal(document.getElementById("confirmModal")); // Modale di conferma
    let currentRequestIndex = null; // Indice della richiesta selezionata per eliminazione

    // Funzione per caricare i documenti da localStorage
    function loadRequestsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("documenti")) || [];
    }

    // Funzione per salvare i documenti in localStorage
    function saveRequestsToLocalStorage(documenti) {
        localStorage.setItem("documenti", JSON.stringify(documenti));
    }

    // Funzione per renderizzare le richieste nella lista
    function renderRequests() {
        const documenti = loadRequestsFromLocalStorage(); // Carica i documenti
        const documentiTableBody = document.getElementById("documentiTableBody"); // La body della tabella
        documentiTableBody.innerHTML = ""; // Pulisce la tabella
        
        if (documenti.length === 0) {
            // Se non ci sono documenti, visualizza una riga con un messaggio
            const noDataRow = document.createElement("tr");
            noDataRow.innerHTML = `<td colspan="7" class="text-muted">Nessun documento.</td>`;
            documentiTableBody.appendChild(noDataRow);
            return;
        }
        
        // Crea una riga per ogni richiesta/documento
        documenti.forEach((doc, index) => {
            const row = document.createElement("tr");
            row.classList.add("request-item");  // Aggiungi una classe per il click
            row.setAttribute("data-request-id", index);
        
            // Visualizza tutti i campi come celle della tabella
            row.innerHTML = `
                <td>${doc.nome}</td>
                <td>${doc.cognome}</td>
                <td>${doc.codiceFiscale}</td>
                <td>${doc.creationDate || "2025-01-28"}</td>
                <td>${doc.status || "In attesa"}</td>
                <td>${doc.updateDate || "2025-01-28"}</td>
                <td>
                    <i class="fas fa-trash-alt delete-icon" data-document-index="${index}" style="cursor:pointer;"></i>
                </td>
            `;
            documentiTableBody.appendChild(row);
        });
        
        // Aggiungi eventi ai pulsanti di eliminazione
        addDeleteEvents();
        addClickEvents();
    }

    // Funzione per aggiungere eventi di click alle righe della tabella
    function addClickEvents() {
        const requestItems = document.querySelectorAll(".request-item");
        requestItems.forEach((item) => {
            item.addEventListener("click", (e) => {
                // Impedisce il conflitto con il click sull'icona di eliminazione
                if (e.target.classList.contains("delete-icon")) return;

                const requestId = item.getAttribute("data-request-id");
                window.location.href = `richiesta${requestId}.html`; // Reindirizza alla pagina richiesta
            });
        });
    }

    // Funzione per aggiungere eventi ai pulsanti di eliminazione
    function addDeleteEvents() {
        const deleteIcons = document.querySelectorAll(".delete-icon");
        deleteIcons.forEach((icon) => {
            icon.addEventListener("click", (e) => {
                e.stopPropagation(); // Impedisce al click sulla riga di attivarsi
                currentRequestIndex = icon.getAttribute("data-document-index"); // Ottieni l'indice della richiesta
                confirmModal.show();
            });
        });
    }

    // Gestione della conferma di eliminazione
    document.getElementById("confirmDelete").addEventListener("click", () => {
        if (currentRequestIndex !== null) {
            deleteRequest(currentRequestIndex); // Elimina la richiesta selezionata
            confirmModal.hide(); // Chiude il modale
        }
    });

    // Funzione per eliminare una richiesta
    function deleteRequest(index) {
        const documenti = loadRequestsFromLocalStorage();
        documenti.splice(index, 1); // Rimuove il documento dall'array
        saveRequestsToLocalStorage(documenti); // Aggiorna il localStorage
        renderRequests(); // Ricarica la lista
    }

    // Gestione del pulsante "Aggiungi"
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", () => {
        window.location.href = "aggiungi_documento.html"; // Reindirizza alla pagina per aggiungere un documento
    });

    // Carica e renderizza le richieste al caricamento della pagina
    renderRequests();
});
