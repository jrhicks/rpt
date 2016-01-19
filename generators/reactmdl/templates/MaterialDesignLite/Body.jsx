import React from 'react';

const defaultProps = { drawer: false };

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


Body.defaultProps = defaultProps;
module.exports = Body;
