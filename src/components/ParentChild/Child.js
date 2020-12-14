import React, { Component } from 'react';

class Child extends Component {
  constructor(props) {
    super();
    this.state = {};
    console.log('constructor 的 props：', this.props);
  }

  render() {
    const { txt, addCount } = this.props;
    
    return (
      <div>
        <h2>子组件</h2>
        <p>{txt}</p>
        <button onClick={e => addCount(e, 'jack')}>加+</button>
      </div>
    );
  }
}

Child.defaultProps = {
  txt: '默认值',
};

export default Child;
