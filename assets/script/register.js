var signUpForm = document.querySelector('#form-registration')

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
            alert(response.statusText)
        }
    }
}




signUpForm.addEventListener("submit", signUpFormHandler)