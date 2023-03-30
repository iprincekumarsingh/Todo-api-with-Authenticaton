const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
    }
})

// hashing the password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}



module.exports = mongoose.model('User', userSchema)