export function accordion() {
  const triggers = document.querySelectorAll('.accordion-trigger');

  const activeClass = 'accordion__item--active';

  triggers.forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentNode;

      if (parent.classList.contains(activeClass)) {
        parent.classList.remove(activeClass);
      } else {
        const items = document.querySelectorAll('.accordion__item');

        items.forEach(child => child.classList.remove(activeClass));
        parent.classList.add(activeClass);
      }
    });
  });
}
