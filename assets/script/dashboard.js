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