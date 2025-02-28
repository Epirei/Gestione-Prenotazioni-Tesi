document.addEventListener("DOMContentLoaded",SubjectUpdater());

/*
<div class="card dossier-card">
                        <div class="card-body text-center">
                            <h5 class="card-title">Nome Materia</h5>
                            
                        </div>
                        <img src="../assets/dossier.jpg" class="card-img-top" >
                        <div class="card-body text-center">
                        <h4 class="card-title">Nome Insegnante</h4>
                        <button type="button">Richiesta Tesi</button>
                    </div>


*/
function SubjectUpdater() {
    container=document.getElementById("card-container");
    container.innerHTML=null;
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get('plan_id');
    
    url=`http://127.0.0.1:8000/PrenotazioniTesi/api/booking-slots/${String(planId)}/`;
    
    fetch(url)	
        .then(response => response.json())
        .then(data=>{
            
            data.forEach(slot=>
               {
                const cardhtml=`<div class="card subject-card">
                        <div class="card-body text-center">
                            <h5 class="card-title">${slot.subject}</h5>
                            
                        </div>
                        <img src="../assets/dossier.jpg" class="card-img-top" >
                        <div class="card-body text-center">
                        <h4 class="card-title
                        ">Posti:${slot.available_seats}</h4>
                        <h4 class="card-title">${slot.tutor}</h4>
                        <button type="button" onclick="ThesisConfirmation('${String(slot.tutor)}', '${String(slot.subject)}')">Richiesta Tesi</button>
                        </div>
                    </div>
                `   
                    container.innerHTML+=cardhtml;
                }
            )
        }
)
}

function ThesisConfirmation(professore, materia) {
    ThesisName=window.prompt("Inserisci il nome della tesi:","");
    const confirmation = window.confirm(`Il nome della tesi è ${ThesisName}.\n Sei sicuro di voler confermare la tesi della materia ${materia} con il professore ${professore}`);
    
    if (confirmation) {
        const url = "http://127.0.0.1:8000/PrenotazioniTesi/api/booking-reservations/";
        const data = {
            user_id: 1, // Sostituisci con l'ID dell'utente corrente
            slot_id: slotId,
            thesis_name: ThesisName
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            alert("Prenotazione effettuata con successo!");
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert("Si è verificato un errore durante la prenotazione.");
        });
    }

}

