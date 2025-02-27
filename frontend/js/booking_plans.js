
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
/*
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
                    <a class="read-more" href="subject_selection.html">
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
*/
document.addEventListener("DOMContentLoaded", PlansUpdater);

function PlansUpdater() {
  const container = document.getElementById("card-container");
  container.innerHTML = null;
  fetch("http://127.0.0.1:8000/PrenotazioniTesi/api/booking-plans/", {
    method: "GET",
    mode: "cors",
  })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      data.forEach(piano => {
        const cardhtml = `
          <div class="card-wrapper card-space">
            <div class="card card-bg card-big">
              <div class="card-body">
                <div class="top-icon">
                  <svg class="icon"><use href="../svg/sprites.svg#it-card"></use></svg>
                </div>
                <h3 class="card-title h5 ">${String(piano.name)}</h3>
                <p class="card-text font-serif">${String(piano.description)}</p>
                <a class="read-more" href="subject_selection.html?plan_id=${piano.id}">
                  <span class="text">Vai alle prenotazioni</span>
                  <span class="visually-hidden">su Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor…</span>
                  <svg class="icon"><use href="../svg/sprites.svg#it-arrow-right"></use></svg>
                </a>
              </div>
            </div>
          </div>
        `;
        container.innerHTML += cardhtml;
      });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}