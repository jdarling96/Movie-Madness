"use strict";
class QueueController {
    constructor(QueueServices, QueueModel, UserModel) {
      this.QueueServices = QueueServices
      this.QueueModel = QueueModel
      this.UserModel = UserModel
    }

    async getQueue(username){
        try {
        const userId = await new this.UserModel({username})    

            // call queue model
            
        } catch (error) {
            throw error
            
        }
    }
}