const router = require("express").Router();
const homeController = require("../Controllers/mentorRequestController");
const auth = require("../middleware/auth")
const { isMentee } = require("../middleware/reqAndOpp")
const asyncHandler = require('express-async-handler');

router.use(auth)

router.post("/request", isMentee, asyncHandler(homeController.postRequests));
router.get("/request", asyncHandler(homeController.getRequests));
router.get("/request/:id", isMentee, asyncHandler(homeController.getRequestsByID));
router.patch("/request/:id", isMentee, asyncHandler(homeController.patchRequets));
router.delete("/request/:id", isMentee, asyncHandler(homeController.deleteRequests))

module.exports = router;
