document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("modal-overlay");
  const btnSearch = document.querySelector(".btn-search");
  const movieName = document.getElementById("movie-name");
  const movieListElement = document.getElementById("movie-list");
  const btnMoon = document.getElementById("btn-moon");
  const body = document.querySelector("body");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    btnMoon.classList.remove("bi-moon-stars-fill");
    btnMoon.classList.add("bi-brightness-high-fill");
  } else {
    body.classList.remove("dark-mode");
    btnMoon.classList.remove("bi-brightness-high-fill");
    btnMoon.classList.add("bi-moon-stars-fill");
  }

  let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

  async function openModal() {
    try {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${movieNameParameterGenerator()}&language=pt-BR`;

      const response = await fetch(url);
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("Filme não encontrado");
      }

      const movie = data.results[0];

      createModal(movie);

      overlay.classList.add("visible");
    } catch (error) {
      notie.alert({ type: "error", text: error.message });
    }
  }

  function movieNameParameterGenerator() {
    if (movieName.value === "") {
      throw new Error("O nome do filme deve ser informado");
    }
    return movieName.value.split(" ").join("+");
  }

  function addToList(movieObject) {
    movieList.push(movieObject);
    updateLocalStorage();

    // Filme novo aparece imediatamente, sem delay
    updateUI(movieObject);

    overlay.classList.remove("visible");
  }

  function isMoviealreadyOnList(id) {
    function doesThisIdBelongToThisMovie(movieObject) {
      return movieObject.id === id;
    }
    return Boolean(movieList.find(doesThisIdBelongToThisMovie));
  }

  // function updateUI(movieObject) {
  //   const cardHTML = `
  //   <article class="hidden" id="movie-card-${movieObject.id}">
  //     <img
  //       class="movie-poster"
  //       src=${images_uri}${movieObject.poster_path}
  //       alt="Poster de ${movieObject.title}"
  //       data-id="${movieObject.id}"
  //     />
  //     <button class="btn-remove" onclick="removeFilmFromList('${movieObject.id}')">
  //       Remover <i class="bi bi-trash"></i>
  //     </button>
  //   </article>
  // `;

  //   movieListElement.insertAdjacentHTML("beforeend", cardHTML);

  //   addPosterClickEvents();

  //   const newCard = document.getElementById(`movie-card-${movieObject.id}`);
  //   myObserver.observe(newCard);
  // }

  // Substitua a função updateUI pelo bloco abaixo
  function updateUI(movieObject, index = null) {
    const cardHTML = `
    <article class="hidden" id="movie-card-${movieObject.id}">
      <img
        class="movie-poster"
        src=${images_uri}${movieObject.poster_path}
        alt="Poster de ${movieObject.title}"
        data-id="${movieObject.id}"
      />
      <button class="btn-remove" onclick="removeFilmFromList('${movieObject.id}')">
        Remover <i class="bi bi-trash"></i>
      </button>
    </article>
  `;

    movieListElement.insertAdjacentHTML("beforeend", cardHTML);
    addPosterClickEvents();

    const newCard = document.getElementById(`movie-card-${movieObject.id}`);

    if (typeof index === "number" && index > 0) {
      setTimeout(() => {
        myObserver.observe(newCard);
      }, index * 350);
    } else {
      myObserver.observe(newCard);
    }
  }

  function addPosterClickEvents() {
    const posters = document.querySelectorAll(".movie-poster");
    posters.forEach((poster) => {
      poster.addEventListener("click", () => {
        const movieId = Number(poster.getAttribute("data-id"));
        const movie = movieList.find((movie) => movie.id === movieId);
        if (movie) {
          createModal(movie);
          overlay.classList.add("visible");
        }
      });
    });
  }

  const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");
        myObserver.unobserve(entry.target); // anima só uma vez
      }
    });
  });

  function removeFilmFromList(id) {
    notie.confirm({
      text: "Deseja remover o filme de sua lista?",
      submitText: "Sim",
      cancelText: "Não",
      position: "top",
      submitCallback: function removeMovie() {
        movieList = movieList.filter((movie) => movie.id !== Number(id));
        document.getElementById(`movie-card-${id}`).remove();
        notie.alert({ type: "success", text: "Filme removido com sucesso" });
        updateLocalStorage();
      },
    });
  }

  function updateLocalStorage() {
    localStorage.setItem("movieList", JSON.stringify(movieList));
  }
  movieList.forEach((movieInfo, index) => {
    updateUI(movieInfo, index);
  });

  btnMoon.addEventListener("click", function toggleTheme() {
    if (!body.classList.contains("dark-mode")) {
      body.classList.add("dark-mode");
      btnMoon.classList.remove("bi-moon-stars-fill");
      btnMoon.classList.add("bi-brightness-high-fill");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-mode");
      btnMoon.classList.remove("bi-brightness-high-fill");
      btnMoon.classList.add("bi-moon-stars-fill");
      localStorage.setItem("theme", "light");
    }
  });

  window.addToList = addToList;
  window.isMoviealreadyOnList = isMoviealreadyOnList;
  window.updateUI = updateUI;
  window.updateLocalStorage = updateLocalStorage;
  window.removeFilmFromList = removeFilmFromList;
  window.overlay = overlay;
  btnSearch.addEventListener("click", openModal);
});
