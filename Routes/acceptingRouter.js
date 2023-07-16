const router = require("express").Router();
const accepting = require("../Controllers/acceptingController");
const auth = require("../middleware/auth")
const { isMentee, isMentor } = require("../middleware/reqAndOpp")

router.patch("/accept/request/:id", auth, isMentor,accepting.acceptRequest)
router.patch("/accept/opp/:id", auth, isMentee, accepting.acceptOpp)

module.exports = router;