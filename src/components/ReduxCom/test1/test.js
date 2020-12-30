import React, { PureComponent } from 'react';
import store from '../../../store';
import { reduceNumber } from '../../../store/actionCreators';

export default class Test extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getState().count,
    };
  }

  // componentDidMount 中订阅变化重新 setState
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count,
      });
    });
  }

  // componentWillUnmount 中取消订阅
  componentWillUnmount() {
    this.unsubscribe();
  }

  // dispatch 去更新 redux 状态
  reduceCount = () => {
    store.dispatch(reduceNumber(1));
  };

  render() {
    return (
      <div>
        <h2>Test</h2>
        <div>当前计数: {this.state.count}</div>
        <button onClick={this.reduceCount}>减1</button>
      </div>
    );
  }
}
