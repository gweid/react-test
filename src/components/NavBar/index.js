import React, { Component } from 'react';
import './index.css';

export default class NavBar extends Component {
  constructor(props) {
    super();
  };

  render() {
    const { leftSlot, centerSlot, rightSlot } = this.props;

    // return (
    //   <div className="nav-bar">
    //     <div className="nav-left">{ this.props.children[0] }</div>
    //     <div className="nav-center">{ this.props.children[0] }</div>
    //     <div className="nav-right">{ this.props.children[0] }</div>
    //   </div>
    // );

    return (
      <div className="nav-bar">
        <div className="nav-left">{ leftSlot }</div>
        <div className="nav-center">{ centerSlot }</div>
        <div className="nav-right">{ rightSlot }</div>
      </div>
    );
  }
}
