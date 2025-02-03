document.addEventListener("DOMContentLoaded", () => {
    const codiceFiscaleInput = document.getElementById("codiceFiscale");
    const searchCodiceFiscaleButton = document.getElementById("searchCodiceFiscale");
    const codiceFiscaleStatus = document.getElementById("codiceFiscaleStatus");
    const formDatiPersona = document.getElementById("formDatiPersona");
    const confirmButton = document.getElementById("confirmButton");
    const fileInput = document.getElementById("file");

    let fileData = ""; // Base64 del file
    let fileType = "";
    let fileName = "";

    // Simulazione database di codici fiscali
    const database = {
        "ABCDEF12G34H567I": { nome: "Mario", cognome: "Rossi" },
        "LMNOPQ89R01S234T": { nome: "Anna", cognome: "Verdi" },

    };

    // Funzione per abilitare/disabilitare il pulsante "Cerca"
    const checkCodiceFiscale = () => {
        const codiceFiscale = codiceFiscaleInput.value.trim();
        searchCodiceFiscaleButton.disabled = codiceFiscale === "";
    };

    // Funzione per abilitare/disabilitare il pulsante di conferma
    const checkFormFields = () => {
        const data = document.getElementById("data").value;
        const nome = document.getElementById("nome")?.value.trim();
        const cognome = document.getElementById("cognome")?.value.trim();
        const codiceFiscale = codiceFiscaleInput.value.trim();

        if (database[codiceFiscale]) {
            // Se il codice fiscale è già registrato, controlla solo data e file
            confirmButton.disabled = !(data && fileData);
        } else {
            // Se il codice fiscale è nuovo, controlla anche nome e cognome
            confirmButton.disabled = !(data && fileData && nome && cognome);
        }
    };

    // Abilita/disabilita il pulsante "Cerca" quando cambia il codice fiscale
    codiceFiscaleInput.addEventListener("input", () => {
        checkCodiceFiscale();
        checkFormFields(); // Rivedi anche la logica del pulsante "Conferma"
    });

    // Ricerca codice fiscale
    searchCodiceFiscaleButton.addEventListener("click", () => {
        const codiceFiscale = codiceFiscaleInput.value.trim();

        // Controllo validità codice fiscale
        const isCodiceValid = /^[A-Z]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/i.test(codiceFiscale);

        if (!isCodiceValid) {
            codiceFiscaleStatus.textContent = "Codice fiscale non valido.";
            codiceFiscaleStatus.style.color = "red";
            formDatiPersona.classList.add("d-none");
            confirmButton.classList.add("d-none");
            return;
        }

        const nomeContainer = document.querySelector(".nome-container");
        const cognomeContainer = document.querySelector(".cognome-container");

        nomeContainer.innerHTML = "";
        cognomeContainer.innerHTML = "";

        if (database[codiceFiscale]) {
            // Codice fiscale trovato
            codiceFiscaleStatus.textContent = "Codice fiscale già registrato.";
            codiceFiscaleStatus.style.color = "green";
            nomeContainer.innerHTML = `<label class="form-label found">Nome</label>
                <label class="form-control custom">${database[codiceFiscale].nome}</label>`;
            cognomeContainer.innerHTML = `<label class="form-label found">Cognome</label>
                <label class="form-control custom">${database[codiceFiscale].cognome}</label>`;
        } else {
            // Codice fiscale non trovato
            codiceFiscaleStatus.textContent = "Codice fiscale inesistente. Inserisci i dati.";
            codiceFiscaleStatus.style.color = "blue";
            nomeContainer.innerHTML = `<label for="nome" class="form-label">Nome</label>
                <input type="text" class="form-control custom-input" id="nome" placeholder="Inserisci il nome">`;
            cognomeContainer.innerHTML = `<label for="cognome" class="form-label">Cognome</label>
                <input type="text" class="form-control custom-input" id="cognome" placeholder="Inserisci il cognome">`;
        }

        formDatiPersona.classList.remove("d-none");
        confirmButton.classList.remove("d-none");

        document.querySelectorAll("#nome, #cognome, #data").forEach(input => {
            input?.addEventListener("input", checkFormFields);
            input?.addEventListener("change", checkFormFields);
        });

        checkFormFields(); // Verifica iniziale
    });

    // Gestione caricamento file
    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            fileType = file.type;
            fileName = file.name;
            const reader = new FileReader();

            reader.onload = function (e) {
                fileData = e.target.result; // Salviamo il file in Base64
                checkFormFields(); // Chiamato qui per aggiornare il pulsante Conferma
            };

            reader.readAsDataURL(file);
        }
    });

    // Conferma aggiunta documento
    confirmButton.addEventListener("click", () => {
        const codiceFiscale = codiceFiscaleInput.value.trim();
        const data = document.getElementById("data").value;
        let nome, cognome;

        if (database[codiceFiscale]) {
            nome = database[codiceFiscale].nome;
            cognome = database[codiceFiscale].cognome;
        } else {
            nome = document.getElementById("nome")?.value.trim();
            cognome = document.getElementById("cognome")?.value.trim();
        }

        if (!codiceFiscale || !nome || !cognome || !data || !fileData) {
            alert("Tutti i campi sono obbligatori.");
            return;
        }

        // Creazione del nuovo documento con file
        const newDocument = {
            codiceFiscale,
            nome,
            cognome,
            data,
            creationDate: new Date().toISOString().split("T")[0], // Data attuale
            updateDate: new Date().toISOString().split("T")[0],
            status: "In attesa",
            fileData,
            fileType,
            fileName
        };

        let documenti = JSON.parse(localStorage.getItem("documenti")) || [];
        documenti.push(newDocument);
        localStorage.setItem("documenti", JSON.stringify(documenti));

        window.location.href = "dossier.html";
    });

    // Bottone back
    document.getElementById("back").addEventListener("click", () => {
        window.location.href = "dossier.html";
    });
});
