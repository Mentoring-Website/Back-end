const OpportunityModel = require('../Models/opportunityModel');

const getAllOpportunities = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const skip = (page - 1) * limit;

        const allOpportunity = await OpportunityModel.find().skip(skip).limit(limit);
        res.status(200).json({ results: allOpportunity.length, page, data: allOpportunity });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getOpportunityById = async (req, res) => {
    try {
        const _id = req.params.id;
        const opportunity = await OpportunityModel.findById(_id);
        if (!opportunity) {
            return res.status(404).send({ msg: ` No opportunity for this id ${_id}` });
        }
        res.status(200).json({ data: opportunity });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOpportunity = async (req, res) => {
    try {
        const _id = req.params.id;
        const opportunity = await OpportunityModel.findOneAndUpdate(
            _id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!opportunity) {
            return res.status(404).send({ msg: ` No opportunity for this id ${_id}` });
        }
        res.status(200).json({ data: opportunity });
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const createOpportunity = async (req, res) => {
    try {
        const { startTime, endTime } = req.body;
        const existingOpportunity = await OpportunityModel.findOne({
            $or: [
                { startTime: { $lte: startTime }, endTime: { $gte: startTime } },
                { startTime: { $lte: endTime }, endTime: { $gte: endTime } },
                { startTime: { $gte: startTime }, endTime: { $lte: endTime } },
            ],
        });

        if (existingOpportunity) {
            return res
                .status(400)
                .json({ error: "Cannot add opportunity in the same time duration" });
        }

        const opportunity = await OpportunityModel.create({
            ...req.body,
            owner: req.user._id,
        });
        res.status(201).json({ data: opportunity });
    } catch (error) {
        res.status(400).json(error.message);
    }
};


const deleteOpportunity = async (req, res) => {
    try {
        const _id = req.params.id;
        const opportunity = await OpportunityModel.findOneAndDelete(_id);
        if (!opportunity) {
            return res.status(404).json({ msg: ` No opportunity for this id ${_id}` });
        }
        res.status(204).send('deleted');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllOpportunities,
    getOpportunityById,
    updateOpportunity,
    createOpportunity,
    deleteOpportunity,
};
