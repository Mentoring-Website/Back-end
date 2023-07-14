const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // Set strictQuery option to false

// create schema
const opportunitySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title required"],
        minlength: [3, "too short title name"],
    },
    description: {
        type: String,
        required: [true, 'Description required'],
    },
    certificate: {
        type: String,
        default: 'Awarded'
    },
    duration: {
        type: String,
        required: [true, 'Duration required']
    },
    location: {
        type: String,
        required: [true, 'Location required']
    },
    hired: {
        type: Boolean,
        default: false
    },
    paid: { type: Boolean, default: false, },
    amount: {
      type: Number, required: true,
      validate(val) {
        if (val < 0) throw new Error("Price must be a non-negative number");
      },
    },
    currency: { type: String, required: true, default: "USD", },
    respons: [{ type: String, }],
    requirements: [{ type: String, }],
    expOutcome: [{ type: String, }],
    startDate: { 
        type: Date, required: true,
        required: [true, "Start date is required (yyyy-MM-dd)"],
    },
    endDate: {
        type: Date, required: true,
        required: [true, "End date is required (yyyy-MM-dd)"],
    },
    daysInWeek: {
        type: [String],
        required: true,
        enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    progress: {
      type: String, default: "open",
      enum: ["open", "in progress", "close"],
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
},
    { timestamp: true }
);
// Before saving we add status of opportunity to the req
opportunitySchema.pre('save', function (next) {
    // const currentDate = new Date //.now();
    // console.log(`start: ${this.startDate} , end:  ${this.endDate}, current:  ${currentDate}`)
  
    // if (currentDate >= this.startDate && currentDate <= this.endDate) {
    //   this.progress = 'in progress';
    // } else if (currentDate > this.endDate) {
    //   this.progress = 'closed';
      
    // } else {
    //   this.progress = 'open';
    // }
  
    next();
  });
// create model
const Opportunity = mongoose.model('opportunity', opportunitySchema);
module.exports = { Opportunity };