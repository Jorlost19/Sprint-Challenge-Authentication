import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import SignUp from './components/SingUp';
import JokesList from './components/JokesList';
import LogIn from './components/LogIn';

class App extends Component {
  render() {
    return (
      <>
        <div>
          <NavLink activeClassName='active' to='/signup'>
            Sign Up
          </NavLink>
          <NavLink activeClassName='active' to='/signin'>
            Log In
          </NavLink>
          <NavLink activeClassName='active' to='/jokes'>
            Jokes
          </NavLink>
        </div>

        <Route path='/signup' render={props => <SignUp {...props} />} />
        <Route path='/jokes' render={props => <JokesList {...props} />} />
        <Route path='/signin' render={props => <LogIn {...props} />} />
      </>
    );
  }
}

export default App;
