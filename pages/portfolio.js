import { parseCookies } from "nookies"
import baseUrl from "../utils/baseUrl"
import {Header, Icon, Table, Grid} from 'semantic-ui-react'
import axios from "axios"
import StockElement from '../components/Stock/StockElement'
import React from 'react'

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function Portfolio({finalstock, totalvalue, cash, isOpen}) {

    return (
        <center>
        <div id="testingdiv">
        <Header as='h1' icon textAlign='center'>
            <Icon name='chart bar outline' circular />
            <Header.Content>My Stock Portfolio</Header.Content>
        </Header>

        {isOpen ? <></> : <Header as='h3'>The market is currently closed. Trading hours are from 9:30 AM - 4:00 PM EST on weekdays. </Header>}
        
        <br></br>
        <Grid columns='two' divided>
            <Grid.Row>
                <Grid.Column>
                    <Header textAlign='center' as='h3'>Total Account Value: ${numberWithCommas(totalvalue)}</Header>
                </Grid.Column>
                <Grid.Column>
                    <Header textAlign='center' as='h3'>Total Cash Available: ${numberWithCommas(cash)} </Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>

        {finalstock.length === 0 ? <Header>No current stocks. Visit the Search tab to search for stocks to buy!</Header> : <></>}
        <Table>
        <Table.Body>
            {finalstock.map(trade => trade[1] > 0 ?
                <StockElement isOpen={isOpen} trade={trade}></StockElement> : <></>
            )}
        </Table.Body>
        </Table>
        <br></br><br></br>
        </div>
        </center>
    )
}



async function getfinaldata(portstocks) {
    var stocksdict = {};
    for (let i = 0; i < portstocks.length; i++) {
        var trade = portstocks[i]

        if (trade.stock.symbol.toUpperCase() in stocksdict) {
            stocksdict[trade.stock.symbol.toUpperCase()] += trade.quantity
        }
        else {
            stocksdict[trade.stock.symbol.toUpperCase()] = trade.quantity
        }
    }

    var allstocks = []

    if (stocksdict.length != 0) {

        // First, get the price data for all stocks in the user's portfolio
        var url = 'https://cloud.iexapis.com/stable/stock/market/quote?&symbols='
        for (var key of Object.keys(stocksdict)) {
            url += key + ','
        }
        url = url.substring(0, url.length - 1);
        url += `&token=${process.env.IEXAPI}`

        var pricedata = (await axios.get(url)).data


        // Iterate through keys again, and obtain the final array of pricing information
        // containing symbol, number of shares, latest price, and pricing change
        for (var key of Object.keys(stocksdict)) {
            var pricedataelem = pricedata.find(o => o['symbol'].toUpperCase() === key.toUpperCase())
            var newelem = [key, stocksdict[key], (pricedataelem.latestPrice).toFixed(2), (pricedataelem.changePercent * 100).toFixed(2)]
            allstocks.push(newelem)
        }
    }

    return allstocks
}


function calculatevalue(finalstocks) {
    var thearray = finalstocks;
    let totalvalue = 0;
    for (let i = 0; i < thearray.length; i++) {
        totalvalue += (thearray[i][1] * thearray[i][2])
    }
    return parseFloat(totalvalue.toFixed(2))
}

function validtime() {

    var moment = require('moment-timezone');


    var date = moment().tz("America/New_York")

    var dayofweek = date.day()
    var todayHours = date.hour()
    var todayMins = date.minute()


    var greaterthanstart = false;
    if (todayHours == 9) {
        if (todayMins > 30) {
            greaterthanstart = true;
        }
    }
    else if (todayHours > 9) {
        greaterthanstart = true;
    }

    var lessthanend = false;
    if (todayHours < 16) {
        lessthanend = true;
    }

    var validday = ((dayofweek >= 1) && (dayofweek <= 5));
    return (greaterthanstart && lessthanend && validday)
}

Portfolio.getInitialProps = async ctx => {
    
    const {token} = parseCookies(ctx)
    if (!token) {
        return { portfolio: {}}
    }
    const url = `${baseUrl}/api/portfolio`
    const payload = { headers: {Authorization: token}}
    const response = (await axios.get(url, payload)).data
    
    var finalstockarray = []
    if (response.stocks.length != 0) {
        finalstockarray = await getfinaldata(response.stocks)
    }
    // Check date time to see if market is open
    var isopen = false;

    var isvalid = validtime()
    if (isvalid === true) {
        isopen = true
    }

    var totalvalue = (parseFloat(calculatevalue(finalstockarray)) + parseFloat(response.cash.toFixed(2))).toFixed(2)
    return { finalstock: finalstockarray, totalvalue: totalvalue, cash: response.cash.toFixed(2), isOpen: isopen }
}

export default Portfolio;