var addPostForm = document.querySelector('#add-post')
var credentialsForm = document.querySelector("#change-credentials")
var rsvpForm = document.querySelector("#change-attendance")
var dashboardClick = document.querySelector('#posts-center')
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
    pluarity = ""
    failedItems = []

    var alertModalClose = alertModal.querySelector('#alert-modal-close')
    alertModalClose.addEventListener("click", function(){
        window.location.reload()
    })
}

async function submitPost(event) {
    event.preventDefault()
    const postText = addPostForm.querySelector('#post-text').value.trim()
    const postLink = addPostForm.querySelector('#post-link').value.trim()
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
                alertModalAppear(response.statusText)
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
                alertModalAppear(response.statusText)
            }
        }
    }
}

let currentEditPostId

function managePosts(event) {
    var selectedPost = event.target
    var postId = selectedPost.getAttribute("post-id")
    if (selectedPost.matches(".trash")) {
        deletePost(postId)
        return
    }
    if (selectedPost.matches(".edit")) {
        currentEditPostId = postId
        loadEditPostModal(postId)
        return 
    }
    if (selectedPost.matches(".comment")) {
        loadCommentBlock(postId)
        return
    }
    if (selectedPost.matches(".comment-trash")) {
        var commentTrashId = event.target.getAttribute("comment-trash-id")
        deleteComment(commentTrashId)
        return
    }
}

async function deletePost(postId) {
    if (postId) {
        const responseDelete = await fetch(`api/posts/delete/${postId}`, {
            method: 'delete'
        })
        if (responseDelete.ok) {
            alertModalAppear("Your post was deleted")
        } else {
            alertModalAppear(responseDelete.statusText)
        }
    }
}

function loadEditPostModal(postId){
    //Grab Element Texts to Edit
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

    //Split quotes from selected post text to edit in modal
    var arr = selectedPostText.split("")
    arr = arr.slice(1)
    arr.pop()
    selectedPostText = arr.join("")
    editModal.style.height = "100vh"
    editModal.querySelector("input[name='post-modal-text']").value = selectedPostText;
    editModal.querySelector("input[name='post-modal-link']").value = selectedPostLink;
    editForm.addEventListener('submit', submitEditedPost)
    closeModalButton.addEventListener('click', function(){
        editModal.style.height = "0px"
    })
}

async function submitEditedPost(event) {
    event.preventDefault()
    var postId = currentEditPostId
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
            if(!responseText.ok) {
                failedItems.push(responseText.statusText)
            } else {
                changedItems.push("post text")
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
            if (!responseLink.ok) {
                failedItems(responseLink.statusText)
            } else {
                changedItems.push("post link")
            }
        }
        alertModalAppear(changedItems, failedItems)
    }
}

var commentBtnClicked = true

function loadCommentBlock(postId){
    // var editComment = document.querySelector(`[post-comment-input-block="${postId}"]`)
    var editCommentInput = document.querySelector(`[post-comment-belongs-to="${postId}"]`)
    var editCommentForm = document.querySelector(`[comment-form-id="${postId}"]`)
    currentEditPostId = postId
    
    if (commentBtnClicked == true) {
        editCommentForm.style.height = "70px"
        editCommentInput.style.height = "55px"
        editCommentInput.style.opacity = 1
        editCommentForm.addEventListener("submit", submitComment)
        return commentBtnClicked = false
    }

    if (commentBtnClicked == false) {
        editCommentForm.style.height = "0px"
        editCommentInput.style.height = "0px"
        editCommentInput.style.opacity = 0
        return commentBtnClicked = true
    }
}

async function submitComment(event) {
    event.preventDefault()
    var postId = currentEditPostId
    const newComment = document.querySelector(`[post-comment-belongs-to="${postId}"]`).value.trim()
    if (newComment) {
        const responseComment = await fetch('api/comments', {
            method: 'post',
            body: JSON.stringify({
                newComment,
                currentEditPostId
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        if (responseComment.ok) {
            document.location.reload()
        } else {
            alertModalAppear(responseComment.statusText)
        }
    }
}

async function deleteComment(commentId) {
    if (commentId) {
        const responseDeleteComment = await fetch(`api/comments/delete/${commentId}`, {
            method: 'delete',
        })
        if (responseDeleteComment.ok) {
            alertModalAppear('Comment deleted!')
        } else {
            alertModalAppear(responseDeleteComment.statusText)
        }
    }
}

// User Account Changes =============

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
            failedItems.push("Please enter an email.")
        } else {
            changedItems.push("email")
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
        if (!responseUsername.ok) {
            failedItems.push("Username already taken. Please enter a different username.")
        } else {
            changedItems.push("username")
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
        if (!responsePassword.ok) {
            failedItems.push(`Password returns an ${responsePassword.statusText}`)
        } else {
            changedItems.push("password")
        }
    } 
    alertModalAppear(changedItems, failedItems)
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
            failedItems(responseRSVP.statusText)
        }
    }
}






addPostForm.addEventListener("submit", submitPost)
credentialsForm.addEventListener("submit", changeCredentials)
rsvpForm.addEventListener("submit", changeRsvp)
dashboardClick.addEventListener("click", managePosts)