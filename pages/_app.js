import App from "next/app";
import Layout from '../components/_App/Layout'
import { parseCookies, destroyCookie } from 'nookies'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
import axios from 'axios'
import Router from 'next/router'


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const {token} = parseCookies(ctx);
    
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
      // User is not authenticated
      const isProtectedRoute = ctx.pathname === '/account' || ctx.pathname === '/create' || ctx.pathname === '/portfolio' || ctx.pathname === '/leaderboard'
      if (isProtectedRoute) {
        redirectUser(ctx, '/login')
      }
    }
      // Get user's account data with our token
      else {
        try {
          const payload = { headers: {Authorization: token}}
          const url = `${baseUrl}/api/user`
          const response = await axios.get(url, payload)
          const user = response.data
          pageProps.user = user
        }
        catch(error) {
          console.error("Error getting current user", error)
          // Throw out invalid token
          destroyCookie(ctx, "token")

          // Redirect to login page
          redirectUser(ctx, "/login")

        }
      }
    

    return { pageProps }
  }

  

  componentDidMount() {
    window.addEventListener('storage', this.syncLogout)
  }

  syncLogout = event => {
    if (event.key == 'logout') {
      Router.push('/login')
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    )
  }
}

export default MyApp;
