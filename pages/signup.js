import { Button, Form, Icon, Message, Segment, Header, Container } from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react'
import catchErrors from '../utils/catchErrors'
import axios from 'axios'
import baseUrl from '../utils/baseUrl'
import {handleLogin} from '../utils/auth'


const INITIAL_USER = {
  name: "",
  email: "",
  password: ""
}

function Signup() {
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
    try{
      setLoading(true)
      setError('')
      const url = `${baseUrl}/api/signup`
      const payload = { ...user }
      const response = await axios.post(url, payload)
      handleLogin(response.data);
      // make request to sign up user
    }
    catch(error) {
      catchErrors(error, setError)
    }
    finally {
      setLoading(false)
    }
  }

  return <Container id="signupcontainer">
  <center><Header as='h1'>Sign Up</Header></center>
    <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
      <Message error header="Oops!" content={error}></Message>
      
      <Segment>
        <Form.Input fluid icon="user" iconPosition="left" value={user.name}
        label='Name' placeholder="Name" name="name" onChange={handleChange}/>
        <Form.Input fluid icon="envelope" iconPosition="left" value={user.email}
        label='Email' type="email" placeholder="Email" name="email" onChange={handleChange}/>
        <Form.Input fluid icon="lock" iconPosition="left" value={user.password}
        label='Password' type="password" placeholder="Password" name="password" onChange={handleChange}/>
        <Button disabled={disabled || loading} icon="signup" type="submit" color='green' content="Sign Up"></Button>
      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help"></Icon>
      Existing user? {" "}
      <Link href='/login'>
        <a>Log in here</a>
      </Link>{" "} instead.
    </Message>
  </Container>;
}

export default Signup;
