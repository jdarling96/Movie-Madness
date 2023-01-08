const { imageUrls, urlSizes } = require("./constants/imageUrls");

const utils = {
    createImageFromApiObject (data) {
        let { baseUrl } = imageUrls;
        let { backdrop, poster } = urlSizes;
      
        for (let key in data) {
          if (key === "backdrop_path" && data[key]) {
            let endURL = data[key]
            data[key] = `${baseUrl}${backdrop}${endURL}`;
          }
          if (key === "poster_path" && data[key]) {
            let endURL = data[key]
            data[key] = `${baseUrl}${poster}${endURL}`;
          }
        }
      
        return data;
      },
      createImageFromApiArray (data){
        let { baseUrl } = imageUrls;
        let { backdrop, poster } = urlSizes;
        let {results, ...rest} = data
        
        let newData = results.map(data => {
            
                if(data.backdrop_path){
                    let endURL = data.backdrop_path
                    data.backdrop_path = `${baseUrl}${backdrop}${endURL}`
                }
                if(data.poster_path){
                    let endURL = data.poster_path
                    data.poster_path = `${baseUrl}${poster}${endURL}`;
                }
                return data

            })
            
        
        return {...rest, newData}

}




}




module.exports = utils
