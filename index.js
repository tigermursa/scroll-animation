$(function () {
  // init
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: "onLeave",
      duration: "100%",
    },
  });

  // get all slides
  var slides = document.querySelectorAll("section.panel");

  // creating scene for every slide
  for (var i = 0; i < slides.length; i++) {
    new ScrollMagic.Scene({
      triggerElement: slides[i],
    })
      .setPin(slides[i], { pushFollowers: false })
      .addIndicators() // add indicators (requires plugin)
      .addTo(controller);
  }
});

// Add this to your existing index.js

const sections = document.querySelectorAll(".panel");
const dots = document.querySelectorAll(".dot");

function setActiveDot(index) {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

function updateActiveSection() {
  const sectionHeight = window.innerHeight;
  const currentScroll = window.scrollY;

  let activeSectionIndex = 0;
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= sectionHeight) {
      activeSectionIndex = index;
    }
  });

  setActiveDot(activeSectionIndex);
}

document.addEventListener("scroll", updateActiveSection);

// aos code
AOS.init({
  offset: 150,
  duration: 800,
  easing: "ease-in-out",
  once: false,
  mirror: true,
});
