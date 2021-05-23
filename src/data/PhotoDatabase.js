const { Op } = require("sequelize");
const Photo = require("../models/Photo");
const PhotoComment = require("../models/PhotoComment");
const PhotoLike = require("../models/PhotoLike");
const CommentLike = require("../models/CommentLike");
const _Error = require("../models/Error");

class PhotoDatabase {
  async createPhoto(input) {
    try {
      return await Photo.create(input);
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async createComment({ photo_id, text, user_id }) {
    try {
      return await PhotoComment.create({ photo_id, text, user_id });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async likePhoto({ photo_id, user_id }) {
    try {
      return await PhotoLike.create({ photo_id, user_id });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async dislikePhoto({ user_id, photo_id }) {
    try {
      return await PhotoLike.destroy({
        where: { [Op.and]: [{ user_id }, { photo_id }] },
      });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async likeComment({ photo_id, comment_id, user_id }) {
    try {
      return await CommentLike.create({ photo_id, comment_id, user_id });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async dislikeComment({ user_id, photo_id, comment_id }) {
    try {
      return await CommentLike.destroy({
        where: { [Op.and]: [{ user_id }, { photo_id }, { comment_id }] },
      });
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async isPhotoPostedByThisUser({ url, user_id }) {
    try {
      const check = Photo.findAll({
        where: { [Op.and]: [{ url }, { user_id }] },
      });
      if (check) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async isPhotoLiked({ photo_id, user_id }) {
    try {
      const check = PhotoLike.findAll({
        where: { [Op.and]: [{ photo_id }, { user_id }] },
      });
      if (check) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getPhotoById(photo_id) {
    try {
      const photo = await Photo.findByPk(photo_id );
      const likes = await PhotoLike.findAndCountAll({where: {photo_id}})
      const comments = await PhotoComment.findAndCountAll({
        where: { photo_id },
      });

      return {photo, likes: likes.count, comments: comments.count}
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getPhotoById(photo_id) {
    try {
      const photo = await Photo.findByPk(photo_id, {
        include: { association: "comments" },
      });
      const likes = await PhotoLike.findAndCountAll({where: {photo_id}})

      return { photo: photo.toJSON(), likes: likes.count };
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getAllPhotos() {
    try {
      const photo = await Photo.findAll();
      return photo;
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getAllPhotosWithComments() {
    try {
      const photo = await Photo.findAll({
        include: { association: "comments" },
      });
      return photo;
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getPhotosByUserId(user_id) {
    try {
      const photo = await Photo.findAll({
        where: { user_id },
      });

      return photo;
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }

  async getPhotosByUserIdWithComments(user_id) {
    try {
      const photo = await Photo.findAll({
        where: { user_id },
        include: { association: "comments" },
      });

      return photo.toJSON();
    } catch (error) {
      throw new _Error(error.status, error.message);
    }
  }
}

module.exports = PhotoDatabase;
