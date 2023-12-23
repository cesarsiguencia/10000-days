var addPostForm = document.querySelector('#add-post')
var credentialsForm = document.querySelector("#change-credentials")
var rsvpForm = document.querySelector("#change-attendance")
var dashboardClick = document.querySelector('#posts-center')

var changedItems = []
var failedItems = []

function alertModalAppear(message, failedItems){
    alertFunction(message, failedItems)
    changedItems = []
    failedItems = []
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
                    postLink: null
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

let selectedPostText
let selectedPostLink

function loadEditPostModal(postId){
    //Grab Element Texts to Edit
    var editModal = document.querySelector(`[modal-id="${postId}"]`)
    var editForm = document.querySelector(`[form-id="${postId}"]`)
    var closeModalButton = document.querySelector(`[close-id="${postId}"]`)
    selectedPostText = document.querySelector(`[post-text-id="${postId}"]`).textContent;
    
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
        if (updatedText !== selectedPostText) {
            const responseText = await fetch(`api/posts/update/text/${postId}`, {
                method: 'put',
                body: JSON.stringify({
                    updatedText
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if(!responseText.ok) {
                const res = await responseText.json()
                if (res.name === 'SequelizeDatabaseError' ){
                    failedItems.push('Post text must be under 250 characters!')
                } else if (res.name === 'SequelizeValidationError'){
                    failedItems.push('Cannot leave post text blank!')
                } else {
                    failedItems.push(`${responseText.statusText}. There is a problem with the data server.`)
                }
            } else {
                changedItems.push("post text")
            }
        } 
 
        if (updatedLink !== selectedPostLink) {
            if(updatedLink === ""){
                console.log('yes')
                updatedLink === null
            }
            const responseLink = await fetch(`api/posts/update/link/${postId}`, {
                method: 'put',
                body: JSON.stringify({
                    updatedLink
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if(!responseLink.ok) {
                const res = await responseLink.json()
                console.log(res)
                if (res.name === 'SequelizeDatabaseError' ){
                    failedItems.push('Post link must be under 250 characters!')
                } else if (res.name === 'SequelizeValidationError'){
                    if(updatedLink == ""){
                        failedItems.push("URL links cannot be removed from posts once they are included. You can either change the link to a new URL or remove the post as a whole.")
                    } else {
                        failedItems.push('Your updated link MUST be a URL link!')
                    }
                } else {
                    failedItems.push(`${responseLink.statusText}. There is a problem with the data server.`)
                }
            } else {
                changedItems.push("post link")
            }
        }
    
        

        if(changedItems.length === 0){
            changedItems = 'No changes submitted'
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
            alertModalAppear('You are not allowed to delete posts with comments')
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
            failedItems.push("EMAIL is already taken. Try a different email.")
        } else {
            const res = await responseEmail.json()
            console.log(res)

            if(res[0] === 0){
                failedItems.push('Your new EMAIL is the same as current! No changes.')
            }

            if(res[0] === 1){
                changedItems.push("EMAIL")
            }
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
            failedItems.push("USERNAME already taken. Try a different username.")
        } else {

            const res = await responseUsername.json()
            console.log(res)

            if(res[0] === 0){
                failedItems.push('Your new USERNAME is the same as current! No changes.')
            }

            if(res[0] === 1){
                changedItems.push("USERNAME")
            }
            
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
            failedItems.push(`PASSWORD returns an ${responsePassword.statusText}. Make sure it contains both letters and numbers and is at least 8 characters long.`)
        } else {
            const res = await responsePassword.json()
            console.log(res)

            if(res[0] === 0){
                failedItems.push('Your new PASSWORD is the same as current! No changes.')
            }

            if(res[0] === 1){
                changedItems.push("PASSWORD")
            }
        }
    } 
    if(changedItems.length === 0 && failedItems.length === 0){
        changedItems = 'No changes submitted'
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