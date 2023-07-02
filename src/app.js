
require('../db/mongoose');

const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const OpportunityRouter = require('../routes/OpportunityRoute');
app.use(OpportunityRouter);

app.use(express.json());

app.listen(port, () => {
    console.log('Server is running on port', port);
});
