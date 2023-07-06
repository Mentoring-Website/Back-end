
const Mentor = require('../Models/mentorModel')

const PostMentor = async (req, res) => {
    try {
        const mentor = new Mentor({ ...req.body })
        await mentor.save()
        res.status(200).send(mentor)
    } catch (e) {
        res.status(400).send(e)
    }
}

////////////////////////////////////////////////////////////////////////////////////
// Get 

const GetMentors = async (req, res) => {
    try {
        const mentor = await Mentor.find({})
        res.status(200).send(mentor)
    } catch (e) {
        res.status(500).send(e)
    }
}

/////////////////////////////////////////////////////////////////////////////////

const getById = async (req, res) => {
    try {
        const _id = req.params.id
        const mentor = await Mentor.findById(_id)
        if (!mentor) {
            res.status(404).send('UNABLE TO FIND Mentor')
        } else {
            res.status(200).send(mentor)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

/////////////////////////////////////////////////////////////////////////////////
// patch 

const PatchMentor = async (req, res) => {
    try {
        const _id = req.params.id
        const mentor = await Mentor.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        })
        if (!mentor) {
            return res.status(404).send('No Mentor Founded')
        }
        res.status(200).send(mentor)
    }
    catch (error) {
        res.status(500).send(error)
    }
}


//////////////////////////////////////////////////////////////////////////////////

const DeleteMentor = async (req, res) => {
    try {
        const _id = req.params.id
        const mentor = await Mentor.findByIdAndDelete(_id)
        if (!mentor) {
            return res.status(404).send('UNABLE TO FIND Mentor')
        }
        res.status(200).send(mentor)
    }
    catch (e) {
        res.status(500).send(e)
    }
}

module.exports = {
    PostMentor,
    DeleteMentor,
    PatchMentor,
    getById,
    GetMentors
}