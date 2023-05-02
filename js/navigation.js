// Active section
let prevSection, currentSection, nextSection;

window.addEventListener("load", () => {
  const sections = Array.from(document.querySelectorAll(".section-home"));

  let observer = new IntersectionObserver(setcurrentSection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  });

  function setcurrentSection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.target !== undefined && entry.target.classList.contains("visible")) {
        entry.target.classList.remove("visible");
        animateSectionOut(entry.target);
      }
      if (entry.intersectionRatio > 0.5) {
        prevSection = sections[sections.indexOf(entry.target) - 1];
        currentSection = entry.target;
        nextSection = sections[sections.indexOf(entry.target) + 1];

        currentSection.classList.add("visible");
        setMenuActive(currentSection);
        animateSectionIn(currentSection);
      }
    });
  }

  sections.forEach((section) => {
    observer.observe(section);
  });

  setInterval(() => {
    if (isListening === false) {
      isListening = true;

      // Desktop Mouse Wheel Navigation
      document.addEventListener("wheel", onMouseWheelHandler, { once: true });

      // Mobile Touch Navigation
      document.addEventListener("touchstart", onTouchStartHandler);
      document.addEventListener("touchend", onTouchEndHandler);
    }
  }, 300);
});

function onMouseWheelHandler(e) {
  if (modalIsOn === true) {
    return;
  } else {
    if (e.deltaY < 0) {
      if (prevSection !== undefined) {
        prevSection.scrollIntoView();
      }
    } else {
      if (nextSection !== undefined) {
        nextSection.scrollIntoView();
      }
    }
    isListening = false;
  }
}

let touchStartY = 0;
let touchEndY = 0;

function onTouchStartHandler(e) {
    if (modalIsOn === true) {
      return;
    } else {
      touchStartY = e.changedTouches[0].screenY;
    }
}

function onTouchEndHandler(e) {
    if (modalIsOn === true) {
      return;
    } else {
      touchEndY = e.changedTouches[0].screenY;
      checkDirection();
    }
}

function checkDirection() {
    if (touchEndY < touchStartY && nextSection !== undefined) {
        nextSection.scrollIntoView();
    }
    if (touchEndY > touchStartY && prevSection !== undefined) {
        prevSection.scrollIntoView();
    }
};

// Exit Section Animation
const sectionOutStyles = {
  animationName : "sectionOut",
  animationDuration : "500ms",
  animationFillMode : "forwards",
  animationDelay : "0"
};

function animateSectionOut(element) {
    let container = element.getElementsByClassName("content")[0];
    setElementStyles(container, sectionOutStyles);
};

// Enter Section Animation
const sectionInStyles = {
  animationName : "sectionIn",
  animationDuration : "500ms",
  animationFillMode : "forwards",
  animationDelay : "0"
};
function animateSectionIn(element) {
    let container = element.getElementsByClassName("content")[0];
    setElementStyles(container, sectionInStyles);
};

// Set Main Nav Active Section
function setMenuActive(section) {
    Array.from(document.getElementsByClassName("menu-item")).forEach(
      (menuItem) => {
        menuItem.classList.remove("active");
        if (section.id === menuItem.dataset.ref) {
          menuItem.classList.add("active");
        }
      }
    );
};

// Mobile menu
  const menuBtn = document.getElementById("mobile-menu-button");
  const nav = document.getElementById("main-nav");
  menuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    nav.classList.toggle("visible");
  });
  Array.from(document.getElementsByClassName("menu-item")).forEach((item) => {
    item.addEventListener("click", (e) => {
      if (nav.classList.contains("visible")) {
        nav.classList.remove("visible");
      }
    });
  });
  
// CV Button
  Array.from(document.getElementsByClassName("button-cv")).forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      renderModal(document.getElementsByClassName("cv")[0]);
    });
  });