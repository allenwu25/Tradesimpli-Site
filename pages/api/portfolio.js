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
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "PUT":
            await handlePutRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} not allowed`);
            break;
    }
}

async function handlePutRequest(req, res) {
    const {quantity, newstock} = req.body
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token")
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const userportfolio = await Portfolio.findOne({user: userId})
        var newentry = {quantity, stock: newstock}
        
        
        // Make sure they have enough cash to purchase the stock

        // Factor in $9.00 transaction fee
        var totalcost = 9.00;

        totalcost += newentry.stock.buyprice * quantity
        if (userportfolio.cash >= totalcost) {

            // Check to see if the stock symbol exists in the user's portfolio
            var exists = false;
            var existingid = '';
            for (var i = 0; i < userportfolio.stocks.length; i++) {
                const existingstock = await Stock.findOne({_id: userportfolio.stocks[i].stock})
                if (existingstock.symbol.toUpperCase() === newentry.stock.symbol.toUpperCase()) {
                    exists = true;
                    existingid = existingstock._id
                    break;
                }
            }

            // If exists: update quantity of that stock
            if (exists) {
                await Portfolio.findOneAndUpdate({ _id: userportfolio._id,
                    "stocks.stock": existingid},
                    { $inc: {"stocks.$.quantity": quantity}})
            }

            // Otherwise: add stock to portfolio
            else {
                await Portfolio.findOneAndUpdate({ _id: userportfolio._id },
                    { $push: { stocks: newentry}})
            }

            // Reduce the user's cash
            await Portfolio.findOneAndUpdate({_id: userportfolio._id},
                { cash: userportfolio.cash-totalcost})
            


            const newuserportfolio = await Portfolio.findOne({user: userId})

            res.status(200).send("Portfolio updated")
        }
        else {
            res.status(200).send("Not enough cash to make transaction")
        }
        
    }
    catch(error) {
        console.error(error)
        res.status(403).send("Please log in again")
    }
}

async function handleGetRequest(req, res) {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No authorization token");
    }
    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        
        const portfolio = await Portfolio.findOne({user: userId}).populate({ path: "stocks.stock", model: "Stock"})
        res.status(200).json(portfolio)
        
    }
    catch(error) {
        console.error(error)
        res.status(403).send("Please log in again")
    }
}