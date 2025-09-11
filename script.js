
    // New mobile drawer controls
    const menuButton = document.getElementById('menuButton');
    const menuClose = document.getElementById('menuClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileBackdrop = document.getElementById('mobileBackdrop');

    function openDrawer() {
      if (!mobileDrawer || !mobileBackdrop) return;
      mobileDrawer.classList.remove('translate-x-full');
      mobileBackdrop.classList.remove('hidden');
      menuButton?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      if (!mobileDrawer || !mobileBackdrop) return;
      mobileDrawer.classList.add('translate-x-full');
      mobileBackdrop.classList.add('hidden');
      menuButton?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    if (menuButton && mobileDrawer && mobileBackdrop) {
      menuButton.addEventListener('click', openDrawer);
      menuClose?.addEventListener('click', closeDrawer);
      mobileBackdrop.addEventListener('click', closeDrawer);
      // Close on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDrawer();
      });
    }

// Dropdown functionality
const dropdown = document.getElementById("myDropdown");
    const header = dropdown.querySelector(".dropdown-header");

    header.addEventListener("click", () => {
      dropdown.classList.toggle("active");
    });
// navToggle.addEventListener("click", () => {
//   const expanded =
//     navToggle.getAttribute("aria-expanded") === "true" ? "false" : "true";
//   navToggle.setAttribute("aria-expanded", expanded);
//   mobileMenu.classList.toggle("active");
// });

// // Typing text effect
// const typingText = document.querySelector(".typing-text");
// const words = ["Harsh", "a Developer", "a Designer"];
// let wordIndex = 0;
// let charIndex = 0;
// let currentWord = "";
// let isDeleting = false;

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
// Experience progress circles: animate only when dropdown expands
(function initExperienceDropdownAnimation(){
  const dropdown = document.getElementById('myDropdown');
  if(!dropdown) return;
  const header = dropdown.querySelector('.dropdown-header');
  const items = dropdown.querySelectorAll('.dropdown-content [data-percent]');
  let animated = false;

  function animateCircle(circleBar, circleText, targetPercent) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    let currentPercent = 0;
    circleBar.style.strokeDasharray = circumference;
    circleBar.style.strokeDashoffset = circumference;

    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = targetPercent / steps;

    const interval = setInterval(() => {
      currentPercent += increment;
      if (currentPercent >= targetPercent) {
        currentPercent = targetPercent;
        clearInterval(interval);
      }
      const offset = circumference - (currentPercent / 100) * circumference;
      circleBar.style.strokeDashoffset = offset;
      circleText.textContent = Math.round(currentPercent) + '%';
    }, stepTime);
  }

  function runAnimationOnce(){
    if(animated) return;
    items.forEach(item => {
      const percent = parseInt(item.getAttribute('data-percent')) || 0;
      const circleBar = item.querySelector('.circle-bar');
      const circleText = item.querySelector('.circle-text');
      if(circleBar && circleText) animateCircle(circleBar, circleText, percent);
    });
    animated = true;
  }

  if(header){
    header.addEventListener('click', () => {
      // existing toggle already handled above; wait a tick to check active state
      requestAnimationFrame(() => {
        if(dropdown.classList.contains('active')){
          runAnimationOnce();
        }
      });
    });
  }
})();

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

// Auto-apply animate-text to headings and paragraphs inside main sections (exclude gallery overlays)
(function autoTagAnimateText() {
  try {
    // Cleanup: ensure home and stats sections don't carry animate-text
    document.querySelectorAll('#home.animate-text, #home .animate-text, .stats-section.animate-text, .stats-section .animate-text')
      .forEach(el => {
        el.classList.remove('animate-text');
        el.classList.remove('visible');
      });

    const nodes = document.querySelectorAll(
      'main section h1, main section h2, main section h3, main section p'
    );
    nodes.forEach(el => {
      if (el.closest('.gallery-overlay')) return; // avoid interfering with overlay transforms
      if (el.closest('#home')) return; // skip Home section
      if (el.closest('.stats-section')) return; // skip Stats section
      el.classList.add('animate-text');
    });
    // run once to reveal items already near viewport
    animateTextsOnScroll();
  } catch (e) { /* noop */ }
})();

// Projects: reveal gallery items on scroll with slight stagger
(function initProjectsReveal() {
  try {
    const grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('.gallery-item'));
    if (!cards.length) return;

    // Prime classes and per-card transition delay for stagger
    cards.forEach((card, idx) => {
      card.classList.add('reveal-on-scroll');
      // Stagger up to 150ms between items
      const delay = Math.min(idx * 80, 24);
      card.style.transitionDelay = delay + 'ms';
    });

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });

    cards.forEach(c => io.observe(c));
  } catch (e) { /* noop */ }
})();


// Initialize all features
function initAllFeatures() {
    initModernNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initResponsiveImages();
    initTouchGestures();
    initPerformanceOptimizations();
    initAccessibility();
    initImageGallery(); // Initialize image gallery
    initContactForm(); // Initialize contact form
}


// floating home button
  const homeBtn = document.getElementById("homeBtn");

  // Show button after scrolling 100px
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      homeBtn.style.display = "block";
    } else {
      homeBtn.style.display = "none";
    }
  });

  // Scroll to top smoothly
  homeBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  // Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Scrollspy for navbar: keep active pill on section in view
(function initScrollSpy() {
  const navLinks = Array.from(document.querySelectorAll('a.nav-link[href^="#"]').values());
  if (!navLinks.length) return;

  // Map section id -> nav link
  const sectionMap = new Map();
  navLinks.forEach(link => {
    const id = decodeURIComponent(link.getAttribute('href')).slice(1);
    const sec = id ? document.getElementById(id) : null;
    if (sec) sectionMap.set(sec, link);
  });
  if (sectionMap.size === 0) return;

  // Helper to set active link
  function setActive(link) {
    navLinks.forEach(a => a.classList.remove('active'));
    if (link) link.classList.add('active');
  }

  // Set active on click and close mobile drawer if open
  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      setActive(a);
      // Close the mobile drawer on link click (mobile UX)
      try { if (typeof closeDrawer === 'function') closeDrawer(); } catch (e) {}
    });
  });

  // Observe sections entering viewport
  const observer = new IntersectionObserver((entries) => {
    // Choose the most visible section
    let best = null; let maxRatio = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        best = entry.target;
      }
    });
    if (best && sectionMap.has(best)) {
      setActive(sectionMap.get(best));
    }
  }, {
    root: null,
    threshold: [0.25, 0.5, 0.75],
    rootMargin: '0px 0px -40% 0px' // bias towards items near top
  });

  // Start observing
  sectionMap.forEach((_, section) => observer.observe(section));

  // Initial state: pick first visible or default to #home
  const home = document.querySelector('a.nav-link[href="#home"]');
  if (home) setActive(home);
})();

// Theme toggle: persist in localStorage and reflect on UI
(function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const root = document.body;
  if (!toggle) return;

  // Load saved preference or system preference
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = saved ? saved === 'dark' : prefersDark;
  root.classList.toggle('dark', initialDark);
  // Map: checked means LIGHT (blue sky); unchecked means DARK
  toggle.checked = !initialDark;

  function applyTheme(dark) {
    root.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  toggle.addEventListener('change', (e) => {
    // checked => light mode => dark=false
    applyTheme(!e.target.checked);
  });
})();




//  if (mobileToggle && mobileOverlay && mobileNav) {
//         mobileToggle.addEventListener('click', (e) => {
//             e.preventDefault();
//             e.stopPropagation();
            
//             const isActive = mobileToggle.classList.contains('active');
            
//             if (isActive) {
//                 // Close menu
//                 mobileToggle.classList.remove('active');
//                 mobileOverlay.classList.remove('active');
//                 document.body.style.overflow = '';
//                 document.body.style.position = '';
//             } else {
//                 // Open menu
//                 mobileToggle.classList.add('active');
//                 mobileOverlay.classList.add('active');
//                 document.body.style.overflow = 'hidden';
//                 document.body.style.position = 'fixed';
//                 document.body.style.width = '100%';
//             }
//         });
        
//         // Close mobile menu when clicking overlay
//         mobileOverlay.addEventListener('click', (e) => {
//             if (e.target === mobileOverlay) {
//                 closeMobileMenu();
//             }
//         });
        
//         // Close mobile menu when clicking on links
//         const mobileLinks = document.querySelectorAll('.mobile-nav-link');
//         mobileLinks.forEach(link => {
//             link.addEventListener('click', () => {
//                 closeMobileMenu();
//             });
//         });
        
//         // Close mobile menu on escape key
//         document.addEventListener('keydown', (e) => {
//             if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
//                 closeMobileMenu();
//             }
//         });
        
//         // Close mobile menu on window resize
//         window.addEventListener('resize', () => {
//             if (window.innerWidth > 991 && mobileOverlay.classList.contains('active')) {
//                 closeMobileMenu();
//             }
//         });
        
//         // Function to close mobile menu
//         function closeMobileMenu() {
//             mobileToggle.classList.remove('active');
//             mobileOverlay.classList.remove('active');
//             document.body.style.overflow = '';
//             document.body.style.position = '';
//             document.body.style.width = '';
//         }
        
//         // Prevent body scroll when mobile menu is open
//         mobileOverlay.addEventListener('touchmove', (e) => {
//             if (mobileOverlay.classList.contains('active')) {
//                 e.preventDefault();
//             }
//         }, { passive: false });
//     }
    
//     // Add scroll event listener
//     window.addEventListener('scroll', handleScroll);
    
//     // Initialize scroll state
//     handleScroll();