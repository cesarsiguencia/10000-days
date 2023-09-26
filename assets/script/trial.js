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

