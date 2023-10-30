export function cart() {
  const openCartButton = document.querySelector('.cart-btn');
  const closeCartButton = document.querySelector('.cart-close');
  const backdrop = document.querySelector('.cart-backdrop');
  const cart = document.querySelector('.cart');
  const cartList = document.querySelector('.cart-items');
  const addToCartBtns = document.querySelectorAll('.cart-add');
  const body = document.querySelector('body');

  const cartItems = JSON.parse(localStorage.getItem('books')) || [];

  // render cart items
  cartItems.forEach(item => {
    insertCartProduct(item);
  });

  toggleCartStatus();
  calcCartQty();
  calcTotalPrice();

  // disable "add to cart" buttons if already in cart
  addToCartBtns.forEach(button => {
    const productId = button.parentNode.parentNode.id;
    const alreadyInCart = cartItems.some(item => item.id === productId);

    if (alreadyInCart) {
      toggleBtnStatus(productId);
    }
  });

  //  open/close cart
  openCartButton.addEventListener('click', openCart);
  backdrop.addEventListener('click', closeCart);
  closeCartButton.addEventListener('click', closeCart);

  // add to cart
  document.addEventListener('click', event => {
    if (event.target.closest('.cart-add')) {
      const product = event.target.parentNode.parentNode;
      const productId = product.id;
      const productType = product.dataset.type;
      const productImage = product.querySelector('img').getAttribute('src');
      const productTitle = product.querySelector('.h4').innerText;
      const productPrice = product.querySelector(
        '.products-content__price span'
      ).innerText;

      const cartProduct = {
        id: productId,
        type: productType,
        image: productImage,
        title: productTitle,
        price: productPrice,
        quantity: 1,
      };

      insertCartProduct(cartProduct);
      cartItems.push(cartProduct);
      localStorage.setItem('books', JSON.stringify(cartItems));

      toggleBtnStatus(productId);
      calcCartQty();
      calcTotalPrice();
      toggleCartStatus();
    }
  });

  // delete from cart
  document.addEventListener('click', event => {
    if (event.target.closest('.cart-items__remove')) {
      const product = event.target.parentNode.parentNode.parentNode;

      const newCartItems = cartItems.filter(item => item.id !== product.id);
      cartItems.splice(0, cartItems.length, ...newCartItems);
      localStorage.setItem('books', JSON.stringify(newCartItems));
      product.remove();

      toggleBtnStatus(product.id, false);
      calcCartQty();
      calcTotalPrice();
      toggleCartStatus();
    }
  });

  // increase/decrease product qty
  document.addEventListener('click', event => {
    if (event.target.closest('.cart-item-qty__button')) {
      const quantity = event.target.parentNode.parentNode;
      const quantityInput = quantity.querySelector('.cart-item-qty__input');
      const productId = event.target.closest('.cart-items__item').id;
      const productIndex = cartItems.findIndex(item => item.id === productId);

      if (event.target.closest('.cart-item-qty__button--increase')) {
        if (quantityInput.value == 99) {
          return;
        }

        quantityInput.value = ++quantityInput.value;
      }

      if (event.target.closest('.cart-item-qty__button--decrease')) {
        if (quantityInput.value == 1) {
          return;
        }

        quantityInput.value = --quantityInput.value;
      }

      calcTotalPrice();
      calcCartQty();

      cartItems[productIndex] = {
        ...cartItems[productIndex],
        quantity: quantityInput.value,
      };
      localStorage.setItem('books', JSON.stringify(cartItems));
    }
  });

  // functions
  function openCart() {
    backdrop.classList.add('cart-backdrop--active');
    cart.classList.add('cart--active');
    body.classList.add('locked');
  }

  function closeCart() {
    backdrop.classList.remove('cart-backdrop--active');
    cart.classList.remove('cart--active');
    body.classList.remove('locked');
  }

  function insertCartProduct(item) {
    cartList.insertAdjacentHTML(
      'beforeend',
      `<li class="cart-items__item" id="${item.id}">
        <div class="cart-items__body">
          <div class="cart-items__image-wrapper">
            <img src="${item.image}" alt="${item.title}" />
            ${
              item.type != 'print'
                ? `<div class="products-type">
                ${
                  item.type == 'audio'
                    ? `<div class="products-type__audio">
                      <svg width="42" height="42">
                        <use href="./images/icons.svg#icon-audio"></use>
                      </svg>
                    </div>`
                    : `<img src="./images/vinyl.png" alt="vinyl" width="82" />`
                }
                </div>`
                : ''
            }
          </div>

          <div class="cart-items__content">
            <div>
              <h5 class="h5">${item.title}</h5>
              <p class="cart-items__price">$${item.price} USD</p>
            </div>
            <button class="cart-items__remove" type="button">
              Remove
            </button>
          </div>
        </div>

        <div class="cart-item-qty">
          <input class="cart-item-qty__input" type="text" value="${
            item.quantity
          }" />

          <div class="cart-item-qty__buttons">
            <button
              class="cart-item-qty__button cart-item-qty__button--increase"
              type="button"
            >
             +
            </button>
            <button
              class="cart-item-qty__button cart-item-qty__button--decrease"
              type="button"
            >
              –
            </button>
          </div>
        </div>
      </li>`
    );
  }

  function calcCartQty() {
    const cartQtyAll = document.querySelectorAll('.cart-item-qty__input');
    const cartQty = document.querySelector('.cart-btn__qty');

    let totalQty = 0;

    cartQtyAll.forEach(qty => {
      totalQty += parseInt(qty.value);
    });

    cartQty.innerText = totalQty;
  }

  function calcTotalPrice() {
    const cartListItems = document.querySelectorAll('.cart-items__item');
    const totalValue = document.querySelector('.cart-total__price span');

    let totalPrice = 0;

    cartListItems.forEach(item => {
      const productQty = item.querySelector('.cart-item-qty__input');
      const productPrice = item.querySelector('.cart-items__price');
      const currentPrice =
        parseInt(productQty.value) *
        parseFloat(productPrice.innerText.slice(1));

      totalPrice += currentPrice;
    });

    totalValue.innerText = totalPrice.toFixed(2);
  }

  function toggleCartStatus() {
    const cartNotify = document.querySelector('.cart__notification');
    const cartFooter = document.querySelector('.cart__footer');
    const cartLength = cartList.children.length;

    if (cartLength > 0) {
      cartNotify.classList.add('visually-hidden');
      cartFooter.classList.remove('visually-hidden');
    } else {
      cartNotify.classList.remove('visually-hidden');
      cartFooter.classList.add('visually-hidden');
    }
  }

  function toggleBtnStatus(productId, disable = true) {
    const prodInList = document.querySelector(
      `.products-list [id="${productId}" ]`
    );

    if (prodInList) {
      const prodInListBtn = prodInList.querySelector('.cart-add');

      if (disable) {
        prodInListBtn.disabled = true;
        prodInListBtn.innerText = 'In Cart';
        prodInListBtn.style.background = '#ffca42';
        prodInListBtn.style.pointerEvents = 'none';
      } else {
        prodInListBtn.disabled = false;
        prodInListBtn.innerText = 'Add to Cart';
        prodInListBtn.style.background = 'transparent';
        prodInListBtn.style.pointerEvents = 'all';
      }
    } else {
      return;
    }
  }
}
