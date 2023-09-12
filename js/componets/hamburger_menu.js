const hamburgerMenu = document.querySelector(".hamburger_menu");
const menu = document.querySelector(".menu");

hamburgerMenu.addEventListener("click", function () {
  menu.classList.toggle("active");
});
