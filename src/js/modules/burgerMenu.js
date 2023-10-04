export function burgerMenu() {
  const burger = document.querySelector('.header__burger');
  const menu = document.querySelector('.menu');
  const body = document.querySelector('body');

  burger.addEventListener('click', () => {
    if (!menu.classList.contains('menu--active')) {
      // open menu
      menu.classList.add('menu--active');
      // animate burger
      burger.classList.add('header__burger--active');
      // lock scroll
      body.classList.add('locked');
    } else {
      menu.classList.remove('menu--active');
      burger.classList.remove('header__burger--active');
      body.classList.remove('locked');
    }
  });
  // navbar breakpoint
  // window.addEventListener('resize', () => {
  //   if (window.innerWidth > 991.98) {
  //     menu.classList.remove('active');
  //     burger.classList.remove('active');
  //     body.classList.remove('locked');
  //   }
  // });
}
