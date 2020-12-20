import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['ALB - Albemarle Corp', 'AMCR - Amcor Plc',
'APD - Air Products and Chemicals', 'AVY - Avery Dennison Corp',
'BLL - Ball Corp', 'CE - Celanese Corp',
'CF - Cf Industries Holdings', 'CTVA - Corteva Inc',
'DD - Du Pont De.Nemours Inc', 'DOW - Dow Inc', 'ECL - Ecolab Inc',
'EMN - Eastman Chemical Company', 'FCX - Freeport-Mcmoran Inc',
'FMC - FMC Corp', 'IFF - International Flavors & Fragrances',
'IP - International Paper Company', 'LIN - Linde Plc',
'LYB - Lyondellbasell Industries NV',
'MLM - Martin Marietta Materials', 'MOS - Mosaic Company',
'NEM - Newmont Mining Corp', 'NUE - Nucor Corp',
'PKG - Packaging Corp of America', 'PPG - PPG Industries',
'SEE - Sealed Air Corp', 'SHW - Sherwin-Williams Company',
'VMC - Vulcan Materials Company', 'WRK - Westrock Company']

function BasicMaterials() {
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
    <Header>Basic Materials Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}

export default BasicMaterials;