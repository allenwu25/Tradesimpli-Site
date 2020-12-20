import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Portfolio from '../../models/Portfolio'
import connectDb from '../../utils/connectDb'
import Stock from '../../models/Stock'
import axios from 'axios'


connectDb()

const { ObjectId } = mongoose.Types

export default async (req, res) => {
    switch(req.method) {
        case "PUT":
            await handlePutRequest(req, res);
            break;
        case "DELETE":
            await handleDeleteRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}


// Decrement shares owned of a stock
async function handlePutRequest(req, res) {

    // Make sure the user is authenticated
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token")
    }
    const {symbol, sharestosell} = req.body;

    try {

        // Get the user's portfolio
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const userportfolio = await Portfolio.findOne({user: userId})


        // Get price of the current share, and calculate total cash gained as currentprice * sharestosell
        var totaltogain = 0;

        const priceurl = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.IEXAPI}`
        const currprice = (await axios.get(priceurl)).data.latestPrice
        
        // $9.00 transaction fee
        totaltogain += (parseFloat(currprice * sharestosell) - 9)
        


        // Check to see if the stock symbol exists in the user's portfolio
        var exists = false;
        var existingid = '';
        for (var i = 0; i < userportfolio.stocks.length; i++) {
            const existingstock = await Stock.findOne({_id: userportfolio.stocks[i].stock})
            if (existingstock.symbol.toUpperCase() === symbol.toUpperCase()) {
                exists = true;
                existingid = existingstock._id
                break;
            }
        }

        // If exists: decrement quantity of that stock
        if (exists) {
            await Portfolio.findOneAndUpdate({ _id: userportfolio._id,
                "stocks.stock": existingid},
                { $inc: {"stocks.$.quantity": -sharestosell}})
        
            await Portfolio.findOneAndUpdate({_id: userportfolio._id},
                    { cash: userportfolio.cash+totaltogain})
        }

        // Otherwise: Do nothing
        else {
            return;
            // await Portfolio.findOneAndUpdate({ _id: userportfolio._id },
            //     { $push: { stocks: newentry}})
        }

        // Increment the user's cash
        
        const newuserportfolio = await Portfolio.findOne({user: userId})

        
        res.status(200).send("Portfolio updated")
        
    }
    catch(error) {
        console.error(error)
        res.status(403).send("Please log in again")
    }
}



// // If sharestosell == current number of shares, delete the stock from user's portfolio
// async function handleDeleteRequest(req, res) {
//     if (!("authorization" in req.headers)) {
//         return res.status(401).send("No authorization token");
//     }
//     try {

//         totalcash = 0;

//         const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        
//         const portfolio = await Portfolio.findOneAndUpdate( 
//             {user: userId}, 
//             {$pull: {stocks: { }}}, 
//             {new: true})
//             .populate({path: "stocks.stock", model:"Stock"})
            
//         console.log("PORTFOLIO", portfolio)
//         res.status(200).json(portfolio.stocks)
        
//     }
//     catch(error) {
//         console.error(error)
//         res.status(403).send("Please log in again")
//     }
// }
