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