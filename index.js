const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const SHOW_URL = BASE_URL + "/api/v1/movies/1/";
const POSTER_URL = BASE_URL + "/poster/";

const movies = [];

axios.get(INDEX_URL).then((response) => {
  movies.push(...response.data.results);
  console.log(movies);
});
