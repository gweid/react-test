import React, { PureComponent } from 'react';

import connect from '../../../utils/connect';
import { addNumber } from '../../../store/actionCreators';

import Test from './test';

class ConnectRedux extends PureComponent {

  addCount = (number) => {
    this.props.addCount(number);
  }

  render() {
    return (
      <div>
        <h2>自定义connect</h2>
        <div>当前计数: {this.props.count}</div>
        <button onClick={e => this.addCount(1)}>加1</button>
        <Test />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: function(number) {
      dispatch(addNumber(number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectRedux);