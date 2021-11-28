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
  requestAnimationFrame(function step(timestamp) {
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
    });
  });
};

(function () {
  window.util.mainNav.querySelector(".main-nav__list").addEventListener("click", (evt) => {
    evt.preventDefault();
    let link = evt.target.getAttribute("href");
    window.util.closeOrOpenMenu(window.util.mainNav);
    setTimeout(()=>{scrollMenu(link);}, 300);  // 300 = времени анимации скрытия списка меню (прописано в css)
  });
})();

(function () {
  let form = document.querySelector(".form");
  let STATUS = {
    ERROR: "error",
    SUCCESS: "success"
  };

  let isStorageSupport = true;
  let storagePhone = "";
  let storageName = "";

  let userPhone = form.querySelector("[name='phone']");
  let userName = form.querySelector("[name='name']");

  try {
    storagePhone = localStorage.getItem("userPhone");
    storageName = localStorage.getItem("userName");
  } catch (err) {
    isStorageSupport = false;
  }

  let getStorage = () => {
    if (localStorage){
      userPhone.value = storagePhone;
      userName.value = storageName;
    }
  };

  let addError = (field) => {
    field.classList.add(STATUS.ERROR);
  };

  let checkPhone = (input) => {
    return (/^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(input.value));
  };

  let checkValidate = (form) => {
    let phoneNumber = form.querySelector("input[name='phone']");
    let error = 0;
    if (!checkPhone(phoneNumber)) {
      addError(phoneNumber.parentElement);
      error++;
    } else {
      window.util.removeClasses(phoneNumber.parentElement, [STATUS.ERROR]);
    }
    return(error);
  };

  let addStatusClass = (form, className) => {
    form.reset();
    form.classList.add(className);
  };

  let sendFormData = async(evt, form, url) => {
    evt.preventDefault();
    window.util.removeClasses(form, [STATUS.ERROR, STATUS.SUCCESS]);

    let errors = checkValidate(form);
    if (errors === 0) {
      if (isStorageSupport) {
        localStorage.setItem("userPhone", userPhone.value);
        localStorage.setItem("userName", userName.value);
      }
      let response = await fetch(url, {
        method: "POST",
        body: new FormData(form)
      });

      if (response.ok) {
        addStatusClass(form, STATUS.SUCCESS);
      } else {
        addStatusClass(form, STATUS.ERROR);
      }
    }
  };

  getStorage();

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    sendFormData(evt, form, window.util.FORM_ACTION);
  });

  form.addEventListener("input", (evt) => {
    window.util.removeClasses(evt.target.parentElement, [STATUS.ERROR]);
    window.util.removeClasses(form, [STATUS.ERROR, STATUS.SUCCESS]);
  });
})();
