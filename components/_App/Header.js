import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router'
import {handleLogout} from '../../utils/auth'
import NProgress from 'nprogress'

Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({user}) {
  const router = useRouter()

  function isActive(route) {
    return route === router.pathname;
  }

  function handlechange(route) {
    router.push(route)
  }

  function handleportfolio() {
    router.push('/portfolio')
    window.location.href = '/portfolio'
  }

  function handlemarket() {
    router.push('/marketnews')
  }


  return (
    <Menu stackable fluid id='menu' inverted>

        <Link href='/'>
          <Menu.Item id='logo' header active={isActive('/')}>
            <Image size='tiny' src='/static/HelpImages/Tradesimpli.png'
            style={{margin: "0px 0px 0px 0px !important", marginRight: '1em'}} />
            TradeSimpli
          </Menu.Item>
        </Link>

        {user ? (
        
        <>
        <Link href='/account'>
          <Menu.Item header active={isActive('/account')}>
            <Icon size='mini' name='user' size='large'/>
            Account
          </Menu.Item>
        </Link>

          <Menu.Item header active={isActive('/portfolio')} onClick={handleportfolio}>
            <Icon size='mini' name='chart bar outline' size='large'/>
            Portfolio
          </Menu.Item>

        <Link href='/search'>
          <Menu.Item header active={isActive('/search')}>
            <Icon size='mini' name='search' size='large'/>
            Search Stocks
          </Menu.Item>
        </Link>
        
          <Menu.Item header active={isActive('/marketnews')} onClick={handlemarket}>
            <Icon size='mini' name='globe' size='large'/>
            Market News
          </Menu.Item>

          <Link href='/help'>
          <Menu.Item header  active={isActive('/help')}>
            <Icon size='mini' name='question circle outline' size='large'/>
            Help Docs
          </Menu.Item>
        </Link>

        <Menu.Item header onClick={handleLogout}>
          <Icon size='mini' name='sign out' size='large'/>
          Logout
        </Menu.Item>

        </>
        ) :

        (
        <>
        <Link href='/search'>
          <Menu.Item header active={isActive('/search')}>
            <Icon size='mini' name='search' size='large'/>
            Search Stocks
          </Menu.Item>
        </Link>
        <Link href='/marketnews' >
          <Menu.Item header active={isActive('/marketnews')}>
            <Icon size='mini' name='globe' size='large'/>
            Market News
          </Menu.Item>
        </Link>

        <Link href='/login'>
          <Menu.Item header active={isActive('/login')}>
            <Icon size='mini' name='sign in' size='large'/>
            Login
          </Menu.Item>
        </Link>

        <Link href='/signup'>
          <Menu.Item header  active={isActive('/signup')}>
            <Icon size='mini' name='signup' size='large'/>
            Sign Up
          </Menu.Item>
        </Link>
        <Link href='/help'>
          <Menu.Item header  active={isActive('/help')}>
            <Icon size='mini' name='question circle outline' size='large'/>
            Help Docs
          </Menu.Item>
        </Link>
      </>
      )}

      
      
    </Menu>
  )
}

export default Header;
