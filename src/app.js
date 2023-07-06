
const cors = require('cors')
require('../db/mongoose')
const express = require('express')
const app = express()
const dotenv = require("dotenv");
const port = process.env.PORT || 5000
const userRouter = require('../Routes/userRoute')
const OpportunityRouter = require('../Routes/OpportunityRoute');
const mailRouter = require("../Routes/mailRouter")
const menteeRouter = require("../Routes/MenteeProfile");
const messageRouter = require("../Routes/messageRouter");
const comment = require("../Routes/comments");
const passport = require("passport");
const socialLogin = require("../Routes/SocialAuth");
const mentorRoutes = require('../Routes/mentorRoutes')
const cookieParser = require('cookie-parser')

dotenv.config();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(OpportunityRouter);
app.use(userRouter)
app.use(mailRouter)
app.use(menteeRouter);
app.use(messageRouter);
app.use(passport.initialize());
app.use(socialLogin);


app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong!";
  
	return res.status(errorStatus).send(errorMessage);
  });
  
  // for mentee ruseme
  app.use("/uploads", express.static("uploads"));

  
  app.use(mentorRoutes)

////////////////////////////////////////////////

app.get('/', (req, res) => {
	res.send('hello ')
})


////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
	console.log(`server app listening on port ${port}`);
});


