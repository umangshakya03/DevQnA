import express from "express";

import { deleteAnswer, postAnswer, editAnswer } from "../controllers/answer.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.patch("/post/:id", auth, postAnswer);
router.patch("/delete/:id", auth, deleteAnswer);
router.post("/edit/:id", auth, editAnswer);

export default router;
