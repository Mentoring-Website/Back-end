
const express = require('express')
const cors = require('cors')
const app = express()
const mentorRoutes = require('../Routes/mentorRoutes')
const cookieParser = require('cookie-parser')
require('../db/mongoose')


app.use(cors())
app.use(express.json())
app.use(cookieParser())

const port = process.env.PORT || 5000;
app.use(mentorRoutes)

return res.status(errorStatus).send(errorMessage);
});
// for mentee resume
app.use("/uploads", express.static("uploads"));
////////////////////////////////////////////////

app.get('/', (req, res) => {
	res.send('hello ')
})


////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
	console.log(`server app listening on port ${port}`);
});


