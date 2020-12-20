import AccountHeader from '../components/Account/AccountHeader';
import { Header, Card, Image, Icon, Button, Grid } from 'semantic-ui-react';
import {useRouter} from 'next/router'
import { parseCookies } from "nookies"
import axios from 'axios'
import baseUrl from "../utils/baseUrl"
import ReactHighCharts from 'react-highcharts'
import highchartsAccount from '../components/Account/HighchartsAccount'
import React from 'react'

function sortdates(data) {
  var pricedata = data
  for (var i = pricedata.length -1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (pricedata[j][0] > pricedata[j+1][0]) {
        var temp = pricedata[j+1]
        pricedata[j+1] = pricedata[j]
        pricedata[j] = temp
      }
    }
  }
  return pricedata
}


function getdate(date) {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
    ];
  return months[parseInt(date.split('-')[1]) - 1] + " " + date.split('-')[0]
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function percentchange(oldval, newval) {
  var finalstring = ""

  var change = (((newval[1]-oldval[1])/oldval[1]) * 100).toFixed(2)
  if (change > 0) {
    finalstring += " (△ "
  }
  else {
    finalstring += " (▽ "
  }
  finalstring += change.toString() + "%)"
  return finalstring
}

function Account({accountvalues, curruser}) {
  const router = useRouter()

  function tosearch() {
  router.push('/search')
  }

  var pricedata = sortdates(accountvalues.map((accountvalue) => [Date.parse(accountvalue['date']), accountvalue['value']]))
  return (<center>
    <br></br>
    <Grid stackable columns={2}>
      <Grid.Column id='jumbotron'>
              <Header as='h2'>Account Information</Header>

      <Card>
        <Image src='https://media.istockphoto.com/photos/new-york-stock-exchange-wall-street-usa-picture-id609725528?k=6&m=609725528&s=612x612&w=0&h=qFxSlv87wioN7Fa4VlUzBJk8_87erkS1fN92khaf2x0=' wrapped ui={false} />
        <Card.Content>
          <Card.Header as='h3'>{curruser.name}</Card.Header>
          <Card.Header as='h3'>{curruser.email}</Card.Header>
          
          <Card.Description>
          Trader since {getdate(curruser.createdAt)}<br></br>

          </Card.Description>
        </Card.Content>
      </Card>
      <div>
        <br></br>
        <Button icon color='green' onClick={tosearch} labelPosition='right'>
          <Icon name='chevron circle right' />
          LET'S START TRADING!
        </Button>
        
      </div>


      <Header as='h3'> First time here?  <a href='/help'>Visit our help documents </a>to learn how to use this site.</Header>
      
      </Grid.Column>



      <Grid.Column>
        {pricedata.length > 0 ?
        <Header as='h2'>Last Account Value: ${numberWithCommas(pricedata[pricedata.length-1][1])}
          {(pricedata.length > 1 && (pricedata[pricedata.length-2][1] != 0))? 
          
          percentchange(pricedata[pricedata.length-2], pricedata[pricedata.length-1]) : <></>
          }
        </Header> :
        <Header as='h2'>You're a New User: No Past Account Value Data Yet</Header>
      }
      <div id='highchart'>
      <ReactHighCharts config={highchartsAccount(pricedata)}></ReactHighCharts>
      </div>
      </Grid.Column>
    </Grid>


  
    
    </center>

    
  )
}


Account.getInitialProps = async ctx => {
  const {token} = parseCookies(ctx)
    if (token) {
        const accounturl = `${baseUrl}/api/account`
        const accountpayload = { headers: {Authorization: token}}
        const accountvalues = (await axios.get(accounturl, accountpayload)).data

        const userurl = `${baseUrl}/api/user`
        const userpayload = { headers: {Authorization: token}}
        const curruser = (await axios.get(userurl, userpayload)).data

        return {accountvalues: accountvalues, curruser: curruser}    
    }
    return {accountvalues:[], curruser: {}}
}

export default Account;
