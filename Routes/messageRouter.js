const messageController = require("../Controllers/messageController");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/messages/receiver/:id", auth, messageController.getReceiverMessages);
router.get("/messages/sender/:id", auth, messageController.getSenderMessages);

// /search for most relavent, /searchNewest for search by newest
router.get("/messages/search", auth, messageController.searchMessages);
router.get("/messages/searchNewest", auth, messageController.searchMessagesByDate);

router.post("/messages/:id", auth, messageController.createMessage);
router.get("/messages/:id", auth, messageController.getMessageById);

module.exports = router;
