window.addEventListener("load", loadSidebar, { once: true })

// Preload Time
const preloadTime = 0 //2000 if preload is active

function loadSidebar() {
    const sidebar = document.getElementById("sidebar")
    setTimeout(() => {
        sidebar.style.animationName = "sidebar"
    }, preloadTime + 800)
}