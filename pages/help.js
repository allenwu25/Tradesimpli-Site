import AccountHeader from '../components/Account/AccountHeader';
import { Header, Container, Image, Icon, Button, Grid } from 'semantic-ui-react';
import {useRouter} from 'next/router'


function Help({user}) {
    const router = useRouter()

    function handleredirect() {
        router.push('/account')
    }

    function handleredirecthome() {
      router.push('/')
    }

    function tosearch() {
      router.push('/search')
      }

    
  return (<center>
    <center>
      {user ?
      <Button 
        icon="chevron circle left" 
        content="Back to Account"
        color='blue'
        onClick = {handleredirect}/> :
        <Button 
        icon="chevron circle left" 
        content="Back to Home"
        color='blue'
        onClick = {handleredirecthome}/>
      }
        <br></br><br></br><br></br>
      </center>

      <Container>
      {user ? <Header as='h2'> Welcome to TradeSimpli, {user.name.split(' ')[0]}!</Header> :
      <Header as='h2'> Welcome to TradeSimpli!</Header>}

      <p>If it's your first time here, read through this guide to learn how to research stocks
        and trade on TradeSimpli's stock simulator platform.
      </p>
      <br></br><br></br>
      <Header as='h2'>1) Your Account</Header>
      <p class='helptext'>After signing up, you will be directed to your Account page.
        On the menu, click on the Account link to access your account.
        Here you can also view your total portfolio value over time.

      </p>
      <Image src='../static/HelpImages/Account.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
      <br></br><br></br><br></br>
      <Header as='h2'>2) Explore Stock Sectors</Header>
      <p class='helptext'> On the menu click on the Search link. Click on a stock sector to
          find S&P 500 stocks which are a part of that sector.
      </p>
      <Image size='massive' src='../static/HelpImages/Explore Sectors.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
      <Image size='massive' src='../static/HelpImages/Sector Details.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
      <br></br><br></br><br></br>
      <Header as='h2'>3) Search Individual Stocks</Header>
      <p class='helptext'>On the menu, click on the Search link.
       To find a stock, enter its ticker into the search bar.
        Searching for a stock will also return the 5 most similar stocks
        based on TradeSimpli's machine learning recommender engine.
      </p>
      <Grid columns={2} stackable>
        <Grid.Column>
        <Image size='massive' src='../static/HelpImages/Recommender.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
        </Grid.Column>
        <Grid.Column>
        <Image size='massive' src='../static/HelpImages/Recommender3.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
        </Grid.Column>
      </Grid>
      <br></br><br></br><br></br>
      <Header as='h2'>4) Stock Details</Header>
      <p class='helptext'>Clicking on the name of a stock that you search will lead you to the stock's Details page
        Details include the current stock price, company description and recent price
        history.
      </p>
      <Image src='../static/HelpImages/Stock Information.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
      <br></br><br></br><br></br>
      <Header as='h2'>5) Buying Shares</Header>
      <p class='helptext'>On the Stock Details page, you can buy shares of the specified
        stock. Please note that buying shares can only be done during market
        hours (9:30 AM - 4:00 PM, Mondays to Fridays). You can specify the
        number of shares you want to purchase, but the trade will only execute
        if you have enough cash.
      </p>
      <Image src='../static/HelpImages/Buy Shares.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
      <br></br><br></br><br></br>
      <Header as='h2'>6) Your Portfolio</Header>
      <p class='helptext'>Clicking on the Portfolio menu link will direct you to
        your portfolio, which contains all shares that you currently
        own, along with your account value and cash available.
        To sell shares, simply specify the number of shares of a company
        you wish to sell and execute. Note that selling is only permitted
        during regular market hours.
      </p>
      <Image src='../static/HelpImages/Sell Shares.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
      <Image src='../static/HelpImages/Market Hours 1.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
      <br></br><br></br><br></br>
      <Header as='h2'>7) Market News</Header>
      <p class='helptext'>
        By clicking on the Market News header tab, news articles will be shown. If you are
        logged in to your account, articles will be shown for stocks in your current portfolio, and
        stocks that you have bought in the past.
      </p>
      <Image src='../static/HelpImages/Market News.PNG' bordered style={{border: "1px solid black !important;"}}></Image>
      <Header as='h2'>8) Leaderboard</Header>
      <p class='helptext'>
        Click on the Leaderboard menu icon to view rankings, and how you stand
        compared to all other users in terms of total account value.
      </p>
    </Container>
    <br></br><br></br>
    <Button icon color='green' onClick={tosearch} labelPosition='right'>
      <Icon name='chevron circle right' />
      LET'S START TRADING!
    </Button>
    </center>
  )
}

export default Help;
