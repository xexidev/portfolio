/* Sidebar */
window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("sidebar").style.animationName = "sidebar"
    },1800);
},{once:true});

/* Animación de los elementos de About */
function animateIn(element) {
    const duration = 500
    element.style.position = "relative"
    let red = element.cloneNode(true)
    let white = element.cloneNode(true)

    element.style.animationDuration = `${duration}ms`
    element.style.animationFillMode = "forwards"
    element.style.opacity = "0"

    red.setAttribute("data-effect","red")
    element.after(red)
    red.style.position = "absolute"
    red.style.opacity = "0"
    red.style.top = `${element.offsetTop}px`
    red.style.left = `${element.offsetLeft}px`
    red.style.transform = "translateX(-5px)"
    let redCSS = `*[data-effect="red"], *[data-effect="red"] * { color: #e81868!important;}`
    document.getElementById("style").append(redCSS)
    red.style.animationDuration = `${duration}ms`
    red.style.animationFillMode = "forwards"

    white.setAttribute("data-effect","white")
    element.after(white)
    white.style.position = "absolute"
    white.style.opacity = "0"
    white.style.top = `${element.offsetTop}px`
    white.style.left = `${element.offsetLeft}px`
    white.style.transform = "translateX(10px)"
    let whiteCSS = `*[data-effect="white"], *[data-effect="white"] * { color: #ffffff!important;}`
    document.getElementById("style").append(whiteCSS)
    white.style.animationDuration = `${duration}ms`
    white.style.animationFillMode = "forwards"

    element.style.animationName = "animateIn";
    red.style.animationName = "animateInRed";
    white.style.animationName = "animateInWhite";

    setTimeout(() => {
        red.remove();
        white.remove();
    },duration);
}

/* Sección activa */
window.addEventListener("load", () => {
    let elementIn = ""
    window.addEventListener("scroll", onDisplay)

    function onDisplay() {
        Array.from(document.getElementsByClassName("section-home")).forEach(element => {
            let rect = element.getBoundingClientRect()
            if(rect.top >= 0 && rect.top < window.innerHeight) {
                if(elementIn != element.id) {
                    elementIn = element.id
                    Array.from(document.getElementsByClassName("section-home")).forEach(el => {
                        if(el.classList.contains("visible")) {
                            el.classList.remove("visible")
                            fadeOut(el)
                        }
                    });
                    setMenuActive(element)
                    element.classList.add("visible")
                    fadeIn(element)
                }
            }
        })
    }

    function fadeOut(el) {
        let container = el.getElementsByClassName("content")[0]
        container.style.animationName = "sectionOut"
        container.style.animationDuration = "500ms"
        container.style.animationFillMode = "forwards"
        container.style.animationDelay = "0"
    }
    function fadeIn(el) {
        let container = el.getElementsByClassName("content")[0]
        container.style.animationName = "sectionIn"
        container.style.animationDuration = "500ms"
        container.style.animationFillMode = "forwards"
        container.style.animationDelay = "0"
    }
    function setMenuActive(section) {
        Array.from(document.getElementsByClassName("menu-item")).forEach(element => {
            element.classList.remove("active")
            if(section.id === element.dataset.ref) {
                element.classList.add("active")
            }
        })
    }
})

/* Cargar proyectos */
window.addEventListener("load", () => {
    fetch("work.json")
    .then(r => {
        r.json().then(works => {
            let fragment = new DocumentFragment()

            // Gráfico
            works.grafico.forEach(item => {
                let work = document.createElement("a")
                work.setAttribute("data-id",item.id)
                work.classList.add("work-item")
                work.classList.add("work-item-diseno")
                if(item.hasOwnProperty("url")) {
                    work.setAttribute("href",item.url)
                }
                work.innerHTML = `            
                    <div class="work-image" style="background-image:url('${item.image}')"></div>
                    <template data-modalid="${item.id}">
                        <div class="work-modal">
                            <div class="work-modal-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="work-modal-info">
                                <div class="work-modal-title">
                                        ${item.name}
                                </div>
                                <div class="work-modal-text">
                                    ${item.description}
                                </div>
                            </div>
                        </div>
                    </template>
                `;
                fragment.appendChild(work)
                work.addEventListener("click", e => {
                    e.preventDefault()
                    renderModal(work.querySelector("[data-modalid="+item.id+"]"))
                })
            })
            document.getElementsByClassName("work-showcase-grafico")[0].appendChild(fragment)
            
            // Web
            works.web.forEach(item => {
                let work = document.createElement("a")
                work.classList.add("work-item")
                work.classList.add("work-item-web")
                if(item.hasOwnProperty("url")) {
                    work.setAttribute("href",item.url)
                    work.setAttribute("target","_blank")
                }
                work.innerHTML = `            
                    <div class="work-image" style="background-image:url('${item.image}')"></div>
                `;
                fragment.appendChild(work)
            })
            document.getElementsByClassName("work-showcase-web")[0].appendChild(fragment)
            
            // Dev
            works.dev.forEach(item => {
                let work = document.createElement("a")
                work.setAttribute("data-id",item.id)
                work.classList.add("work-item")
                work.classList.add("work-item-dev")
                if(item.hasOwnProperty("url")) {
                    work.setAttribute("href",item.url)
                }
                work.innerHTML = `            
                    <div class="work-image" style="background-image:url('${item.image}')"></div>
                    <template data-modalid="${item.id}">
                        <div class="work-modal">
                            <div class="work-modal-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="work-modal-info">
                                <div class="work-modal-title">
                                        ${item.name}
                                </div>
                                <div class="work-modal-text">
                                    ${item.description}
                                </div>
                            </div>
                        </div>
                    </template>
                `;
                fragment.appendChild(work)
                work.addEventListener("click", e => {
                    e.preventDefault()
                    renderModal(work.querySelector("[data-modalid="+item.id+"]"))
                })
            })
            document.getElementsByClassName("work-showcase-dev")[0].appendChild(fragment)
        })
    },
    error => {
        console.log(error)
    });
})

/* Menú movil */
const menuBtn = document.getElementById("mobile-menu-button")
const nav = document.getElementById("main-nav")
menuBtn.addEventListener("click", e => {
    e.preventDefault()
    nav.classList.toggle("visible")
})
Array.from(document.getElementsByClassName("menu-item")).forEach(item => {
    item.addEventListener("click", e => {
        if(nav.classList.contains("visible")) {
            nav.classList.remove("visible")
        }
    })
})

/* Modal variables */
const modalContainer = document.getElementsByClassName("sidebar-modal-content")[0]
const modalCloseButton = document.getElementsByClassName("close")[0]

/* Modal Close Button */
modalCloseButton.addEventListener('click', closeModal)


/* Modal Set Content */
function renderModal(content) {
    document.body.classList.toggle("modal-on")
    setTimeout(() => {
        modalContainer.innerHTML = content.innerHTML
        modalContainer.style.animationName = "modalUp"
        modalContainer.style.animationFillMode = "forwards"
        modalContainer.style.animationDuration = "800ms"
        modalContainer.style.animationTimingFunction = "cubic-bezier(0, 0, 0.23, 0.98)"
    }, 300);
}

/* Modal Close */
function closeModal() {
    modalContainer.innerHTML = ""
    modalContainer.style.animationName = ""
    modalContainer.style.animationFillMode = ""
    modalContainer.style.animationDuration = ""
    modalContainer.style.animationTimingFunction = ""
    document.body.classList.toggle("modal-on")
}

/* CV */
Array.from(document.getElementsByClassName("button-cv")).forEach(button => {
    button.addEventListener("click", e => {
        e.preventDefault()
        renderModal(document.getElementsByClassName("cv")[0])
    })
})