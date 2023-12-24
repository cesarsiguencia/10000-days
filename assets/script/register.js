var signUpForm = document.querySelector('#form-registration')
var alertModal = document.querySelector('#alert-modal')

var changedItems = []
var failedItems = []

function alertAppear(message, failed){
    // alertModal.style.height = "100vh"
    // alertModal.querySelector('#alert-modal-text').textContent = message

    // var alertModalClose = alertModal.querySelector('#alert-modal-close')
    // alertModalClose.addEventListener("click", function(){
    //     alertModal.style.height = "0px"
    // })

    console.log('going with alert')
    console.log(failed)
    alertFunction(message, failed)
 
    changedItems.length = 0
    failedItems.length = 0 
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
            const res = await response.json()
            console.log(res)

            failedItems.push(res.name)
            console.log(failedItems)
            alertAppear(null, failedItems)
            
        } else {
            document.location.replace('/dashboard')
        }
    } else {
        failedItems.push('Please fill out all form fields!')
        alertModalAppear(null, failedItems)
    }
}


signUpForm.addEventListener("submit", signUpFormHandler)