import express from 'express'

import { askQuestion, deleteQuestion, getAllQuestions, voteQuestion, editQuestion } from '../controllers/questions.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/Ask', auth, askQuestion)
router.get('/All', getAllQuestions)
router.delete('/delete/:id', auth, deleteQuestion)
router.patch("/vote/:id", auth, voteQuestion);
router.post("/edit/:id", auth, editQuestion);

export default router
