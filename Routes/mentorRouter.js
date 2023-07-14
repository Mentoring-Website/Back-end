const router = require("express").Router();
const { PostMentor, GetMentors, getById, PatchMentor, DeleteMentor } = require('../Controllers/mentorProfileController');
const auth = require('../middleware/auth');

router.post("/mentorProfile", auth, PostMentor);
router.get("/mentorProfile", auth, GetMentors);
router.get("/mentorProfile/:id", auth, getById);
router.patch("/mentorProfile/:id", auth, PatchMentor);
router.delete("/mentorProfile/:id", auth, DeleteMentor)

module.exports = router;
