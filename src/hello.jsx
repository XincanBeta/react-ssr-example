import React from 'react';

var Hello = React.createClass({
  componentWillMount: function() {

  },
  handleClick: function(e){
    this.refs.text.value = 'sample text 2';
  },
  render: function() {
    return (
      <div>
        sample：
        <input  type="button" value="fill" onClick={this.handleClick} />
        <input ref="text" type="text" defaultValue="dd" />
      </div>
    );
  }
});

console.log('hello 嗨起来')

export default Hello;