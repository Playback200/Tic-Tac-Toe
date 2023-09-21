// Потрібно створити гру хрестики нулики.
// Відмалюй розмітку ігрового поля для контейнера з класом "content", для кожної клітинки застосуй клас "item"
// Реалізуй делегування подій на ігровому полі для можливості ходу.
// Скріпт має самостійно визначати переможця гри та виводити модальне вікно з переможцем (X/O)
// Для історії ходів наших гравців (Х/О) потрібно щоб кожна клітинка ігрового поля містила дата атрибут id
// Створи скріпт для перевірки виграшної комбінації, список всіх можливих виграшних комбінацій знаходиться в масиві combination.
// Для виводу модального вікна застосуй бібліотеку basiclightbox
// Після визначення переможця обов'язково підготуй ігрове поле для наступної гри

const combinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
  [3, 6, 9],
];

const historyX = [];
const historyO = [];
let player = "X";
const content = document.getElementById("content");

createMarkup();

content.addEventListener("click", handleClick);
function handleClick(event) {
  // перевірка, коли ми клікнули на контейнер або у клітинці вже є текст - виходимо з функції (паттерн раннє повернення)
  if (event.target === event.currentTarget || event.target.textContent) return;

  let winner = false;
  const id = Number(event.target.dataset.id); // отримуємо айді поточної клітинки через data атрибут id
  //перевірка на поточного гравця
  if (player === "X") {
    historyX.push(id); // додаємо айді клітинки у масив історії ходів
    winner = historyX.length >= 3 ? checkWinner(historyX) : false; // якщо гравець зробив більше ніж 3 ходи - перевіряємо чи виграв він, чи ні, а якщо ходів менше - він поки що не виграв
  } else {
    historyO.push(id);
    winner = historyO.length >= 3 ? checkWinner(historyO) : false;
  }
  event.target.textContent = player;
  if (winner) {
    console.log(`Гравець ${player} переміг`);
    const instance = basicLightbox.create(
      `<div class="box"><h1>Гравець ${player} переміг</h1></div>`
    );
    instance.show();
    resetGame();
    return;
  }
  if (!winner && historyX.length + historyO.length === 9) {
    console.log(`Нічія!`);
    resetGame();
    return;
  }

  player = player === "X" ? "O" : "X";
}
console.log(historyX);

function checkWinner(history) {
  return combinations.some((combination) =>
    combination.every((id) => history.includes(id))
  );
}
function resetGame() {
  createMarkup();
  player = "X";
  historyX.splice(0);
  historyO.splice(0);
}
function createMarkup() {
  let markup = ""; // створюємо змінну для накопичення розмітки
  for (let i = 1; i <= 9; i += 1) {
    // запускаємо цикл на 9 ітерацій щоб створити 9 клітинок для гри
    markup += `<div class="item" data-id="${i}"></div>`; // створюємо розмітку однієї клітинки, додаючи їй унікальне id, і накопичуємо її в зміннку markup
  }
  content.innerHTML = markup; // замість того, що було всередині контейнеру
}
