import {
  deleteIdea,
  getAllIdeas,
  getIdeaById,
  postIdea,
  updateIdea,
} from "../controllers/idea.controller.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
import express from "express";
const router = express.Router();

router.route("").get(getAllIdeas);
router.route("/idea/:id").get(authenticateToken, getIdeaById);
router.route("/idea").post(authenticateToken, postIdea);
router.route("/idea/:id").post(authenticateToken, updateIdea);
router.route("/idea/:id").delete(authenticateToken, deleteIdea);

export default router;
