const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const MenteeController = require('../Controllers/menteeProfileController')
const auth = require("../middleware/auth")


router.use(auth)

router.post('/mentee', upload.single('avatar'), MenteeController.addNewMentee)
router.get('/mentee', MenteeController.getAllMentee)
router.get('/mentee/:id', MenteeController.getMentee)
router.patch('/mentee/:id', upload.single('avatar'), MenteeController.updateMentee)
router.delete('/mentee/:id', MenteeController.removeMentee)

module.exports = router
