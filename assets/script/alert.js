var alertModal = document.querySelector('#alert-modal')
var pluraity = ""

var changedItems = []
var failedItems = []

function alertModalAppear(message, failed){
    console.log(message)
    if(message === null || !message.length ){
        message = null
    }
    console.log(message)
    console.log(failed)
    alertModal.style.height = "100vh"
    if(message){
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
    }

    console.log(changedItems)
    console.log(message)
    

    if(failed){
        if(failed.length > 1){
            console.log(failed)
            failed = failed.join("<br/><br/>")
        }
        alertModal.querySelector('#alert-modal-text-2').innerHTML = 
        failed
    }
    pluraity = ""

    var alertModalClose = alertModal.querySelector('#alert-modal-close')
    console.log(changedItems)
    alertModalClose.addEventListener("click", function(){
        console.log(changedItems)
        if(changedItems.length > 0 || message){
            console.log(changedItems)
            console.log('reload!')
            window.location.reload()

          
        } else {
            console.log('there are no saved successes')
            alertModal.style.height = "0px";

            changedItems.length = 0
            failedItems.length = 0 
        }
        
    })
}

// function alertModalAppear(message, failed){
//     alertFunction(message, failed)
//     changedItems.length = 0
//     failedItems.length = 0 
// }