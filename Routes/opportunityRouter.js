const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');
const { authOpp } = require('../middleware/reqAndOpp')
const opportunityController = require('../Controllers/opportunityController');

router.use(auth)

router.post('/opp', authOpp, asyncHandler(opportunityController.createOpportunity));
router.get('/opp', asyncHandler(opportunityController.getAllOpportunities));
router.get('/opp/:id', authOpp, asyncHandler(opportunityController.getOpportunityById));
router.patch('/opp/:id', authOpp, asyncHandler(opportunityController.updateOpportunity));
router.delete('/opp/:id', authOpp, asyncHandler(opportunityController.deleteOpportunity));

module.exports = router;
