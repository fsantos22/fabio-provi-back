const PhotoDatabase = require("../data/PhotoDatabase");
const InputValidation = require("../services/InputValidation");
const Authenticator = require("../services/Authenticator");
const _Error = require("../models/Error");

class UserBusiness {
  async createPhoto(input, token) {
    try {
      const photoDb = new PhotoDatabase();
      const { url, text } = input;

      if (!url) {
        throw new _Error(422, "Missing input");
      }

      const auth = new Authenticator();
      const user_id = auth.getData(token).id;

      const validation = new InputValidation();
      validation.isImage(url);

      const findPost = await photoDb.isPhotoPostedByThisUser({ url, user_id });
      if (findPost) {
        throw new _Error(409, "This user already posted this photo");
      }

      return await photoDb.createPhoto({ url, text, user_id });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async createComment(input, token) {
    try {
      const photoDb = new PhotoDatabase();
      const { photo_id, text } = input;

      if (!text) {
        throw new _Error(422, "Missing input");
      }

      const auth = new Authenticator();
      const user_id = auth.getData(token).id;

      return await photoDb.createComment({ photo_id, text, user_id });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async likePhoto(input, token) {
    try {
      const photoDb = new PhotoDatabase();
      const { photo_id } = input;

      const auth = new Authenticator();
      const user_id = auth.getData(token).id;

      return await photoDb.likePhoto({ photo_id, user_id });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async dislikePhoto(input, token) {
    try {
      const photoDb = new PhotoDatabase();
      const { photo_id } = input;

      const auth = new Authenticator();
      const user_id = auth.getData(token).id;

      const isLiked = await photoDb.isPhotoLiked({ photo_id, user_id });
      if (!isLiked) {
        throw new _Error(422, "This user is not liking this photo yet");
      }

      return await photoDb.dislikePhoto({ photo_id, user_id });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async likeComment(input, token) {
    try {
      const photoDb = new PhotoDatabase();
      const { photo_id, comment_id } = input;

      const auth = new Authenticator();
      const user_id = auth.getData(token).id;

      return await photoDb.likeComment({ photo_id, comment_id, user_id });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async dislikeComment(input, token) {
    try {
      const photoDb = new PhotoDatabase();
      const { photo_id, comment_id } = input;

      const auth = new Authenticator();
      const user_id = auth.getData(token).id;

      return await photoDb.dislikeComment({ photo_id, comment_id, user_id });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }
  
  async getPhotoById(photo_id) {
    try {
      const photoDb = new PhotoDatabase();

      return await photoDb.getPhotoByIdWithComments(photo_id);
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getAllPhotos() {
    try {
      const photoDb = new PhotoDatabase();

      return await photoDb.getAllPhotos();
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getPhotosByUserId(token) {
    try {
      const auth = new Authenticator()
      const user_id = auth.getData(token).id

      const photoDb = new PhotoDatabase();
      return await photoDb.getPhotosByUserId(user_id);
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }
}

module.exports = UserBusiness;
