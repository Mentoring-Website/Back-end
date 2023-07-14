const router = require("express").Router();
const homeController = require("../Controllers/mentorRequestController");
const auth = require("../middleware/auth")
const { authReq } = require("../middleware/reqAndOpp")
const asyncHandler = require('express-async-handler');

router.post("/request", auth, authReq, asyncHandler(homeController.postRequests));
router.get("/request", auth, asyncHandler(homeController.getRequests));
router.get("/request/:id", auth, authReq, asyncHandler(homeController.getRequestsByID));
router.patch("/request/:id", auth, authReq, asyncHandler(homeController.patchRequets));
router.delete("/request/:id", auth, authReq, asyncHandler(homeController.deleteRequests))

module.exports = router;
