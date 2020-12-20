import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import User from '../../models/User'
import Portfolio from '../../models/Portfolio'
import connectDb from '../../utils/connectDb'


connectDb()

const { ObjectId } = mongoose.Types

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



function sortaccountvalues(datavals, email) {
    var data = datavals
    console.log(email)
    var myindex = 0
    for (let i = data.length-1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            if (data[j][1] < data[j+1][1]) {
                let temp = data[j]
                data[j] = data[j+1]
                data[j+1] = temp
            }
            if (data[j][2].toString() == email.toString()) {
                myindex = j
            }
            if (data[j+1][2].toString() == email.toString()) {
                myindex = j+1
            }
            data[j][3] = j+1
            data[j+1][3] = j+2
        }
    }
    return [data, myindex]
}

async function handleGetRequest(req, res) {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token");
    }
    try {
        console.log("fdsajfoafjweoj")
        // Dealing with Pagination
        const {page, size} = req.query
        var pageNumber = Number(page)
        const pageSize = Number(size)


        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const myuser = await User.findOne({_id: userId})

        var allvalues = []
        var users = await User.find()
        var userlength = users.length;

        if (pageNumber > Math.ceil(userlength/pageSize)) {
            pageNumber = 1
        }

        for (let i = 0; i < userlength; i++) {
            const userportfolio = await Portfolio.findOne({user: users[i]._id})
            allvalues.push([users[i].name, parseFloat(userportfolio.value.toFixed(2)), users[i].email, 0])
        }

        var sortedvals = sortaccountvalues(allvalues, myuser.email)
        var sorted = sortedvals[0]

        var paginationusers = sorted.slice((pageNumber-1) * pageSize, ((pageNumber-1) * pageSize) + pageSize)

        var myindex = sortedvals[1]
        var objtoreturn = {sorted: paginationusers, index:myindex, total: userlength}
        return res.status(200).send(objtoreturn)
        
    }
    catch(error) {
        console.error(error)
        res.status(403).send("Please log in again")
    }
}