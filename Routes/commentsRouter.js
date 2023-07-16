const express = require("express")
const Comment = require('../Controllers/commentsController')
const router = express.Router()
const auth = require("../middleware/auth");

router.post("/comment/:mentorApplicationId", auth, Comment.addComment);
router.delete("/comment/:commentId", auth, Comment.deleteComment);
router.get("/comment/:mentorApplicationId", Comment.getComment);
module.exports = router