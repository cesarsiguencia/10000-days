var welcomeBox = document.querySelector(".welcome-box")
var welcomeCarousel = document.querySelector("#welcome-carousel")
var welcomeTitleHolder = ''


function changeWords(currentIndex) {
    var welcomeWords = ["You're Invited!", "On my 10,000th day of life", "Saturday, October 21st, 2023"]

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
    var buttonItem = document.createElement("a")
    buttonItem.className = 'welcome-button'
    buttonItem.innerHTML = '<p class="welcome-button-font text-center copperplate-font">Click here for audio and awesomeness</p> '
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

        // setTimeout((()=>{
        //     window.location.href = '/home'
        // }
        // ), 4500)
    })
}



function introParallax(event) {
    const hero = document.querySelector(".hero")
    const scrollPosition = event.target.scrollingElement.scrollTop;

    if (scrollPosition > 20) {
        hero.style.height = "100vh";
    } else {
        hero.style.height = "120vh";
    }
}

function loadParallax(event) {
    const hero = document.querySelector(".hero")
    hero.style.height = "120vh";
    event.target.scrollingElement.scrollTop = 0
}

var trialModal = document.querySelector('#trial-modal')
var closeTrial = document.querySelector('#close-trial')

function onIntroPg(){
    if(document.URL = 'https://cs-10000-days-33ee2045b3a6.herokuapp.com/)'){
        setTimeout(function(){
            trialModal.style.height="100vh"
        }, 2000)
        
    }
}


// Intro Page Function calls
window.onload = loadParallax
document.addEventListener("scroll", introParallax);
setTimeout(changeWords, 1000, 0)
setTimeout("insertHomeBtn()", 1000)
// setTimeout("appearButton()", 12000)
// onIntroPg()
// closeTrial.addEventListener("click", function(){
//     trialModal.style.height="100vh"
// })