const modalBackground = document.getElementById("modal-background");
const modalContainer = document.getElementById("modal-container");

let currentMovie = {};

function closeModal() {
  overlay.classList.remove("visible");
}

function addCurrentMovieToList() {
  if (isMoviealreadyOnList(currentMovie.id)) {
    notie.alert({ type: "error", text: "Filme já está na lista" });
    return;
  }
  addToList(currentMovie);
  updateUI(currentMovie);
  updateLocalStorage();
  closeModal();
}

function createModal(data) {
  currentMovie = data;

  modalContainer.innerHTML = `
    <button class="btn-close-modal" onclick="closeModal()">X</button>
  <h1 class="title-modal">${data.title} - ${data.release_date.slice(0, 4)}</h1>


          <section id="modal-body">
            <img
              id="movie-poster"
              src=${images_uri}${data.poster_path}
              alt="Poster do Filme."
            />
            <div id="movie-info">
              <div class="movie-sinopse">
                <h2 class="subtitle">Sinopse:</h2>
                  <h3 id="movie-plot">
                    ${data.overview}
                  </h3>
              </div>
              
              
              <div id="movie-vote-average">
                <h2>Avaliação:</h2>
                <h5><i class="bi bi-star"></i> ${data.vote_average.toFixed(
                  1
                )}</h5>
              </div>
            </div>
          </section>
          <section id="modal-footer">
            <button id="add-to-list" onclick= '{addCurrentMovieToList()}'>Adicionar à lista</button>
          </section>`;
}

modalBackground.addEventListener("click", closeModal);
