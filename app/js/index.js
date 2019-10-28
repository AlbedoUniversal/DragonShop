// const people = [
//   { name: 'luis', age: '23', vocation: 'programmer', seruce: false },
//   { name: 'moris', age: '33', vocation: 'manager', seruce: true },
//   { name: 'boris', age: '43', vocation: 'designer', seruce: false },
//   { name: 'sarkis', age: '53', vocation: 'CEO', seruce: true },
//   { name: 'azis', vocation: 'TeamLead', seruce: false }
// ];

// /* Дописать функцию
// она должна выводить в виде списка информацию из people
// создавая под каждого человека li-шку
// */
// function showPeople(array) {
//   const ul = document.querySelector('.list-group');
//   array.forEach(function (element) {
//     const newPeople = document.createElement('li');
//     newPeople.addEventListener('click', () => {
//       showDetail(element);
//     });
//     newPeople.classList.add('list-group-item');
//     for (const i in element) {
//       newPeople.innerHTML += `${i} ${element[i]} `;
//     }
//     ul.appendChild(newPeople);
//   });
// }

// // надо написать функцию showDetail() {}
// // которая вешается как обработчик клика на лишки
// // и при клике на лишку, в блок .detailed должна выводиться вся информация об объекте

// function showDetail(objectichek) {
//   const div = document.querySelector('.detailed');
//   div.innerHTML = "";
//   for (const w in objectichek) {
//     if (objectichek.hasOwnProperty(w) && w !== 'seruce') {
//       div.innerText += ` ${w} ${objectichek[w]} `;
//     }
//   }
// };

// showPeople(people);

const cards = document.querySelectorAll(".cards-item");
const btns = document.querySelectorAll(".btn");
function appropriationDataAtrr() {
  cards.forEach(function(element, index) {
    let indexes = index + 1;
    element.setAttribute("data-key", `${indexes}`);
  });
  btns.forEach(function(buttons, i) {
    let is = i + 1;
    buttons.setAttribute("data-number", `${is}`);
  });
}
appropriationDataAtrr();

// 1  - написать ф-цию, которая расставляет случайные id после заргрузки страницы для каждой карточки и конпки добавления в корзину
// Saint Mojolicious, [25.10.19 21:03]
// Результат такой:
// <div class="cards-item" data-key="12">
// ..........................
//       <button class="btn" data-product-id="12">buy now</button>
//  </div>

// 2 задача - сделать корзины иконку, как присылал, примерно так
// в ней надо сделать заготовку dropdown, в который будут попадать товары при добавлении
