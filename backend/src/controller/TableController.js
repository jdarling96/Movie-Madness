"use strict";
class TableController {
  constructor(TableModel, UserModel, table) {
    this.TableModel = TableModel;
    this.UserModel = UserModel;
    this.table = table
  }


  async getTable(username) {
    try {
      
      const user = new this.UserModel({ username });
      const getUserId = await user.get();
      const userId = getUserId.id;
      const table = new this.TableModel(userId, this.table);
      const movieIds = await table.getTable();
      const movies = await table.getMovies(
        movieIds.map((id) => id.movieId.toString())
      );
      return { movies };
    } catch (error) {
      throw error;
    }
  }

  async addToTable(movieData, username) {
    try {
      const { id, name, poster } = movieData;
      const user = new this.UserModel({ username });
      const getUserId = await user.get();
      const userId = getUserId.id;
      const table = new this.TableModel(userId, this.table, id, name, poster);
      await table.checkDuplicate();
      await table.check();
      const add = await table.add();
      return add;
    } catch (error) {
      throw error;
    }
  }

  async deleteFromTable(movieData, username) {
    try {
      const { id } = movieData;
      const user = new this.UserModel({ username });
      const getuserId = await user.get();
      const userId = getuserId.id;
      const table = new this.TableModel(userId, this.table, id);
      const deleted = await table.delete();
      return deleted;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TableController;
