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

const carouselEffect = () => {
  const mm = gsap.matchMedia();
  mm.add(
    {
      isDesktop: "(min-width: 45em)",
      isMobile: "(max-width: 1023px)",
    },
    (context) => {
      const { isMobile, isDesktop } = context.conditions;

      if (isMobile) {
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

      if (isDesktop) {
        carouselItems.forEach((item) => {
          item.classList.add("active");
          item.addEventListener("mouseover", () => {
            item.style.transform = "scale(1.5)";
            item.style.transition = "transform 0.3s ease";
          });

          item.addEventListener("mouseout", () => {
            item.style.transform = "scale(1)";
            item.style.boxShadow = "none";
          });
        });
      }
    }
  );
};

const questionSection = () => {
  const questionContainer = document.querySelector(".question__section");
  const carouselSection = document.querySelector(".bible__languages__carousel");
  const bibleTitle = document.querySelector(".bible__languages__comment");
  const answers = document.querySelectorAll(".answer__option");
  const questionText = document.querySelector(".question__text");

  const revealCarousel = (answer, message, transformDirection) => {
    questionText.style.transition = "transform 0.5s ease-in-out";
    questionText.style.transform = `translate(${transformDirection}, 0)`;

    setTimeout(() => {
      questionContainer.style.opacity = "0";

      setTimeout(() => {
        questionContainer.style.display = "none";

        carouselSection.style.display = "flex";
        carouselSection.style.opacity = "1";
        carouselSection.style.transition = "opacity 0.5s ease-in-out";

        bibleTitle.textContent = message;
      }, 500);
    }, 500);
  };

  answers.forEach((answer, index) => {
    answer.addEventListener("click", () => {
      let message;
      let direction;

      switch (index + 1) {
        case 4:
          message = "Almost there!";
          direction = "70%";
          break;
        case 5:
          message =
            "Were you involved in the creation process? Because this is the correct answer!";
          direction = "70%";
          break;
        default:
          message = "Not even close";
          direction = "-70%";
      }

      revealCarousel(answer, message, direction);
    });
  });
};


const swipeEffect = (mm) => {
  mm.add(
    {
      isDesktop: "(min-width: 45em)",
      isMobile: "(max-width: 1023px)",
    },
    (context) => {
      const { isMobile, isDesktop } = context.conditions;

      const wrappers = document.querySelectorAll(".canvas-wrapper");

      if (isMobile) {
        let startX, endX;
 wrappers.forEach((wrapper) => {
   wrapper.style.display = "none";
 });
        document.addEventListener("touchstart", (event) => {
          startX = event.touches[0].clientX;
        });

        document.addEventListener("touchmove", (event) => {
          endX = event.touches[0].clientX;
        });

        document.addEventListener("touchend", () => {
          if (startX > endX + 90) {
            currentSwipe = (currentSwipe + 1) % images.length;
          } else if (startX < endX - 90) {
            currentSwipe = (currentSwipe - 1 + images.length) % images.length;
          }
          updateContent(currentSwipe, images);
        });

        updateContent(currentSwipe, images);
      }

      
if (isDesktop) {
  const wrappers = document.querySelectorAll(".canvas-wrapper");
  const images = document.querySelectorAll(".intro__img");

  wrappers.forEach((wrapper, index) => {
    const canvas = document.createElement("canvas");
    canvas.classList.add("canvas__overlay");
    wrapper.appendChild(canvas);

    const ctx = canvas.getContext("2d");

    const img = images[index].querySelector("img");
    const imgRect = img.getBoundingClientRect();
    const containerRect = wrapper.parentElement.getBoundingClientRect(); 

 
    canvas.width = imgRect.width;
    canvas.height = imgRect.height;

    wrapper.style.position = "absolute";
    wrapper.style.top = `${imgRect.top - containerRect.top}px`;
    wrapper.style.left = `${imgRect.left - containerRect.left}px`;
    wrapper.style.width = `${imgRect.width}px`;
    wrapper.style.height = `${imgRect.height}px`;

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

 
    canvas.addEventListener("mousedown", () => (isScratching = true));
    canvas.addEventListener("mousemove", (event) => {
      if (isScratching) scratch(event);
    });
    canvas.addEventListener("mouseup", () => (isScratching = false));
    canvas.addEventListener("mouseleave", () => (isScratching = false));
  });
}


    }
  );
    }

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
    if (index === 0) dot.classList.add("active"); 
    dot.addEventListener("click", () => {
      currentSwipe = index;
      updateContent();
    });
    dotsContainer.appendChild(dot);
  });
};

const animatePath = (pathSelector, triggerSelector) => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 45em)",
      isMobile: "(max-width: 45em)",
    },
    (context) => {
      const { isDesktop, isMobile } = context.conditions;
      const pathElement = document
        .querySelector(pathSelector)
        ?.querySelector("path");

      if (!pathElement) return;

      const pathLength = pathElement.getTotalLength();

      if (isMobile) {
        document.querySelector("#bigline").classList.add("hidden");
        document.querySelector("#wavyLineOne").classList.remove("hidden");
        document.querySelector("#wavyLineTwo").classList.remove("hidden");

        gsap.set(pathElement, { strokeDasharray: pathLength });

        gsap.fromTo(
          pathElement,
          { strokeDashoffset: pathLength },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: triggerSelector,
              start: "top 5%",
              scrub: true,
            },
          }
        );
     gsap.to(".bible__problems__three", {
       opacity: 1,
       scrollTrigger: {
         trigger: triggerSelector,
         start: "middle 50%",
         ease: "power2.inOut",
         scrub: true,
       },
     });
      }

      if (isDesktop) {
        document.querySelector("#wavyLineOne").classList.add("hidden"); 
        document.querySelector("#wavyLineTwo").classList.add("hidden");
        document.querySelector("#bigline").classList.remove("hidden"); 

        gsap.set(pathElement, { strokeDasharray: pathLength });

        gsap.fromTo(
          pathElement,
          { strokeDashoffset: pathLength },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: triggerSelector,
              start: "top top",
              scrub: true,
            },
          }
        );
        gsap.to(".bible__problems__three", {
          opacity: 1,
          scrollTrigger: {
            trigger: ".bible__problems__two",
            start: "bottom top",
            ease: "power2.inOut",
            scrub: true,
            markers: true,
          },
        });
      }
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

  const correctPositions = [
    { x: 0, y: 0 },
    { x: pieceWidth, y: 0 },
    { x: pieceWidth * 2, y: 0 },
    { x: 0, y: pieceHeight },
    { x: pieceWidth, y: pieceHeight },
    { x: pieceWidth * 2, y: pieceHeight },
  ];

  document.querySelectorAll(".puzzle__piece").forEach((piece, index) => {
    piece.style.width = `${pieceWidth}px`;
    piece.style.height = `${pieceHeight}px`;

    const xPos = -(index % 3) * pieceWidth;
    const yPos = -Math.floor(index / 3) * pieceHeight;
    piece.style.backgroundPosition = `${xPos}px ${yPos}px`;

    console.log(`Piece ${index + 1} background position: x=${xPos}, y=${yPos}`);
  });

  gsap.utils.toArray(".puzzle__piece").forEach((piece, index) => {
    const randomX = Math.random() * (containerWidth - pieceWidth);
    const randomY = Math.random() * (containerHeight - pieceHeight);
    gsap.set(piece, { x: randomX, y: randomY });

    Draggable.create(piece, {
      bounds: ".puzzle__container",
      onPress: function () {
        this.target.style.zIndex = "3";
      },
      onRelease: function () {
        this.target.style.zIndex = "";
      },
      onDragEnd: function () {
        const target = correctPositions[index];
        const tolerance = 50;

        const pieceBox = this.target.getBoundingClientRect();
        const containerBox = container.getBoundingClientRect();

        const currentX = pieceBox.left - containerBox.left;
        const currentY = pieceBox.top - containerBox.top;

        if (
          Math.abs(currentX - target.x) <= tolerance &&
          Math.abs(currentY - target.y) <= tolerance
        ) {
          gsap.to(this.target, {
            x: target.x,
            y: target.y,
            duration: 0.2,
          });
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
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 45em)",
      isMobile: "(max-width: 45em)",
    },
    (context) => {
      const { isDesktop, isMobile } = context.conditions;

      if (isMobile) {
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
      }

      if (isDesktop) {
        gsap.to(".botanic__illustrations__generations", {
          scrollTrigger: {
            trigger: ".botanic__illustrations__generations",
            start: "top 20%",
            scrub: true,
            pin: true,
          },
        });

        const pictureClasses = [
          ".generations__first",
          ".generations__second",
          ".generations__third",
          ".generations__fourth",
        ];

        pictureClasses.forEach((pictureClass, index) => {
          gsap.fromTo(
            pictureClass,
            { scale: 0.5, opacity: 0.5 },
            {
              scale: 1.2,
              opacity: 1,
              scrollTrigger: {
                trigger: pictureClass,
                start: `top+=${index * 50} center`,
                end: `top+=${(index + 1) * 50} center`,
                scrub: true,
              },
            }
          );
        });
      }
    }
  );
};

const heroDrag = () => {
  const draggableImage = document.querySelector(".hero__draggable");
  const printingImage = document.querySelector(".hero__printing");

  const calculateBounds = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let maxY;
    if (screenWidth >= 1200) {
      maxY = screenHeight * 0.3; 
    } else if (screenWidth >= 720) {
      maxY = screenHeight * 0.15; 
    } else {
      maxY = screenHeight * 0.1; 
    }

    return {
      minY: 0,
      maxY: maxY,
    };
  };

  const bounds = calculateBounds();

  Draggable.create(draggableImage, {
    type: "y",
    bounds: bounds,
    zIndexBoost: false,
    onPress() {
      printingImage.style.pointerEvents = "none";
    },
    onRelease() {
      printingImage.style.pointerEvents = "auto";
    },
  });

  window.addEventListener("resize", () => {
    const newBounds = calculateBounds();
    Draggable.get(draggableImage).applyBounds(newBounds);
  });
};



const init = () => {
  const mm = gsap.matchMedia();
  heroDrag();
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
  animatePath("#bigline", ".bible__problems__one");
};
init();
