import React from 'react';

class Circle extends React.Component {
    render() {
              return (
        <button className={this.props.className}>
          {this.props.value}
        </button>
      );
    }
  }
  export default Circle;