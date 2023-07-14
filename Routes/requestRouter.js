const router = require("express").Router();
const homeController = require("../Controllers/mentorRequestController");
const auth = require("../middleware/auth")
const { authReq } = require("../middleware/reqAndOpp")
const asyncHandler = require('express-async-handler');

router.post("/", auth, authReq, asyncHandler(homeController.postRequests));
router.get("/", auth, asyncHandler(homeController.getRequests));
router.get("/:id", auth, authReq, asyncHandler(homeController.getRequestsByID));
router.patch("/:id", auth, authReq, asyncHandler(homeController.patchRequets));
router.delete("/:id", auth, authReq, asyncHandler(homeController.deleteRequests))

module.exports = router;
