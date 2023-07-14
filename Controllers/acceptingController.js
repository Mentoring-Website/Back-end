const { Request } = require("../Models/requestModel");
const { Opportunity } = require("../Models/opportunityModel");
const Profile = require("../Models/profileModel");

const acceptRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id)
      .populate("owner acceptedBy")
    if (!request) return res.status(404).send("Unable to find request");
    if (request.progress === "in progress")
      return res.status(400).send("This request is already in progress");
    else if (request.progress === "closed")
      return res.status(400).send("This request is already closed");
    const mentor = await Profile.findOne({ user: req.user.id });
    const mentee = await Profile.findOne({ user: request.owner });
    // console.log("mentor", mentor,"mentee", mentee)
    if (!mentor || !mentee) return res.status(400).send("no user found");
    mentor.dealtWith = mentor.dealtWith.concat(req.user.id);
    mentee.dealtWith = mentee.dealtWith.concat(request.owner);
    request.status = "accepted";
    request.acceptedBy = req.user.id;
    await mentor.save();
    await mentee.save();
    await request.save();
    console.log(request);
    res.status(200).send(request);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const acceptOpp = async (req, res) => {
  try {
    const id = req.params.id;
    const opp = await Opportunity.findById(id)
      .populate("owner acceptedBy")
    if (!opp) return res.status(404).send("Unable to find opportunity");
    if (opp.progress === "in progress")
      return res.status(400).send("This opportunity is already in progress");
    else if (opp.progress === "closed")
      return res.status(400).send("This opportunity is already closed");
    const mentee = await Profile.findOne({ user: req.user.id });
    const mentor = await Profile.findOne({ user: opp.owner });
    // console.log("mentor", mentor,"mentee", mentee)
    if (!mentor || !mentee) return res.status(400).send("no user found");
    mentor.dealtWith = mentor.dealtWith.concat(req.user.id);
    mentee.dealtWith = mentee.dealtWith.concat(opp.owner);
    opp.progress = "in progress";
    opp.acceptedBy = req.user.id;
    await mentor.save();
    await mentee.save();
    await opp.save();
    res.status(200).send(opp);
  } catch (e) {
    res.status(500).send(e.message);
  }
};


module.exports = { acceptRequest, acceptOpp };
