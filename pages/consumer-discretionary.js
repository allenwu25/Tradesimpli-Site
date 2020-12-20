import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['AAP - Advance Auto Parts Inc', 'AMZN - Amazon.com Inc',
'APTV - Aptiv Plc', 'AZO - Autozone', 'BBY - Best Buy Company',
'BKNG - Booking Holdings Inc', 'BWA - Borgwarner Inc',
'CCL - Carnival Corp', 'CMG - Chipotle Mexican Grill',
'CPRI - Capri Holdings Ltd', 'DG - Dollar General Corp',
'DHI - D.R. Horton', 'DLTR - Dollar Tree Inc',
'DRI - Darden Restaurants', 'EBAY - Ebay Inc',
'EXPE - Expedia Group Inc', 'F - Ford Motor Company',
'GM - General Motors Company', 'GPC - Genuine Parts Company',
'GPS - Gap Inc', 'GRMN - Garmin Ltd', 'HAS - Hasbro Inc',
'HBI - Hanesbrands Inc', 'HD - Home Depot', 'HLT - Hilton Inc',
'HOG - Harley-Davidson Inc', 'HRB - H&R Block', 'JWN - Nordstrom',
'KMX - Carmax Inc', "KSS - Kohl's Corp", 'LB - L Brands Inc',
'LEG - Leggett & Platt Inc', 'LEN - Lennar Corp', 'LKQ - LKQ Corp',
"LOW - Lowe's Companies", 'LVS - Las Vegas Sands',
"M - Macy's Inc", 'MAR - Marriot Int Cl A',
"MCD - McDonald's Corp", 'MGM - MGM Resorts International',
'MHK - Mohawk Industries', 'NCLH - Norwegian Cruise Ord',
'NKE - Nike Inc', 'NVR - NVR Inc', 'NWL - Newell Rubbermaid Inc',
"ORLY - O'Reilly Automotive", 'PHM - Pultegroup',
'PVH - Phillips-Van Heusen Corp',
'RCL - Royal Caribbean Cruises Ltd', 'RL - Ralph Lauren Corp',
'ROST - Ross Stores Inc', 'SBUX - Starbucks Corp',
'TGT - Target Corp', 'TIF - Tiffany & Company',
'TJX - TJX Companies', 'TPR - Tapestry Inc',
'TSCO - Tractor Supply Company', 'UA - Under Armour Inc Cl C',
'UAA - Under Armour', 'ULTA - Ulta Beauty Inc', 'VFC - V.F. Corp',
'WHR - Whirlpool Corp', 'WYNN - Wynn Resorts Ltd',
'YUM - Yum! Brands']

function ConsumerDiscretionary() {
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

    <Header>Consumer Discretionary Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}

export default ConsumerDiscretionary;