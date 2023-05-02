window.addEventListener("load", loadSidebar, { once: true });

function loadSidebar() {
    const sidebar = document.getElementById("sidebar");
    setTimeout(() => {
        sidebar.style.animationName = "sidebar";
    }, 1800);
};