"use strict";
const { API_KEY, API_URL, params } = require("../config/config");

class ExternalAuthApiController{
    constructor(ExternalAuthApiServices, axios){
        this.ExternalAuthApiServices = ExternalAuthApiServices
        this.axios = axios
        this.API_KEY = API_KEY
        this.API_URL = API_URL
        this.params = params

    }

    async getApiSessionKey(){
        try {
            let {getGuestSessionRoute} = this.params
            const key = await this.ExternalAuthApiServices.getApiSessionKey(this.API_URL, getGuestSessionRoute, this.API_KEY, this.axios)
            
            return key.guest_session_id
            
        } catch (error) {
            throw error
            
        }
    }
}

module.exports = ExternalAuthApiController