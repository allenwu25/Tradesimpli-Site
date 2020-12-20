import connectDb from '../../utils/connectDb'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Accountvalue from '../../models/Accountvalue'

connectDb()

export default async(req, res) => {
    const { email, password } = req.body;
    try {
        // Check to see if user exists with email. Chain select method to select "unselectable" password field
        const user = await User.findOne({email}).select('+password')

        // If not return error
        if (!user) {
            return res.status(404).send("No user exists with that email")
        }

        // Check to see if users password matches one in database
        const password_matches = await bcrypt.compare(password, user.password)
        
        // If so, generate a token, send token to client
        if (password_matches) {
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
            
            res.status(200).json(token)
        }

        else {
            res.status(401).send("Passwords don't match")
        }
        
    }
    catch(error) {
        console.error(error)
        res.status(500).send("Error loggin in user")
    }
}