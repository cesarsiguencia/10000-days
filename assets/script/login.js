var loginBtn = document.querySelector('#login-button')
var loginModal = document.querySelector('#login-modal')
var loginForm = document.querySelector('#login-container')
var closeModalButton = document.querySelector('#modal-close')

var alertModal = document.querySelector('#alert-modal')
var changedItems = []
var failedItems = []
var pluraity = ""

function alertModalAppear(message, failedItems){
    alertModal.style.height = "100vh"
    if(Array.isArray(message)){
        if(message.length > 1){
            pluraity = "have"
            message = message.join(" & ")
        } else {
            pluraity = "has"
        }
        alertModal.querySelector('#alert-modal-text').textContent = `Your ${message} ${pluraity} been updated!`
    } else {
        alertModal.querySelector('#alert-modal-text').textContent = message
    }

    if(failedItems){
        if(failedItems.length > 1){
            failedItems = failed.join(" || ")
        }
        alertModal.querySelector('#alert-modal-text-2').textContent = failedItems
    }

    changedItems = []
    pluraity = ""
    failedItems = []

    var alertModalClose = alertModal.querySelector('#alert-modal-close')
    alertModalClose.addEventListener("click", function(){
        alertModal.style.height = "0px"
    })
}

async function login(event){
    event.preventDefault()

    const loginEmail = document.querySelector('#login-email').value.trim()
    const loginPassword = document.querySelector('#login-password').value.trim()

    if(loginEmail && loginPassword){
        const response = await fetch('api/users/login', {
            method:'post',
            body: JSON.stringify({
                loginEmail,
                loginPassword
            }),
            headers:{'Content-Type':'application/json'}
        })

        if(response.ok){
            document.location.replace('/dashboard')
        } else {
            alertModalAppear("Incorrect credentials")
        }
    }
}

loginBtn.addEventListener('click', function(){
    loginModal.style.height = "100vh"
})

loginForm.addEventListener('submit', login)

closeModalButton.addEventListener('click',function(){
    loginModal.style.height = "0px"
})