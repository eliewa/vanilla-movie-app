const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const exit = document.getElementById('exit');
const API_POPULAR_PEOPLE = "https://api.themoviedb.org/3/person/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=1";
const API_POPULAR_PEOPLE_P_2 = "https://api.themoviedb.org/3/person/popular?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=en-US&page=2";

const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/";

getPeople(API_POPULAR_PEOPLE, main);
getPeople(API_POPULAR_PEOPLE_P_2, main);

async function getPeople(url, id) {
  const response = await fetch(url);
  const data = await response.json();
  displayPeople(data.results, id);
}

const displayPeople = (movies, id) => {
  // id.innerHTML = '';
  
  movies.forEach((movie) => {
    const {
      name,
      profile_path,
      overview,
      known_for,
    } = movie;

    let type;

    const moviesElement = document.createElement('div');
    const toggle = document.getElementById('toggle');
    moviesElement.classList.add('movie');

    // for (let i = 0; i < 3; i++) {
    //   
    // }

    if(known_for[0].media_type === "tv") {
          type = known_for[0].name;
        } else {
          type = known_for[0].title;
        }
    

    moviesElement.innerHTML = `
    <img src="${IMAGE_PATH + profile_path}" alt="${name}" class="w-[150px] h-[225px] shadow-sm rounded-md object-cover"/>
    <div class="movie-info flex flex-col px-3 w-[150px] pb-4">
      <h3 class="font-bold py-1">${name}</h3>
      <div class="flex">
        <p>${type}</p>
        
      </div>
    </div>
    `

    id.appendChild(moviesElement);

    moviesElement.addEventListener('click', (event) => {
      event.preventDefault();
      if (details.style.display === 'none') {
        details.style.display = 'flex';
        box.style.display = 'flex';
        box.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${IMAGE_PATH + known_for[0].poster_path})`
        box.style.backgroundSize = 'cover';
        box.style.backgroundPosition = 'center';
        details.innerHTML = `
        <h3 class= "text-white font-bold text-2xl mx-auto text-center pb-5" >${name}</h3>
        <img src="${IMAGE_PATH + profile_path}" class="self-center object-cover object-center h-auto w-[200px]"/>
        <div class= "text-white mt-4 p-5 rounded-lg border-2" style="background-color: rgba(0,0,0,0.5);">
        <p class="font-bold text-xl">Appearances in: ${type}</p>
        ${known_for[0].overview}
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



const showMenu = () => {
  if(menu.style.display === 'none') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}

menuBtn.addEventListener('click', showMenu);
exit.addEventListener('click', showMenu);