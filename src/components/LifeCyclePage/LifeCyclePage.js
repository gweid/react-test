import React, { Component } from 'react';
import PropTypes from 'prop-types';

// V17可能会废弃的三个⽣命周期函数⽤ getDerivedStateFromProps 替代，⽬前使⽤的话加上 UNSAFE_：
//     componentWillMount
//     componentWillReceiveProps
//     componentWillUpdate

// 引⼊两个新的⽣命周期函数：
//     static getDerivedStateFromProps
//     getSnapshotBeforeUpdate

class LifeCyclePage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ''
    }
}
 
export default LifeCyclePage;