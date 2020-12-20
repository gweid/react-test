import React, { PureComponent, createRef, useRef } from 'react';

function UseRefFun() {
  const funRef = useRef(null);

  const funRefClick = () => {
    funRef.current.innerHTML = 'useRef执行';
  }

  return (
    <div>
      <button ref={funRef} onClick={funRefClick}>useRef</button>
    </div>
  )
}

class CountCom extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      count: 0
    }
  }

  handleAdd = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <div>
        <h3>{this.state.count}</h3>
      </div>
    );
  }
}

export default class DomCom extends PureComponent {
  constructor(props) {
    super();

    this.reftwo = createRef();
    this.refthree = null;
    this.refFour = createRef();
  }

  refOneClick = () => {
    this.refs.refone.innerHTML = 'this.refs.xxx 执行';
  }

  refTwoClick = () => {
    this.reftwo.current.innerHTML = 'createRef()执行';
  }

  refThreeClick = () => {
    this.refthree.innerHTML = '传入一个函数 执行';
  }

  handleCountAdd = () =>　{
    this.refFour.current.handleAdd();
  }

  render() {
    return (
      <div>
        <button ref="refone" onClick={this.refOneClick}>通过 this.refs.xxx</button>
        <button ref={this.reftwo} onClick={this.refTwoClick}>通过 React.createRef</button>
        <button ref={e => this.refthree = e} onClick={this.refThreeClick}>通过传入一个函数</button>
        <UseRefFun />
        <CountCom ref={this.refFour} />
        <button onClick={this.handleCountAdd}>addCount</button>
      </div>
    );
  }
}