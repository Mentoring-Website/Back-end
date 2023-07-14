
// libraries
const cors = require('cors')
const express = require('express')
const app = express()
require("dotenv").config()
const passport = require("passport");
require('../config/dbConnection')

const mentorRouter = require('../Routes/mentorRouter')
const userRouter = require('../Routes/userRouter')
const opportunityRouter = require('../Routes/opportunityRouter');
const acceptingRouter = require('../Routes/acceptingRouter');
const mailRouter = require("../Routes/mailRouter")
const menteeRouter = require("../Routes/menteeRouter");
const messageRouter = require("../Routes/messageRouter");
const commentRouter = require("../Routes/commentsRouter");
const requestRounter = require("../Routes/requestRouter")
const socialLoginRouter = require("../Routes/SocialAuthRouter");
const newsletterRouter = require('../Routes/newsletterRouter')
const passwordRouter = require('../Routes/PasswordRouter')
const { logger } = require('../middleware/reglogger')
const errorHandle = require('../middleware/errorLogger')
const corsOptions = require('../config/corsOptions')
const calendar=require("../Routes/calenderRouter")
const download = require('../Routes/downloadRouter')

const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors(corsOptions))
app.use(logger)
app.use(errorHandle);
app.use(passwordRouter)
app.use(newsletterRouter)
app.use(userRouter)
app.use(passport.initialize());
app.use(mentorRouter)
app.use(menteeRouter);
app.use(opportunityRouter);
app.use(requestRounter);
app.use(acceptingRouter)
app.use(mailRouter)
app.use(messageRouter);
app.use(socialLoginRouter);
app.use(commentRouter);
app.use(calendar)
app.use("/uploads", express.static("uploads"));
app.use(download)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).send(errorMessage);
});

app.listen(port, () => {
  console.log("The localhost is " + port)
})