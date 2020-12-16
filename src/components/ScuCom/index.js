import React, { Component, PureComponent, memo } from 'react';

const MemoScu = memo(function(props) {
  console.log('MemoScu被render');
  return (
    <div>{props.title}</div>
  );
})

class TestScu extends PureComponent {
  constructor(props) {
    super();
  }

//   shouldComponentUpdate(nextProps, nextState) {
//     return nextProps.title !== this.props.title;
//   }

  render() {
    console.log('TestScu进行了render');
    return (
      <div>
        <h1>{this.props.title}</h1>
        TestScu
      </div>
    )
  }
}

class ScuCom extends Component {
  constructor() {
    super();
    this.state = {
      componentTitle: 'ScuCom',
      propTitle: '哈哈哈',
      memoTitle: 'memo的标题'
    }
  }

  handleClick = () => {
    this.setState({
      componentTitle: '变化后的ScuCom'
    });
  }

  handleClickTest = () => {
    this.setState({
      propTitle: '嘿嘿和'
    });
  }

  handleClickMemo = () => {
    this.setState({
      memoTitle: '变化后memo的标题'
    });
  }

  render() {
    console.log('ScuCom进行了render');
    return (
      <div>
        <p onClick={this.handleClick}>{this.state.componentTitle}</p>
        <p onClick={this.handleClickTest}>改变子组件props</p>
        <p onClick={this.handleClickMemo}>改变子组件memo</p>
        <TestScu title={this.state.propTitle} />
        <MemoScu title={this.state.memoTitle} />
      </div>
    );
  }
}

export default ScuCom;