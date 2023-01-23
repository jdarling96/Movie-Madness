"use strict";
class QueueController {
    constructor(QueueModel, UserModel) {
      this.QueueModel = QueueModel
      this.UserModel = UserModel
    }

    async getQueue(username){
        try {
        const user = new this.UserModel({username})
        const userId = await user.get()    

            // call queue model
            
        } catch (error) {
            throw error
            
        }
    }

    async addToQueue(movieData, username){
        try {
            const {id, name, poster} = movieData
            const user = new this.UserModel({username})
            const getuserId = await user.get()
            const userId = getuserId.id
            console.log(username)
            console.log(userId)
            const queue = new this.QueueModel(userId, id, name, poster)
            await queue.checkDuplicate()
            await queue.check()
            const addToQueue = await queue.add()
            return {addToQueue}
            
           
            
        } catch (error) {
            throw error
            
        }
    }

   
}

module.exports = QueueController