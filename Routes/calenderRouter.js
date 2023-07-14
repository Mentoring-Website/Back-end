const express = require("express");
const router = express.Router();
const calendarController = require("../Controllers/calenderController");
const auth = require("../middleware/auth");

router.use(auth)

router.get("/calendar", calendarController.getMentorCalendar);
router.get("/calendar", calendarController.getMenteeCalendar);

module.exports = router;
