const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const exit = document.getElementById('exit');
const movieCard = document.getElementById('card');
const API_URL_TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
const API_URL_NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
const API_URL_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/";
const API_URL_TRENDING = "https://api.themoviedb.org/3/trending/movie/day?api_key=15e383204c1b8a09dbfaaa4c01ed7e17";
// const API_URL_RECOMMENDATIONS = `https://api.themoviedb.org/3/movie/${movie.movie_id}/recommendations?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1`;
const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1&include_adult=false&query=";

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const top_rated = document.getElementById('top');
const trending = document.getElementById('trending');
const movieLink = document.getElementById('link');
const details = document.getElementById('details');
const box = document.getElementById('box');

getMovies(API_URL_POPULAR, main);
getMovies(API_URL_TOP_RATED, top_rated);
getMovies(API_URL_TRENDING, trending);



 async function getMovies(url, id){
  const response = await fetch(url);
  const data = await response.json();
  displayMovies(data.results, id);
}

// const getMovieId = () => {

// }

const displayMovies = (movies, id) => {
  id.innerHTML = '';
  movies.forEach((movie) => {
    const {title, poster_path, vote_average, release_date, overview} = movie;
    // const API_URL_RECOMMENDATIONS = `https://api.themoviedb.org/3/movie/${movie.movie_id}/recommendations?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1`;
    const moviesElement= document.createElement('div');
    const toggle = document.getElementById('toggle');
    moviesElement.classList.add('movie');
    moviesElement.innerHTML= `
    <img src="${IMAGE_PATH + poster_path}" alt="${title}" class="w-[150px] h-[225px] shadow-sm rounded-md object-cover"/>
    <div class="movie-info flex flex-col px-3 w-[150px] pb-4">
      <h3 class="font-bold py-1">${title}</h3>
      <span class="font-bold w-[40px] text-center rounded-lg ${getClassesByRating(vote_average)}">${parseInt(vote_average)}</span>
      <p class="py-1">${release_date}</p>
    </div>
    `

    id.appendChild(moviesElement);

    moviesElement.addEventListener('click', (event) => {
      event.preventDefault();
      if(details.style.display === 'none') {
        details.style.display = 'flex';
        box.style.display = 'flex';
        box.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${IMAGE_PATH + poster_path})`
        box.style.backgroundSize = 'cover';
        box.style.backgroundPosition = 'center';
        details.innerHTML = `
        <h3 class= "font-bold text-2xl mx-auto text-center pb-5" >${title}</h3>
        <img src="${IMAGE_PATH + poster_path}" class="self-center object-cover object-center h-auto w-[200px]"/>
        <div class= "mt-4 p-5 rounded-lg" style="background-color: rgba(0,0,0,0.5)">
        <p class="font-bold text-xl">Overview</p>
        ${overview}
        </div>
        `
      } else {
        details.style.display = 'none';
        box.style.display = 'none';
      }
    });

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
        details.style.display = 'none';
        box.style.display = 'none';
    });


  })
}

  const getClassesByRating = (rating) => {
    if (rating >= 8) {
      return 'bg-green-400';
    } else if (rating >= 5) {
      return 'bg-orange-400';
    } else {
      return 'bg-red-400';
    }
  } 

form.addEventListener('submit', (event) =>{
  event.preventDefault();
  const searchValue = search.value;
  let category = document.getElementById('category');
  if(searchValue && searchValue !== '') {
    // getMovieId(SEARCH_URL + searchValue);
    getMovies(SEARCH_URL + searchValue, main);
    category.innerHTML = `Search results for "${searchValue}"`;
    searchValue = '';
  } else {
    window.location.reload();
  }
})

const showMenu = () => {
  if(menu.style.display === 'none') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}

menuBtn.addEventListener('click', showMenu);
exit.addEventListener('click', showMenu);