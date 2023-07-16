const Opportunitys = require("../Models/opportunityModel");
const Request = require("../Models/mentorRequestModel");

exports.getMentorCalendar = (req, res) => {
  const opportunity = Opportunitys.find({ owner: req.user._id });
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = today.toLocaleString("default", { month: "long" });

  const unavailableDays = Opportunitys.duration;

  const calendarData = {
    year,
    month,
    monthName,
    daysInMonth,
    unavailableDays,
  };

  res.statuse(200).send(calendarData);
};

exports.getMenteeCalendar = (req, res) => {
  const opportunity = Request.find({ mentee: req.user._id });
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  const monthName = today.toLocaleString("default", { month: "long" });

  const unavailableDays = Request.duration;

  const calendarData = {
    year,
    month,
    monthName,
    daysInMonth,
    unavailableDays,
  };

  res.statuse(200).send(calendarData);
};
