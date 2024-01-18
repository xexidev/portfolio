window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelectorAll(".loaderPath").forEach(path => {
            path.style.animationName = "none"
        })
    },800)
    setTimeout(() => {
        document.body.classList.add("preloaded")
        document.querySelectorAll(".loaderPath").forEach(path => {
            path.style.animationName = path.id
        })
    },1000)
    setTimeout(() => {
        document.getElementById("loader").style.display = "none"
        document.getElementById("preload").style.animationName = "endPreload"
    },1800)
    setTimeout(() => {
        document.body.classList.remove("preloaded")
        document.body.classList.add("loaded")
        document.getElementById("preload").style.display = "none"
    },2800)
},{once:true})