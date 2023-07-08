const {
  Request
} = require("../Models/mentorRequestModel");

// postRequests////////////////////////
const postRequests = (req, res, next) => {
  const request = new Request({ ...req.body, mentee: req.user._id });
  request
    .save()
    .then((request) => {
      res.status(200).send(request);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

// getRequests////////////////////////
const getRequests = (req, res, next) => {
  Request.findById({})
    .then((request) => {
      if (!request) {
        return res.status(404).send("Unable to find user");
      }
      res.status(200).send(request);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};

// getRequestByID///////////////////
const getRequestsByID = (req, res) => {
  const _id = req.params.id;
  Request.findById({ _id, mentee: req.user._id })
    .then((request) => {
      if (!request) {
        return res.status(404).send("Unable to find user");
      }
      res.status(200).send(request);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
};


// patchRequets/////////////////////
const patchRequets = async (req, res) => {
  try {
    const _id = req.params.id;
    const request = await Request.findByIdAndUpdate({ _id, mentee: req.user._id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!request) {
      return res.status(404).send("No request is found");
    }

    res.status(200).send(request);
  } catch (error) {
    res.status(400).send(error);
  }
};



// deleteRequests///////////////////
const deleteRequests = async (req, res) => {
  try {
    const _id = req.params.id;
    const request = await Request.findByIdAndDelete({ _id, mentee: req.user._id });
    if (!request) {
      return res.status(404).send("Unable to find request");
    }
    res.status(200).send(request);
  } catch (e) {
    res.status(500).send(e);
  }
}


module.exports = { postRequests, getRequests, getRequestsByID, patchRequets, deleteRequests };
