const jwt = require('jsonwebtoken')
const Users = require('../model/user')
const auth = async (req, res, next) => {
    try {

        const token = req.header('Authorization').replace('Bearer ', '')
        const tokenVerify = jwt.verify(token, 'user')

        const user = await Users.findOne({ id: tokenVerify._id, tokens: token })
        if (!user) {
            throw new Error('you must be user')
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).json({ error: 'please login' })
    }
}

module.exports = auth