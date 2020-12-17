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

export default class DomCom extends PureComponent {
  constructor(props) {
    super();

    this.reftwo = createRef();
    this.refthree = null;
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

  render() {
    return (
      <div>
        <button ref="refone" onClick={this.refOneClick}>通过 this.refs.xxx</button>
        <button ref={this.reftwo} onClick={this.refTwoClick}>通过 React.createRef</button>
        <button ref={e => this.refthree = e} onClick={this.refThreeClick}>通过传入一个函数</button>
        <UseRefFun />
      </div>
    );
  }
}