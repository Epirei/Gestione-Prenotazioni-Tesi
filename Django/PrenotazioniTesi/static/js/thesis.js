document.addEventListener("DOMContentLoaded", ThesisUpdater);

function ThesisUpdater() {
    const container = document.getElementById("card-container");
    container.innerHTML = null;
    const staticUrl = document.querySelector('script[data-static-url]').getAttribute('data-static-url');
    
    fetch(staticUrl + "json_tests/thesis.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(tesi => {
                const cardhtml = `
                <div class="card-wrapper card-space">
                    <div class="card card-bg card-big">
                        <div class="card-body">
                            <div class="top-icon">
                                <svg class="icon"><use href="${staticUrl}svg/sprites.svg#it-card"></use></svg>
                            </div>
                            <h3 class="card-title h5 ">${String(tesi.nome)}</h3>
                            <p class="card-text font-serif">${String(tesi.insegnante)}</p>
                            <p class="card-text font-serif">${String(tesi.materia)}</p>
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
