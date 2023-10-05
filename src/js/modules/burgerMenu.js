export function burgerMenu() {
  const burger = document.querySelector('.burger');
  const backdrop = document.querySelector('.menu__backdrop');
  const menu = document.querySelector('.menu__wrapper');
  const body = document.querySelector('body');

  burger.addEventListener('click', () => {
    if (!menu.classList.contains('menu__wrapper--active')) {
      backdrop.classList.add('menu__backdrop--active');
      menu.classList.add('menu__wrapper--active');
      burger.classList.add('burger--active');
      body.classList.add('locked');
    } else {
      closeMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  // navbar breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1129.98) {
      closeMenu();
    }
  });

  function closeMenu() {
    backdrop.classList.remove('menu__backdrop--active');
    menu.classList.remove('menu__wrapper--active');
    burger.classList.remove('burger--active');
    body.classList.remove('locked');
  }
}
