var welcomeBox = document.querySelector(".carousel")
var createItem = ''
var welcomeMenu = document.querySelector(".hero-menu")

// setTimeout(() => {
//     welcomeBox.classList.add("welcome-box-animation")
// }, 1000)

setTimeout(() => {
    welcomeMenu.classList.add("hero-menu-animation")
}, 8000)



var i = 0
var words = ["You're Invited", "10000", "October"]
var time = 4000

function changeWords(){

    if (createItem){
        createItem.remove()
    }

    createItem = document.createElement("div");
    createItem.className = 'carousel-item';
    createItem.className = 'welcome-box-animation'
    createItem.innerHTML = "<h1>" + words[i] + "</h1>"


    welcomeBox.appendChild(createItem)
    carouselItem = createItem

    if(i < words.length-1){
        i++
    } else {
        return
    }

    setTimeout("changeWords()", time)
    
}

window.onload=changeWords