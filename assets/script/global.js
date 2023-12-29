var mobileMenu = document.querySelector("#mobileMenu")
var navBar = document.querySelector("#nav")
var navBarLinks = document.querySelectorAll(".nav-links")

function hamburgerMenu() {
    var screenWidth = document.body.clientWidth
    if (screenWidth <= 768) {
        const btn = document.getElementById("mobile-menu")
        btn.classList.toggle("active")
        navBar.classList.toggle("mobile-effect")
        shrinkMenu()
    }
}

var clicked = 1

function shrinkMenu() {
    if (clicked == 1) {
        navBarLinks.forEach((link) => {
            link.style.height = "50px"
            link.style.opacity = 1
        })
        clicked = 0
        return
    }

    if (clicked == 0) {
        navBarLinks.forEach((link) => {
            link.style.height = "0px"
            link.style.opacity = 0
        })
        clicked = 1
        return
    }
}

function bringBarBack() {
    var screenWidth = document.body.clientWidth
    if (screenWidth > 768) {
        navBarLinks.forEach((link) => {
            link.removeAttribute("style")
        })
    }
}

mobileMenu.addEventListener("click", hamburgerMenu)
window.addEventListener("resize", bringBarBack)