const {imageUrls,urlSizes} = require("./constants/imageUrls")
function createImageFromApi(data, type){
    let {baseUrl} = imageUrls
    let {backdrop, poster} = urlSizes

    if(type === "backdrop"){
        
        return`${baseUrl}${backdrop}${data}`
    }
    if(type === "poster") {
        return`${baseUrl}${poster}${data}`

    }
        

    


}


module.exports = createImageFromApi