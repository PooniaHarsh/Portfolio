

// Mobile menu toggle
const navToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");

navToggle.addEventListener("click", () => {
  const expanded =
    navToggle.getAttribute("aria-expanded") === "true" ? "false" : "true";
  navToggle.setAttribute("aria-expanded", expanded);
  mobileMenu.classList.toggle("active");
});

// Typing text effect
const typingText = document.querySelector(".typing-text");
const words = ["Harsh", "a Developer", "a Designer"];
let wordIndex = 0;
let charIndex = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
  currentWord = words[wordIndex];
  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 100 : 150);
}

document.addEventListener("DOMContentLoaded", typeEffect);
// Animate circular progress bars and numbers on scroll into view
document.addEventListener("DOMContentLoaded", () => {
  const experienceSection = document.getElementById("experience-section");
  const items = experienceSection.querySelectorAll("[data-percent]");
  let animated = false;

  function animateCircle(circleBar, circleText, targetPercent) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    let currentPercent = 0;
    circleBar.style.strokeDasharray = circumference;
    circleBar.style.strokeDashoffset = circumference;

    const duration = 2000; // 2 seconds
    const stepTime = 20; // ms
    const steps = duration / stepTime;
    const increment = targetPercent / steps;

    let stepCount = 0;
    const interval = setInterval(() => {
      stepCount++;
      currentPercent += increment;
      if (currentPercent >= targetPercent) {
        currentPercent = targetPercent;
        clearInterval(interval);
      }
      const offset = circumference - (currentPercent / 100) * circumference;
      circleBar.style.strokeDashoffset = offset;
      circleText.textContent = Math.round(currentPercent) + "%";
    }, stepTime);
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  function onScroll() {
    if (!animated && isInViewport(experienceSection)) {
      items.forEach((item) => {
        const percent = parseInt(item.getAttribute("data-percent"));
        const circleBar = item.querySelector(".circle-bar");
        const circleText = item.querySelector(".circle-text");
        animateCircle(circleBar, circleText, percent);
      });
      animated = true;
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll();
});

// Function to check if element is in viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

// On scroll, toggle active class for pop-up icons and content
function handleScroll() {
  document.querySelectorAll('.pop-up').forEach((el) => {
    if (isInViewport(el)) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Animate all text elements with class 'animate-text' on scroll
function animateTextsOnScroll() {
  const animatedTexts = document.querySelectorAll(".animate-text");
  animatedTexts.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.85) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", animateTextsOnScroll);
window.addEventListener("load", animateTextsOnScroll);