import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Portfolio from '../../models/Portfolio'
import connectDb from '../../utils/connectDb'
import Stock from '../../models/Stock'
import axios from 'axios'


connectDb()


export default async (req, res) => {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token")
    }

    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: userId })
        if (user) {
            res.status(200).json(user)
        }
        // No user
        else {
            res.status(404).send("User not found")
        }
    }
    catch(error) {
        res.status(403).send("Invalid token")
    }

}

