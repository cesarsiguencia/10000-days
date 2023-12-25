var signUpForm = document.querySelector('#form-registration')
var alertModal = document.querySelector('#alert-modal')

// var changedItems = []
// var failedItems = []

// function alertModalAppear(message, failed){
//     // alertModal.style.height = "100vh"
//     // alertModal.querySelector('#alert-modal-text').textContent = message

//     // var alertModalClose = alertModal.querySelector('#alert-modal-close')
//     // alertModalClose.addEventListener("click", function(){
//     //     alertModal.style.height = "0px"
//     // })

//     console.log('going with alert')
//     console.log(failed)
//     alertFunction(message, failed)
 
//     changedItems.length = 0
//     failedItems.length = 0 
// }



async function signUpFormHandler(event){
    event.preventDefault()

    const firstName = document.querySelector('#form-first-name').value.trim();
    const lastName = document.querySelector('#form-first-name').value.trim();
    const email = document.querySelector('#form-email').value.trim();
    const username = document.querySelector('#form-username').value.trim();
    const password = document.querySelector('#form-password').value.trim();
    var attendance = document.querySelector('input[name="form-attend"]:checked')

    if(!attendance){
        failedItems.push("Please check all boxes")
        alertModalAppear(null, failedItems)
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



            if(res.name === 'SequelizeValidationError'){
                failedItems.push('Password MUST include both letters and numbers and be at least 8 characters long')



            } else if (res.name === "SequelizeUniqueConstraintError"){
                console.log(res.errors[0].path)
                switch (res.errors[0].path){
                    case 'username':
                        failedItems.push('Username is already taken. Create a different username');
                        break;
                    case 'email':
                        failedItems.push('A different user is registered with this email. Use a different email to sign up.');
                        break;
                    default:
                        failedItems.push('You cannot sign up at this time. Please try again later');
                }
       
            } 
            
            else {
                failedItems.push(res.name)
                
            }
            alertModalAppear(null, failedItems)
            
        } else {
            document.location.replace('/dashboard')
            // initiate session
        }
    } else {
        failedItems.push('Please fill out all form fields!')
        alertModalAppear(null, failedItems)
    }
}


signUpForm.addEventListener("submit", signUpFormHandler)