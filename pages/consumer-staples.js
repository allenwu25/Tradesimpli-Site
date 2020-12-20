import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['ADM - Archer Daniels Midland', 'BF.B - Brown Forman Inc Cl B',
'CAG - Conagra Brands Inc', 'CHD - Church & Dwight Company',
'CL - Colgate-Palmolive Company', 'CLX - Clorox Company',
'COST - Costco Wholesale', 'COTY - Coty Inc',
'CPB - Campbell Soup Company', 'EL - Estee Lauder Companies',
'GIS - General Mills', 'HRL - Hormel Foods Corp',
'HSY - Hershey Foods Corp', 'K - Kellogg Company',
'KHC - Kraft Heinz Company', 'KMB - Kimberly-Clark Corp',
'KO - Coca-Cola Company', 'KR - Kroger Company',
'LW - Lamb Weston Holdings Inc', 'MDLZ - Mondelez Intl Inc',
'MKC - Mccormick & Company Inc', 'MNST - Monster Beverage Cp',
'MO - Altria Group', 'PEP - Pepsico Inc',
'PG - Procter & Gamble Company',
'PM - Philip Morris International Inc',
'SJM - J.M. Smucker Company', 'STZ - Constellation Brands Inc',
'SYY - Sysco Corp', 'TAP - Molson Coors Brewing Company',
'TSN - Tyson Foods', 'WBA - Walgreens Boots Alliance',
'WMT - Wal-Mart Stores']

function ConsumerStaples() {
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

    <Header>Consumer Staples Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}

export default ConsumerStaples;