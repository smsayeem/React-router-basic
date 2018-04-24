import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, NavLink, Redirect, Prompt } from 'react-router-dom'

//User component
const User = (params)=>{return(<h1>Welcome user, {params.username}</h1>)}

//App class component
class App extends Component {

  state={
    loggedIn:false
  }

  loginHandle=()=>{
    this.setState((prevState)=>({
      loggedIn:!prevState.loggedIn
    }))
  }
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><NavLink to='/' exact activeStyle={{color:'red'}} >Home</NavLink></li>
            <li><NavLink to='/about' exact activeStyle={{color:'red'}} >About</NavLink></li>
            <li><NavLink to='/user/Admin' exact activeStyle={{color:'red'}} >User: Admin</NavLink></li>
            <li><NavLink to='/user/Standard' exact activeStyle={{color:'red'}} >User: Standard</NavLink></li>
          </ul>
          <Prompt
            when={!this.state.loggedIn}
            message={(location)=>{
              return location.pathname.startsWith('/user') ? 'Please login to enter members area.' : true
            }}
          />
          <input type='button' value={this.state.loggedIn ? 'Log Out' : 'Log in'} onClick={this.loginHandle} />

          <Route  path='/' exact strict render={()=>{return(<h1>Welcome Home</h1>)}}  />
          <Route  path='/about' exact strict render={()=>{return(<h1>Welcome About</h1>)}}  />
          <Route path='/user/:username' exact strict render={({match})=>(
            this.state.loggedIn ? ( <User username={match.params.username} /> ) : ( <Redirect to='/' /> )
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
