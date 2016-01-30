import React from 'react';
import { Link } from 'react-router';
import style from './Dashboard.scss'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={style.root}>
        <h1>Dashboard</h1>
        <hr />
        {this.props.children}
      </div>
    );
  }

}

module.exports = App;
