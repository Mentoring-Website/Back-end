
require("dotenv").config();

const authOpp = async (req, res, next) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user) throw new Error("Not a user");
    const role = req.user.role;
    console.log("what is the role? ", role);
    if (role === "mentor") next(); // if mentor next()
    else throw new Error("You need to be a mentor to add a new opportunity");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const authReq = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) throw new Error("Not a user");
    const role = req.user.role;
    console.log("what is the role? ", role);
    // if mentor throw error
    if (role === "mentee") next()
    else throw new Error("You need to be a mentee to add a new request");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  authOpp,
  authReq,
};
