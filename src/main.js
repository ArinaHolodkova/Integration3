import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger, Draggable);

const textElement = document.querySelector("#dynamicText");
const images = document.querySelectorAll(".intro__img");
let currentSwipe = 0;

const carouselItems = document.querySelectorAll(".carousel__wrapper__item");
const prevButton = document.querySelector(".carousel__prev");
const nextButton = document.querySelector(".carousel__next");
let currentIndex = 0;


const navigation = () => {
  const navButton = document.querySelector(".nav__button");
  const navList = document.querySelector(".nav__list");
  const iconLink = document.getElementById("iconlink");

  navButton.addEventListener("click", function () {
    const expanded = navButton.getAttribute("aria-expanded") === "true";
    navButton.setAttribute("aria-expanded", !expanded);

    iconLink.setAttribute("xlink:href", expanded ? "#navicon" : "#close");
    navList.style.display = expanded ? "none" : "flex";
  });
};


const updateCarousel = () => {
  carouselItems.forEach((item, index) => {
    if (index === currentIndex) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
};
const carouselEffect =()=>{
prevButton.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
});

nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
});
}

const questionSection = () => {
  const questionContainer = document.querySelector(".question__section");
  const carouselSection = document.querySelector(".bible__languages__carousel");
  const bibleTitle = document.querySelector(".bible__languages__comment");
    const answer1 = document.querySelector("#answer__1");
  const answer2 = document.querySelector("#answer__2");
  const answer3 = document.querySelector("#answer__3");
    const answer4 = document.querySelector("#answer__4");
  const answer5 = document.querySelector("#answer__5");
  const questionText = document.querySelector(".question__text");

const revealCarousel = () => {
  questionText.style.transition = "transform 0.5s ease-in-out";

  setTimeout(() => {
    questionContainer.style.opacity = "0";
    setTimeout(() => {
      questionContainer.style.display = "none";

      carouselSection.style.display = "block"; 
      carouselSection.style.opacity = "1"; 
      carouselSection.style.transition = "opacity 0.5s ease-in-out";
    }, 500);
  }, 500);
};
  answer1.addEventListener("click", () => {
    revealCarousel();
    bibleTitle.textContent = " Not even close";
    questionText.style.transform = "translateX(-70%)";
  });
  answer2.addEventListener("click", () => {
    revealCarousel();
    bibleTitle.textContent =" Not even close" ;
    questionText.style.transform = "translateX(-70%)";
  });
  answer3.addEventListener("click", () => {
    revealCarousel();
     bibleTitle.textContent = " Not even close";
    questionText.style.transform = "translateX(-70%)";
  });
    answer4.addEventListener("click", () => {
      revealCarousel();
      bibleTitle.textContent = "Almost there!";
      questionText.style.transform = "translateX(70%)";
    });
  answer5.addEventListener("click", () => {
    revealCarousel();
    bibleTitle.textContent =
      "Were you involved in the creation process? Because this is the correct answer ";
    questionText.style.transform = "translateY(70%)";
  });
};


const swipeEffect = () => {
  let startX = 0;
  let endX = 0;

  
  document.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });

  
  document.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX;
  });


  document.addEventListener("touchend", () => {
    if (startX > endX + 90) {
      currentSwipe = (currentSwipe + 1) % images.length; 
      updateContent();
    } else if (startX < endX - 50) {
      currentSwipe = (currentSwipe - 1 + images.length) % images.length; 
      updateContent();
    }
  });
};

const updateContent = () => {
  images.forEach((image, index) => {
    if (index === currentSwipe) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });

  const texts = ["Global understanding", "Art", "Science"];
  textElement.textContent = texts[currentSwipe];

  updateDots();
};

const updateDots = () => {
  const dots = document.querySelectorAll(".intro__dot");
  dots.forEach((dot, index) => {
    if (index === currentSwipe) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};



const createDots = () => {
  const dotsContainer = document.querySelector(".intro__dots");
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("intro__dot");
    if (index === 0) dot.classList.add("active"); // First dot is active by default
    dot.addEventListener("click", () => {
      currentSwipe = index;
      updateContent();
    });
    dotsContainer.appendChild(dot);
  });
};


const animatePath = (pathSelector, triggerSelector) => {
  const pathElement = document
    .querySelector(pathSelector)
    .querySelector("path");
  const pathLength = pathElement.getTotalLength();

  gsap.set(pathElement, { strokeDasharray: pathLength });

  gsap.fromTo(
    pathElement,
    { strokeDashoffset: pathLength - 5 },
    {
      strokeDashoffset: 0,
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top top",
        markers: true,
        scrub: true,
      },
    }
  );

  gsap.fromTo(
    ".bible__problems__three",
    {
      alpha: 0,
    },
    {
      scrollTrigger: {
        trigger: ".bible__problems__two__line",
        start: "middle 5%",
        ease: "power2.inOut",
        scrub: true,
      },
      alpha: 1,
    }
  );
};



const leafPop = () => {
  document.querySelectorAll(".leaf").forEach((leaf) => {
    leaf.addEventListener("click", () => {
      leaf.classList.add("popped");
      setTimeout(() => {
        leaf.remove();
      }, 500);
    });
  });
};

//   const shakeIt = () => {
//   const images = document.querySelectorAll(".end__combine__image");
//   const bigImage = document.querySelector(".big-image");

//   // Timeline for the entire sequence
//   const timeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".end__combine",
//       start: "top top", // Start pinning as soon as this section reaches the top of the viewport
//       end: "+=100%", // Pinning duration
//       scrub: true,
//       pin: true, // Pins the element during the animation
//     },
//   });

//   // Shake animation
//   timeline.to(
//     images,
//     {
//       x: "random(-10, 10, 2)",
//       y: "random(-10, 10, 2)",
//       duration: 0.2,
//       repeat: 5, // Shake 5 times
//       ease: "power1.inOut",
//       stagger: 0.1,
//     },
//     "shake"
//   );

//   // Move and collapse images
//   timeline.to(
//     images,
//     {
//       x: 0,
//       y: 0,
//       scale: 0.2,
//       opacity: 0,
//       duration: 1,
//       ease: "power2.out",
//     },
//     "combine"
//   );

//   // Reveal big image
//   timeline.to(
//     bigImage,
//     {
//       opacity: 1,
//       clipPath: "circle(100% at 50% 50%)",
//       duration: 1,
//       ease: "power2.inOut",
//     },
//     "combine+=0.5" // Starts slightly after the collapse animation
//   );
// };


const puzzleMake = () => {
  const container = document.querySelector(".puzzle__container");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;


  const pieceWidth = containerWidth / 3; 
  const pieceHeight = containerHeight / 2; 

 
  document.querySelectorAll(".puzzle__piece").forEach((piece, index) => {
    piece.style.width = `${pieceWidth}px`;
    piece.style.height = `${pieceHeight}px`;

    
    const xPos = -(index % 3) * pieceWidth; 
    const yPos = -Math.floor(index / 3) * pieceHeight;
    piece.style.backgroundPosition = `${xPos}px ${yPos}px`;
  });

  
  const correctPositions = [
    { x: 0, y: 0 },
    { x: pieceWidth, y: 0 },
    { x: pieceWidth * 2, y: 0 },
    { x: 0, y: pieceHeight },
    { x: pieceWidth, y: pieceHeight },
    { x: pieceWidth * 2, y: pieceHeight },
  ];

 
  gsap.utils.toArray(".puzzle__piece").forEach((piece, index) => {
    gsap.set(piece, {
      x: Math.random() * (containerWidth - pieceWidth),
      y: Math.random() * (containerHeight - pieceHeight),
    }); 

    Draggable.create(piece, {
      bounds: ".puzzle__container",
      onDragEnd: function () {
        const target = correctPositions[index];
        const tolerance = pieceWidth * 0.1;

        if (
          Math.abs(this.x - target.x) < tolerance &&
          Math.abs(this.y - target.y) < tolerance
        ) {
          gsap.to(this.target, { x: target.x, y: target.y, duration: 0.5 });
          this.disable(); 
        }
      },
    });
  });
};

const generation = () => {
  const pictures = document.querySelectorAll(
    ".botanic__illustrations__generations picture"
  );

  pictures.forEach((picture) => {
    gsap.fromTo(
      picture,
      { scale: 0.7, opacity: 0.5 },

      {
        scale: 1.2,
        opacity: 1,
        scrollTrigger: {
          trigger: picture,
          start: "center 75%",
          end: "center 25%",
          scrub: true,
        },
      }
    );
  });
};

const init = () => {
  questionSection();
  createDots();
  updateContent();
  generation();
  puzzleMake();
  navigation();
  leafPop();
  // shakeIt();
  carouselEffect();
  swipeEffect();
  animatePath("#wavyLineOne", ".bible__problems__one");
  animatePath("#wavyLineTwo", ".bible__problems__two");
  // animatePath("#wavyLineOne", "#years", ".bible__problems__one");
  // animatePath("#wavyLineOne", "#workers", ".bible__problems__one");
  // animatePath("#wavyLineTwo", "#financial", ".bible__problems__two");
};
init();
