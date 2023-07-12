const express = require("express");
const router = express.Router();
const controller = require('../Controllers/downloadController')




    router.get("/cvfiles", controller.getListFiles);
    router.get("/cvfiles/:name", controller.download);
  
  
  
  module.exports = router;