var signUpForm = document.querySelector('#form-registration')
var alertModal = document.querySelector('#alert-modal')

function alertModalAppear(message){
    alertModal.style.height = "100vh"
    alertModal.querySelector('#alert-modal-text').textContent = message

    var alertModalClose = alertModal.querySelector('#alert-modal-close')
    alertModalClose.addEventListener("click", function(){
        alertModal.style.height = "0px"
    })
}

async function signUpFormHandler(event){
    event.preventDefault()

    const firstName = document.querySelector('#form-first-name').value.trim();
    const lastName = document.querySelector('#form-first-name').value.trim();
    const email = document.querySelector('#form-email').value.trim();
    const username = document.querySelector('#form-username').value.trim();
    const password = document.querySelector('#form-password').value.trim();
    var attendance = document.querySelector('input[name="form-attend"]:checked')

    if(!attendance){
        alertModalAppear("Please check all boxes")
        return
    }
    attendance = attendance.value

    if(firstName && lastName && email && username && password && attendance){
        const response = await fetch('api/users', {
            method: 'post',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username,
                password,
                attendance
            }),
            headers: {'Content-Type': 'application/json'}
        })

        if(!response.ok){
            alertModalAppear(response.statusText, "failed sign up")
            
        } else {
            document.location.replace('/dashboard')
        }
    } else {
        alertModalAppear('Please fill out all form fields!')
    }
}

signUpForm.addEventListener("submit", signUpFormHandler)