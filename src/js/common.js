// импортируем JSON
import GOODS from "./info.json";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";

// назначаем переменные на родительский контейнер и на шаблон карточки
const cardsField = document.querySelector(".cards");
const cart = document.querySelector(".cart-btn");
let arrCart = [];

const cardItemHTML =
  '<div class="photo"><img src="" alt="" /></div><div class="text"><div class="naming"></div><div class="description"></div><div class="price"></div><div class="buy"><button class="btn">buy now</button></div></div>';

function init() {
  // Запускаем цикл по длине массива товаров
  for (let i = 0; i < GOODS.length; i++) {
    // создаем div
    let card = document.createElement("div");
    // вешаем на него клconst
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
  const count = document.querySelector(".cart-count");

  let newSumm = 0;
  const spanSumm = document.querySelector(".summ");

  const ul = document.querySelector(".list");

  let relatedGood = e.target.parentNode.parentNode.parentNode;
  let item = GOODS.find(function(x) {
    return relatedGood.getAttribute("id") === x.id;
  });
  // перед тем, как добавить объект в массив корзины, проверим, есть ли уже такой объект в корзине
  // результат поиска мы засовываем в переменную res
  let res = arrCart.find(x => x.id === item.id);

  // если поиск найдет объект, то он вернется к нам. Если нет - вернется undefined
  // Так как undefined - false, то применяем следующее условие
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "удалить этот товар";
  deleteBtn.addEventListener("click", () => {
    deleteThis(item.id);
  });
  if (res) {
    // если такой объект уже есть, находим элемент li, который отрендерился благодаря этому объекту
    // при создании элемента li мы также присваиваем айдишник, который похож на айдишник карточки,
    // но немного видоизменен, чтобы не произошло конфликтов
    let relatedLi = document.querySelector(`#${res.id}-card`);
    // так как объект, лежащий в массиве, уже имеет свойство amount, то просто добавляем к нему 1
    res.amount++;

    // и делаем перерендер этого элемента
    relatedLi.innerText = `${res.naming}, ${res.price}руб. * ${
      res.amount
    }шт. = ${res.price * res.amount}руб.`;
    relatedLi.appendChild(deleteBtn);
  } else {
    // если объекта нет, то мы создаем li
    let li = document.createElement("li");

    // присваиваем id. Внимательно посмотри, как это делается
    li.setAttribute("id", `${item.id}-card`);
    // присваиваем объекту свойство amount
    item.amount = 1;
    // добавляем его в массив

    arrCart.push(item);
    // присваиваем li класс для дальнейшей стилизации
    li.classList.add("list-item");
    // делаем рендер элемента
    li.innerText = `${item.naming}, ${item.price}руб. * ${
      item.amount
    }шт. = ${item.price * item.amount}руб.`;
    // и добавляем его в родительский элемент ul
    ul.appendChild(li);
    li.appendChild(deleteBtn);
  }

  // вывод итоговой стоимости товара
  let countLi = document.querySelectorAll(".list-item");
  countLi.forEach(p => {
    let str = p.innerText;
    str = str.substring(str.indexOf("=") + 1);
    str = parseInt(str.replace(/[^\d]/g, ""));
    newSumm += str;
  });
  spanSumm.innerHTML = `общая сумма = ${newSumm}руб.`;

  // счетчик корзины должен считать длину массива корзины
  count.innerText = arrCart.length;
}

// показ дроп дауна
cart.addEventListener("click", () => {
  activeDrop();
});

function activeDrop() {
  let dropDown = document.querySelector(".cart-dropdown");
  dropDown.classList.toggle("activeDrop");
}

function deleteThis(id) {
  const index = `${id}-card`;

  console.log(parenList.querySelector(`${index}`));
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
