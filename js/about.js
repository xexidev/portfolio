window.addEventListener("load", () => {
    const titleOne = document.getElementById("title-1");
    const titleTwo = document.getElementById("title-2");
    const titleThree = document.getElementById("title-3");
    /* Title shows */
    setTimeout(() => {
        titleOne.classList.add("appear")
        titleTwo.classList.add("appear")
        titleThree.classList.add("appear")
    },2000);
    /* About element show */
    setTimeout(() => {
        animateIn(document.getElementById("main-nav"))
    },2800);
    setTimeout(() => {
        animateIn(document.getElementById("about-description"))
    },3000);
    setTimeout(() => {
        animateIn(document.getElementById("about-button"))
    },3200);
    setTimeout(() => {
        animateIn(document.getElementById("about-dev-link"))
    },3400);
    setTimeout(() => {
        animateIn(document.getElementById("about-web-link"))
    },3600);
    setTimeout(() => {
        animateIn(document.getElementById("about-grafico-link"))
    },3800);
    /* Title glitch */
    setTimeout(() => {
        titleTwo.classList.remove("appear")
        titleThree.classList.remove("appear")
        titleTwo.classList.add("clip")
        titleThree.classList.add("clip")
    },4200);
},{once:true});