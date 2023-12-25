var navBar = document.querySelector("#nav")
var navBarLinks = document.querySelectorAll(".nav-links")
var posts = document.querySelectorAll('.post-slides')
var timerProgress = document.querySelector(".timer-progress")
var dashboard = document.querySelector('.dashboard-carousel')
var venueImgs = document.querySelectorAll('.venue-slides')
var barHeight = ""
var selectedElement = ""
var dummyForm = document.querySelector('.registration')
const hero = document.querySelector(".hero")
hero.style.height = "120vh";

// var alertModal = document.querySelector('#alert-modal')
// var changedItems = []
// var failedItems = []
// var pluraity = ""

// function alertModalAppear(message, failedItems){
//     alertModal.style.height = "100vh"
//     if(Array.isArray(message)){
//         if(message.length > 1){
//             pluraity = "have"
//             message = message.join(" & ")
//         } else {
//             pluraity = "has"
//         }
//         alertModal.querySelector('#alert-modal-text').textContent = `Your ${message} ${pluraity} been updated!`
//     } else {
//         alertModal.querySelector('#alert-modal-text').textContent = message
//     }

//     if(failedItems){
//         if(failedItems.length > 1){
//             failedItems = failed.join(" || ")
//         }
//         alertModal.querySelector('#alert-modal-text-2').textContent = failedItems
//     }

//     changedItems = []
//     pluraity = ""
//     failedItems = []

//     var alertModalClose = alertModal.querySelector('#alert-modal-close')
//     alertModalClose.addEventListener("click", function(){
//         alertModal.style.height = "0px"
//     })
// }

function homeParallax(event) {
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

function welcomeTitlesParallax(event) {
    const hero = document.querySelector(".welcome-box")
    const scrollPosition = event.target.scrollingElement.scrollTop;
    if (scrollPosition > 350) {
        hero.style.opacity = 0;
        hero.style.translate = "0 -50px";
        hero.style.scale = "0.9";
    } else {
        hero.style.opacity = 1;
        hero.style.translate = 0;
        hero.style.scale = 1;
    }
}


// function venueImgsParallax() {
//     const skylark1 = document.querySelector(".skylark-img")
//     const skylark2 = document.querySelector(".skylark-img-2")
//     const skylark3 = document.querySelector(".skylark-img-3")
//     const venueBox = document.querySelector(".venue-split")

//     const imgsArray = [skylark1, skylark2, skylark3] 
//     const position = venueBox.getBoundingClientRect()

//     if (position.top >= window.innerHeight ) {

//         imgsArray.forEach((image)=>{
//             image.style.backgroundSize = "140%"
//         })
//     } else {
//         imgsArray.forEach((image)=>{
//             image.style.backgroundSize = "115%"
//         })
//     }
// }


// function equationParallax() {
//     const equationDiv = document.querySelector(".equation")
//     const position = equationDiv.getBoundingClientRect()
//     if (position.top >= 0 && position.bottom <= window.innerHeight) {
//         equationDiv.style.scale = 1
//     } else {
//         equationDiv.style.scale = 0.75
//     }
// }

var playerOn = true
const audioButton = document.querySelector('#audio-trigger')
const audioSinCara = document.querySelector('#bottom-audio')
function playSinCara(){

    if (playerOn === true){
        audioSinCara.play()
        audioSinCara.volume = 0.1
        playerOn === false
    } 
    if (playerOn === false){
        audioSinCara.pause()
        audioSinCara.volume = 0
        playerOn === true
    }
}

// function storyParallax() {
//     const storyDiv = document.querySelector(".about-story")
//     const position = storyDiv.getBoundingClientRect()
//     if (position.top <= window.innerHeight) {
//         storyDiv.style.scale = 1
//         storyDiv.style.opacity = 1
//     } else {
//         storyDiv.style.scale = 0.75
//         storyDiv.style.opacity = 0.2
//     }
// }

var buttons = document.querySelectorAll('.animated-btns')

function buttonScale (){
    setInterval(() => {
        buttons.forEach((single)=>{
            single.style.scale = 1.1
        })
    }, 2000);

    setTimeout(buttonDown, 1000)
}

function buttonDown (){
    setInterval(() => {
        buttons.forEach((single)=>{
            single.style.scale = 1.0
        })
    }, 2000);
}


var x = 1
var y = 0

function timeCarousel() {
    y = y + 0.5
    timerProgress.style.width = `${y}%`

    if (y == 100) {
        y = 0
        if (x == 1) {
            posts.forEach((post) => {
                post.style.transform = "translate(-100%)"
            })
            x = 2
            return
        }
    
        if (x == 2) {
            posts.forEach((post) => {
                post.style.transform = "translate(-200%)"
            })
            x = 3
            return
        }
    
        if (x == 3) {
            posts.forEach((post) => {
                post.style.transform = "translate(0%)"
            })
            x = 1
            return
        }
    }
}

var z = 1

function venueCarousel() {
        if (z < 3) {
            venueImgs.forEach((img) => {
                img.style.transform = `translate(-${z}00%)`
            })
            z = z + 1
            return
        }

    
        if (z == 3) {
            venueImgs.forEach((img) => {
                img.style.transform = "translate(0%)"
            })
            z = 1
            return
        }
}

var sliderNav = document.querySelector('.slider-nav')
function foodCarousel(e){
    var foodBtns = document.querySelectorAll('.slider-btn')

    foodBtns.forEach((btn)=>{
        btn.style.opacity = 0.6;
    })

    var selectedBtn = document.getElementById(e.target.id)
    selectedBtn.style.opacity = 1 
}


// function trialModal(){
//     var trial = document.querySelector('.trial-modal')
// }

// Home Page Function calls

window.onload = loadParallax
window.onload = buttonScale
document.addEventListener("scroll", homeParallax);
document.addEventListener("scroll", welcomeTitlesParallax)
// document.addEventListener("scroll", venueImgsParallax)
setInterval(venueCarousel, 4000)
setInterval(timeCarousel, 40)
sliderNav.addEventListener("click", foodCarousel)
// closeTrial.addEventListener("click", function(){
//     trialModal.style.height="100vh"
// })
// audioButton.addEventListener("click", playSinCara)
// document.addEventListener("scroll", equationParallax)
// document.addEventListener("scroll", storyParallax)
