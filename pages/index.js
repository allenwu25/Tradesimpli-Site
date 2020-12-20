import React from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import { Grid, Image, Header, Card, Icon, Button } from 'semantic-ui-react';
import {useRouter} from 'next/router'

function Home() {
  const router = useRouter()

  function handlesignup() {
    router.push('/signup')
  }

  return (

    <div className="maincontent">
      <div className="maincontent">
        <div className="maincontent">
          <div className="ui vertical aligned segment stackable" style={{minHeight: '700px', padding: '1em 0em'}}>
          <Grid stackable columns={2}>
            
            <Grid.Column id='jumbotron'>
              <h1 className="ui header jumbo" style={{fontSize: '4em', fontWeight: 'normal', marginBottom: '0px', marginTop: '3em'}}>Learn to Trade the Intuitive Way</h1>
              <h2 className="ui header jumbo" style={{fontSize: '1.7em', fontWeight: 'normal', marginTop: '1.5em'}}>
                
                TradeSimpli is an all in one stock simulator platform that 
                makes it easy for beginners to research stocks and learn to trade. Sign up today to create your portfolio. </h2>
                
              <Button onClick={handlesignup} color='teal' size='huge'>Sign Up<i aria-hidden="true" className="right arrow icon" /></Button>
            </Grid.Column>
            <Grid.Column>
            <div className="ui text container" id='rightdiv'>
            .
            </div>
            </Grid.Column>
            </Grid>
          </div>
        </div>


        <br></br><br></br>
        <center>
          <Image size='small' src='../static/HelpImages/Tradesimpli2.png'></Image>
          <Header as='h1'>Why TradeSimpli?</Header>
        <Card.Group stackable centered itemsPerRow={3}>

        <div class="ui card">
            <div class="image icon">
              <br></br>
                <i class='teal huge icon search'></i>
                <br></br><br></br>
              </div>
              <div class="content">
              <h2> Search Equities Intuitively</h2>
              <p >TradeSimpli implements machine learning to recommend stocks based on your searches.</p>
            </div>
        </div>

        <div class="ui card">
            <div class="image icon">
              <br></br>
                <i class='teal huge icon money'></i>
                <br></br><br></br>
              </div>
              <div class="content">
              <h2> Trade Equities Intuitively</h2>
              <p >Buy and sell stocks in our stock simulator for free to learn how the market works.</p>
            </div>
        </div>

        <div class="ui card">
            <div class="image icon">
              <br></br>
                <i class='teal huge icon globe'></i>
                <br></br><br></br>
              </div>
              <div class="content">
              <h2> News Delivered Intuitively </h2>
              <p>View a personalized news feed tailored based on your account portfolio and past trades.</p>
            </div>
        </div>
        
        </Card.Group>
        </center>
        <br></br><br></br><br></br>

      </div>
    </div>
  );
}



export default Home;
