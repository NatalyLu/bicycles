(function () {

  // Если js загружен, скрываем список и показываем кнопку-бургер, добавляем списку класс "active" для абсолютного позиционирования
  window.util.burger.classList.add("active");
  window.util.burger.classList.remove("open");
  window.util.list.classList.add("element-hidden");
  window.util.list.classList.add("active");

  window.util.burger.addEventListener("click", (evt) => {
    evt.preventDefault();
    toggleMenu(evt, window.util.list);
  });

  window.util.burger.addEventListener("keydown", (evt) => {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      toggleMenu(evt, window.util.list);
    }
  });

  let toggleMenu = (evt, element) => {
    evt.preventDefault();
    window.util.burger.setAttribute("aria-expanded", window.util.closeOrOpenMenu(element));
  };
})();
