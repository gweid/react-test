// import React, { PureComponent } from 'react';
import React from 'react';

import { connect } from 'react-redux';
import { addNumber } from '../../../store/actionCreators';

import Test from './test';

// class ReactReduxCom extends PureComponent {

//   render() {
//     return (
//       <div>
//         <h2>react-redux</h2>
//         <div>当前计数: {this.props.count}</div>
//         <button onClick={e => this.props.addCount(1)}>加1</button>
//         <Test />
//       </div>
//     );
//   }
// }

function ReactReduxCom(props) {
  return (
    <div>
      <h2>react-redux</h2>
      <div>当前计数: {props.count}</div>
      <button onClick={e => props.addCount(1)}>加1</button>
      <Test />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount(number) {
      dispatch(addNumber(number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxCom);