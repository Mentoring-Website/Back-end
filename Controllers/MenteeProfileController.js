const Profile = require("../Models/profileModel");

//show the list of mentorInfo
const getAllMentee = (req, res, next) => {
  Profile.find()
    .populate({ path: "user", select: "-tokens" })
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      res.json({ message: "error Occured!" + error });
    });
};

// add new mentor
const addNewMentee = (req, res, next) => {
  let mentee = new Profile({
    lookingFor: req.body.lookingFor,
    designation: req.body.designation,
    location: req.body.location,
    skills: req.body.skills,
    avatar: req.file ? req.file.fieldname : "",
    availableForHiring: req.body.availableForHiring,
    user: req.user._id,
  });
  mentee.user = req.user._id;
  mentee.updateRole(mentee)

  mentee
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

//get mentor by id
const getMentee = async (req, res, next) => {
  const _id = req.params.id;
  Profile.findById(_id)
    .populate({ path: "user", select: "-tokens" })
    .then((mentee) => {
      if (!mentee) {
        return res.status(404).send("mentee not found");
      }
      res.status(200).send(mentee);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

// update mentor

const updateMentee = (req, res, next) => {
  const menteeId = req.params.id;

  Profile.findByIdAndUpdate(
    menteeId,
    {
      lockingFor: req.body.lockingFor,
      designation: req.body.designation,
      location: req.body.location,
      skills: req.body.skills,
      avatar: req.file ? req.file.filename : "",
      availableForHiring: req.body.availableForHiring,
    },
    { new: true }
  )
    .then((updatedMentee) => {
      if (!updatedMentee) {
        return res.status(404).json({ error: "Mentee not found." });
      }
      updatedMentee.updateRole(updatedMentee)
      res.json(updatedMentee);
    })
    .catch((error) => {
      console.log(error)
      res.status(500).json({ error: "Could not update mentee." });
    });
};

// delete mentor
const removeMentee = async (req, res, next) => {
  try {
    const id = req.params.id;
    const mentee = await Profile.findByIdAndDelete(id);
    if (!mentee) {
      return res.status(404).send("Selected mentee not found to delete");
    }
    res.status(200).send(mentee);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  addNewMentee,
  getAllMentee,
  getMentee,
  updateMentee,
  removeMentee,
};
