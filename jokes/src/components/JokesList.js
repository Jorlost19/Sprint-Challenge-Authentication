import React from 'react';
import auth from '../apis/auth';

import { Spinner } from './Spinner';

const makeOptions = () => ({
  headers: {
    Authorization: localStorage.getItem('token')
  }
});

export default class JokesList extends React.Component {
  state = {
    jokes: []
  };

  async componentDidMount() {
    const res = await auth.get('jokes', makeOptions());
    this.setState({ jokes: res.data });
  }

  onButtonClick = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    this.props.history.push('/');
  };

  renderJokes = () => {
    if (this.state.jokes.length) {
      return (
        <>
          <ul>
            {this.state.jokes.map(joke => (
              <li key={joke.id}>{joke.joke}</li>
            ))}
          </ul>
          <button onClick={this.onButtonClick}>Sign Out</button>
        </>
      );
    } else {
      return <Spinner />;
    }
  };

  render() {
    return this.renderJokes();
  }
}
