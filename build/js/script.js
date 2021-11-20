let body = document.querySelector("body");
let burger = document.querySelector("#burger");
let list = document.querySelector(".main-nav__list");

let removeClasses = (tag, classNames) => {
  classNames.map(className => {
    if (tag.classList.contains(className)) {
      tag.classList.remove(className);
    }
  })
}

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var FORM_ACTION = "https://echo.htmlacademy.ru/";

  window.util = {
    ESC_KEYCODE: ESC_KEYCODE,
    ENTER_KEYCODE: ENTER_KEYCODE,
    FORM_ACTION: FORM_ACTION
  };
})();

let closeOrOpenMenu = (element) => {
  let attributeValue;
  if ((burger.classList.contains("active")) && (burger.classList.contains("open"))) {
    body.classList.remove("menu-open");
    burger.classList.remove("open");
    attributeValue = "false";
    element.classList.add("element-hidden");
  } else {
    body.classList.add("menu-open");
    burger.classList.add("open");
    attributeValue = "true";
    element.classList.remove("element-hidden");
  }
  return(attributeValue);
}

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

list.addEventListener("click", (evt) => {
  evt.preventDefault();
  let link = evt.target.getAttribute("href")
  closeOrOpenMenu(list);
  setTimeout(()=>{scrollMenu(link)}, 300);  // 300 = времени анимации скрытия списка меню (прописано в css)
});

(function () {
  let form = document.querySelector(".form");
  let STATUS = {
    ERROR: "error",
    SUCCESS: "success"
  }

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
  }

  let checkPhone = (input) => {
    return (/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value));
  }

  let checkValidate = (form) => {
    let phoneNumber = form.querySelector("input[name='phone']")
    let error = 0;
    if (!checkPhone(phoneNumber)) {
      addError(phoneNumber.parentElement);
      error++;
    } else {
      removeClasses(phoneNumber.parentElement, [STATUS.ERROR]);
    }
    return(error);
  }

  let addStatusClass = (form, className) => {
    form.reset();
    form.classList.add(className);
  }

  let sendFormData = async (evt, form, url) => {
    evt.preventDefault();
    removeClasses(form, [STATUS.ERROR, STATUS.SUCCESS]);

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
  }

  getStorage();

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    sendFormData(evt, form, window.util.FORM_ACTION);
  });

  form.addEventListener("input", (evt) => {
    removeClasses(evt.target.parentElement, [STATUS.ERROR]);
    removeClasses(form, [STATUS.ERROR, STATUS.SUCCESS]);
  });
})();
