import React, { Component } from 'react';

import Child from './Child';

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
    };
  }

  addCount(name) {
    console.log(name);
    this.setState({
      count: this.state.count + 1,
    });
  }

  render() {
    return (
      <div>
        <h2>父子组件传值</h2>
        <Child txt="传过来的值" addCount={(e, name) => this.addCount(name)} />
        <div>当前计数值：{this.state.count}</div>
      </div>
    );
  }
}

export default Parent;
