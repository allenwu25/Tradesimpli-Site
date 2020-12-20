import cookie from 'js-cookie'
import Router from 'next/router'

export function handleLogin(token) {
    cookie.set('token', token)
    Router.push('/account')
}

export function redirectUser(ctx, location) {
    // If we're on the server
    if (ctx.req) {
        // 302 means url redirect
        ctx.res.writeHead(302, {Location: location})
        ctx.res.end()
    }
    // If we're on the client
    else {
        Router.push(location);
    }
}


export function handleLogout() {
    cookie.remove('token')
    window.localStorage.setItem('logout', Date.now)
    Router.push('/')
}