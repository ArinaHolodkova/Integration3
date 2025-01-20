
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

let currentIndex = 0;

// Navigation toggle logic
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

const animatePath = (pathSelector, triggerSelector) => {
  const pathElement = document.querySelector(pathSelector).querySelector("path");
  const pathLength = pathElement.getTotalLength();

  gsap.set(pathElement, { strokeDasharray: pathLength });


  gsap.fromTo(
    pathElement,
    { strokeDashoffset: pathLength },
    {
      strokeDashoffset: 0,
      duration: 4,
      scrollTrigger: {
        trigger: triggerSelector,
        start: "5%",
        scrub: true,
      },
    }
  );

gsap.from(".bible__problems__three", {
  duration: 3,
  color: "#f3e9dc",
  scrollTrigger: {
    trigger: ".bible__problems__two__line",
    start: "top 5%",
    ease: "power2.inOut",
    scrub: true,
  },
});
};





const init = () => {
  changeImage();
  animatePath("#wavyLineOne", ".bible__problems__one");
  animatePath("#wavyLineTwo", ".bible__problems__two");
};
init();
