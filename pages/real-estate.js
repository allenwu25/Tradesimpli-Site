import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['AIV - Apartment Investment and Management',
'AMT - American Tower Corp',
'ARE - Alexandria Real Estate Equities',
'AVB - Avalonbay Communities', 'BXP - Boston Properties',
'CBRE - CBRE Group Inc', 'CCI - Crown Castle International Corp',
'DLR - Digital Realty Trust', 'DRE - Duke Realty Corp',
'EQIX - Equinix Inc', 'EQR - Equity Residential',
'ESS - Essex Property Trust', 'EXR - Extra Space Storage Inc',
'FRT - Federal Realty Investment Trust',
'HST - Host Marriott Financial Trust', 'IRM - Iron Mountain Inc',
'KIM - Kimco Realty Corp',
'MAA - Mid-America Apartment Communities',
'O - Realty Income Corp', 'PEAK - Healthpeak Properties Inc.',
'PLD - Prologis Inc', 'PSA - Public Storage',
'REG - Regency Centers Corp', 'SBAC - SBA Communications',
'SLG - SL Green Realty Corp', 'SPG - Simon Property Group',
'UDR - United Dominion Realty Trust', 'VNO - Vornado Realty Trust',
'VTR - Ventas Inc', 'WELL - Welltower Inc',
'WY - Weyerhaeuser Company']

function RealEstate() {
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

    <Header>Real Estate Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}

export default RealEstate;