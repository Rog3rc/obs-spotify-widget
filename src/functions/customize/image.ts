export const showHide = (hide: boolean) => {
  const input = document.getElementById("imgC");
  if (input) {
    if (hide) {
      input.classList.add("d-none");
    } else {
      input.classList.remove("d-none");
    }
  }
};
