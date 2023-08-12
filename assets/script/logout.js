var logoutBtn = document.querySelector('#logout-button')
var logoutModal = document.querySelector('#logout-modal')
var closeModalButton = document.querySelector('#modal-close')

async function logout(){
    logoutModal.style.height = "100vh"

    const response = await fetch('api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok){
        logoutModal.style.height = "100vh"
    } else {
        alertModalAppear(response.statusText)
    }
}

logoutBtn.addEventListener("click", logout)

closeModalButton.addEventListener("click",function(){
    document.location.replace('/home')
})