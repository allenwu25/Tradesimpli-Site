import axios from 'axios';
import BuyStock from '../components/Stock/BuyStock'
import {Header, Grid, Container, Item, Icon, Button, Image} from 'semantic-ui-react'
import highchartsConfig from '../components/Stock/HighchartsConfig'
import React from 'react'
import ReactHighCharts from 'react-highcharts'
import {useRouter} from 'next/router'
import MapResult from '../components/Stock/GoogleMaps'

function validtime() {
  var dayofweek = new Date().getDay()
  var todayHours = new Date().getHours()
  var todayMins = new Date().getMinutes()


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

function Stockinfo({ addressexists, coords, sym, data, company, user, currprice }) {
  const router = useRouter()

  var pricedata = data.map((priceinfo) => [Date.parse(priceinfo['date']), priceinfo['close']])

  function handleredirect() {
    router.push('/search')
  }  

  return (
    <Container id='stockinfocontainer'>
      <center>
      <Button 

        icon="chevron circle left" 
        content="Back to Search"
        color='blue'
        onClick = {handleredirect}/>
        <br></br><br></br>
        </center>
        
      <Grid divided celled>
    <Grid.Row>
      <Grid.Column width={9}>
      <Item.Group>
        <Item>
          <Item.Image size='tiny' src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${sym.toUpperCase()}.png`}></Item.Image>
          <Item.Content>
            <Header as='h1'>{sym.toUpperCase()}{"  -  "}{company['companyName']}</Header><br></br><br />
            <Header as='h3'>Industry: {company['industry']}</Header>
          </Item.Content>
        </Item>
      </Item.Group>
      </Grid.Column>



      <Grid.Column width={4}>
        <Header as='h1'>${currprice['latest']}
        <Header as='h3' color={currprice['percentchange'] >= 0? 'green' : 'red'} 
        >{currprice['percentchange'] >= 0 ? '△' : '▽'}{currprice['percentchange']}%
        </Header></Header>
        
      <BuyStock user={user} validtime={validtime()} sym={sym}></BuyStock>
      </Grid.Column>
    </Grid.Row>
    </Grid>


    
    
    <br></br>
    <center><Header as='h3'>Company Description</Header></center>
    <br></br>
       {company['description']}
    <br></br><br></br><br></br>
  <center><Header as='h3'>{sym.toUpperCase()} Stock Performance</Header></center>

    {pricedata.length === 0 ? 
    <Header as='h5'>No Price Data Available for this company</Header>
    :
    <ReactHighCharts config={highchartsConfig(sym, pricedata)}></ReactHighCharts>}
    <br></br>
    <center><Header as='h3'>Additional Company Information</Header></center>
      <br></br>
      <Grid columns={3} divided>
      <Grid.Row>
      <Grid.Column>
        <center>
        <b>CEO: </b><br></br>{company['CEO']}<br></br>
        </center>
      </Grid.Column>
        
      <Grid.Column>
        <center>
        <b>Number of Employees: </b> <br></br>{company['employees']}<br></br>
        </center>  
      </Grid.Column>
      
      <Grid.Column>
        <center>
        <b>Website: </b> <br></br>{company['website']}<br></br>
        </center>  
      </Grid.Column>

      </Grid.Row>
      </Grid>
      <br></br>
    <center>
      <b>Address: </b>{company['address']} {", "} {company['city']} {" "} {company['state']}
    
    <br></br><br></br>
    {addressexists ? 
    <MapResult coords={coords}></MapResult>
    :
    <></>}
    </center>
    <br></br><br></br>
    </Container>
  )
}

Stockinfo.getInitialProps = async ({ query: { sym } }) => {
    // Get historical price data for the symbol
  const url = `https://cloud.iexapis.com/stable/stock/${sym}/chart/1m?token=${process.env.IEXAPI}`
  const response = await axios.get(url);

  // Get company information for the stock
  const companyurl = `https://cloud.iexapis.com/stable/stock/${sym}/company?token=${process.env.IEXAPI}`
  const companyresponse = await axios.get(companyurl)

  // Get Historical Prices
  const priceurl = `https://cloud.iexapis.com/stable/stock/${sym}/quote?token=${process.env.IEXAPI}`
  var pricingdata = (await axios.get(priceurl)).data
  var currprice = {"latest": pricingdata.latestPrice.toFixed(2), "percentchange": (pricingdata.changePercent*100).toFixed(2)}

  // Get google maps coordinates from address
  var fulladdress = ""
  var coords = [0,0]
  var addressexists = true
  if (companyresponse.data.address != null) {
    fulladdress = companyresponse.data.address + " " + companyresponse.data.city + " " + companyresponse.data.state
    
    const googleurl = `https://maps.googleapis.com/maps/api/geocode/json?address=${fulladdress}&key=${process.env.NEXT_PUBLIC_GOOGLEMAPS}`
    var mapsdata = (await axios.get(googleurl)).data
    if (mapsdata.results.length != 0) {
      coords[0] = mapsdata.results[0].geometry.location.lat;
      coords[1] = mapsdata.results[0].geometry.location.lng;
    }
  }
  else {
    addressexists = false;
  }



  return { addressexists: addressexists, coords: coords, sym: sym, data: response.data, company: companyresponse.data, currprice: currprice }
}
export default Stockinfo;