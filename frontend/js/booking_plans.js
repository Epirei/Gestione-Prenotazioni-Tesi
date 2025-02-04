document.addEventListener("DOMContentLoaded",PlansUpdater());

/*
<div class="card-wrapper card-space">
                <div class="card card-bg card-big">
                  <div class="card-body">
                    <div class="top-icon">
                      <svg class="icon"><use href="../svg/sprites.svg#it-card"></use></svg>
                    </div>
                    <h3 class="card-title h5 ">Nome Piano</h3>
                    <p class="card-text font-serif">Descrizione</p>
                    <a class="read-more" href="#">
                      <span class="text">Vai alle prenotazioni</span>
                      <span class="visually-hidden">su Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor…</span>
                      <svg class="icon"><use href="../svg/sprites.svg#it-arrow-right"></use></svg>
                    </a>
                  </div>
                </div>
              </div>


*/
function PlansUpdater() {
    container=document.getElementById("card-container");
    container.innerHTML=null;
    fetch("../json_tests/bplans.json")
        .then(response => response.json())
        .then(data=>{
            
            data.forEach(piano=>
               {
                const cardhtml=`<div class="card-wrapper card-space">
                <div class="card card-bg card-big">
                  <div class="card-body">
                    <div class="top-icon">
                      <svg class="icon"><use href="../svg/sprites.svg#it-card"></use></svg>
                    </div>
                    <h3 class="card-title h5 ">${String(piano.nome)}</h3>
                    <p class="card-text font-serif">${String(piano.descrizione)}</p>
                    <a class="read-more" href="#">
                      <span class="text">Vai alle prenotazioni</span>
                      <span class="visually-hidden">su Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor…</span>
                      <svg class="icon"><use href="../svg/sprites.svg#it-arrow-right"></use></svg>
                    </a>
                  </div>
                </div>
              </div>
                    </div>
                `   
                    container.innerHTML+=cardhtml;
                }
            )
        }
)
}
