import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['AEE - Ameren Corp', 'AEP - American Electric Power Company',
'AES - The Aes Corp', 'ATO - Atmos Energy Corp',
'AWK - American Water Works', 'CMS - Cms Energy Corp',
'CNP - Centerpoint Energy Inc', 'D - Dominion Resources',
'DTE - Dte Energy Company', 'DUK - Duke Energy Corp',
'ED - Consolidated Edison Company of New York',
'EIX - Edison International', 'ES - Eversource Energy',
'ETR - Entergy Corp', 'EVRG - Evergy Inc', 'EXC - Exelon Corp',
'FE - Firstenergy Corp', 'LNT - Alliant Energy Corp',
'NEE - Nextera Energy', 'NI - NiSource Inc', 'NRG - NRG Energy',
'PEG - Public Service Enterprise Group Inc',
'PNW - Pinnacle West Capital Corp', 'PPL - PPL Corp',
'SO - Southern Company', 'SRE - Sempra Energy',
'WEC - Wisconsin Energy Corp', 'XEL - XCEL Energy Inc']

function Utilities() {
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

    <Header>Utilities Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}

export default Utilities;