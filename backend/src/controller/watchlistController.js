"use strict";

class WatchlistController {
  constructor(QueueAndWatchlistModel, UserModel) {
    this.WatchlistModel = QueueAndWatchlistModel;
    this.UserModel = UserModel;
    this.watchlist = "watchlist";
  }

  async getWatchlist(username) {
    try {
      const user = new this.UserModel({ username });
      const getUserId = await user.get();
      const userId = getUserId.id;
      const watchlist = new this.WatchlistModel(userId, this.watchlist);
      const movieIds = await watchlist.getTable();
      const movies = await watchlist.getMovies(
        movieIds.map((id) => id.movieId)
      );
      return { movies };
    } catch (error) {
      throw error;
    }
  }

  async addToWatchlist(movieData, username) {
    try {
      const { id, name, poster } = movieData;
      const user = new this.UserModel({ username });
      const getUserId = await user.get();
      const userId = getUserId.id;
      const watchlist = new this.WatchlistModel(userId, this.watchlist, id, name, poster);
      await watchlist.checkDuplicate();
      await watchlist.check();
      const add = await watchlist.add();
      return add;
    } catch (error) {
      throw error;
    }
  }

  async deleteFromWatchlist(movieData, username) {
    try {
      const { id } = movieData;
      const user = new this.UserModel({ username });
      const getuserId = await user.get();
      const userId = getuserId.id;
      const watchlist = new this.WatchlistModel(userId, this.watchlist, id);
      const deleted = await watchlist.delete();
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = WatchlistController;