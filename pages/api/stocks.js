import Stock from '../../models/Stock'
import connectDb from '../../utils/connectDb'
import jwt from 'jsonwebtoken'

connectDb();

export default async (req, res) => {
    switch(req.method) {
        case "GET":
            await handleGetRequest(req, res);
            break;
        case "POST":
            await handlePostRequest(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} is not allowed`)
            break;
    }
}

async function handlePostRequest(req, res) {
    if (!("authorization" in req.headers)) {
        return res.status(401).send("No Authorization token")
    }
    
    try {
        const { symbol, buyprice } = req.body

        const {userId} = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)

        
        const newstock = await new Stock({
            symbol,
            buyprice
        }).save();
        res.status(201).json(newstock)
        
    }
    catch(error) {
        console.error(error)
        res.status(403).send("Please Log In Again")
    }
    
}

async function handleGetRequest(req, res) {
    const stocks = await Stock.find()
    res.status(200).json(stocks)

}