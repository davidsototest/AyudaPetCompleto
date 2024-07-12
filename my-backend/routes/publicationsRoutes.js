const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publicationsController");
const publicationMiddleware = require("../middleware/loggerMiddleware");

const db = require("../config/dbConfig");

router.get("/", publicationController.getAllPublications); //obtener todas las publicaciones activas
router.get("/count", publicationController.getPublicationsCount); //consultar la CANTIDAD de publicaciones

router.post(
  "/user",
  publicationMiddleware,
  (req, res, next) => {
    next();
  },
  publicationController.getPublicationsForUser); //Publicaciones de un usuario ID

router.post(
  "/",
  publicationMiddleware,
  (req, res, next) => {
    next();
  },
  publicationController.createPublication); //crear publicacion

router.put(
  "/:id",
  publicationMiddleware,
  (req, res, next) => {
    next();
  },
  publicationController.updatePublication); //actualizar publicacion

router.delete(
  "/:id",
  publicationMiddleware,
  (req, res, next) => {
    next();
  },
  publicationController.deletePublication); //eliminar publicacion

module.exports = router;
