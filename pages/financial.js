import { Header, Card, Button, List } from "semantic-ui-react";
import {useRouter} from 'next/router'

var stocks = ['AFL - Aflac Incorporated', 'AIG - American International Group',
'AIZ - Assurant Inc', 'AJG - Arthur J. Gallagher & Company',
'ALL - Allstate Corp', 'AMP - Ameriprise Financial Services',
'AON - AON Plc', 'AXP - American Express Company',
'BAC - Bank of America Corp', 'BEN - Franklin Resources',
'BK - Bank of New York Mellon Corp', 'BLK - Blackrock',
'BRK.B - Berkshire Hathaway Cl B', 'C - Citigroup Inc',
'CB - Chubb Ltd', 'CBOE - CBOE Global Markets Inc',
'CFG - Citizens Financial Group Inc/Ri',
'CINF - Cincinnati Financial', 'CMA - Comerica Inc',
'CME - CME Group Inc', 'COF - Capital One Financial Corp',
'DFS - Discover Financial Services', 'ETFC - E*Trade Finl Corp',
'FITB - Fifth Third Bncp', 'FRC - First Republic Bank',
'GL - Globe Life Inc', 'GS - Goldman Sachs Group',
'HBAN - Huntington Bcshs',
'HIG - Hartford Financial Services Group',
'ICE - Intercontinental Exchange', 'IVZ - Invesco Plc',
'JPM - JP Morgan Chase & Company', 'KEY - Keycorp',
'L - Loews Corp', 'LNC - Lincoln National Corp',
"MCO - Moody's Corp", 'MET - Metlife Inc',
'MKTX - Marketaxess Holdings', 'MMC - Marsh & Mclennan Companies',
'MS - Morgan Stanley', 'MSCI - MSCI Inc', 'MTB - M&T Bank Corp',
'NDAQ - Nasdaq Inc', 'NTRS - Northern Trust Corp',
"PBCT - People's United Finl",
'PFG - Principal Financial Group Inc', 'PGR - Progressive Corp',
'PNC - PNC Bank', 'PRU - Prudential Financial Inc',
'RE - Everest Re Group', 'RF - Regions Financial Corp',
'RJF - Raymond James Financial', 'SCHW - The Charles Schwab Corp',
'SIVB - Svb Financial Group', 'SPGI - S&P Global Inc',
'STT - State Street Corp', 'SYF - Synchrony Financial',
'TFC - Truist Financial Corp.', 'TROW - T Rowe Price Group',
'TRV - The Travelers Companies Inc', 'UNM - Unumprovident Corp',
'USB - U.S. Bancorp', 'WFC - Wells Fargo & Company',
'WLTW - Willis Towers WT', 'WRB - W.R. Berkley Corp',
'ZION - Zions Bancorp']

function Financial() {

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

    <Header>Financial Sector Stocks</Header>
    <List celled size='large'>
    {stocks.map((stock) => <>
        <List.Item as='a' href={`/stockinfo?sym=${stock.split(' -')[0]}`}>{stock}</List.Item>
        </>
    )}
    </List>
    </center>
}


export default Financial;