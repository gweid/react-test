import React, { PureComponent } from 'react';

class Header extends PureComponent {
  constructor(props) {
    super();
  }

  render() {
    const { title, right } = this.props;
    return (
      <div>
        <h2>{title}</h2>
        <h3>{right}</h3>
      </div>
    );
  }
}

function changeProp(WrapperCom, otherProps) {
  return props => <WrapperCom {...props} {...otherProps} />
}

const PropHeader = changeProp(Header, {right: '点击'})

class HOCProp extends PureComponent {
  constructor(props) {
    super();
    this.state = {
      headTitle: '首页'
    }
  }

  render() {
    return (
      <div>
        <h4>----------------高阶组件props值增强-----------------</h4>
        <PropHeader title={this.state.headTitle} />
      </div>
    );
  }
}

export default HOCProp;