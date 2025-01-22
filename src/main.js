import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const imageElement = document.getElementById("dynamicImage");
const textElement = document.getElementById("dynamicText");
let startX = 0;
let endX = 0;
let currentSwipe = 0;
  // const firstShoe = document.querySelector(".first-shoe");
  // const secondShoe = document.querySelector(".second-shoe");
  // let isStepping = false;
  // let startY = 0;


const images = [
  {
    srcset: `
      ./src/assets/global_understanding/golobal_c_scale,w_200.avif 200w,
      ./src/assets/global_understanding/golobal_c_scale,w_534.avif 534w,
      ./src/assets/global_understanding/golobal_c_scale,w_796.avif 796w,
      ./src/assets/global_understanding/golobal_c_scale,w_1047.avif 1047w,
      ./src/assets/global_understanding/golobal_c_scale,w_1080.avif 1080w
    `,
    sizes: "(max-width: 1080px) 100vw, 796px",
    src: "./src/assets/global_understanding/golobal_c_scale,w_796.avif",
    text: "Global understanding",
  },
  {
    srcset: `
      ./src/assets/science/science,w_200.avif 200w,
      ./src/assets/science/science,w_515.avif 515w,
      ./src/assets/science/science,w_824.avif 824w,
      ./src/assets/science/science,w_1080.avif 1080w
    `,
    sizes: "(max-width: 1080px) 100vw, 515px",
    src: "./src/assets/science/science,w_515.avif",
    text: "Science",
  },
  {
    srcset: `
      ./src/assets/art/art,w_200.avif 200w,
      ./src/assets/art/art,w_514.avif 514w,
      ./src/assets/art/art,w_739.avif 739w,
      ./src/assets/art/art,w_1018.avif 1018w,
      ./src/assets/art/art,w_1080.avif 1080w
    `,
    sizes: "(max-width: 1080px) 100vw, 739px",
    src: "./src/assets/art/art,w_739.avif",
    text: "Art",
  },
];

const navigation= ()=> {
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

const carouselEffect = () => {
  const carouselimages = [
    {
      srcset: `
./src/assets/greece/greece,w_200.avif 200w,
./src/assets/greece/greece,w_266.avif 266w,
./src/assets/greece/greece,w_324.avif 324w,
./src/assets/greece/greece,w_374.avif 374w,
./src/assets/greece/greece,w_425.avif 425w,
./src/assets/greece/greece,w_476.avif 476w,
./src/assets/greece/greece,w_524.avif 524w,
./src/assets/greece/greece,w_573.avif 573w,
./src/assets/greece/greece,w_617.avif 617w,
./src/assets/greece/greece,w_662.avif 662w,
./src/assets/greece/greece,w_706.avif 706w,
./src/assets/greece/greece,w_750.avif 750w,
./src/assets/greece/greece,w_1080.avif 1080w
    `,
      sizes: "(max-width: 1080px) 100vw, 1080px",
      src: "./src/assets/greece/greece,w_1080.avif",
      alt: "Greek language",
    },
    {
      srcset: `
./src/assets/hebrew/hebrew,w_200.avif 200w,
./src/assets/hebrew/hebrew,w_270.avif 270w,
./src/assets/hebrew/hebrew,w_332.avif 332w,
./src/assets/hebrew/hebrew,w_384.avif 384w,
./src/assets/hebrew/hebrew,w_440.avif 440w,
./src/assets/hebrew/hebrew,w_493.avif 493w,
./src/assets/hebrew/hebrew,w_541.avif 541w,
./src/assets/hebrew/hebrew,w_588.avif 588w,
./src/assets/hebrew/hebrew,w_632.avif 632w,
./src/assets/hebrew/hebrew,w_674.avif 674w,
./src/assets/hebrew/hebrew,w_717.avif 717w,
./src/assets/hebrew/hebrew,w_754.avif 754w,
./src/assets/hebrew/hebrew,w_1080.avif 1080w
    `,
      sizes: "(max-width: 1080px) 100vw, 1080px",
      src: "./src/assets/hebrew/hebrew,w_1080.avif",
      alt: "Hebrew language",
    },
    {
      srcset: `
./src/assets/latin/latin,w_200.avif 200w,
./src/assets/latin/latin,w_257.avif 257w,
./src/assets/latin/latin,w_307.avif 307w,
./src/assets/latin/latin,w_348.avif 348w,
./src/assets/latin/latin,w_393.avif 393w,
./src/assets/latin/latin,w_433.avif 433w,
./src/assets/latin/latin,w_471.avif 471w,
./src/assets/latin/latin,w_510.avif 510w,
./src/assets/latin/latin,w_546.avif 546w,
./src/assets/latin/latin,w_583.avif 583w,
./src/assets/latin/latin,w_620.avif 620w,
./src/assets/latin/latin,w_656.avif 656w,
./src/assets/latin/latin,w_691.avif 691w,
./src/assets/latin/latin,w_725.avif 725w,
./src/assets/latin/latin,w_759.avif 759w,
./src/assets/latin/latin,w_795.avif 795w,
./src/assets/latin/latin,w_829.avif 829w,
./src/assets/latin/latin,w_1080.avif 1080w
    `,
      sizes: "(max-width: 1080px) 100vw, 1080px",
      src: "./src/assets/latin/latin,w_1080.avif",
      alt: "Latin language",
    },
  ];

  let currentIndex = 0;

  const imageContainer = document.querySelector(".carousel__wrapper");
  const prevButton = document.querySelector(".carousel__prev");
  const nextButton = document.querySelector(".carousel__next");

  const updateImage = () => {
    const { sizes, srcset, src, alt } = carouselimages[currentIndex];
    imageContainer.innerHTML = `
      <img sizes="${sizes}" srcset="${srcset}" src="${src}" alt="${alt}" class="carousel__image">
    `;
  };

  const changeImage = (direction) => {
    currentIndex = (currentIndex + direction + images.length) % carouselimages.length;
    updateImage();
  };

  prevButton.addEventListener("click", () => changeImage(-1));
  nextButton.addEventListener("click", () => changeImage(+1));


  updateImage();
};


const swipeEffect = () => {
  document.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX;
  });

  document.addEventListener("touchmove", (event) => {
    endX = event.touches[0].clientX;
  });

  document.addEventListener("touchend", () => {
    if (startX > endX + 50) {
      // Swipe Left
      currentSwipe = (currentSwipe + 1) % images.length;
      updateContent();
    } else if (startX < endX - 50) {
      // Swipe Right
      currentSwipe = (currentSwipe - 1 + images.length) % images.length;
      updateContent();
    }
  });
};

const updateContent = () => {
  const currentImage = images[currentSwipe];
  imageElement.srcset = currentImage.srcset;
  imageElement.sizes = currentImage.sizes;
  imageElement.src = currentImage.src;
  textElement.textContent = currentImage.text;
};



const animatePath = (pathSelector, triggerSelector) => {
  const pathElement = document.querySelector(pathSelector)
    .querySelector("path");
  const pathLength = pathElement.getTotalLength();

  gsap.set(pathElement, { strokeDasharray: pathLength });

  gsap.fromTo(
    pathElement,
    { strokeDashoffset: pathLength-5 },
    {
      strokeDashoffset: 0,
      duration: 4,
      scrollTrigger: {
        trigger: triggerSelector,
        start: "top top",
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

const leafPop =()=>{
  document.querySelectorAll(".leaf").forEach((leaf) => {
    leaf.addEventListener("click", () => {
      leaf.classList.add("popped");
      setTimeout(() => {
        leaf.remove();
      }, 500);
    });
  });
};

//   const step = () => {
  
//   window.addEventListener("touchstart", (e) => {
//     startY = e.touches[0].clientY;
//   });

//   window.addEventListener("touchmove", (e) => {
//     const endY = e.touches[0].clientY;
//     if (startY - endY > 50 && !isStepping) {
//       isStepping = true;
//       stepEffect();
//     }
//   });
// };

  // const stepEffect=()=> {
  //   firstShoe.style.opacity = "1";
  //   firstShoe.style.transform = "translateY(-80px)";

  //   setTimeout(() => {
  //     firstShoe.style.opacity = "0";
  //     firstShoe.style.transform = "translateY(0)";
  //     secondShoe.style.opacity = "1";
  //     secondShoe.style.transform = "translateY(-80px)";
  //   }, 300);

  //   setTimeout(() => {
  //     secondShoe.style.opacity = "0";
  //     secondShoe.style.transform = "translateY(0)";
  //     isStepping = false;
  //   }, 600);
  // }

  const triggerChange=() =>{
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
    
  }

  const shakeIt =() => {
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

const getResponsiveImageSource=() =>{
  const sources = [
    { src: "./src/assets/puzzle/puzzle,w_200.avif", maxWidth: 200 },
    { src: "./src/assets/puzzle/puzzle,w_480.avif", maxWidth: 480 },
    { src: "./src/assets/puzzle/puzzle,w_601.avif", maxWidth: 601 },
    { src: "./src/assets/puzzle/puzzle,w_660.avif", maxWidth: 660 },
  ];
  const viewportWidth = window.innerWidth;
  let selectedSource = sources[sources.length - 1].src; 
  for (const source of sources) {
    if (viewportWidth <= source.maxWidth) {
      selectedSource = source.src;
      break;
    }
  }
  return selectedSource;
}

const imgPuzzle = new Image();
imgPuzzle.src = getResponsiveImageSource(); 


canvas.width = 660;
canvas.height = 440;

const cols = 3;
const rows = 2;
const pieceWidth = canvas.width / cols;
const pieceHeight = canvas.height / rows;

let pieces = [];
let draggingPiece = null;
let offsetX, offsetY;

console.log(canvas); 
const createPiece=() =>{
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
    console.log(pieces);
}


const drawPieces=()=> {
  
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

    // ctx.strokeRect(piece.x, piece.y, piece.width, piece.height); 
  });
}


const getClickedPiece = (x, y) => {
  const clickedPiece = pieces.find(
    (piece) =>
      x > piece.x &&
      x < piece.x + piece.width &&
      y > piece.y &&
      y < piece.y + piece.height
  );
  console.log("Clicked piece:", clickedPiece); // Log what is returned
  return clickedPiece;
};

const mouseEvents =()=>{
canvas.addEventListener("mousedown", (e) => {
  console.log("Mouse event detected");
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  draggingPiece = getClickedPiece(x, y);
   console.log("Dragging piece:", draggingPiece);

  if (draggingPiece) {
    offsetX = x - draggingPiece.x;
    offsetY = y - draggingPiece.y;
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!draggingPiece) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  draggingPiece.x = x - offsetX;
  draggingPiece.y = y - offsetY;

  drawPieces();
});

canvas.addEventListener("mouseup", () => {
   const snapX = Math.round(draggingPiece.x / pieceWidth) * pieceWidth;
    const snapY = Math.round(draggingPiece.y / pieceHeight) * pieceHeight;

    if (
      Math.abs(snapX - draggingPiece.x) < 10 &&
      Math.abs(snapY - draggingPiece.y) < 10
    ) {
      draggingPiece.x = snapX;
      draggingPiece.y = snapY;
    }
    console.log("Mouse up event triggered");
    drawPieces();
  });

imgPuzzle.onload = () => {
  createPiece();
  drawPieces();
};

}




const init = () => {
  console.log(draggingPiece);
  console.log(mouseEvents);
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
