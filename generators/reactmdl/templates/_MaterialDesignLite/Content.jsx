import React from 'react';
import Lorem from 'react-lorem-component';

class Content extends React.Component {

  render() {
    return (
      <main className="mdl-layout__content">
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
          {this.props.children}
        </div>
      </main>
    );
  }
}

module.exports = Content;
