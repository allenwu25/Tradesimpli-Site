import { Button, Container, Form, Icon, Message, Header, Segment } from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react'
import catchErrors from '../utils/catchErrors'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import {handleLogin} from '../utils/auth'


const INITIAL_USER = {
  email: "",
  password: ""
}

function Login() {
  const [user, setUser] = React.useState(INITIAL_USER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  React.useEffect(() => {
    const isUser = Object.values(user).every(el => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true)
  }, [user])

  function handleChange(event) {
    const {name, value} = event.target;
    setUser(prevState => ({...prevState, [name]: value}))
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try{
      setLoading(true)
      setError('')
      const url = `${baseUrl}/api/login`
      const payload = {...user}
      const response = await axios.post(url, payload)
      handleLogin(response.data)
    }
    catch(error) {
      catchErrors(error, setError)
    }
    finally {
      setLoading(false)
    }
  }

  return <Container id="logincontainer">
    <center><Header as='h1'>Login to Your Account</Header></center>
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message error header="Oops!" content={error}></Message>
      
      <Segment>
        <Form.Input fluid icon="envelope" iconPosition="left" value={user.email}
        label='Email' type="email" placeholder="Email" name="email" onChange={handleChange}/>
        <Form.Input fluid icon="lock" iconPosition="left" value={user.password}
        label='Password' type="password" placeholder="Password" name="password" onChange={handleChange}/>
        <Button disabled={disabled || loading} icon="sign in" type="submit" color='green' content="Log In"></Button>
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help"></Icon>
      New user? {" "}
      <Link href='/signup'>
        <a>Sign Up Here</a>
      </Link>{" "} Instead.
    </Message>
    <br></br><br></br>
  </Container>
  ;
}

export default Login;