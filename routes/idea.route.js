import {
  deleteIdea,
  getAllIdeas,
  getIdeaById,
  postIdea,
  updateIdea,
} from "../controllers/idea.controller";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router();

router.route("/").get(authenticateToken, getAllIdeas);
router.route("/:id").get(authenticateToken, getIdeaById);
router.route("/idea").post(authenticateToken, postIdea);
router.route("/idea/:id").post(authenticateToken, updateIdea);
router.route("/idea/:id").delete(authenticateToken, deleteIdea);

export default router;
