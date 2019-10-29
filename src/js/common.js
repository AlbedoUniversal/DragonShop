// импортируем JSON
import GOODS from './info.json'

// назначаем переменные на родительский контейнер и на шаблон карточки
let cardsField = document.querySelector('.cards')
let cardItemHTML = '<div class="photo"><img src="" alt="" /></div><div class="text"><div class="naming"></div><div class="description"></div><div class="price"></div><div class="buy"><button class="btn">buy now</button></div></div>'

function init() {
    // Запускаем цикл по длине массива товаров
    for(let i = 0; i < GOODS.length; i++) {
        // создаем div
        let card = document.createElement('div')
        // вешаем на него класс
        card.classList.add('cards-item')
        // заполняем див шаблоном
        card.innerHTML = cardItemHTML
        // вешаем на див айдишник, к каждому диву свой
        card.setAttribute('id', GOODS[i].id)

        // находим контейнеры, в котором находятся теги картинки и текстов. Обрати внимание, каким хитровыебанным
        // способом я обернул card.childNodes, т.к. мне нужно получить чистый массив, а не массив NodeElement
        let photoArr = [...card.childNodes].find(x => x.className === 'photo')
        let textArr = [...card.childNodes].find(x => x.className === 'text')

        // по такому же пути находим конкретные контейнеры для конкретных данных
        let photoImg = [...photoArr.childNodes][0]
        let title = [...textArr.childNodes].find(x => x.className === 'naming')
        let description = [...textArr.childNodes].find(x => x.className === 'description')
        let price = [...textArr.childNodes].find(x => x.className === 'price')

        // и заполняем эти контейнеры данными из JSON
        photoImg.setAttribute('src', GOODS[i].photo)
        title.innerText = GOODS[i].naming
        description.innerText = GOODS[i].description
        price.innerText = GOODS[i].price

        // и заполняем родительский элемент свежеиспеченной карточкой
        cardsField.appendChild(card)
    }

    // далее получаем массив всех кнопок всех карточек (обрати внимание, что мы делаем это после цикла)
    let btnsToCard = document.querySelectorAll('.btn')

    // и вешаем на каждую обработчик клика
    btnsToCard.forEach(x => {
        x.addEventListener('click', addToCard)
    })
}

function addToCard() {
    console.log('А теперь думай дальше сам')
}

// в конце запускаем головную функцию без window.onload
init()

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
