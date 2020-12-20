import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['ATVI - Activision Blizzard', 'CHTR - Charter Communicatio',
'CMCSA - Comcast Corp A', 'CTL - Centurylink',
'DIS - Walt Disney Company', 'DISCA - Discovery Comm A',
'DISCK - Discovery Comm Inc', 'DISH - Dish Network Corp',
'EA - Electronic Arts Inc', 'FB - Facebook Inc',
'FOX - Fox Corp Cl B', 'FOXA - Fox Corp Cl A',
'GOOG - Alphabet Cl C', 'GOOGL - Alphabet Cl A',
'IPG - Interpublic Group of Companies',
'LYV - Live Nation Entertainment', 'NFLX - Netflix Inc',
'NWS - News Cp Cl B', 'NWSA - News Cp Cl A',
'OMC - Omnicom Group Inc', 'T - AT&T Inc', 'TMUS - T-Mobile US',
'TTWO - Take-Two Interacti', 'TWTR - Twitter Inc',
'VIAC - Viacomcbs Inc. Cl B', 'VZ - Verizon Communications Inc']


function Communications() {
    const router = useRouter()

    function handleredirect() {
        router.push('/search')
    }

    return <center>
    <Button 
    icon="chevron circle left" 
    content="Back to Search"
    color='blue'
    onClick = {handleredirect}/>

    <Header>Communications Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}

export default Communications;