function Footer({user}) {
    return (
        
        <div className="ui vertical segment footer" style={{padding: '5em 0em'}}>
          <div className="ui container">
            <div className="ui stackable divided grid">
              <div className="row">
                <div className="seven wide column">
                  <h4 className="ui inverted header">Site Links</h4>
                  <div role="list" className="ui inverted link">
                      <a role="listitem" href='/help' className="item footer">Help</a> {"   |   "}                     
                      <a role="listitem" href='/search' className="item footer">Search</a> {"   |   "}
                      <a role="listitem" href='/marketnews' className="item footer">Market News</a> {"   |   "}
                      {user ? <a role="listitem" href='/account' className="item footer">Account{"   |   "}</a> : <></>}
                      {user ? <a role="listitem" href='/portfolio' className="item footer">Portfolio</a>  : 
                              <a role="listitem" href='/login' className="item footer">Log In{"   |   "}</a>} 
                      {user ? <></> : <a role="listitem" href='/signup' className="item footer">Sign Up</a>}
                      
                  </div>
                </div>
                <div className="five wide column">
                  <h4 className="ui inverted header"><a className="item footer">Copyright TradeSimpli 2020 ©</a></h4>
                  <h4 className="ui inverted header"><a className="item footer" href='/about'>About the Developer</a></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}


export default Footer;