const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');
const { authOpp } = require('../middleware/reqAndOpp')
const opportunityController = require('../Controllers/opportunityController');

router.use(auth)

router.get('/', authOpp, asyncHandler(opportunityController.getAllOpportunities));
router.get('/:id', authOpp, asyncHandler(opportunityController.getOpportunityById));
router.patch('/:id', authOpp, asyncHandler(opportunityController.updateOpportunity));
router.post('/', authOpp, asyncHandler(opportunityController.createOpportunity));
router.delete('/:id', authOpp, asyncHandler(opportunityController.deleteOpportunity));

module.exports = router;
