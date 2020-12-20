import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['A - Agilent Technologies', 'ABBV - Abbvie Inc',
'ABC - Amerisourcebergen Corp', 'ABMD - Abiomed Inc',
'ABT - Abbott Laboratories', 'AGN - Allergan Plc',
'ALGN - Align Technology', 'ALXN - Alexion Pharm Inc',
'AMGN - Amgen Inc', 'ANTM - Anthem Inc',
'BAX - Baxter International Inc',
'BDX - Becton Dickinson and Company', 'BIIB - Biogen Inc',
'BMY - Bristol-Myers Squibb Company',
'BSX - Boston Scientific Corp', 'CAH - Cardinal Health',
'CERN - Cerner Corp', 'CI - Cigna Corp', 'CNC - Centene Corp',
'COO - Cooper Companies', 'CVS - CVS Corp',
'DGX - Quest Diagnostics Inc', 'DHR - Danaher Corp',
'DVA - Davita Healthcare Partners Inc',
'EW - Edwards Lifesciences Corp', 'GILD - Gilead Sciences Inc',
'HCA - Hca Holdings Inc', 'HOLX - Hologic Inc',
'HSIC - Henry Schein Inc', 'HUM - Humana Inc',
'IDXX - Idexx Laboratories', 'ILMN - Illumina Inc',
'INCY - Incyte Corp', 'IQV - Iqvia Holdings Inc',
'ISRG - Intuitive Surg Inc', 'JNJ - Johnson & Johnson',
'LH - Laboratory Corp of America Holdings',
'LLY - Eli Lilly and Company', 'MCK - Mckesson Corp',
'MDT - Medtronic Inc', 'MRK - Merck & Company',
'MTD - Mettler-Toledo International', 'MYL - Mylan NV Ord Shs',
'PFE - Pfizer Inc', 'PKI - Perkinelmer', 'PRGO - Perrigo Company',
'REGN - Regeneron Pharmaceuticals', 'RMD - Resmed Inc',
'STE - Steris Corp', 'SYK - Stryker Corp', 'TFX - Teleflex Inc',
'TMO - Thermo Fisher Scientific Inc',
'UHS - Universal Health Services', 'UNH - Unitedhealth Group Inc',
'VAR - Varian Medical Systems', 'VRTX - Vertex Pharmaceutic',
'WAT - Waters Corp', 'XRAY - Dentsply Sirona Inc',
'ZBH - Zimmer Biomet Holdings', 'ZTS - Zoetis Inc Cl A']

function Healthcare() {
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

    <Header>Healthcare Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}


export default Healthcare;