(function () {
  // Если js загружен, скрываем список и показываем кнопку-бургер
  burger.classList.add("active");
  burger.classList.remove("open");
  list.classList.add("element-hidden");

  burger.addEventListener("click", (evt) => {
    evt.preventDefault();
    toggleMenu(evt, list);
  });

  burger.addEventListener("keydown", (evt) => {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      toggleMenu(evt, list);
    }
  });

  let toggleMenu = (evt, element) => {
    evt.preventDefault();
    burger.setAttribute("aria-expanded", closeOrOpenMenu(element));
  }
})();