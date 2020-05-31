// import animate from "https://cdn.jsdelivr.net/npm/animateplus@2/animateplus.js";
import animate from './animateplus.js';
animate({
  elements: "div",
  duration: 2000,
  optimize: true,
  delay: index => index * 1000,
  transform: ["scale(0)", "scale(1)"]
  // transform: ["translate(0%)", "translate(500%)"]
})