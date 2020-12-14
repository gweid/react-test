import React, { Component } from 'react';
import { EventEmitter } from 'events';

const eventBus = new EventEmitter();

class Head extends Component {
  handleClick() {
    eventBus.emit('handleEvent', 'jack', 18)
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>events跨组件</button>
      </div>
    )
  };
}

class Top extends Component {
  render() {
    return <div><Head /></div>
  }
}

export default class EventsCom extends Component {
  componentDidMount() {
    eventBus.addListener("handleEvent", this.headleClick)
  };

  headleClick(name, age) {
    console.log(name, age);
  };

  componentWillUnmount() {
    eventBus.removeListener("handleEvent", this.headleClick);
  };

  render() {
    return (
      <div>
        <Top />
      </div>
    );
  }
}
