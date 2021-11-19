let removeClasses = (tag, classNames) => {
  classNames.map(className => {
    if (tag.classList.contains(className)) {
      tag.classList.remove(className);
    }
  })
}