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

// let startX = 0;
// let endX = 0;

const navigation = () => {
  const $nav = document.querySelector(".nav");
  const $navButton = document.querySelector(".nav__button");
  const $navList = document.querySelector(".nav__list");
  const $iconLink = document.getElementById("iconlink");
  const listItems = $navList.querySelectorAll("li a");


  $navButton.classList.remove("hidden");
  $navList.classList.add("hidden");

  const openNavigation = () => {
    $navButton.setAttribute("aria-expanded", "true");
    $iconLink.setAttribute("xlink:href", "#close");
    $navList.classList.remove("hidden");
    $nav.classList.add("nav--open"); 
    document.body.classList.add("nav-open"); 
  };

  const closeNavigation = () => {
    $navButton.setAttribute("aria-expanded", "false");
    $iconLink.setAttribute("xlink:href", "#navicon");
    $navList.classList.add("hidden");
    $nav.classList.remove("nav--open");
    document.body.classList.remove("nav-open");
  };


  const toggleNavigation = () => {
    const isOpen = $navButton.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeNavigation();
    } else {
      openNavigation();
    }
  };


  listItems[listItems.length - 1].addEventListener("blur", () => {
    closeNavigation();
  });


  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      closeNavigation();
      $navButton.focus();
    }
  });

 
  $navButton.addEventListener("click", toggleNavigation);
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

const swipeEffect = (mm) => {
  mm.add(
    {
      isDesktop: "(min-width: 1024px)",
      isMobile: "(max-width: 1023px)",
    },
    (context) => {
      const { isMobile, isDesktop } = context.conditions;
      
      if (isMobile) {
        let startX, endX, currentSwipe = 0;
        const images = document.querySelectorAll(".intro__img");

        document.addEventListener("touchstart", (event) => {
          startX = event.touches[0].clientX;
        });
        document.addEventListener("touchmove", (event) => {
          endX = event.touches[0].clientX;
        });

        document.addEventListener("touchend", () => {
          if (startX > endX + 90) {
            currentSwipe = (currentSwipe + 1) % images.length;
            console.log("swipe1", currentSwipe);
          } else if (startX < endX - 50) {
            currentSwipe = (currentSwipe - 1 + images.length) % images.length;
            console.log("swipe2");
          }
          updateContent();
        });
        updateContent();
      }

      if (isDesktop) {
        console.log("Desktop draggable effect initialized");
        const images = document.querySelectorAll(".intro__img");

        images.forEach((image) => {
          const canvas = document.createElement("canvas");
          canvas.classList.add("canvas__overlay");

          image.appendChild(canvas);

          const ctx = canvas.getContext("2d");

          const img = image.querySelector('img');
          canvas.width = img.offsetWidth;
          canvas.height = img.offsetHeight;

          ctx.fillStyle = "#5e3023";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          let isScratching = false;

          const scratch = (event) => {
            const rect = canvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const radius = 50;

            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          };

          canvas.addEventListener("mousedown", () => isScratching = true);
          canvas.addEventListener("mousemove", (event) => {
            if (isScratching) scratch(event);
          });
          canvas.addEventListener("mouseup", () => isScratching = false);
          canvas.addEventListener("mouseleave", () => isScratching = false);
        });

        // Draggable.create(".intro__img", {
        //   type: "x",
        //   bounds: document.querySelector(".intro__container__img"),
        //   onDrag: function () {
        //     const draggedIndex = Math.round(-this.x / window.innerWidth);
        //     if (draggedIndex !== currentSwipe) {
        //       currentSwipe = (draggedIndex + images.length) % images.length;
        //       updateContent();
        //     }
        //   },
        //   onDragEnd: function () {
        //     gsap.to(this.target, {
        //       x: -currentSwipe * window.innerWidth,
        //       duration: 0.5,
        //       ease: "power2.out",
        //     });
        //   },
        // });
      }
    } // End of context function
  ); // End of mm.add
}; // End of swipeEffect


const updateContent = () => {
  images.forEach((image, index) => {
    if (index === currentSwipe) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });
console.log("update");
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
const mm = gsap.matchMedia();
  questionSection();
  createDots();
  updateContent();
  generation();
  puzzleMake();
  navigation();
  leafPop();
  carouselEffect();
  swipeEffect(mm);
  animatePath("#wavyLineOne", ".bible__problems__one");
  animatePath("#wavyLineTwo", ".bible__problems__two");
};
init();
