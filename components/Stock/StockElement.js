import {Table, Image, Header, Input, Button} from 'semantic-ui-react'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import cookie from 'js-cookie'
import React from 'react'




function StockElement({isOpen, trade}) {

    
  const [loading, setLoading] = React.useState(false)
  const [quantity, setQuantity] = React.useState(1)


    async function sellstock(symbol, sharesowned, sharestosell) {
        const url = `${baseUrl}/api/sellshares`
        setLoading(true)

        // 1) Make sure we're not selling more shares than we own
        if (sharestosell > sharesowned) {
            return;
        }
        // 2) If sharestosell < sharesowned, we decrement the number of
        //    company shares
        else {
            
            const token = cookie.get('token')
            const headers = {headers: {Authorization: token}}
            const payload = {symbol, sharestosell}
            const response = (await axios.put(url, payload, headers)).data
            
            window.location.reload();
            
        }
        setLoading(false)
    }

    var symbol = trade[0]
    return (
        <Table.Row>
            <Table.Cell width={2}>
                <Image size='tiny' src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${symbol}.png`}></Image>
            </Table.Cell>
            <Table.Cell width={2}>
            <Header as='h3'>{trade[0]}</Header>
            <p as='h2' textAlign='left'>
                {trade[1]} shares
            </p>
            </Table.Cell>
            <Table.Cell width={2}>
            <Header as='h2' textAlign='left'>
                ${trade[2]}</Header>
            <Header as='h4' color={trade[3] >= 0? 'green' : 'red'} textAlign='left'>{trade[3] >= 0 ? '△' : '▽'}{" "}{trade[3]}%</Header>
                
            
            </Table.Cell>
            <Table.Cell width={2}>
            
            <Input 
                type="number"
                min="1"
                size="small"
                max={trade[1]}
                value={quantity}
                style={{width: 68}}
                onChange={event => setQuantity(Number(event.target.value))}
                placeholder="Quantity"
                action={
                    { loading, disabled: (loading || !isOpen), color:'green', content: "Sell Shares", onClick: () => sellstock(trade[0], trade[1], quantity) }}
                actionPosition= 'left'

            ></Input>
            </Table.Cell>
        </Table.Row>
    )
}
export default StockElement;