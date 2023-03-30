const User = require('../models/user.modal')

exports.createAccount = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }
    User.findOne({ email })
        .then((data) => {
            if (data) {
                return res.status(400).json({
                    message: "User already exist"
                })
            }
        })

    try {
        const user = await User.create({name,email,password})
        const token = await user.generateToken()

        this.password = undefined

        res.status(201).json({
            message: "Account created successfully",
            user,
            token
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the account.",
        });
    }

}


exports.login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all the fields"
        })
    }

    try {
        const user = await User.findOne({ email: email }).select('+password')
        if (!user) {
            return res.status(400).json({
                message: "User does not exist"
            })
        }

        if (!await user.isValidPassword(password)) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const token = await user.generateToken()

        this.password = undefined

        res.status(200).json({
            message: "Login successful",
            user,
            token
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while login into  the account.",
        });
    }
}