import React, { PureComponent } from 'react';
import { SwitchTransition, CSSTransition } from "react-transition-group";

import './SwitchAnimat.css';

export default class SwitchAnimation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOn: true
    }
  }

  render() {
    const {isOn} = this.state;

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition classNames="btn" timeout={500} key={isOn ? "on" : "off"}>
          {
            <button onClick={this.btnClick.bind(this)}>
              {isOn ? "on": "off"}
            </button>
          }
        </CSSTransition>
      </SwitchTransition>
    )
  }

  btnClick() {
    this.setState({isOn: !this.state.isOn})
  }
}