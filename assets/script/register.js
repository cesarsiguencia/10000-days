var signUpForm = document.querySelector('#form-registration')

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

async function signUpFormHandler(event){
    event.preventDefault()

    const firstName = document.querySelector('#form-first-name').value.trim();
    const lastName = document.querySelector('#form-first-name').value.trim();
    const email = document.querySelector('#form-email').value.trim();
    const username = document.querySelector('#form-username').value.trim();
    const password = document.querySelector('#form-password').value.trim();
    const attendance = document.querySelector('input[name="form-attend"]:checked').value;


    if(firstName && lastName && email && username && password){
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

        if(response.ok){
            document.location.replace('/dashboard')
        } else {
            alertModalAppear(response.statusText)
        }
    }
}


signUpForm.addEventListener("submit", signUpFormHandler)