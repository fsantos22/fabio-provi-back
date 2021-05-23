const User = require("../models/User");
const UserDatabase = require("../data/UserDatabase");
const PhotoBusiness = require("../business/PhotoBusiness");
const PhotoDatabase = require("../data/PhotoDatabase");

module.exports = {
  async createPhoto(req, res) {
    try {
      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);

      const photoBusiness = new PhotoBusiness();
      const { url, text } = req.body;

      await photoBusiness.createPhoto({ url, text, user_id }, token);

      return res.status(201).send({ message: "Success" });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async createComment(req, res) {
    try {
      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);

      const photoBusiness = new PhotoBusiness();
      const { photo_id } = req.params;
      const { text } = req.body;

      await photoBusiness.createComment({ photo_id, text }, token);

      return res.status(201).send({ message: "Success" });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async likePhoto(req, res) {
    try {
      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);

      const photoBusiness = new PhotoBusiness();
      const { photo_id } = req.params;

      await photoBusiness.likePhoto({ photo_id }, token);

      return res.status(201).send({ message: "Success" });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async dislikePhoto(req, res) {
    try {
      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);

      const photoBusiness = new PhotoBusiness();
      const { photo_id} = req.params;

      await photoBusiness.dislikePhoto({ photo_id},token);

      return res.status(201).send({ message: "Success" });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async likeComment(req, res) {
    try {
      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);

      const photoBusiness = new PhotoBusiness();
      const { comment_id, photo_id } = req.params;

      await photoBusiness.likeComment({ comment_id, photo_id },token);

      return res.status(201).send({ message: "Success" });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async dislikeComment(req, res) {
    try {
      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);

      const photoBusiness = new PhotoBusiness();
      const { comment_id, photo_id } = req.params;

      await photoBusiness.dislikeComment({ comment_id, photo_id },token);

      return res.status(201).send({ message: "Success" });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async getAllPhotos(req, res) {
    try {
      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);

      const photoBusiness = new PhotoBusiness();
      const photos = await photoBusiness.getAllPhotos();

      return res.status(200).send({ photos });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async getPhotosByUserId(req, res) {
    try {
      const userDb = new UserDatabase();
      const token = req.headers.authorization;
      await userDb.validateCredentials(token);

      const photoBusiness = new PhotoBusiness();
      const photos = await photoBusiness.getPhotosByUserId(token);

      return res.status(200).send(photos);
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },

  async getPhotoById(req, res) {
    try {
      const { photo_id } = req.params;

      const photoBusiness = new PhotoBusiness();
      const photos = await photoBusiness.getPhotoById(photo_id);

      return res.status(200).send({ photos });
    } catch (error) {
      res.status(error.status).send({ error: error.message });
    }
  },
};
