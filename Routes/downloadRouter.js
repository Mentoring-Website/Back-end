const express = require("express");
const router = express.Router();
const multer = require("multer");
const downloadController = require('../Controllers/downloadController')
const auth = require("../middleware/auth")
const upload = require('../middleware/upload')
const path = require('path')


  
    // Define the route for mentee to upload CV
router.post("/cv/upload",auth, upload.single("cv"), downloadController.uploadCV);

// Define the route for mentor to download CV
router.get("/cv/download/:name", auth, downloadController.downloadcv);
  
  
  

  module.exports = router;