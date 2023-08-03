var addPost = document.querySelector('#add-post')
var credentialsForm = document.querySelector("#change-credentials")
var rsvpForm = document.querySelector("#change-attendance")
var dashboardClick = document.querySelector('#posts-center')
var alertModal = document.querySelector('#alert-modal')
var changedItems = []
var pluraity = ""

function alertModalAppear(message){
    alertModal.style.height = "100vh"
    if(Array.isArray(message)){
        if(message.length > 1){
            pluraity = "have"
            message = message.join(" & ")
        } else {
            pluraity = "has"
        }
        alertModal.querySelector('#alert-modal-text').textContent = `Your ${message} ${pluraity} been changed`
    } else {
        alertModal.querySelector('#alert-modal-text').textContent = message
    }
    changedItems = []
    pluarity = ""

    var alertModalClose = alertModal.querySelector('#alert-modal-close')
    alertModalClose.addEventListener("click", function(){
        window.location.reload()
    })
}

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

async function deletePost(postId) {
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

let currentEditPost

async function editPost(event) {
    event.preventDefault()
    var postId = currentEditPost
    var updatedText = document.querySelector(`[modal-text-id="${postId}"]`).value.trim()
    var updatedLink = document.querySelector(`[modal-link-id="${postId}"]`).value.trim()

    if (postId) {
        if (updatedText) {
            const responseText = await fetch(`api/posts/update/text/${postId}`, {
                method: 'put',
                body: JSON.stringify({
                    updatedText
                }),
                headers: { 'Content-Type': 'application/json' }

            })
            if (responseText.ok) {
                window.alert('Post text updated!')
            } else {
                alert(responseText.statusText)
            }
        }

        if (updatedLink) {
            const responseLink = await fetch(`api/posts/update/link/${postId}`, {
                method: 'put',
                body: JSON.stringify({
                    updatedLink
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if (responseLink.ok) {
                window.alert('Post link updated')
            } else {
                alert(responseLink.statusText)
            }
        }
        document.location.reload()
    }
}

var commentClicked = true

function managePosts(event) {
    var selectedPost = event.target
    var postId = selectedPost.getAttribute("post-id")
    if (selectedPost.matches(".trash")) {
        deletePost(postId)
        return
    }

    if (selectedPost.matches(".edit")) {
        var editModal = document.querySelector(`[modal-id="${postId}"]`)
        var editForm = document.querySelector(`[form-id="${postId}"]`)
        var closeModalButton = document.querySelector(`[close-id="${postId}"]`)
        var selectedPostText = document.querySelector(`[post-text-id="${postId}"]`).textContent;
        let selectedPostLink
        if (!document.querySelector(`[post-link-id="${postId}"]`)) {
            selectedPostLink = null
        } else {
            selectedPostLink = document.querySelector(`[post-link-id="${postId}"]`).getAttribute("href");
        }
        editModal.style.height = "100vh"
        currentEditPost = postId

        //Split quotes from post text
        var arr = selectedPostText.split("")
        arr = arr.slice(1)
        arr.pop()
        selectedPostText = arr.join("")

        editModal.querySelector("input[name='post-modal-text']").value = selectedPostText;
        editModal.querySelector("input[name='post-modal-link']").value = selectedPostLink;

        editForm.addEventListener('submit', editPost)
        closeModalButton.addEventListener('click', function(){
            editModal.style.height = "0px"
        })
        return currentEditPost
    }

    if (selectedPost.matches(".comment")) {
        var editComment = document.querySelector(`[post-comment-block="${postId}"]`)
        var editCommentInput = document.querySelector(`[post-comment-belongs-to="${postId}"]`)
        var editCommentForm = document.querySelector(`[comment-form-id="${postId}"]`)

        currentEditPost = postId
        if (commentClicked == true) {
            editComment.style.height = "30px"
            editCommentInput.style.height = "25px"
            editCommentForm.addEventListener("submit", submitComment)
            return commentClicked = false
        }

        if (commentClicked == false) {
            editComment.style.height = "0px"
            editCommentInput.style.height = "0px"
            return commentClicked = true
        }
    }

    if (selectedPost.matches(".comment-trash")) {
        var commentTrashId = event.target.getAttribute("comment-trash-id")
        deleteComment(commentTrashId)
        return
    }
}

async function deleteComment(commentId) {
    if (commentId) {
        const responseDeleteComment = await fetch(`api/comments/delete/${commentId}`, {
            method: 'delete',
        })
        if (responseDeleteComment.ok) {
            window.alert('Comment deleted!')
            window.location.reload()
        } else {
            alert(responseDeleteComment.statusText)
        }
    }
}

async function submitComment(event) {
    event.preventDefault()
    var postId = currentEditPost
    const newComment = document.querySelector(`[post-comment-belongs-to="${postId}"]`).value.trim()
    if (newComment) {
        const responseComment = await fetch('api/comments', {
            method: 'post',
            body: JSON.stringify({
                newComment,
                currentEditPost
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (responseComment.ok) {
            window.alert('Comment link updated')
            window.location.reload()
        } else {
            alert(responseComment.statusText)
        }

    }
}

// User Setting Changes

async function changeCredentials(event) {
    event.preventDefault()

    const newEmail = document.querySelector("#email-text").value.trim()
    const newUsername = document.querySelector("#username-text").value.trim()
    const newPassword = document.querySelector("#password-text").value.trim()

    if (newEmail) {
        const responseEmail = await fetch('api/users/email', {
            method: 'put',
            body: JSON.stringify({
                newEmail,
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!responseEmail.ok) {
            alert("Please enter an email")
            return
        }
        changedItems.push("email")
    }

    if (newUsername) {
        const responseUsername = await fetch('api/users/username', {
            method: 'put',
            body: JSON.stringify({
                newUsername
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!responseUsername.ok) {
            alert(responseUsername.statusText)
        }
        changedItems.push("username")
    }

    if (newPassword) {
        const responsePassword = await fetch('api/users/password', {
            method: 'put',
            body: JSON.stringify({
                newPassword
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (!responsePassword.ok) {
            alert(responsePassword.statusText)
        }
        changedItems.push("password")
    }
    alertModalAppear(changedItems)
}

async function changeRsvp(event) {
    event.preventDefault()
    const newRSVP = document.querySelector('input[name="form-attend"]:checked').value;

    if (newRSVP) {
        const responseRSVP = await fetch('api/users/rsvp', {
            method: 'put',
            body: JSON.stringify({
                newRSVP
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if(responseRSVP.ok) {
            changedItems.push("RSVP")
            alertModalAppear(changedItems)
        } else {
            alert(responseRSVP.statusText)
        }
    }
}

addPost.addEventListener("submit", addPostHandler)
credentialsForm.addEventListener("submit", changeCredentials)
rsvpForm.addEventListener("submit", changeRsvp)
dashboardClick.addEventListener("click", managePosts)