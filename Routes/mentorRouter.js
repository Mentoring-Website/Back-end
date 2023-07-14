const router = require("express").Router();
const { PostMentor, GetMentors, getById, PatchMentor, DeleteMentor } = require('../Controllers/mentorProfileController');
const auth = require('../middleware/auth');

router.post("/mentor", auth, PostMentor);
router.get("/mentor", auth, GetMentors);
router.get("/mentor/:id", auth, getById);
router.patch("/mentor/:id", auth, PatchMentor);
router.delete("/mentor/:id", auth, DeleteMentor)

module.exports = router;
