let scrollMenu = (blockId) => {
  let temp;

  // Отмена анимации
  cancelAnimationFrame(temp);

  // Время начала анимации
  let start = performance.now();

  // Высота скролла страницы
  let from = window.pageYOffset || document.documentElement.scrollTop;
  // Высота от верхнего края окна браузера до блока
  let to = document.querySelector(blockId).getBoundingClientRect().top;

  // Время анимации
  let duration = .4 * Math.abs(to);

  // Анимация скролла
  requestAnimationFrame(step = (timestamp) => {
    // timestamp метка времени от начала анимации
    // Сколько прошло времени (timestamp - start)
    // (timestamp - start) / duration приравниваем к 1
    var progress = (timestamp - start) / duration;
    1 <= progress && (progress = 1);
    // from + to расстояние от верха документа до верха блока
    // from + to * progress промежуточное расстояние до блока. progress = 1 мы на месте
    // Изменение высоты скролла
    window.scrollTo(0, from + to * progress | 0);

    // Остановка анимации
    // 1 > progress анимация продолжается
    if (1 > progress) {
      temp = requestAnimationFrame(step);
    }

    // Отменяем прокрутку если крутим колесом мышки
    document.addEventListener("wheel", function () {
      cancelAnimationFrame(temp);
    })
  })
}

list.addEventListener('click', (evt) => {
  evt.preventDefault();
  let link = evt.target.getAttribute("href")
  closeOrOpenMenu(list);
  setTimeout(()=>{scrollMenu(link)}, 300);  // 300 = времени анимации скрытия списка меню (прописано в css)
});
