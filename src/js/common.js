// импортируем JSON
import GOODS from "./info.json";

// назначаем переменные на родительский контейнер и на шаблон карточки
const cardsField = document.querySelector(".cards");
const cart = document.querySelector(".cart-btn");
let arrCart = [];
const count = document.querySelector(".cart-count");
const spanSumm = document.querySelector(".summ");

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

  // запускаем рендер итоговой стоимости в функции инициализации, чтобы там по дефолту стояло 0
  renderTotal()
}

// функция рендеринга корзины
function renderCart() {
  // определяем родительский элемент
  const ul = document.querySelector(".list");
  // очищаем его содержимое для перерендеринга. Чтобы перезаписать данные, необходимо иметь пустой контейнер, чтобы не осталось ничего лишнего
  ul.innerHTML = ''

  // запускаем цикл по длине массива корзины
  for(let i = 0; i < arrCart.length; i++) {
    // дальше как обычно, создаем элемент, присваиваем ему всю хуйню и т.д. Вместо item используем arrCart[i] - надеюсь, ты понимаешь, почему
    let li = document.createElement("li")
    let deleteBtn = document.createElement("button");

    li.setAttribute("id", `${arrCart[i].id}-card`)
    li.classList.add("list-item");
    li.innerText = `${arrCart[i].naming}, ${arrCart[i].price}руб. * ${arrCart[i].amount}шт. = ${arrCart[i].price * arrCart[i].amount}руб.`;

    deleteBtn.innerText = "удалить этот товар";
    deleteBtn.addEventListener("click", () => {
      deleteThis(arrCart[i].id);
    });

    ul.appendChild(li);
    li.appendChild(deleteBtn);
  }
}

// функция рендеринга итоговой стоимости
function renderTotal() {
  // вместо твоей громоздкой конструкции я поменял в JSON поля price со строк на числа и получилось вот что
  spanSumm.innerHTML = `Общая стоимость: ${arrCart.map(x => x.price * x.amount).reduce((a, b) => a + b, 0)} руб.`
  // счетчик корзины должен считать длину массива корзины
  count.innerText = arrCart.length;
}

// добавление карточки в корзину
function addToCart(e) {
  let relatedGood = e.target.parentNode.parentNode.parentNode;
  let item = GOODS.find(function(x) {
    return relatedGood.getAttribute("id") === x.id;
  });

  // перед тем, как добавить объект в массив корзины, проверим, есть ли уже такой объект в корзине
  // результат поиска мы засовываем в переменную res
  let res = arrCart.find(x => x.id === item.id);

  if (res) {
    res.amount++;
  } else {
    item.amount = 1;
    arrCart.push(item);
  }

  // при каждом добавлении товара мы запускаем рендер корзины и итоговой стоимости
  renderCart()
  renderTotal()
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
  let related = arrCart.find(x => x.id === id)
  arrCart.splice(arrCart.indexOf(related), 1);

  // при каждом удалении товара мы запускаем рендер корзины и итоговой стоимости
  renderCart()
  renderTotal()
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
