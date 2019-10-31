// импортируем JSON
import GOODS from "./info.json";

// назначаем переменные на родительский контейнер и на шаблон карточки
let cardsField = document.querySelector(".cards");

let cart = document.querySelector(".cart-btn");

let count = document.querySelector(".cart-count");

let boxSpanDrop = document.querySelector(".cart-dropdown");

let cardItemHTML =
  '<div class="photo"><img src="" alt="" /></div><div class="text"><div class="naming"></div><div class="description"></div><div class="price"></div><div class="buy"><button class="btn">buy now</button></div></div>';

function init() {
  // Запускаем цикл по длине массива товаров
  for (let i = 0; i < GOODS.length; i++) {
    // создаем div
    let card = document.createElement("div");
    // вешаем на него класс
    card.classList.add("cards-item");
    // заполняем див шаблоном
    card.innerHTML = cardItemHTML;
    // вешаем на див айдишник, к каждому диву свой
    card.setAttribute("id", GOODS[i].id);

    // находим контейнеры, в котором находятся теги картинки и текстов. Мне нужно получить чистый массив, а не массив NodeElement
    let photoArr = [...card.childNodes].find(x => x.className === "photo");
    let textArr = [...card.childNodes].find(x => x.className === "text");

    // по такому же пути находим конкретные контейнеры для конкретных данных
    let photoImg = [...photoArr.childNodes][0];
    let title = [...textArr.childNodes].find(x => x.className === "naming");
    let description = [...textArr.childNodes].find(
      x => x.className === "description"
    );
    let price = [...textArr.childNodes].find(x => x.className === "price");

    // и заполняем эти контейнеры данными из JSON
    photoImg.setAttribute("src", GOODS[i].photo);
    title.innerText = GOODS[i].naming;
    description.innerText = GOODS[i].description;
    price.innerText = GOODS[i].price;

    // и заполняем родительский элемент свежеиспеченной карточкой
    cardsField.appendChild(card);
  }

  // далее получаем массив всех кнопок всех карточек (обратите внимание, что мы делаем это после цикла)
  let btnsToCard = document.querySelectorAll(".btn");

  // и вешаем на каждую обработчик клика
  btnsToCard.forEach(x => {
    x.addEventListener("click", addToCart);
  });
}

// добавление карточки в корзину
function addToCart(e) {
  let arrCart = [];
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  let span = document.createElement("span");

  let relatedGood = e.target.parentNode.parentNode.parentNode;
  let item = GOODS.find(function(x) {
    return relatedGood.getAttribute("id") === x.id;
  });

  let allLi = document.querySelectorAll("li");
  arrCart.push(item);
  count.innerText = allLi.length + 1;

  arrCart.forEach(elem => {
    for (const i in elem) {
      if (
        elem.hasOwnProperty(i) &&
        i !== "description" &&
        i !== "id" &&
        i !== "photo"
      ) {
        ul.appendChild(li).innerText += `${elem[i]} `;
        console.log(elem[i].length);
        // boxSpanDrop.appendChild(span).innerText = parseInt(elem[i]);
      }
    }
  });
}

// показ дроп дауна
cart.addEventListener("click", () => {
  activeDrop();
});

function activeDrop() {
  let dropDown = document.querySelector(".cart-dropdown");
  dropDown.classList.toggle("activeDrop");
}

// в конце запускаем головную функцию без window.onload
init();

// 2 задача - сделать корзины иконку, как присылал, примерно так
// в ней надо сделать заготовку dropdown, в который будут попадать товары при добавлении

// const cards = document.querySelectorAll(".cards-item");
// const btns = document.querySelectorAll(".btn");
// const cartBtn = document.querySelector(".cart-btn");
// const dropDown = document.querySelector(".cart-dropdown");

// // раздаем карточкам товара и кнопкам id
// function appropriationDataAtrr() {
//   cards.forEach(function(card, index) {
//     card.setAttribute("data-key", `${index + 1}`);
//     card
//       .querySelector(".btn")
//       .setAttribute("data-product-id", `${index + 1}`);
//   });
// }
// appropriationDataAtrr();
// // .....................................

// // показать корзину
// cartBtn.addEventListener("click", () => {
//   showCart();
// });
// function showCart() {
//   dropDown.classList.toggle("activeDrop");
// }
// // .......................................

// function addToCart() {
//   btns.forEach(function(btn) {
//     btn.addEventListener("click", () => {
//       adderCart(btn);
//     });
//   });
// }
// addToCart();
// function adderCart(buy) {
//   console.log(buy);
// }
