import { Header, Icon, List, Image, Card, Input, Item } from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react'
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import newstocks from '../static/newstocks'


function Search() {
  console.log("GOOGLE MAPS")
  console.log(process.env.NEXT_PUBLIC_GOOGLEMAPS)

  async function getstock(ticker) {
    setLoading(true)
    ticker = ticker.toUpperCase()
    setHidden(true)

    try {

      for (let i = 0; i < newstocks.length; i++) {
        if (newstocks[i]['symbol'] === ticker.toUpperCase()) {
          setCompany(newstocks[i]['name'])
          setExchange(newstocks[i]['exchange'])

          const url = 'https://tradesimplistockrecommend.azurewebsites.net/recommend'
          const data = (await axios.post(url, {symbol: ticker})).data

          var finaldata = []
          for (let j = 0; j < data.length; j++) {
            var name = newstocks.find(x => x["symbol"] === data[j]).name
            finaldata.push([data[j], name])
          }
          setHidden(false)
          setRecommended(finaldata)
          setLoading(false)
        }
      }
    }
    // Otherwise stock doesn't exist
    catch(error) {
      
    }
    finally {
      setLoading(false)
      return;
    }   

  }

  const [loading, setLoading] = React.useState(false)
  const [hidden, setHidden] = React.useState(true)
  const [company, setCompany] = React.useState('')
  const [exchange, setExchange] = React.useState('')
  const [ticker, setTicker] = React.useState('')
  const [recommended, setRecommended] = React.useState([])

  const sectors = ['Energy', 'Basic Materials', 'Industrials', 'Consumer Discretionary', 'Consumer Staples',
                   'Healthcare', 'Financial', 'Information Technology', 'Communications', 'Utilities', 'Real Estate']

  const icons = ['tint', 'truck', 'factory', 'shopping bag', 'shopping cart', 'doctor', 'money', 'computer', 'phone', 'power cord', 'home']
  let zip = (a1, a2) => a1.map((x, i) => [x, a2[i]]); 
  
  var allsectors = zip(sectors, icons);

  return (<center>
    <br></br>
  <Header as='h1'>Search for Stocks by Ticker Symbol</Header>
  <br></br>
  <Input 
    type="text"
    size="small"
    onChange = {(e) => {setTicker(e.target.value); setHidden(true)}}
    placeholder="Eg.  AAPL"
    action={
        { loading: loading, color:'teal', icon: 'search', content: "Search for Company",
      onClick: () => getstock(ticker)}}

></Input>
<br></br><br></br>
{hidden ? <></> : <>
    <Card>
      
      <Card.Content>
      <Item.Image  size='tiny' src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${ticker.toUpperCase()}.png`} />
      <br></br><br></br>
      <Item.Content>
        <Item.Header as='h2'>
        <Link href={`/stockinfo?sym=${ticker.toUpperCase()}`}>{company}</Link>
        </Item.Header>
        <Item.Meta>Listed on the {exchange}</Item.Meta>
        <Item.Description>
        </Item.Description>
      </Item.Content>
      </Card.Content>
    </Card><br></br>
    <Header as='h2'>Stocks Similar to {company}: </Header>
    



    <Card.Group stackable itemsPerRow={5}>
    {recommended.map((stock) =>
    <Card fluid stackable>
      <br></br><br></br>
      <Item >
    
    <div>
    <Item.Image style={{height: "auto !important"}} verticalAlign='middle' size='tiny' src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${stock[0].toUpperCase()}.png`} />
    
    </div><br></br>
    <Item.Content>
      <Item.Header as='h3'>
      <Link href={`/stockinfo?sym=${stock[0].toUpperCase()}`}>{stock[1]}</Link>
      </Item.Header>
    </Item.Content>
    </Item>
    <br></br>
  </Card>
    )}
    </Card.Group>


    </>
}

<br></br><br></br>
<Header as='h2'> Explore Stock Sectors</Header>
<Card.Group stackable centered itemsPerRow={4}>
{allsectors.map((sector) => 

<div class="ui card">
    <div class="image icon">
      <br></br>
        <i class={`teal huge icon ${sector[1]}`}></i>
        <br></br><br></br>
    </div>
    <div class="content">
<a class="header" href={(sector[0].split(' ').join('-')).toLowerCase()}> <h3>{sector[0]}</h3> </a>
    </div>
    </div>
)}
</Card.Group>



      
</center>
  )
}


export default Search;