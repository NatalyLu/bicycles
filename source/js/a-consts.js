(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var FORM_ACTION = "https://echo.htmlacademy.ru/";

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    FORM_ACTION: FORM_ACTION,

    body: document.querySelector("body"),
    burger: document.querySelector("#burger"),
    mainNav: document.querySelector(".main-nav"),

    // Функция удаления класса у элемента (если этот класс у него есть)
    removeClasses: (tag, classNames) => {
      classNames.map(className => {
        if (tag.classList.contains(className)) {
          tag.classList.remove(className);
        }
      });
    },

    // Функция открытия и закрытия списка меню
    closeOrOpenMenu: (element) => {
      let attributeValue;
      if ((element.classList.contains("active")) && (window.util.burger.classList.contains("open"))) {
        window.util.body.classList.remove("menu-open");
        window.util.burger.classList.remove("open");
        attributeValue = "false";
        element.classList.remove("menu-is-open");
      } else {
        window.util.body.classList.add("menu-open");
        window.util.burger.classList.add("open");
        attributeValue = "true";
        element.classList.add("menu-is-open");
      }
      return(attributeValue);
    },
  };
})();
