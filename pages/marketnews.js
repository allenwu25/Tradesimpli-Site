import axios from 'axios';
import BuyStock from '../components/Stock/BuyStock'
import {Header, Card, Item, Icon, Container, Image} from 'semantic-ui-react'
import highchartsConfig from '../components/Stock/HighchartsConfig'
import React from 'react'
import ReactHighCharts from 'react-highcharts'
import {useRouter} from 'next/router'
import { parseCookies } from "nookies"
import baseUrl from '../utils/baseUrl'
import ArticleItem from '../components/News/ArticleItem'

function Shuffle(o) {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};



function MarketNews({loggedin, articles}) {

        return <>
        <center>
        <Header as='h1' icon textAlign='center'>
            <Icon name='globe' circular />
            <Header.Content>Market News 
                {loggedin ? " - Tailored to Your Portfolio" : <> </>}
            
            </Header.Content>
        </Header>
        </center>   
        

        <Item.Group divided={true}>    
            {articles.map(article =>
                <ArticleItem article={article}></ArticleItem>
            )}

        </Item.Group>     
        <br></br><br></br><br></br>
        </>
   
}


MarketNews.getInitialProps = async ctx => {
    
    var articles = []
    
    const {token} = parseCookies(ctx)
    var isloggedin = false;

    var allsymbols = []


    // Case 1: User is Logged In. Display stocks based on their portfolio.
    if (token)  {
        isloggedin = true;
        const url = `${baseUrl}/api/portfolio`
        const payload = { headers: {Authorization: token}}
        const response = (await axios.get(url, payload)).data

        var stocks = response.stocks

        for (var i = 0; i < Math.min(stocks.length, 15); i++) {
            const sym = stocks[i].stock.symbol
            allsymbols.push(sym)
        }
            
    }

    var syms = ['BAC', 'AAPL', 'GE', 'MSFT', 'T', 'PFE', 'FB', 'TSLA', 'F', 'GS', 'JPM', 'WMT', 'AMZN', 'WFC', 'MS', 'PFE', 'WBA', 'AAL']
    for (var i = allsymbols.length; i < 13; i++) {
        var stockindex = Math.floor(Math.random() * 18)
        allsymbols.push(syms[stockindex])
    }

    
    var newsurl = "https://cloud.iexapis.com/stable/stock/market/batch?symbols="
    for (var j = 0; j < allsymbols.length; j++) {
        newsurl += allsymbols[j]
        if (j != (allsymbols.length - 1)) {
            newsurl += ","
        }
    }
    newsurl += `&types=news&last=1&token=${process.env.IEXAPI}`

    const newsarticles = (await axios.get(newsurl)).data

    for (var key of Object.keys(newsarticles)) {
        // Only find english articles
        if (newsarticles[key]['news'][0]['lang'] === "en") {

            // Try to find an article with same headline. If doesn't exist, push the news article on.
            var existing = articles.find(article => article['headline'].toUpperCase() === newsarticles[key]['news'][0]['headline'].toUpperCase());
            if (existing === undefined) {
                articles.push(newsarticles[key]['news'][0])
            }
        }
    }

    return {loggedin: isloggedin, articles: articles}
}
export default MarketNews;