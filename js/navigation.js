// Active section
let prevSection, currentSection, currentContent, nextSection, scrollDownAvailable, scrollTopAvailable

window.addEventListener("load", () => {  
  const sections = Array.from(document.querySelectorAll(".section-home"))

  let observer = new IntersectionObserver(setcurrentSection, {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  })

  function setcurrentSection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.target !== undefined && entry.target.classList.contains("visible")) {
        entry.target.classList.remove("visible")
        animateSectionOut(entry.target)
      }
      if (entry.intersectionRatio > 0.5) {
        prevSection = sections[sections.indexOf(entry.target) - 1]
        currentSection = entry.target
        nextSection = sections[sections.indexOf(entry.target) + 1]

        // Check if there is room for scroll on content
        currentContent = currentSection.querySelector(".content")
        scrollDownAvailable = () => {
          return currentContent.scrollTop + currentContent.clientHeight + 10 < currentContent.scrollHeight // The + 10 fixes scoll bottom detection on mobile devices
        }
        scrollTopAvailable = () => {
          return currentContent.scrollTop > 0
        }

        // Positioning content
        function positionCurrentContent() {
          if (window.matchMedia("(max-width: 960px)").matches) {
            if (scrollDownAvailable() || scrollTopAvailable()) {
              currentContent.style.alignItems = "flex-start"
              currentContent.style.justifyContent = "flex-start"
              currentContent.style.paddingTop = "90px"
            } else {
              currentContent.style.alignItems = "flex-start"
              currentContent.style.justifyContent = "center"
              currentContent.style.paddingTop = "50px"
            }
          }
          if (window.matchMedia("(min-width: 960px)").matches) {
            if (scrollDownAvailable() || scrollTopAvailable()) {
              currentContent.style.justifyContent = "space-between"
              currentContent.style.alignItems = "flex-start"
              currentContent.style.paddingTop = "90px"
              currentContent.style.paddingBottom = "90px"
            } else {
              currentContent.style.justifyContent = "space-between"
              currentContent.style.alignItems = "center"
              currentContent.style.paddingTop = "50px"
            }
          }
        }
        positionCurrentContent()
        window.addEventListener("resize", () => positionCurrentContent() )

        currentSection.classList.add("visible")
        setMenuActive(currentSection)
        animateSectionIn(currentSection)
      }
    })
  }

  sections.forEach((section) => {
    observer.observe(section)
  })

  navigationReady()
})

function navigationReady() {
  // Desktop Mouse Wheel Navigation
  document.addEventListener("wheel", onMouseWheelHandler, { once: true })

  // Arrow Keys navigation
  document.addEventListener("keydown", e => onKeyDownHandler(e))

  // Mobile Touch Navigation
  document.addEventListener("touchstart", e => onTouchStartHandler(e))
  document.addEventListener("touchend", e => onTouchEndHandler(e))
}

function stopNavigation() {
  document.removeEventListener("wheel", onMouseWheelHandler)
  document.addEventListener("keydown", onKeyDownHandler)
  document.removeEventListener("touchstart", onTouchStartHandler)
  document.removeEventListener("touchend", onTouchEndHandler)
}


function goToNextSection() {
  if (scrollDownAvailable()) {
    setTimeout(() => {
      navigationReady()
    }, 75)
    return
  } else {
    nextSection.scrollIntoView()
  }
}

function goToPrevSection() {
  if (scrollTopAvailable()) {
    setTimeout(() => {
      navigationReady()
    }, 75)
    return
  } else {
    prevSection.scrollIntoView()
  }
}

function onMouseWheelHandler(e) {
  if (modalIsOn === false) {
    if (e.deltaY < 0) {
      if (prevSection) {
        goToPrevSection()
      }
    } else {
      if (nextSection) {
        goToNextSection()
      }
    }
    setTimeout(() => {
      navigationReady()
    }, 500)
  }
}

function onKeyDownHandler(e) {
  if (e.key === "ArrowDown") {
    if (nextSection) {
      goToNextSection()
    }
  }
  if (e.key === "ArrowUp") {
    if (prevSection) {
      goToPrevSection()
    }
  }
}

let touchStartY = 0
let touchEndY = 0

function onTouchStartHandler(e) {
  if (modalIsOn === false) {
    touchStartY = e.changedTouches[0].screenY
  }
}

function onTouchEndHandler(e) {
  if (modalIsOn === false) {
    touchEndY = e.changedTouches[0].screenY
    checkDirection()
  }
}

function checkDirection() {
  if (touchEndY < touchStartY && nextSection) {
    goToNextSection()
  }
  if (touchEndY > touchStartY && prevSection) {
    goToPrevSection()
  }
}

// Exit Section Animation
const sectionOutStyles = {
  animationName: "sectionOut",
  animationDuration: "500ms",
  animationFillMode: "forwards",
  animationDelay: "0"
}

function animateSectionOut(element) {
  let container = element.getElementsByClassName("content")[0]
  setElementStyles(container, sectionOutStyles)
}

// Enter Section Animation
const sectionInStyles = {
  animationName: "sectionIn",
  animationDuration: "500ms",
  animationFillMode: "forwards",
  animationDelay: "0"
}

function animateSectionIn(element) {
  let container = element.getElementsByClassName("content")[0]
  setElementStyles(container, sectionInStyles)
}

// Set Main Nav Active Section
function setMenuActive(section) {
  Array.from(document.getElementsByClassName("menu-item")).forEach(
    (menuItem) => {
      menuItem.classList.remove("active")
      if (section.id === menuItem.dataset.ref) {
        menuItem.classList.add("active")
      }
    }
  )
}

// Mobile menu
const menuBtn = document.getElementById("mobile-menu-button")
const nav = document.getElementById("main-nav")
menuBtn.addEventListener("click", (e) => {
  e.preventDefault()
  nav.classList.toggle("visible")
})
Array.from(document.getElementsByClassName("menu-item")).forEach((item) => {
  item.addEventListener("click", (e) => {
    if (nav.classList.contains("visible")) {
      nav.classList.remove("visible")
    }
  })
})