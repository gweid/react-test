import React, { PureComponent } from 'react';
import store from '../../../store';
import { addNumber } from '../../../store/actionCreators';

import Test from './test';
export default class TestRedux extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      count: store.getState().count,
    };
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addCount = () => {
    store.dispatch(addNumber(1));
  };

  render() {
    return (
      <div>
        <h2>react结合redux</h2>
        <div>当前计数: {this.state.count}</div>
        <button onClick={this.addCount}>加1</button>
        <Test />
      </div>
    );
  }
}
