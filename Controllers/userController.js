const User = require('../Models/userModel')

const register = async function (req, res) {
    try {
        if (!req.body.name || !req.body.email || !req.body.password) {
            throw new Error('name, email and password are required')
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        console.log(existingUser)
        if (existingUser) throw new Error('User already exists');

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const token = await newUser.generateToken()
        await newUser.save()
        res.status(200).send([newUser, token])
    } catch (e) {
        return res.status(400).json(e.message)
    }
}

// Login
const login = async function (req, res) {
    try {
        if (!req.body.email || !req.body.password) {
            throw new Error("email and password are required");
        }
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateToken()
        res.status(200).send([user.toJson(), token])
    }
    catch (e) {
        res.status(400).send(e.message)
    }
}
const getUser = async function (req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate("messages");
        res.status(200).json(user);
    } catch (e) {
        res.status(400).send(e.message)
    }
};

const logout = async function (req, res) {
    console.log(req.headers["authorization"].split(" ")[1])
    try {
        req.user.tokens = req.user.tokens.filter(el => {
            return el !== req.headers["authorization"].split(" ")[1]
        })
        await req.user.save()
        res.status(200).send('successfully logged out')
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const logoutAll = async function (req, res) {
    try {
        req.user.tokens = []
        await req.user.save()
        res.status(200).send('successfully logged out from all devices')
    } catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports = { register, login, getUser, logout, logoutAll }
