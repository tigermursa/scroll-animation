$(function () {
  // wait for document ready
  // init
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: "onLeave",
      duration: "100%", // this works just fine with duration 0 as well
      // However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
      // Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
    },
  });

  // get all slides
  var slides = document.querySelectorAll("section.panel");

  // create scene for every slide
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
  offset: 150, // Change the distance (in pixels) from the element's bottom to trigger the animation
  duration: 800, // Duration of the animation (in milliseconds)
  easing: "ease-in-out", // Easing function to control the animation's acceleration and deceleration
  once: false, // Set to "false" to trigger the animations on every scroll (both up and down)
  mirror: true, // Set to "true" to mirror the animations on scroll up and scroll down
  // Add any other custom options here as needed
});
