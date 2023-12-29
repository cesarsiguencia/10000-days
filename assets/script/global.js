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

function smoothScroll(event) {
    var section = event.target.getAttribute("data");
    console.log(section)
    let selectedElement
    selectedElement = document.querySelector(`${section}`)
    console.log(selectedElement)
    selectedElement.style.opacity = 0.0
    selectedElement.scrollIntoView({
        block: 'start',
        behavior: 'smooth',

    });
    console.log('should go through')
    // selectedElement.style.transition = "ease-in-out 2s"
    selectedElement.style.opacity = 1
    // selectedElement = ""
}

mobileMenu.addEventListener("click", hamburgerMenu)
window.addEventListener("resize", bringBarBack)
navBar.addEventListener("click", smoothScroll)