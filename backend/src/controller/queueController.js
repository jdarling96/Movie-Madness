"use strict";

class QueueController {
  constructor(QueueAndWatchlistModel, UserModel) {
    this.QueueModel = QueueAndWatchlistModel;
    this.UserModel = UserModel;
    this.queue = "queue";
  }

  async getQueue(username) {
    try {
      const user = new this.UserModel({ username });
      const getUserId = await user.get();
      const userId = getUserId.id;
      const queue = new this.QueueModel(userId, this.queue);
      const movieIds = await queue.getTable();
      const movies = await queue.getMovies(
        movieIds.map((id) => id.movieId)
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
      const getUserId = await user.get();
      const userId = getUserId.id;
      const queue = new this.QueueModel(userId, this.queue, id, name, poster);
      await queue.checkDuplicate();
      await queue.check();
      const add = await queue.add();
      return add;
    } catch (error) {
      throw error;
    }
  }

  async deleteFromQueue(movieData, username) {
    try {
      const { id } = movieData;
      const user = new this.UserModel({ username });
      const getuserId = await user.get();
      const userId = getuserId.id;
      const queue = new this.QueueModel(userId, this.queue, id);
      const deleted = await queue.delete();
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = QueueController;
