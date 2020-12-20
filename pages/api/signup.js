import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength'
import Portfolio from '../../models/Portfolio'

connectDb()

export default async (req, res) => {


    const {name, email, password} = req.body
    try {
        // Validate name, email and password values
        if (!isLength(name, {min: 3, max: 20})) {
            return res.status(422).send("Name must be 3-20 characters long")
        }
        else if (!isLength(password, {min: 6})) {
            return res.status(422).send("Password must be at least 6 characters long")
        }
        else if(!isEmail(email)) {
            return res.status(422).send("Email must be valid")
        }
        // Check if user already exists in database
        const user = await User.findOne({email})
        if (user) {
            return res.status(422).send("User already exists with the email provided")
        }

        // If not, hash their password
        const hash = await bcrypt.hash(password, 10)

        // Create user
        const newUser = await new User({
            name,
            email,
            password: hash
        }).save()

        // Create a new Portfolio for the user
        await new Portfolio({ user: newUser._id }).save()

        // Create token for the new user
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "2d"
        })

        // Send back the token (Instead of the user data)
        res.status(201).json(token)
    
    }
    catch(error) {
        console.error(error)
        res.status(500).send("Error signing up user. Please try again later")
    }
}