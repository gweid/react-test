import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

class Modal extends PureComponent {
  render() {
    // this.props.children：代表的是 Modal 组件里面的元素，类似 vue 插槽
    return createPortal(this.props.children, document.getElementById('modal'));
  }
}

export default class PortalCom extends PureComponent {
  render() {
    return (
      <div>
        <Modal>
          <h2>我是标题</h2>
        </Modal>
      </div>
    );
  }
}
