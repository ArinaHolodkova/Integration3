import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// import golobal_c_scale from "./assets/global_understanding/golobal_c_scale,w_200.avif";
// import greece_w_200 from "./assets/greece/greece,w_200.avif";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

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
      duration: 3,
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top top",
        markers: true,
        // scrub: true,
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

const triggerChange = () => {
  console.log("Changing images");
  const images = document.querySelectorAll(".end__combine__image");
  const bigImage = document.querySelector(".big-image");

  images.forEach((img) => {
    img.style.opacity = "0";
    img.style.transform = "scale(0.8)";
  });

  setTimeout(() => {
    images.forEach((img) => img.classList.add("hidden"));
    bigImage.style.opacity = "1";
    bigImage.classList.remove("hidden");
  }, 500);
};

const shakeIt = () => {
  console.log("Script loaded");

  const simulateShakeButton = document.getElementById("simulate-shake");
  if (simulateShakeButton) {
    simulateShakeButton.addEventListener("click", triggerChange);
  } else {
    console.log("Simulate shake button not found");
  }

  let shakeThreshold = 15;

  console.log("DeviceMotionEvent supported");
  let lastX = 0,
    lastY = 0,
    lastZ = 0;

  const shakeEvent = (event) => {
    const { x, y, z } = event.accelerationIncludingGravity || {};

    if (!x || !y || !z) return;

    const deltaX = Math.abs(lastX - x);
    const deltaY = Math.abs(lastY - y);
    const deltaZ = Math.abs(lastZ - z);

    if (deltaX + deltaY + deltaZ > shakeThreshold) {
      console.log("Triggering change");
      triggerChange();
    }

    lastX = x;
    lastY = y;
    lastZ = z;
  };

  window.addEventListener("devicemotion", shakeEvent, false);
};

const canvas = document.querySelector("#puzzleCanvas");
const ctx = canvas.getContext("2d");

const getResponsiveImageSource = () => {
  const srcset = [
    { src: "./src/assets/puzzle/puzzle,w_200.avif", maxWidth: 200 },
    { src: "./src/assets/puzzle/puzzle,w_480.avif", maxWidth: 480 },
    { src: "./src/assets/puzzle/puzzle,w_601.avif", maxWidth: 601 },
    { src: "./src/assets/puzzle/puzzle,w_660.avif", maxWidth: 660 },
  ];

  const srcsetString = srcset
    .map((item) => `${item.src} ${item.maxWidth}w`)
    .join(", ");

  const sizes = "(max-width: 1080px) 100vw, 796px";

  return {
    srcset: srcsetString,
    sizes: sizes,
    alt: "nature",
    src: "./src/assets/puzzle/puzzle.jpg",
  };
};

const imgPuzzle = new Image();
const responsiveImageSource = getResponsiveImageSource();
imgPuzzle.src = responsiveImageSource.src;

canvas.width = 660;
canvas.height = 440;

const cols = 3;
const rows = 2;
const pieceWidth = canvas.width / cols;
const pieceHeight = canvas.height / rows;

let pieces = [];
let draggingPiece = null;
let offsetX, offsetY;

const createPiece = () => {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      pieces.push({
        sx: col * pieceWidth,
        sy: row * pieceHeight,
        x: Math.random() * (canvas.width - pieceWidth),
        y: Math.random() * (canvas.height - pieceHeight),
        width: pieceWidth,
        height: pieceHeight,
        row,
        col,
      });
    }
  }
  console.log("Shuffled pieces initialized:", pieces);
};

const drawPieces = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach((piece) => {
    ctx.drawImage(
      imgPuzzle,
      piece.sx,
      piece.sy,
      piece.width,
      piece.height,
      piece.x,
      piece.y,
      piece.width,
      piece.height
    );
  });
};

const getClickedPiece = (x, y) => {
  console.log(`Mouse coordinates: (${x}, ${y})`);
  console.log("Pieces positions:", pieces);

  const clickedPiece = pieces.find(
    (piece) =>
      x > piece.x &&
      x < piece.x + piece.width &&
      y > piece.y &&
      y < piece.y + piece.height
  );

  console.log("Clicked piece:", clickedPiece);
  return clickedPiece;
};

const mouseEvents = () => {
  canvas.addEventListener("mousedown", (e) => {
    console.log("mousedown");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draggingPiece = getClickedPiece(x, y);

    if (draggingPiece) {
      offsetX = x - draggingPiece.x;
      offsetY = y - draggingPiece.y;
      console.log("Started dragging piece:", draggingPiece);
    }
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!draggingPiece) return;
    console.log("mousemove");

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draggingPiece.x = x - offsetX;
    draggingPiece.y = y - offsetY;

    drawPieces();
  });

  canvas.addEventListener("mouseup", () => {
    if (!draggingPiece) return;
    console.log("mouseup");

    const snapX = Math.round(draggingPiece.x / pieceWidth) * pieceWidth;
    const snapY = Math.round(draggingPiece.y / pieceHeight) * pieceHeight;

    if (
      Math.abs(snapX - draggingPiece.x) < 10 &&
      Math.abs(snapY - draggingPiece.y) < 10
    ) {
      draggingPiece.x = snapX;
      draggingPiece.y = snapY;
    }

    draggingPiece = null;
    drawPieces();
  });

  imgPuzzle.onload = () => {
    console.log("Image loaded");
    createPiece();
    drawPieces();
  };
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
  mouseEvents();
  navigation();
  leafPop();
  shakeIt();
  carouselEffect();
  swipeEffect();
  animatePath("#wavyLineOne", ".bible__problems__one");
  animatePath("#wavyLineTwo", ".bible__problems__two");
};
init();
