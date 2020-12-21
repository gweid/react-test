import React, { PureComponent } from 'react';

function hightOrderCom(WrapperComponent) {
  return class HOCCom extends PureComponent {
    render() {
      return (
        <WrapperComponent />
      );
    }
  }
}

class AppComponent extends PureComponent {
  render() {
    return (
      <div>
        <h3>===================高阶组件===================</h3>
        <p>AppComponent</p>
      </div>
    );
  }
}

export default hightOrderCom(AppComponent);