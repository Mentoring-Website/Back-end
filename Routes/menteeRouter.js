const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const MenteeController = require('../Controllers/menteeProfileController')
const auth = require("../middleware/auth")

router.use(auth)

router.post('/', upload.single('avatar'), MenteeController.addNewMentee)
router.get('/', MenteeController.getAllMentee)
router.get('/:id', MenteeController.getMentee)
router.patch('/:id', upload.single('avatar'), MenteeController.updateMentee)
router.delete('/:id', MenteeController.removeMentee)

module.exports = router