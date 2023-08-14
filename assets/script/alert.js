var alertModal = document.querySelector('#alert-modal')
var pluraity = ""


function alertFunction(message, failedItems){
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
        alertModal.querySelector('#alert-modal-text-2').textContent = 
        failedItems
    }
    console.log('worked')
    // changedItems = []
    pluraity = ""
    // failedItems = []

    var alertModalClose = alertModal.querySelector('#alert-modal-close')
    alertModalClose.addEventListener("click", function(){
        window.location.reload()
    })
}