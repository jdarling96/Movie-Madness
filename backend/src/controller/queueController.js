"use strict";
class QueueController {
  constructor(QueueModel, UserModel) {
    this.QueueModel = QueueModel;
    this.UserModel = UserModel;
  }

  async getQueue(username) {
    try {
      const user = new this.UserModel({ username });
      const getUserId = await user.get();
      const userId = getUserId.id;
      const queue = new this.QueueModel(userId);
      const movieIds = await queue.getQueue();
      const movies = await queue.getMovies(
        movieIds.map((id) => id.movieId.toString())
      );
      return { movies };
    } catch (error) {
      throw error;
    }
  }

  async addToQueue(movieData, username) {
    try {
      const { id, name, poster } = movieData;
      const user = new this.UserModel({ username });
      const getuserId = await user.get();
      const userId = getuserId.id;
      const queue = new this.QueueModel(userId, id, name, poster);
      await queue.checkDuplicate();
      await queue.check();
      const addedToQueue = await queue.add();
      return { addedToQueue };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = QueueController;
