const router = require("express").Router();
const homeController = require("../Controllers/requestController");
const auth = require("../middleware/auth")
const { isMentee } = require("../middleware/reqAndOpp")
const asyncHandler = require('express-async-handler');

router.post("/requests", auth, isMentee, asyncHandler(homeController.postRequests));
router.get("/requests", auth, asyncHandler(homeController.getRequests));
router.get("/requests/:id", auth, isMentee, asyncHandler(homeController.getRequestsByID));
router.patch("/requests/:id", auth, isMentee, asyncHandler(homeController.patchRequets));
router.delete("/requests/:id", auth, isMentee, asyncHandler(homeController.deleteRequests))


module.exports = router;
