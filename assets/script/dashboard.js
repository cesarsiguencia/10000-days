var addPost = document.querySelector('#add-post')

async function addPostHandler(event){
    event.preventDefault()

    const postText = document.querySelector('#post-text').value.trim()
    const postLink = document.querySelector('#post-link').value.trim()

    if(postText){
        if(!postLink){
            const response = await fetch('api/posts', {
                method: 'post',
                body: JSON.stringify({
                    postText,
                }),
                headers: {'Content-Type': 'application/json'}
            })
    
            if(response.ok){
                document.location.reload()
            } else {
                alert(response.statusText)
            }
        } else {
            const response = await fetch('api/posts', {
                method: 'post',
                body: JSON.stringify({
                    postText,
                    postLink
                }),
                headers: {'Content-Type': 'application/json'}
            })
    
            if(response.ok){
                document.location.reload()
            } else {
                alert(response.statusText)
            }
        }
        
    }
}

addPost.addEventListener("submit", addPostHandler) 

var credentialsForm = document.querySelector("#change-credentials")

async function changeCredentials(event){
    event.preventDefault()

    const newEmail = document.querySelector("#email-text").value.trim()
    const newUsername = document.querySelector("#username-text").value.trim()
    const newPassword = document.querySelector("#password-text").value.trim()
    console.log('working')

    if(newEmail){
        console.log('working 2')
        const responseEmail = await fetch('api/users/email', {
            method: 'put',
            body: JSON.stringify({
                newEmail
            }),
            headers: {'Content-Type': 'application/json'}
          
        })
        console.log('working 3')
        if(responseEmail.ok){
            window.alert('Email successfully changed!')
        } else {
            alert(responseEmail.statusText)
        }
    }

    if(newUsername){
        const responseUsername = await fetch('api/users/username', {
            method: 'put',
            body: JSON.stringify({
                newUsername
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if(responseUsername.ok){
            window.alert('Username successfully changed!')
        } else {
            alert(responseUsername.statusText)
        }
    }

    if(newPassword){
        const responsePassword = await fetch('api/users/password', {
            method: 'put',
            body: JSON.stringify({
                newPassword
            }),
            headers: {'Content-Type': 'application/json'}
        })
        if(responsePassword.ok){
            window.alert('Password successfully changed!')
        } else {
            alert(responsePassword.statusText)
        }
    }
}

credentialsForm.addEventListener("submit", changeCredentials)