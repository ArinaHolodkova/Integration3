document.addEventListener("DOMContentLoaded", function () {
  const navButton = document.querySelector(".nav__button");
  const navList = document.querySelector(".nav__list");
  const iconLink = document.getElementById("iconlink");

  navButton.addEventListener("click", function () {
    const expanded = navButton.getAttribute("aria-expanded") === "true";
    navButton.setAttribute("aria-expanded", !expanded);

    iconLink.setAttribute("xlink:href", expanded ? "#navicon" : "#close");
    navList.style.display = expanded ? "none" : "flex";
  });
});
