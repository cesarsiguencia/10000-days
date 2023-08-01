var loginBtn = document.querySelector('#login-button')
var loginModal = document.querySelector('#login-modal')
var loginForm = document.querySelector('#login-container')
var closeModalButton = document.querySelector('#modal-close')

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
            alert(response.statusText)
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