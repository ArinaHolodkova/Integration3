
gsap.registerPlugin(ScrollTrigger); 
gsap.registerPlugin(MotionPathPlugin); 



let currentIndex = 0;

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




const changeImage = (direction) => {
  const images = document.querySelectorAll(".carousel__image");
  const totalImages = images.length;

  currentIndex = (currentIndex + direction + totalImages) % totalImages;

  const carousel = document.querySelector(".carousel");
  const offset = -currentIndex * 100;
  carousel.style.transform = `translateX(${offset}%)`;
};

let wavyOne = document.querySelector("#wavyLineOne");
let wavyTwo = document.querySelector("#wavyLineTwo");
let pathOne = wavyOne.querySelector ("path");
let pathTwo = wavyTwo.querySelector("path");

const pathOneLength =pathOne.getTotalLength()
const pathTwoLength = pathTwo.getTotalLength();
 console.log(pathOneLength);

gsap.set(pathOne, { setDasharray: pathOneLength });
gsap.set(pathTwo, {strokeDasharray: pathTwoLength,});

gsap.fromTo(
  pathOne,
  {
    strokeDashoffset: pathOneLength,
  },
  {
    strokeDashoffset: 0,
    duratioon:10,
    ScrollTrigger: {
      trigger: ".bible__problems__one__line",
      start:"top top",
      end: "bottom bottom",
    },
  }
);


 const init = () => {
  changeImage(); 
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
};

init();