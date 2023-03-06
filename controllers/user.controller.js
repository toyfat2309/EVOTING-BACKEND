const userModel = require('../models/userSignup.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET



const SignUp = async (request, response) => {
    console.log(request.body);
    const newUser = request.body;
    const form = new userModel(newUser)
    try {
        const existingEmail = await userModel.findOne({ email: request.body.email })
        if (existingEmail) {
            response.send({ message: 'email already exists', status: false });
        } else {
            const existingNin = await userModel.findOne({ nin: request.body.nin })
            if (existingNin) {
                response.send({ message: 'Nin already exists', status: false });
            } else {
                form.save()
                response.send({ message: 'Registration Successful', status: true })
            }
        }

    } catch (err) {
        console.log(err); 
    }

}

const logIn = async (request, response) => {
    console.log(request.body);
    const userId = request.body.nin;
    const password = request.body.passWord

    try {
        const user = await userModel.findOne({ nin: userId })
        if (!user) {
            console.log('no1');
            response.send({ status: false, message: 'User not found' })
        } else {
            const verifyPassWord = await bcrypt.compare(password, user.passWord)
            // !verifyPassWord && response.status(401).json({message: 'invalid password', status: false})
            if (!verifyPassWord) {
                console.log('no2');
                response.send({ message: 'invalid password', status: false })
            } else {
                console.log('no3');
                const activeUser = await userModel.findOne({ nin: userId })
                const user = activeUser._id
                const token = jwt.sign({ user }, SECRET, { expiresIn: 3600 })
                console.log(token);
                response.send({ status: true, token })
            }
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = { SignUp, logIn }