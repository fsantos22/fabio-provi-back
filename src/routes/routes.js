const express = require('express')
const UserController = require('../controller/UserController')
const PhotoController = require("../controller/PhotoController");

const routes = express.Router()

routes.post("/auth/login", UserController.login);
routes.put("/auth/logout", UserController.logout);

routes.post("/users/signin", UserController.createUser);
routes.get("/users/profile", UserController.getUserProfile);
routes.get("/users/sessions", UserController.getUserSessions);

routes.get("/photos/all", PhotoController.getAllPhotos);
routes.get("/user/photos", PhotoController.getPhotosByUserId);
routes.get("/photos/:photo_id", PhotoController.getPhotoById);

routes.post('/photos/create', PhotoController.createPhoto)
routes.post("/photos/:photo_id/comment", PhotoController.createComment);
routes.put("/photos/:photo_id/like", PhotoController.likePhoto);
routes.delete("/photos/:photo_id/like", PhotoController.dislikePhoto);
routes.put("/photos/:photo_id/:comment_id/like", PhotoController.likeComment);
routes.delete(
  "/photos/:photo_id/:comment_id/like",
  PhotoController.dislikeComment
);

routes.get("/photos/:photo_id", PhotoController.getPhotoById);

module.exports = routes