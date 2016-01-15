import React from 'react';

class Body extends React.Component {

  render() {
    return (
      <main className="mdl-layout__content">
        <div className="mdl-layout__content-container">
          {this.props.children}
        </div>
      </main>
    );
  }
}

module.exports = Body;
