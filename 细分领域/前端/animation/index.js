// import animate from "https://cdn.jsdelivr.net/npm/animateplus@2/animateplus.js";
import animate from './animateplus.js';
animate({
  elements: "div",
  duration: 2000,
  delay: index => index * 100,
  transform: ["scale(0)", "scale(1)"]
})
  .then(options => animate({
    ...options,
    transform: ["translate(0%)", "translate(500%)"]
  }));