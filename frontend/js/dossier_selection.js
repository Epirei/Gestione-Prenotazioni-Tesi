document.addEventListener("DOMContentLoaded",SubjectUpdater());

/*
<div class="card dossier-card" data-link="dossier.html">
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
    fetch("../json_tests/prova.json")
        .then(response => response.json())
        .then(data=>{
            container=document.getElementById("card-container");
            data.forEach(teacher=>
               {
                const cardhtml=`<div class="card dossier-card" data-link="dossier.html">
                        <div class="card-body text-center">
                            <h5 class="card-title">${teacher.materia}</h5>
                            
                        </div>
                        <img src="../assets/dossier.jpg" class="card-img-top" >
                        <div class="card-body text-center">
                        <h4 class="card-title">${teacher.nome}</h4>
                        <button type="button">Richiesta Tesi</button>
                        
                    </div>
                `   
                    container.innerHTML+=cardhtml;
                }
            )
        }
)
}


