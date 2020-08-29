const BASE_URL = 'https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const movies = []

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

function renderMovieList(data) {
    let rawHTML = ''

    data.forEach((item) => {
        //title, image
        console.log(item)
        rawHTML += `
        <div class="col-sm-3">
        <div class="mb-2">
            <div class="card">
              <img
                src="${POSTER_URL + item.image}"
                class="card-img-top"
                alt = "Movie Poster Of ${item.title}"
              />
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
              </div>
              <div class="card-footer">
                <button
                  class="btn btn-primary btn-show-movie"
                  data-toggle="modal"
                  data-target="#movie-modal"
                  data-id="${item.id}"
                >
                  More
                </button>
                <button class="btn btn-info btn-add-favorite">+</button>
              </div>
            </div>
          </div>
          </div>                
          `
    })

    dataPanel.innerHTML = rawHTML
}

axios.get(INDEX_URL).then((response) => {
    movies.push(...response.data.results)
    renderMovieList(movies)
})

dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
        showMovieModal(event.target.dataset.id)
    }
})

searchForm.addEventListener('submit', function onSearchFormSubmit(event) {
    event.preventDefault()
    const keyword = searchInput.value.trim().toLowerCase()
    let filteredMovies = []

    //if (!keyword.length) {
    //    return alert('Please enter a valid string')
    // }

    filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(keyword))

    if (filteredMovies.length === 0) {
        return alert('Cannot find movies with keyword: ' + keyword)
    }

    // for (const movie of movies) {
    //     if (movie.title.toLowerCase().includes(keyword)) {
    //         filteredMovies.push(movie)
    //     }
    // }

    renderMovieList(filteredMovies)
})

function showMovieModal(id) {
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImage = document.querySelector('#movie-modal-image')
    const modalDate = document.querySelector('#movie-modal-date')
    const modalDescription = document.querySelector('#movie-modal-description')
    axios.get(INDEX_URL + id).then((response) => {
        const data = response.data.results
        modalTitle.innerText = data.title
        modalDate.innerText = 'Release date: ' + data.release_date
        modalDescription.innerText = data.description
        modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="movie-poster" class="img-fluid">`
    })
}
