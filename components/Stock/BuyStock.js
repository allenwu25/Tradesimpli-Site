import React from 'react'
import { Input } from 'semantic-ui-react'
import {useRouter} from 'next/router'
import axios from 'axios'
import baseUrl from '../../utils/baseUrl'
import cookie from 'js-cookie'
import catchErrors from '../../utils/catchErrors'

function BuyStock({user, validtime, sym}) {


const router = useRouter();
  const [quantity, setQuantity] = React.useState(1)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  
  async function handleBuyStock() {
    try {
    setSuccess(false)
    setLoading(true)
    // First, add the trade to the Stocks table
    // (POST request to stocks endpoint)
    const posturl = `${baseUrl}/api/stocks`
    const payload = { symbol: sym.toUpperCase(), buyprice: 99.99 }

    // Get current price of stock
    const priceurl = `https://cloud.iexapis.com/stable/stock/${payload.symbol}/quote?token=${process.env.IEXAPI}`
    const currprice = (await axios.get(priceurl)).data.latestPrice
    payload.buyprice = currprice

    const token = cookie.get('token')
    const headers = {headers: {Authorization: token}}
    const newstock = (await axios.post(posturl, payload, headers)).data

    // After, update the user's existing portfolio with
    // that trade
    const puturl = `${baseUrl}/api/portfolio`
    const putpayload = { quantity, newstock}
    await axios.put(puturl, putpayload, headers)
    setSuccess(true)
    router.push('/portfolio')
    }
    catch(error) {
        catchErrors(error, window.alert)
    }
    finally {
        setLoading(false)
    }

  }

  return <Input 
    type="number"
    min="1"
    style={{width: 80}}
    value={quantity}
    onChange={event => setQuantity(Number(event.target.value))}
    placeholder="Quantity"
    action={
        validtime === true ? (
        user && success ? { color: 'blue', content: 'Successful!', icon: 'dollar', disabled: "True"} :
        user ? { loading, disabled: loading, color:'green', content: "Buy Shares", icon: "dollar", onClick: handleBuyStock } : 
        { color: 'blue', content: "Sign Up to Trade", icon: "signup", onClick: ()=> router.push('/signup')} )
      :
      { disabled: true, color:'green', content: "Market Closed", icon: "dollar", onClick: handleBuyStock }
      }
    ></Input>
}

export default BuyStock;
