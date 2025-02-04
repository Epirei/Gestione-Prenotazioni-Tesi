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
    fetch("../json_tests/prova.json")
        .then(response => response.json())
        .then(data=>{
            
            data.forEach(teacher=>
               {
                const cardhtml=`<div class="card subject-card">
                        <div class="card-body text-center">
                            <h5 class="card-title">${teacher.materia}</h5>
                            
                        </div>
                        <img src="../assets/dossier.jpg" class="card-img-top" >
                        <div class="card-body text-center">
                        <h4 class="card-title">${teacher.nome}</h4>
                        <button type="button" onclick="ThesisConfirmation('${String(teacher.nome)}', '${String(teacher.materia)}')">Richiesta Tesi</button>
                        
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
    window.confirm(`il nome della tesi è ${ThesisName}.\n Sei sicuro di voler confermare la tesi della materia ${materia} con il professore ${professore}`)
}
