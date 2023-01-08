const { imageUrls, urlSizes } = require("./constants/imageUrls");
function createImageFromApi(data) {
  let { baseUrl } = imageUrls;
  let { backdrop, poster } = urlSizes;

  for (let key in data) {
    if (key === "backdrop_path") {
      let endURL = data[key]
      data[key] = `${baseUrl}${backdrop}${endURL}`;
    }
    if (key === "poster_path") {
      let endURL = data[key]
      data[key] = `${baseUrl}${poster}${endURL}`;
    }
  }

  return data;
}

module.exports = createImageFromApi;
