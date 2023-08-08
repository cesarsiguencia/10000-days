const { getLinkPreview, getPreviewFromContent } = require ("link-preview-js")

var fetchOG = function(){
    var response = getLinkPreview("https://www.youtube.com/watch?v=69tG3hUouqk")
    console.log(response)
}

fetchOG()

