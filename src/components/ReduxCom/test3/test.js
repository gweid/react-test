// import React, { PureComponent } from 'react';
import React from 'react';
import { reduceNumber } from '../../../store/actionCreators';

import { connect } from 'react-redux'

// class Test extends PureComponent {

//   render() {
//     return (
//       <div>
//         <h2>react-redux Test</h2>
//         <div>当前计数: {this.props.count}</div>
//         <button onClick={e => this.props.reduceCount(1)}>减1</button>
//       </div>
//     );
//   }
// }

function Test(props) {
  return (
    <div>
      <h2>react-redux Test</h2>
      <div>当前计数: {props.count}</div>
      <button onClick={e => props.reduceCount(1)}>减1</button>
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
    reduceCount(number) {
      dispatch(reduceNumber(number));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);