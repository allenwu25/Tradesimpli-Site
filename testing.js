function findelement(data, key) {

    for (let i = 0; i < data.length; i++) {
        if (data[i]['symbol'].toUpperCase() == key.toUpperCase()) {
            return data[i]['latestPrice']
        }
    }
    return 0
}


exports = async function() {
  
    const collection = context.services.get('StockTrader').db("test").collection("portfolios");
    const collectionstocks = context.services.get('StockTrader').db("test").collection("stocks");



    const portfolios = await collection.find().toArray()

    
    // All portfolios 
    var allstocks = []
    
    
    for (let i = 0; i < portfolios.length; i++) {
        var portfolio = portfolios[i]
        var userstocks = []
    
        // For each stock in the portfolio
        
        for (let j = 0; j < portfolio.stocks.length; j++) {
            var myval = []
            var stockid = portfolio.stocks[j].stock
            var thestock = await collectionstocks.findOne({_id: stockid})

            myval.push(thestock.symbol, portfolio.stocks[j].quantity)
            
            userstocks.push(myval)
        }
        
        
        // Now we have a list of all of a user's stocks. Make API calls to get the
        // current price of each stock, multiply by quantity
        var allthestocks = []
        if (userstocks.length > 0) {
            var url = 'https://sandbox.iexapis.com/stable/stock/market/quote?&symbols='
            for (let k = 0; k < userstocks.length; k++) {
                url += userstocks[k][0] + ",";
            }
            url = url.substring(0, url.length - 1);
            url += '&token=Tsk_afa5d60d1573421aa437789971c2d34a'


            var pricedata = await context.http.get({ url: url })
            pricedata = EJSON.parse(stocksdata.body.text())
            for (let l = 0; l < userstocks.length; l++) {
                var key = userstocks[l][0]
                var pricedataelem = findelement(pricedata, key)
                var newelem = [userstocks[l][0], userstocks[l][1], pricedataelem]
                allthestocks.push(newelem)
            }

        }
    
        allstocks.push(allthestocks)
    }



    return allstocks
  
  
  
  /*
    A Scheduled Trigger will always call a function without arguments.
    Documentation on Triggers: https://docs.mongodb.com/stitch/triggers/overview/

    Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

    Access a mongodb service:
    const collection = context.services.get(<SERVICE_NAME>).db("db_name").collection("coll_name");
    const doc = collection.findOne({ name: "mongodb" });

    Note: In Atlas Triggers, the service name is defaulted to the cluster name.

    Call other named functions if they are defined in your application:
    const result = context.functions.execute("function_name", arg1, arg2);

    Access the default http client and execute a GET request:
    const response = context.http.get({ url: <URL> })

    Learn more about http client here: https://docs.mongodb.com/stitch/functions/context/#context-http
  */
};
