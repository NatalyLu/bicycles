(function () {
  let burger = document.querySelector("#burger");
  let list = document.querySelector(".main-nav__list");

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
    let attributeValue;

    burger.classList.toggle("open");
    element.classList.toggle("element-hidden");
    if (burger.classList.contains("open")) {
      attributeValue = "true";
    } else {
      attributeValue = "false";
    }
    burger.setAttribute("aria-expanded", attributeValue);
  }
})();