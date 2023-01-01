const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

const showMenu = () => {
  if(menu.style.display === 'none') {
    menu.style.display = 'block';
  } else {
    menu.style.display = 'none';
  }
}

menuBtn.addEventListener('click', showMenu);