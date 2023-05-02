// Animation sequence
window.addEventListener("load", showAboutElements, { once: true });

function showAboutElements() {
    const titleOne = document.getElementById("title-1");
    const titleTwo = document.getElementById("title-2");
    const titleThree = document.getElementById("title-3");

    const mainNav = document.getElementById("main-nav");
    const aboutDescription = document.getElementById("about-description");
    const aboutButton = document.getElementById("about-button");
    const linkToDev = document.getElementById("about-dev-link");
    const linkToWeb = document.getElementById("about-web-link");
    const linktoGraphic = document.getElementById("about-grafico-link");
    
    // Title shows
    setTimeout(() => {
        titleOne.classList.add("appear")
        titleTwo.classList.add("appear")
        titleThree.classList.add("appear")
    }, 2000);

    // About element sequence
    setTimeout(() => animateIn(mainNav), 2800);
    setTimeout(() => animateIn(aboutDescription), 3000);
    setTimeout(() => animateIn(aboutButton), 3200);
    setTimeout(() => animateIn(linkToDev), 3400);
    setTimeout(() => animateIn(linkToWeb), 3600);
    setTimeout(() => animateIn(linktoGraphic), 3800);

    // Title glitch
    setTimeout(() => {
        titleTwo.classList.remove("appear")
        titleThree.classList.remove("appear")
        titleTwo.classList.add("clip")
        titleThree.classList.add("clip")
    }, 4200);
};

// Appearing animation
function animateIn(element) {
  
    // Animation duration
    const duration = 500;
    
    // Element Styles
    const mainElementStyles =  {
        position : "relative",
        animationDuration : `${duration}ms`,
        animationFillMode : "forwards",
        opacity : "0"
    };    
    const redElementStyles = {
        position : "absolute",
        opacity : "0",
        top : `${element.offsetTop}px`,
        left : `${element.offsetLeft}px`,
        transform : "translateX(-5px)",
        animationDuration : `${duration}ms`,
        animationFillMode : "forwards"
    };    
    const whiteElementStyles = {
        position : "absolute",
        opacity : "0",
        top : `${element.offsetTop}px`,
        left : `${element.offsetLeft}px`,
        transform : "translateX(10px)",
        animationDuration : `${duration}ms`,
        animationFillMode : "forwards"
    };

    // Set main element styles
    setElementStyles(element, mainElementStyles)

    // Create effect elements cloning main element
    let red = element.cloneNode(true);
    let white = element.cloneNode(true);
  
    // Set red effect element properties and styles
    red.setAttribute("data-effect", "red");
    element.after(red);
    let redCSS = `*[data-effect="red"], *[data-effect="red"] * { color: #e81868!important;}`;
    document.getElementById("style").append(redCSS);
    setElementStyles(red, redElementStyles);
  
    // Set white effect element properties and styles
    white.setAttribute("data-effect", "white");
    element.after(white);
    let whiteCSS = `*[data-effect="white"], *[data-effect="white"] * { color: #ffffff!important;}`;
    document.getElementById("style").append(whiteCSS);
    setElementStyles(white, whiteElementStyles);

    // Trigger animations  
    element.style.animationName = "animateIn";
    red.style.animationName = "animateInRed";
    white.style.animationName = "animateInWhite";
  
    // Remove animations on effect elements
    setTimeout(() => {
      red.remove();
      white.remove();
    }, duration);
};