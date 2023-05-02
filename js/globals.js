// The 'isListening' flag is used to prevent continous scroll and touch navigation
let isListening = false;

// The 'modalIsOn' flag prevents scroll and touch navigation when a modal is showing
let modalIsOn = false;

// Set an objects of CSS styles to a DOM Element
function setElementStyles(element, stylesObj) {
    for (let style in stylesObj) {
        element.style[style] = stylesObj[style];
    };
};

// Modal Controllers
const modalContainer = document.getElementsByClassName("sidebar-modal-content")[0];
const modalCloseButton = document.getElementsByClassName("close")[0];

modalCloseButton.addEventListener("click", closeModal);

function renderModal(content) {

    const modalStylesOnRender = {
        animationName : "modalUp",
        animationFillMode : "forwards",
        animationDuration : "800ms",
        animationTimingFunction : "cubic-bezier(0, 0, 0.23, 0.98)"
    };

    document.body.classList.toggle("modal-on");
    modalIsOn = true;
    document.removeEventListener("wheel", onMouseWheelHandler);
    document.removeEventListener("touchstart", onTouchStartHandler);
    document.removeEventListener("touchend", onTouchEndHandler);

    setTimeout(() => {
        modalContainer.innerHTML = content.innerHTML;
        setElementStyles(modalContainer, modalStylesOnRender)
    }, 300);

};

function closeModal() {

    const modalStylesOnClose = {
        animationName : "",
        animationFillMode : "",
        animationDuration : "",
        animationTimingFunction : ""
    };

    modalContainer.innerHTML = "";
    setElementStyles(modalContainer, modalStylesOnClose)
    document.body.classList.toggle("modal-on");
    
    modalIsOn = false;
    isListening = false;
}