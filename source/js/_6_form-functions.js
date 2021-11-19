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