var loginBtn = document.querySelector('#login-button')
var dashboardBtn = document.querySelector('#dashboard-button')
var trialModal = document.querySelector('#trial-modal')
var closeTrial = document.querySelector('#close-trial')

if(loginBtn){
    loginBtn.addEventListener("click", function(){
        trialModal.style.height="100vh"
    })
}

if(dashboardBtn){
    dashboardBtn.addEventListener("click", function(){
        trialModal.style.height="100vh"
    })

    closeTrial.addEventListener("click", function(){
        window.location = "/dashboard"
    })
}

closeTrial.addEventListener("click", function(){
    trialModal.style.height="0px"
})

function onIntroPg(){
    if(document.URL = 'https://cs-10000-days-33ee2045b3a6.herokuapp.com/)'){
        setTimeout(function(){
            trialModal.style.height="100vh"
        }, 1000)
        
    }

}

onIntroPg()



