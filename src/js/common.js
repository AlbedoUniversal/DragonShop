// импортируем JSON
import GOODS from "./info.json";

// назначаем переменные на родительский контейнер и на шаблон карточки
const cardsField = document.querySelector(".cards");
const cart = document.querySelector(".cart-btn");
let arrCart = [];

const cardItemHTML =
  '<div class="photo"><img src="" alt="" /></div><div class="text"><div class="naming"></div><div class="description"></div><div class="price"></div><div class="buy"><button class="btn">buy now</button></div></div>';

function init() {
  for (let i = 0; i < GOODS.length; i++) {
    // Запускаем цикл по длине массива товаров

    let card = document.createElement("div"); // создаем div

    card.classList.add("cards-item"); // вешаем на него клconst

    card.innerHTML = cardItemHTML; // заполняем див шаблоном

    card.setAttribute("id", GOODS[i].id); // вешаем на див айдишник, к каждому диву свой

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

    cardsField.appendChild(card); // и заполняем родительский элемент свежеиспеченной карточкой
  }

  let btnsToCard = document.querySelectorAll(".btn"); // далее получаем массив всех кнопок всех карточек (обратите внимание, что мы делаем это после цикла)

  // и вешаем на каждую обработчик клика
  btnsToCard.forEach(x => {
    x.addEventListener("click", addToCart);
  });
}

// добавление карточки в корзину
function addToCart(e) {
  const count = document.querySelector(".cart-count");
  const spanSumm = document.querySelector(".summ");
  const ul = document.querySelector(".list");

  let newSumm = 0;
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
    deleteThis(item);
  });
  if (res) {
    // если такой объект уже есть, находим элемент li, который отрендерился благодаря этому объекту
    // при создании элемента li мы также присваиваем айдишник, который похож на айдишник карточки,
    // но немного видоизменен, чтобы не произошло конфликтов
    let relatedLi = document.querySelector(`#${res.id}-card`);

    res.amount++; // так как объект, лежащий в массиве, уже имеет свойство amount, то просто добавляем к нему 1

    relatedLi.innerText = `${res.naming}, ${res.price}руб. * ${
      // и делаем перерендер этого элемента
      res.amount
    }шт. = ${res.price * res.amount}руб.`;
    relatedLi.appendChild(deleteBtn);
  } else {
    let li = document.createElement("li"); // если объекта нет, то мы создаем li
    li.setAttribute("id", `${item.id}-card`); // присваиваем id. Внимательно смотрим, как это делается
    item.amount = 1; // присваиваем объекту свойство amount
    arrCart.push(item); // добавляем его в массив
    li.classList.add("list-item"); // присваиваем li класс для дальнейшей стилизации

    li.innerText = `${item.naming}, ${item.price}руб. * ${
      // делаем рендер элемента
      item.amount
    }шт. = ${item.price * item.amount}руб.`;

    ul.appendChild(li); // и добавляем его в родительский элемент ul
    li.appendChild(deleteBtn);
  }

  // вывод итоговой стоимости товаров
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

function deleteThis(liId) {
  // console.log(liId);
  arrCart.forEach(removed => {
    if (liId.id === removed.id) {
      console.log(`${liId}`);
    }
  });
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
