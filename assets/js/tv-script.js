const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const exit = document.getElementById('exit');
const API_URL_TOP_RATED = "https://api.themoviedb.org/3/tv/top_rated?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
const TOP_BASE_URL = "https://api.themoviedb.org/3/tv/top_rated?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&"
const POPULAR_BASE_URL = "https://api.themoviedb.org/3/tv/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&"
const ON_TV_BASE_URL = "https://api.themoviedb.org/3/tv/on_the_air?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&"
const API_URL_ON_TV = "https://api.themoviedb.org/3/tv/on_the_air?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
const API_URL_POPULAR = "https://api.themoviedb.org/3/tv/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1"
const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/";
const main = document.getElementById('main');
const category = document.getElementById('category');

const form = document.getElementById('form');
const search = document.getElementById('search');
const details = document.getElementById('details');
const box = document.getElementById('box');
const load = document.getElementById('load');
const onTV = document.getElementById('on-tv')
const popular = document.getElementById('popular');
const topRated = document.getElementById('top-rated');

let count = 0;

getShows(API_URL_POPULAR, main);

async function getShows(url, id) {
  const response = await fetch(url);
  const data = await response.json();
  displayShows(data.results, id);
}

load.addEventListener('click', event => {
  event.preventDefault();
  if(count < 2) {
    count++ ;
    getShows(`${POPULAR_BASE_URL}page=${count + 1}`, main);
  }
});

onTV.addEventListener('click', event => {
  event.preventDefault();
  main.innerHTML = '';
  count = 2;
  onTV.style.backgroundColor = "rgb(13, 37, 63)"
  onTV.style.color = 'rgb(30,213,169)'
  onTV.classList.add("rounded-2xl")
  onTV.classList.add("px-2")


  popular.style.backgroundColor = "white"
  popular.style.color = 'black'

  topRated.style.backgroundColor = "white"
  topRated.style.color = 'black'
  topRated.classList.add("rounded-2xl")

  category.innerHTML = 'Currently Airing'

  getShows(API_URL_ON_TV, main)

  load.addEventListener('click', event => {
    event.preventDefault();
    getShows(`${ON_TV_BASE_URL}page=${count}`, main);
    count += 1;
  });
})

topRated.addEventListener('click', event => {
  event.preventDefault();
  count = 2;
  main.innerHTML = '';
  topRated.style.backgroundColor = "rgb(13, 37, 63)"
  topRated.style.color = 'rgb(30,213,169)'
  topRated.classList.add("rounded-2xl")
  topRated.classList.add("p-1")
  onTV.classList.add("px-2")

  popular.style.backgroundColor = "white"
  popular.style.color = 'black'

  onTV.style.backgroundColor = "white"
  onTV.style.color = 'black'

  category.innerHTML = 'Top Rated'

  getShows(API_URL_TOP_RATED, main)

  load.addEventListener('click', event => {
    event.preventDefault();
    getShows(`${TOP_BASE_URL}page=${count}`, main);
    count += 1;
  });
})

popular.addEventListener('click', event => {
  event.preventDefault();
  count = 2;
  main.innerHTML = '';
  popular.style.backgroundColor = "rgb(13, 37, 63)"
  popular.style.color = 'rgb(30,213,169)'

  onTV.style.backgroundColor = "white"
  onTV.style.color = 'black'

  topRated.style.backgroundColor = "white"
  topRated.style.color = 'black'

  category.innerHTML = "What's Popular"

  getShows(API_URL_POPULAR, main)

  load.addEventListener('click', event => {
    event.preventDefault();
    getShows(`${POPULAR_BASE_URL}page=${count}`, main);
    count += 1;
  });
})

const displayShows = (movies, id) => {
  // id.innerHTML = '';
  movies.forEach((movie) => {
    const {
      name,
      poster_path,
      vote_average,
      first_air_date,
      overview
    } = movie;
    // const API_URL_RECOMMENDATIONS = `https://api.themoviedb.org/3/movie/${movie.movie_id}/recommendations?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1`;
    const moviesElement = document.createElement('div');
    const toggle = document.getElementById('toggle');
    moviesElement.classList.add('movie');
    moviesElement.innerHTML = `
    <img src="${IMAGE_PATH + poster_path}" alt="${name}" class="w-[150px] h-[225px] shadow-sm rounded-md object-cover"/>
    <div class="movie-info flex flex-col px-3 w-[150px] pb-4">
      <h3 class="font-bold py-1">${name}</h3>
      <span class="font-bold w-[40px] text-center rounded-lg ${getClassesByRating(vote_average)}">${parseInt(vote_average)}</span>
      <p class="py-1">${first_air_date}</p>
    </div>
    `

    id.appendChild(moviesElement);

    moviesElement.addEventListener('click', (event) => {
      event.preventDefault();
      if (details.style.display === 'none') {
        details.style.display = 'flex';
        box.style.display = 'flex';
        box.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${IMAGE_PATH + poster_path})`
        box.style.backgroundSize = 'cover';
        box.style.backgroundPosition = 'center';
        details.innerHTML = `
        <h3 class= "font-bold text-2xl mx-auto text-center pb-5" >${name}</h3>
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


const showMenu = () => {
  if (menu.style.display === 'none') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}

menuBtn.addEventListener('click', showMenu);
exit.addEventListener('click', showMenu);