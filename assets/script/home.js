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

var playerOn = true
let currentSong

const playPause = document.querySelector('#audio-trigger')
const nextButton = document.querySelector('#next-button')
const mediaInfo = document.querySelector('.media-info')

const mj = document.querySelector('#mj')
const princeRoyce = document.querySelector('#prince-royce')
const neyo = document.querySelector('#ne-yo')
const jayz = document.querySelector('#jay-z')

var musicCollection = [mj, princeRoyce, neyo, jayz]
var songInfoDisplay = document.querySelector('#song-info')
const playGif = document.querySelector('.playing-gif')

function playSongs(){
    mediaInfo.style = "padding: 10px;"
    if(currentSong === undefined){
        currentSong = musicCollection[0]
    }

    if (playerOn === true){
        currentSong.play()
        currentSong.volume = 0.1
        var info = currentSong.getAttribute("name")
        songInfoDisplay.innerHTML = info
        playGif.style = "z-index: 0"
        playerOn = false
    } else {
        currentSong.pause()
        currentSong.volume = 0
        playGif.style = "z-index: -1"
        playerOn = true
        return;
    }
}

function nextSong(){
    currentSong.pause()
    currentSong.currentTime = 0
    var currentIndex = musicCollection.indexOf(currentSong)
    if(currentIndex === 3){
        currentSong = undefined
    } else {
        currentSong = null
        currentSong = musicCollection[currentIndex + 1]
    }
    playerOn = true
    playSongs()
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

var sliderNav = document.querySelector('#slider-nav')

function foodCarousel(e){
    var foodBtns = document.querySelectorAll('.slider-btn')

    foodBtns.forEach((btn)=>{
        btn.style.opacity = 0.6;
    })

    var selectedBtn = document.getElementById(e.target.id)
    selectedBtn.style.opacity = 1 
}


// Home Page Function calls


window.onload = loadParallax
window.onload = buttonScale
document.addEventListener("scroll", homeParallax);
document.addEventListener("scroll", welcomeTitlesParallax)
setInterval(venueCarousel, 4000)
setInterval(timeCarousel, 40)
sliderNav.addEventListener("click", foodCarousel)
playPause.addEventListener("click", playSongs)
nextButton.addEventListener("click", nextSong)

const demoModal = document.querySelector('#demo-modal')
const demoClose = document.querySelector('#demo-close')
const demoTrigger = document.querySelector('#demo-trigger')
const demoAlertRemove = document.querySelector('#demo-btn-remove')
const demoAlert = document.querySelector('.demo-button')

setTimeout(function(){
    demoAlert.style.opacity = 1
}, 5000)


demoTrigger.addEventListener("click", function(){
    demoModal.style.height = "100vh"
})

demoClose.addEventListener("click", function(){
    demoModal.style.height="0px"
    demoAlert.style.display = "none"
})

demoAlertRemove.addEventListener("click", function(){
    demoAlert.style.display = "none"
})

// document.addEventListener("scroll", storyParallax)
