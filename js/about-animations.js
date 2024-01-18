// Animation sequence
window.addEventListener("load", showAboutElements, { once: true })

function showAboutElements() {
    const titleOne = document.getElementById("title-1")
    const titleTwo = document.getElementById("title-2")
    const titleThree = document.getElementById("title-3")

    const mainNav = document.getElementById("main-nav")
    const aboutDescription = document.getElementById("about-description")
    const aboutButton = document.getElementById("about-button")
    const linkToDev = document.getElementById("about-dev-link")
    const linkToWeb = document.getElementById("about-web-link")
    const linktoGraphic = document.getElementById("about-grafico-link")

    // Preload time
    const preloadTime = 0 //2000 if preload is active
    
    // Title shows
    setTimeout(() => {
        titleOne.classList.add("appear")
        titleTwo.classList.add("appear")
        titleThree.classList.add("appear")
    }, preloadTime)

    // About element sequence
    setTimeout(() => animateIn(mainNav), preloadTime + 800)
    setTimeout(() => animateIn(aboutDescription), preloadTime + 1000)
    setTimeout(() => animateIn(aboutButton), preloadTime + 1200)
    setTimeout(() => animateIn(linkToDev), preloadTime + 1400)
    setTimeout(() => animateIn(linkToWeb), preloadTime + 1600)
    setTimeout(() => animateIn(linktoGraphic), preloadTime + 1800)

    // Title glitch
    setTimeout(() => {
        titleTwo.classList.remove("appear")
        titleThree.classList.remove("appear")
        titleTwo.classList.add("clip")
        titleThree.classList.add("clip")
    }, preloadTime + 2200)

    // Sidebar
    const sidebar = document.getElementById("sidebar")
    setTimeout(() => {
        sidebar.style.animationName = "sidebar"
    }, preloadTime + 800)
}

// Appearing animation
function animateIn(element) {
  
    // Animation duration
    const duration = 500
    
    // Element Styles
    const mainElementStyles =  {
        position : "relative",
        animationDuration : `${duration}ms`,
        animationFillMode : "forwards",
        opacity : "0"
    }
    const redElementStyles = {
        position : "absolute",
        opacity : "0",
        top : `${element.offsetTop}px`,
        left : `${element.offsetLeft}px`,
        transform : "translateX(-5px)",
        animationDuration : `${duration}ms`,
        animationFillMode : "forwards"
    }
    const whiteElementStyles = {
        position : "absolute",
        opacity : "0",
        top : `${element.offsetTop}px`,
        left : `${element.offsetLeft}px`,
        transform : "translateX(10px)",
        animationDuration : `${duration}ms`,
        animationFillMode : "forwards"
    }

    // Set main element styles
    setElementStyles(element, mainElementStyles)

    // Create effect elements cloning main element
    let red = element.cloneNode(true)
    let white = element.cloneNode(true)
  
    // Set red effect element properties and styles
    red.setAttribute("data-effect", "red")
    element.after(red)
    let redCSS = `*[data-effect="red"], *[data-effect="red"] * { color: #e81868!important;}`
    document.getElementById("style").append(redCSS)
    setElementStyles(red, redElementStyles)
  
    // Set white effect element properties and styles
    white.setAttribute("data-effect", "white")
    element.after(white)
    let whiteCSS = `*[data-effect="white"], *[data-effect="white"] * { color: #ffffff!important;}`
    document.getElementById("style").append(whiteCSS)
    setElementStyles(white, whiteElementStyles)

    // Trigger animations  
    element.style.animationName = "animateIn"
    red.style.animationName = "animateInRed"
    white.style.animationName = "animateInWhite"
  
    // Remove animations on effect elements
    setTimeout(() => {
      red.remove()
      white.remove()
    }, duration)
}