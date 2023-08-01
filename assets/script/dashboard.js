var addPost = document.querySelector('#add-post')
var credentialsForm = document.querySelector("#change-credentials")
var rsvpForm = document.querySelector("#change-attendance")
// var trashBin = document.querySelectorAll('.trash')
// var editBtn = document.querySelector('.edit')

var dashboardClick = document.querySelector('#posts-center')

async function addPostHandler(event) {
    event.preventDefault()

    const postText = document.querySelector('#post-text').value.trim()
    const postLink = document.querySelector('#post-link').value.trim()

    if (postText) {
        if (!postLink) {
            const response = await fetch('api/posts', {
                method: 'post',
                body: JSON.stringify({
                    postText,
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.ok) {
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
                headers: { 'Content-Type': 'application/json' }
            })

            if (response.ok) {
                document.location.reload()
            } else {
                alert(response.statusText)
            }
        }

    }
}
addPost.addEventListener("submit", addPostHandler)

async function changeCredentials(event) {
    event.preventDefault()

    const newEmail = document.querySelector("#email-text").value.trim()
    const newUsername = document.querySelector("#username-text").value.trim()
    const newPassword = document.querySelector("#password-text").value.trim()

    if (newEmail) {
        const responseEmail = await fetch('api/users/email', {
            method: 'put',
            body: JSON.stringify({
                newEmail
            }),
            headers: { 'Content-Type': 'application/json' }

        })
        if (responseEmail.ok) {
            window.alert('Email successfully changed!')
        } else {
            alert(responseEmail.statusText)
        }
    }

    if (newUsername) {
        const responseUsername = await fetch('api/users/username', {
            method: 'put',
            body: JSON.stringify({
                newUsername
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (responseUsername.ok) {
            window.alert('Username successfully changed!')
        } else {
            alert(responseUsername.statusText)
        }
    }

    if (newPassword) {
        const responsePassword = await fetch('api/users/password', {
            method: 'put',
            body: JSON.stringify({
                newPassword
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (responsePassword.ok) {
            window.alert('Password successfully changed!')

        } else {
            alert(responsePassword.statusText)
        }
    }
}
credentialsForm.addEventListener("submit", changeCredentials)

async function changeRsvp(event) {
    event.preventDefault()
    const newRSVP = document.querySelector('input[name="form-attend"]:checked').value;
    console.log(newRSVP)

    if (newRSVP) {
        const responseRSVP = await fetch('api/users/rsvp', {
            method: 'put',
            body: JSON.stringify({
                newRSVP
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (responseRSVP.ok) {
            window.alert("You changed your RSVP!")
            document.location.reload()
        } else {
            alert(responseRSVP.statusText)
        }
    }
}
rsvpForm.addEventListener("submit", changeRsvp)

var editModal = document.querySelector('#edit-modal')
var editForm = document.querySelector('#edit-container')
var closeModalButton = document.querySelector('#edit-close')

async function deletePost(event) {
    console.log(event.target, 'newww')
    var selectedPost = event.target
    if (selectedPost.matches(".trash")) {
        var postId = selectedPost.getAttribute("post-id")

        if (postId) {
            const responseDelete = await fetch(`api/posts/delete/${postId}`, {
                method: 'delete'
            })
            if (responseDelete.ok) {
                window.alert("Your post was deleted")
                document.location.reload()
            } else {
                alert(responseDelete.statusText)
            }
        }
    }

    if(selectedPost.matches(".edit")){

        editModal.style.height = "100vh"
        editForm.addEventListener('submit', editPost)

// editBin.addEventListener("click", editPost)
    }
}
dashboardClick.addEventListener("click", deletePost)
closeModalButton.addEventListener('click',function(){
    editModal.style.height = "0px"
    })

// async function editPost(event){
//     var selectedPost = event.target.getAttribute('post-id')
//     console.log(selectedPost)

//     if(selectedPost){
//         const responseDelete = await fetch(`api/posts/delete/${selectedPost}`, {
//             method: 'delete'
//         })
//         if(responseDelete.ok){
//             window.alert("Your post was deleted")
//             document.location.reload()
//         } else {
//             alert(responseDelete.statusText)
//         }
//     }

// }






async function editPost(event) {
    event.preventDefault()



    // const loginEmail = document.querySelector('#login-email').value.trim()
    // const loginPassword = document.querySelector('#login-password').value.trim()

    // if(loginEmail && loginPassword){
    //     const response = await fetch('api/users/login', {
    //         method:'post',
    //         body: JSON.stringify({
    //             loginEmail,
    //             loginPassword
    //         }),
    //         headers:{'Content-Type':'application/json'}
    //     })

    //     if(response.ok){
    //         document.location.replace('/dashboard')
    //     } else {
    //         alert(response.statusText)
    //     }
    // }
}



