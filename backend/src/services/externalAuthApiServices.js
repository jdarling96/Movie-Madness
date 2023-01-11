"use strict";
const {BadRequestError} = require("./expressErrorServices");

class ExternalAuthApiServices{

    static async getApiSessionKey(API_URL, getGuestSessionRoute, API_KEY, axios){
        const res = await axios.get(`${API_URL}${getGuestSessionRoute}?${API_KEY}`)
        .catch(() => {
            throw new BadRequestError("Check API url!")

        })
        return res.data

    }
}

module.exports = ExternalAuthApiServices