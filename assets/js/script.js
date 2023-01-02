const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const exit = document.getElementById('exit');
const movieCard = document.getElementById('card');
const API_URL_TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
const API_URL_NOW_PLAYING = "https://api.themoviedb.org/3/movie/now_playing?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
const API_URL_POPULAR = "https://api.themoviedb.org/3/movie/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/";

const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1&include_adult=false&query=";

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const topRated = document.getElementById('top-rated');
const popular = document.getElementById('popular');

getMovies(API_URL_POPULAR)

 async function getMovies(url){
  const response = await fetch(url);
  const data = await response.json();
  displayMovies(data.results);
}

const displayMovies = movies => {
  main.innerHTML = '';
  movies.forEach((movie) => {
    const {title, poster_path, vote_average, release_date} = movie;
    const moviesElement= document.createElement('div');
    moviesElement.classList.add('movie');
    moviesElement.innerHTML= `
    <img src="${IMAGE_PATH + poster_path}" alt="${title}" class="w-[150px] h-[225px] shadow-sm rounded-md object-cover"/>
    <div class="movie-info flex flex-col px-3 w-[150px] pb-4">
      <h3 class="font-bold py-1">${title}</h3>
      <span class="font-bold w-[40px] text-center rounded-lg ${getClassesByRating(vote_average)}">${vote_average}</span>
      <p class="py-1">${release_date}</p>
    </div>
    `

    main.appendChild(moviesElement);
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
    getMovies(SEARCH_URL + searchValue);
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

let card = {
  image: '<img src="./assets/images/hero.jpg" class="w-[150px] h-[225px] shadow-sm rounded-md object-cover" >',
  title: 'Movie',
  date: '2023'
}

// movieCard.innerHTML = `${card.image} <p>${card.title}</p> <p>${card.date}</p> `;