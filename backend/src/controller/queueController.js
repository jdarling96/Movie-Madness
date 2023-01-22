"use strict";
class QueueController {
    constructor(QueueServices, QueueModel, UserModel) {
      this.QueueServices = QueueServices
      this.QueueModel = QueueModel
      this.UserModel = UserModel
    }

    async getQueue(username){
        try {
        const user = await new this.UserModel({username})
        const userId = await user.get()    

            // call queue model
            
        } catch (error) {
            throw error
            
        }
    }

    async AddtoQueue()
}