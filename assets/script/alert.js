var alertModal = document.querySelector('#alert-modal')
var pluraity = ""


function alertFunction(message, failedItems){
    console.log(message)
    alertModal.style.height = "100vh"
    if(message.length > 0){
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
    }

    if(failedItems){
        if(failedItems.length > 1){
            failedItems = failed.join(" || ")
        }
        alertModal.querySelector('#alert-modal-text-2').textContent = 
        failedItems
    }
    pluraity = ""

    var alertModalClose = alertModal.querySelector('#alert-modal-close')
    alertModalClose.addEventListener("click", function(){
        window.location.reload()
    })
}