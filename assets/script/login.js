var loginBtn = document.querySelector('#login-button')
var loginModal = document.querySelector('#login-modal')
var loginForm = document.querySelector('#login-container')
var closeModalButton = document.querySelector('#modal-close')
var alertModal = document.querySelector('#alert-modal')

function alertModalAppear(message){
    alertModal.style.height = "100vh"
    alertModal.querySelector('#alert-modal-text').textContent = message

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
    } else {
        alertModalAppear("Please fill out all credentials")
    }
}

loginBtn.addEventListener('click', function(){
    loginModal.style.height = "100vh"
})

loginForm.addEventListener('submit', login)

closeModalButton.addEventListener('click',function(){
    loginModal.style.height = "0px"
})