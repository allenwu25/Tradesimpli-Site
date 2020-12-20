import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['AAL - American Airlines Gp', 'ALK - Alaska Air Group',
'ALLE - Allegion Plc', 'AME - Amtek Inc',
'AOS - Smith [A.O.] Corp', 'ARNC - Arconic Inc',
'BA - Boeing Company', 'CAT - Caterpillar Inc',
'CHRW - C.H. Robinson Ww', 'CMI - Cummins Inc',
'CPRT - Copart Inc', 'CSX - CSX Corp', 'CTAS - Cintas Corp',
'DAL - Delta Air Lines Inc', 'DE - Deere & Company',
'DOV - Dover Corp', 'EFX - Equifax Inc',
'EMR - Emerson Electric Company', 'ETN - Eaton Corp',
'EXPD - Expeditors Intl', 'FAST - Fastenal Company',
'FBHS - Fortune Brands Home & Security', 'FDX - Fedex Corp',
'FLS - Flowserve Corp', 'FTV - Fortive Corp',
'GD - General Dynamics Corp', 'GE - General Electric Company',
'GWW - W.W. Grainger', 'HII - Huntington Ingalls Industries',
'HON - Honeywell International Inc', 'IEX - Idex Corp',
'INFO - IHS Markit Ltd', 'IR - Ingersoll-Rand Plc [Ireland]',
'ITW - Illinois Tool Works Inc',
'J - Jacobs Engineering Group Inc', 'JBHT - J B Hunt Transport',
'JCI - Johnson Controls Intl', 'KSU - Kansas City Southern',
'LHX - L3Harris Technologies Inc', 'LMT - Lockheed Martin Corp',
'LUV - Southwest Airlines Company', 'MAS - Masco Corp',
'MMM - 3M Company', 'NLSN - Nielsen Holdings Plc',
'NOC - Northrop Grumman Corp', 'NSC - Norfolk Southern Corp',
'ODFL - Old Dominion Freig', 'PCAR - Paccar Inc',
'PH - Parker-Hannifin Corp', 'PNR - Pentair Ltd',
'PWR - Quanta Services', 'RHI - Robert Half International Inc',
'ROK - Rockwell Automation Inc', 'ROL - Rollins Inc',
'ROP - Roper Industries', 'RSG - Republic Services',
'RTN - Raytheon Company', 'SNA - Snap-On Inc',
'SWK - Stanley Black & Decker Inc', 'TDG - Transdigm Group Inc',
'TXT - Textron Inc', 'UAL - United Continental Holdings',
'UNP - Union Pacific Corp', 'UPS - United Parcel Service',
'URI - United Rentals', 'UTX - United Technologies Corp',
'VRSK - Verisk Analytics Inc', 'WAB - Wabtec Corp',
'WM - Waste Management', 'XYL - Xylem Inc']

function Industrials() {

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
    <Header>Industrials Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}


export default Industrials;