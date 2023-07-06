
const router = require("express").Router();
const { PostMentor, GetMentors, getById, PatchMentor, DeleteMentor } = require('../Controllers/mentorController');

router.post("/mentor", PostMentor);
router.get("/mentor", GetMentors);
router.get("/mentor/:id", getById);
router.patch("/mentor/:id", PatchMentor);
router.delete("/mentor/:id", DeleteMentor)

module.exports = router;
