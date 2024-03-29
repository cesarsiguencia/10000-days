var welcomeBox = document.querySelector(".welcome-box")
var welcomeCarousel = document.querySelector("#welcome-carousel")
var welcomeTitleHolder = ''

function changeWords(currentIndex) {
    var welcomeWords = ["You're Invited!", "On my 10,000th day of life", "Saturday, January 1st, 2023"]

    if (welcomeTitleHolder) {
        welcomeTitleHolder.remove()
    }
    welcomeTitleHolder = document.createElement("div");
    welcomeTitleHolder.className = 'welcome-title-holder text-center'
    welcomeTitleHolder.innerHTML = "<p class='welcome-titles'>" + welcomeWords[currentIndex] + "</p>"

    welcomeCarousel.appendChild(welcomeTitleHolder)
    var nextIndex = ""
    if (currentIndex < welcomeWords.length - 1) {
        currentIndex++
    } else {
        return setTimeout("appearButton()", 2000)

    }
    nextIndex = currentIndex
    setTimeout(changeWords, 3000, nextIndex)
}

function insertHomeBtn() {
    welcomeBox.style = 'backdrop-filter: blur(2px)'
    var buttonItem = document.createElement("div")
    buttonItem.className = 'welcome-button'
    buttonItem.innerHTML = '<p class="welcome-button-font text-center copperplate-font h6">Click here for audio and awesomeness</p> '
    welcomeBox.appendChild(buttonItem)
}

const introAudio = document.querySelector('#intro-audio')

function appearButton() {
    var button = document.querySelector(".welcome-button")
    button.style.opacity = 1

    button.addEventListener("click", ()=>{
        button.style.transition = 'ease-in-out 2s'
        button.style.scale = 5
        button.style.opacity = 0
        introAudio.play()
        introAudio.volume = 0.8

        setTimeout(function(){

            var selectedElement = document.querySelector('#introduction')
            selectedElement.style.opacity = 0
            selectedElement.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
        
            });
            selectedElement.style.transition = "5s"
            selectedElement.style.opacity = 1

        }, 5000)
    })
}

function introParallax(event) {
    const hero = document.querySelector(".hero")
    const scrollPosition = event.target.scrollingElement.scrollTop;

    if (scrollPosition > 20) {
        // hero.style.height = "100vh";
        hero.style.scale = 1
    } else {
        // hero.style.height = "120vh";
        hero.style.scale = 1.05
    }
}

function loadParallax(event) {
    const hero = document.querySelector(".hero")
    hero.style.scale = 1.05
    // hero.style.height = "120vh";
    event.target.scrollingElement.scrollTop = 0
}

window.onload = loadParallax
document.addEventListener("scroll", introParallax);
setTimeout(changeWords, 1000, 0)
setTimeout("insertHomeBtn()", 1000)