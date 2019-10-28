function appropriationDataAtrr() {
  const cards = document.querySelectorAll(".cards-item");
  cards.forEach(function(card, index) {
    const btns = card.querySelector(".btn");
    card.setAttribute("data-key", `${index + 1}`);
    btns.setAttribute("data-product-id", `${index + 1}`);
  });
}
appropriationDataAtrr();

// 1  - написать ф-цию, которая расставляет случайные id после заргрузки страницы для каждой карточки и конпки добавления в корзину
// <div class="cards-item" data-key="12">
//       <button class="btn" data-product-id="12">buy now</button>
//  </div>

// 2 задача - сделать корзины иконку, как присылал, примерно так
// в ней надо сделать заготовку dropdown, в который будут попадать товары при добавлении
