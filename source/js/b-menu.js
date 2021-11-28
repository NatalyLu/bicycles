(function () {

  // Если js загружен, скрываем список и показываем кнопку-бургер
  const mainNav = window.util.mainNav;
  mainNav.classList.add("active");
  window.util.burger.classList.remove("open");

  window.util.burger.addEventListener("click", (evt) => {
    evt.preventDefault();
    toggleMenu(evt, mainNav);
  });

  window.util.burger.addEventListener("keydown", (evt) => {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      toggleMenu(evt, mainNav);
    }
  });

  let toggleMenu = (evt, element) => {
    evt.preventDefault();
    window.util.burger.setAttribute("aria-expanded", window.util.closeOrOpenMenu(element));
  };
})();
