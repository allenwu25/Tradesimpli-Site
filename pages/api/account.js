import User from '../../models/User'
import jwt from 'jsonwebtoken'
import connectDb from '../../utils/connectDb'
import Accountvalue from '../../models/Accountvalue'

connectDb()

export default async (req, res) => {
    switch(req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}

async function handleGetRequest(req, res) {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token");
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const accountvalues = await Accountvalue.find({user: userId})
        res.status(200).json(accountvalues)
        
    }
    catch(error) {
        console.error(error)
        res.status(403).send("Please log in again")
    }
}



/*

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

*/