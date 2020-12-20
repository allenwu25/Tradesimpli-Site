import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['AAPL - Apple Inc', 'ACN - Accenture Plc',
'ADBE - Adobe Systems Inc', 'ADI - Analog Devices',
'ADP - Automatic Data Procs', 'ADS - Alliance Data Systems Corp',
'ADSK - Autodesk Inc', 'AKAM - Akamai Technologies',
'AMAT - Applied Materials', 'AMD - Adv Micro Devices',
'ANET - Arista Networks Inc', 'ANSS - Ansys Inc',
'APH - Amphenol Corp', 'AVGO - Broadcom Ltd',
'BR - Broadridge Financial Solutions Llc',
'CDNS - Cadence Design Sys', 'CDW - CDW Corp',
'CRM - Salesforce.com Inc', 'CSCO - Cisco Systems Inc',
'CTSH - Cognizant Tech Sol', 'CTXS - Citrix Systems Inc',
'DXC - Dxc Technology Company', 'FFIV - F5 Networks Inc',
'FIS - Fidelity National Information Services',
'FISV - Fiserv Inc', 'FLIR - Flir Systems Inc',
'FLT - Fleetcor Technologies', 'FTNT - Fortinet Inc',
'GLW - Corning Inc', 'GPN - Global Payments Inc',
'HPE - Hewlett Packard Enterprise Comp', 'HPQ - Hp Inc',
'IBM - International Business Machines', 'INTC - Intel Corp',
'INTU - Intuit Inc', 'IPGP - Ipg Photonics Corp',
'IT - Gartner Inc', 'JKHY - Jack Henry & Assoc',
'JNPR - Juniper Networks', 'KEYS - Keysight Technologies Inc Comm',
'KLAC - K L A-Tencor Corp', 'LDOS - Leidos Holdings Inc',
'LRCX - Lam Research Corp', 'MA - Mastercard Inc',
'MCHP - Microchip Technology', 'MSFT - Microsoft Corp',
'MSI - Motorola Solutions', 'MU - Micron Technology',
'MXIM - Maxim Integrated', 'NLOK - Nortonlifelock Inc.',
'NOW - Servicenow Inc', 'NTAP - Netapp Inc', 'NVDA - Nvidia Corp',
'ORCL - Oracle Corp', 'PAYC - Paycom Software Inc',
'PAYX - Paychex Inc', 'PYPL - Paypal Holdings',
'QCOM - Qualcomm Inc', 'QRVO - Qorvo Inc', 'SNPS - Synopsys Inc',
'STX - Seagate Tech Ord Shs', 'SWKS - Skyworks Solutions',
'TEL - Te Connectivity Ltd', 'TXN - Texas Instruments',
'V - Visa Inc', 'VRSN - Verisign Inc', 'WDC - Western Digital Cp',
'WU - Western Union Company', 'XLNX - Xilinx Inc',
'XRX - Xerox Corp', 'ZBRA - Zebra Technologies']


function InformationTechnology() {
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

    <Header>Information Technology Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}

export default InformationTechnology;