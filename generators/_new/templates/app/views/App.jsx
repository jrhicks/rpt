import React from 'react';
import { Link } from 'react-router';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1><%=ctx.titleizeName()%></h1>
        <hr />
        {this.props.children}
      </div>
    );
  }

}

module.exports = App;
