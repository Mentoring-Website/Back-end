const express = require("express")
const Comment = require('../Controllers/commentsController')

const auth = require("../middleware/auth");
const router = express.Router()
router.post("/comments/:mentorApplicationId", auth, Comment.addComment);
router.delete("/comments/:commentId", auth, Comment.deleteComment);
router.get("/comments/:mentorApplicationId", Comment.getComment);
module.exports = router