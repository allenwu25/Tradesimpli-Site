import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['APA - Apache Corp', 'BKR - Baker Hughes A Ge Co. Cl A',
'COG - Cabot Oil & Gas Corp', 'COP - Conocophillips',
'CVX - Chevron Corp', 'CXO - Concho Resources Inc',
'DVN - Devon Energy Corp', 'EOG - Eog Resources',
'FANG - Diamondback Energy', 'FTI - Technipfmc Plc',
'HAL - Halliburton Company', 'HES - Hess Corp',
'HFC - Hollyfrontier Corp', 'HP - Helmerich & Payne',
'KMI - Kinder Morgan', 'MPC - Marathon Petroleum Corp',
'MRO - Marathon Oil Corp', 'NBL - Noble Energy Inc',
'NOV - National-Oilwell', 'OKE - Oneok Inc',
'OXY - Occidental Petroleum Corp', 'PSX - Phillips 66',
'PXD - Pioneer Natural Resources Company',
'SLB - Schlumberger N.V.', 'VLO - Valero Energy Corp',
'WMB - Williams Companies', 'XEC - Cimarex Energy Company',
'XOM - Exxon Mobil Corp']

function Energy() {

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
    <Header>Energy Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}


export default Energy;