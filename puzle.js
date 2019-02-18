"use strict";

let imgSrc;
let numOfXPieces;
let numOfYPieces;
let image;
let naturalHeight;
let naturalWidth;

// Load content

document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");

  document.querySelector("#btn").addEventListener("click", loadTheInput);
}

function loadTheInput() {
  imgSrc = document.querySelector("#img_link").value;
  numOfXPieces = document.querySelector("#pieces_x").value;
  numOfYPieces = document.querySelector("#pieces_x").value;

  // Load content
  image = document.querySelector("img");
  image.src = imgSrc;

  // Height of image
  naturalHeight = image.naturalHeight;
  naturalWidth = image.naturalWidth;

  document.querySelector("img").onload = twoDimensionalLoop;

  console.log(numOfXPieces);
  console.log(numOfYPieces);
  console.log(naturalHeight);
  console.log(naturalWidth);
}

// Two dimensional loop

function twoDimensionalLoop() {
  document.querySelector(
    "#container"
  ).style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  document.querySelector("#container").style.width = `${naturalWidth}px`;
  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let piece = document.createElement("div");
      piece.style.height = naturalHeight / numOfYPieces + "px";
      //piece.textContent = `${x}${y}`;
      piece.classList.add("piece");
      piece.classList.add("dropzone");
      document.querySelector("#container").appendChild(piece);

      // Uniqe ID
      piece.dataset.xyid = `id${x}${y}`;
    }
  }

  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let piece = document.createElement("div");
      piece.style.height = naturalHeight / numOfYPieces + "px";
      piece.style.width = naturalWidth / numOfXPieces + "px";
      //piece.textContent = `${x}${y}`;
      piece.classList.add("piece");
      piece.classList.add("move");

      piece.setAttribute("id", "draggable");
      piece.setAttribute("draggable", "true");

      document.querySelector("#container").appendChild(piece);

      // Uniqe ID
      piece.dataset.xyid = `id${x}${y}`;

      piece.style.backgroundImage = `url('${imgSrc}')`;
      piece.style.left = `${Math.random() * 100 + 500}px`;
      piece.style.top = `${Math.random() * 100 + 100}px`;
      piece.style.backgroundPosition = `${y *
        (naturalWidth / numOfYPieces)}px ${x *
        (naturalHeight / numOfXPieces)}px`;
    }
  }
}

let dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {});

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = 0.5;
});

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
});

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
});

//        document.addEventListener("dragenter", function(event) {
//            // highlight potential drop target when the draggable element enters it
//            if (event.target.className == "dropzone") {
//                event.target.style.background = "purple";
//            }
//
//        });

//        document.addEventListener("dragleave", function(event) {
//            // reset background of potential drop target when the draggable element leaves it
//            if (event.target.className == "dropzone") {
//                event.target.style.background = "";
//            }
//
//        });

document.addEventListener("drop", function(event) {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  console.log("DROP", event.target.className);
  // move dragged elem to the selected drop target
  if (event.target.className == "dropzone") {
    event.target.style.background = "";
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
    dragged.style.left = event.target.style.left;
    dragged.style.top = event.target.style.top;
  } else if (event.target.className == "theBody") {
    // park the dragged elem somewhere on the body
    dragged.style.left = event.pageX + "px";
    dragged.style.top = event.pageY + "px";
  }
});
